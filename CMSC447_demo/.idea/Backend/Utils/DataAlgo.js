// dataAlgo.js – UMBC CS B.S. 2024–2025 Graduation Validator

function normalize(code) {
    return code.trim().toUpperCase();
}

function checkPrerequisites(course, completed, semCourses, nextSemCourses) {
    const groups = course.prereq || [];
    const courseId = normalize(course.courseId);

    const semCodes = new Set(semCourses.map(c => normalize(c.courseId)));
    const semEquiv = new Set(semCourses.flatMap(c => (c.equivData || []).map(e => normalize(e))));

    const nextCodes = new Set(nextSemCourses.map(c => normalize(c.courseId)));
    const nextEquiv = new Set(nextSemCourses.flatMap(c => (c.equivData || []).map(e => normalize(e))));

    for (const group of groups) {
        let satisfied = false;
        for (const entry of group) {
            const code = normalize(entry.code);
            const strict = entry.strict !== false;

            if (completed.has(code)) {
                satisfied = true;
                break;
            }

            if (!strict) {
                if (semCodes.has(code) || semEquiv.has(code) || nextCodes.has(code) || nextEquiv.has(code)) {
                    satisfied = true;
                    break;
                }
            }
        }
        if (!satisfied) {
            const opts = group.map(e => normalize(e.code)).join(" OR ");
            return { valid: false, message: `To take ${courseId}, you must complete one of: ${opts}` };
        }
    }
    return { valid: true };
}

function checkGraduationRequirements(allCourses, track) {
    const result = { valid: true, missing: [] };

    // normalize course IDs and build credit lookup
    const normalized = allCourses.map(c => normalize(c.courseId));
    const creditsMap = new Map(allCourses.map(c => {
        const id = normalize(c.courseId);
        const creditVal = Number(c.credits);
        const defaultCredits = /^CMSC\s4XX$/.test(id) ? 3 : 0;
        return [id, !isNaN(creditVal) ? creditVal : defaultCredits];
    }));

    const has = code => normalized.includes(normalize(code));

    // count upper‑level credits (300–499, 4XX, or ELECTIVE 6)
    const upperLevelCredits = normalized.reduce((sum, id) => {
        const match       = id.match(/\s(\d{3})$/);
        const num         = match ? parseInt(match[1]) : 0;
        const is4XX       = /\s4XX$/.test(id);
        const isElective6 = /\bELECTIVE\s*6$/.test(id);

        if ((num >= 300 && num <= 499) || is4XX || isElective6) {
            return sum + (creditsMap.get(id) || 0);
        }
        return sum;
    }, 0);

    // science‑sequence helper
    const hasScienceSequence = () => {
        const seqs = [
            ["BIOL 141","BIOL 142"],
            ["CHEM 101","CHEM 102"],
            ["PHYS 121","PHYS 122"]
        ];
        return seqs.some(([a,b]) => has(a) && has(b));
    };

    // ─── TRACK‑SPECIFIC REQUIRED COURSES ───
    let required;
    switch (track) {
        // ── Computer Science ──
        case "Computer Science - General":
            required = [
                "CMSC 201","CMSC 202","CMSC 203",
                "CMSC 313","CMSC 304","CMSC 331",
                "CMSC 341","CMSC 411","CMSC 421",
                "CMSC 441","CMSC 447","STAT 355",
                "MATH 151","MATH 152","MATH 221"
            ];
            break;
        case "Computer Science - CyberSecurity":
            required = ["CMSC 426","CMSC 487"];
            break;
        case "Computer Science - Data Science":
            required = ["CMSC 436","CMSC 461","CMSC 478"];
            break;
        case "Computer Science - AI/Machine Learning":
            required = ["CMSC 471","CMSC 478"];
            break;
        case "Computer Science - Game Development":
            required = ["CMSC 435","CMSC 471","CMSC 493"];
            break;

        // ── Computer Engineering ──
        case "Computer Engineering - Cyber Security":
        case "Computer Engineering - Communications":
        case "Computer Engineering - Electronic Systems":
            required = [ /* CE list */ ];
            break;

        // ── Chemical Engineering ──
        case "Chemical Engineering - General":
            required = [ /* ChE General list */ ];
            break;
        case "Chemical Engineering - Biotech/BioEngineering":
        case "Chemical Engineering - Environmental Engineering and Sustainability":
            required = [ /* ChE spec list */ ];
            break;

        // ── Mechanical Engineering ──
        case "Mechanical Engineering - General":
            required = [ /* ME list */ ];
            break;

        // ── Information Systems ──
        case "Information Systems - General":
            required = [ /* IS list */ ];
            break;

        case "Business Technology Administration - B.A.":
            required = [ /* BTA list */ ];
            break;

        // ── fallback ──
        default:
            required = [
                "CMSC 201","CMSC 202","CMSC 203",
                "CMSC 313","CMSC 304","CMSC 331",
                "CMSC 341","CMSC 411","CMSC 421",
                "CMSC 441","CMSC 447","STAT 355",
                "MATH 151","MATH 152","MATH 221"
            ];
    }

    // enforce each required
    required.forEach(code => {
        if (!has(code)) result.missing.push(`Missing: ${code}`);
    });

    // ─── ELECTIVES & OTHER BUCKETS ───
    if (track.startsWith("Computer Science")) {
        // CMSC‑approved electives
        const csElectiveList = [
            "CMSC 426","CMSC 431","CMSC 435","CMSC 448",
            "CMSC 451","CMSC 455","CMSC 456","CMSC 461",
            "CMSC 471","CMSC 481","CMSC 483"
        ];
        const csElectives = normalized.filter(id => csElectiveList.includes(id));

        // other 400‑level tech electives
        const techElectives = normalized.filter(id =>
            /^CMSC\s4\d{2}$/.test(id) &&
            !["CMSC 404","CMSC 495","CMSC 496","CMSC 497","CMSC 498","CMSC 499"].includes(id) &&
            !csElectiveList.includes(id)
        );

        if (csElectives.length < 2) {
            result.missing.push("At least 2 CMSC electives from the approved list");
        }
        if (techElectives.length < 3) {
            result.missing.push("At least 3 CMSC 400-level technical electives (excluding CMSC 404, 495–499)");
        }
    }

    // common buckets
    if (!hasScienceSequence()) result.missing.push("Science sequence (BIOL/CHEM/PHYS)");
    if (!validateLang201(normalized)) result.missing.push("Foreign language 201-level course required");
    if (!validateArtsHumanities(normalized)) result.missing.push("Arts & Humanities: 3 courses from 2+ disciplines");
    if (!validateCulture(normalized)) result.missing.push("Culture requirement: 1 approved course");
    // Social Science (SS) – 1 course
    // Social Science (SS) – 3 courses
    const ssCount = normalized.filter(c => ssCourses.includes(c)).length;
    if (ssCount < 3)
        result.missing.push(`Only ${ssCount}/3 Social Science (SS) courses`);

    if (upperLevelCredits < 45) result.missing.push(`Only ${upperLevelCredits}/45 upper-level credits`);

    if (result.missing.length > 0) result.valid = false;
    return result;
}

function checkCourseSequence(planBySemester, track = "") {
    const completed = new Set();
    const allCourses = [];

    for (let sem = 0; sem < planBySemester.length; sem++) {
        const semCourses = planBySemester[sem] || [];
        const nextSemCourses = planBySemester[sem + 1] || [];

        for (const course of semCourses) {
            const res = checkPrerequisites(course, completed, semCourses, nextSemCourses);
            if (!res.valid) return res;
        }

        for (const course of semCourses) {
            const code = normalize(course.courseId);
            completed.add(code);
            (course.equivData || []).forEach(eq => completed.add(normalize(eq)));
            allCourses.push(course);
        }
    }

    const gradResult = checkGraduationRequirements(allCourses, track);
    if (!gradResult.valid) {
        return { valid: false, message: `Graduation requirements not met: ${gradResult.missing.join(", ")}` };
    }
    return { valid: true };
}

// Language 201-level – match specific prefix + 201
const langPrefixes = ["FREN","GERM","SPAN","JPNS","KORE","CHIN","LATN","HEBR","ARBC","RUSS","GRK","ITAL","LANG"];
const rig=["LANG"]
function validateLang201(coursesTaken) {
    return coursesTaken.some(course => {
        const [prefix, number] = course.split(" ");
         if(rig.includes(prefix) && number === "TRNSFR" ) {
             return langPrefixes.includes(prefix) && number === "TRNSFR";
         }
        return langPrefixes.includes(prefix) && number === "201";
    });
}

// Arts and Humanities (AH) – 3 courses from at least 2 disciplines
const ahCourses = [
    "AFST 100", "AFST 213", "AFST 230", "AFST 245", "AFST 347", "AFST 361",
    "AGNG 415",
    "AMST 100", "AMST 200", "AMST 245", "AMST 310", "AMST 320", "AMST 345", "AMST 380",
    "ANCS 150", "ANCS 200", "ANCS 201", "ANCS 202", "ANCS 210", "ANCS 220", "ANCS 305", "ANCS 320",
    "ARCH 100", "ARCH 120", "ARCH 200", "ARCH 201", "ARCH 220", "ARCH 330", "ARCH 340",
    "ART 215", "ART 216", "ART 321", "ART 323", "ART 324", "ART 325", "ART 376",
    "ASIA 100",
    "CMSC 304",
    "CSST 345",
    "DANC 201", "DANC 202",
    "ENGL 190", "ENGL 210", "ENGL 271", "ENGL 272", "ENGL 273", "ENGL 291", "ENGL 347", "ENGL 349", "ENGL 361", "ENGL 369",
    "FREN 340",
    "FYS 101", "FYS 107",
    "GWST 255", "GWST 310", "GWST 315", "GWST 320", "GWST 321", "GWST 322", "GWST 330", "GWST 342",
    "MLL 301", "MLL 322", "MLL 323", "MLL 328",
    "MUSC 100", "MUSC 101", "MUSC 102", "MUSC 214", "MUSC 215", "MUSC 217", "MUSC 230", "MUSC 321",
    "PHIL 100", "PHIL 150", "PHIL 152", "PHIL 210", "PHIL 220", "PHIL 248", "PHIL 321", "PHIL 322", "PHIL 350", "PHIL 355", "PHIL 358", "PHIL 371", "PHIL 372",
    "RLST 100", "RLST 200", "RLST 201", "RLST 210", "RLST 220", "RLST 230", "RLST 250", "RLST 260", "RLST 270", "RLST 280", "RLST 290",
    "THTR 100", "THTR 120", "THTR 201", "THTR 202", "THTR 210", "THTR 220", "THTR 230", "THTR 240", "THTR 250", "THTR 260", "THTR 300", "THTR 310", "THTR 320", "THTR 330", "THTR 340"
];
function validateArtsHumanities(coursesTaken) {
    const disciplines = new Set();
    let count = 0;
    for (const c of coursesTaken) {
        if (ahCourses.includes(c)) {
            disciplines.add(c.split(" ")[0]);
            count++;
        }
    }
    return count >= 3 && disciplines.size >= 2;
}

// Culture (C)
const cultureCourses = [
    "AFST 211", "AFST 212", "AFST 213", "AFST 245", "AFST 314", "AFST 347", "AFST 353", "AFST 354", "AFST 370",
    "AMST 200", "AMST 210", "AMST 245", "AMST 345", "AMST 352", "AMST 365", "AMST 369", "AMST 375", "AMST 395",
    "ANCS 150", "ANCS 200", "ANCS 201", "ANCS 202", "ANCS 210", "ANCS 220", "ANCS 305", "ANCS 375", "ANCS 453", "ANCS 455",
    "ANTH 101", "ANTH 211", "ANTH 214", "ANTH 224", "ANTH 302", "ANTH 316", "ANTH 326",
    "ARBC 202",
    "DANC 201",
    "ECON 382",
    "EHS 340",
    "AGNG 360", "AGNG 369",
    "GWST 100", "GWST 245", "GWST 315", "GWST 322", "GWST 340", "GWST 366", "GWST 370", "GWST 379", "GWST 380",
    "HIST 103", "HIST 110", "HIST 111", "HIST 206", "HIST 208", "HIST 242", "HIST 243", "HIST 274", "HIST 322",
    "JDST 100", "JDST 200", "JDST 201", "JDST 230", "JDST 273", "JDST 274", "JDST 310", "JDST 321", "JDST 323", "JDST 340", "JDST 373",
    "JPNS 202",
    "KORE 202", "KORE 301", "KORE 302", "KORE 309", "KORE 310",
    "LATN 332",
    "LING 191", "LING 230",
    "MLL 191", "MLL 205", "MLL 209", "MLL 210", "MLL 213", "MLL 215", "MLL 216", "MLL 218", "MLL 219", "MLL 220", "MLL 230", "MLL 234", "MLL 235", "MLL 250", "MLL 255", "MLL 261", "MLL 270", "MLL 271", "MLL 280", "MLL 305", "MLL 310", "MLL 311"
];
function validateCulture(coursesTaken) {
    return coursesTaken.some(c => cultureCourses.includes(c));
}

// Social Science (SS)
const ssCourses = [
    "AFST 206","AFST 211","AFST 212","AFST 255","AFST 314",
    "AFST 353","AFST 354","AFST 370",
    "AGNG 100","AGNG 200","AGNG 369",
    "GWST 300","GWST 330","GWST 378","GWST 433","GWST 495",
    "HAPP 329","HAPP 411",
    "HCST 100",
    "HIST 445","HIST 446","HIST 496","HIST 497","HIST 499",
    "INDS 330",
    "IS 369","IS 439",
    "MATH 432","MATH 481",
    "ECON 101","ECON 102",
    "PSYC 100","PSYC 200",
    "SOCY 101",
    "POLI 100"
];
function validateSocialScience(coursesTaken) {
    return coursesTaken.filter(c => ssCourses.includes(c)).length >= 3;
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkPrerequisites, checkCourseSequence };
}
if (typeof window !== 'undefined') {
    window.checkPrerequisites = checkPrerequisites;
    window.checkCourseSequence = checkCourseSequence;
}

// Arts and Humanities (AH) – 3 courses from at least 2 different disciplines


function validateArtsHumanities(coursesTaken) {
    const disciplines = new Set();
    let count = 0;
    for (const course of coursesTaken) {
        if (ahCourses.includes(course)) {
            const dept = course.split(" ")[0];
            disciplines.add(dept);
            count++;
        }
    }
    return count >= 3 && disciplines.size >= 2;
}



function validateSocialScience(coursesTaken) {
    return coursesTaken.some(c => ssCourses.includes(c));
}


