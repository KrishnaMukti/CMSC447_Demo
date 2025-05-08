// dataAlgo.js – now supporting track-specific graduation validation

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
    const normalized = allCourses.map(c => normalize(c.courseId));
    const creditsMap = new Map(allCourses.map(c => [normalize(c.courseId), c.credits || 0]));

    const has = code => normalized.includes(normalize(code));
    const upperLevelCredits = normalized.reduce((sum, id) => {
        const match = id.match(/\s(\d{3})$/);
        const num = match ? parseInt(match[1]) : 0;
        return num >= 300 && num <= 499 ? sum + (creditsMap.get(id) || 0) : sum;
    }, 0);

    const hasScienceSequence = () => {
        const seqs = [["BIOL 141", "BIOL 142"], ["CHEM 101", "CHEM 102"], ["PHYS 121", "PHYS 122"]];
        return seqs.some(([a, b]) => has(a) && has(b));
    };

    const hasLang201 = () => normalized.some(id => /201$/.test(id));

    switch (track) {
        // Total tracks = 15

        case "Computer Science - General": {
            const required = [
                "CMSC 201", "CMSC 202", "CMSC 203", "CMSC 313", "CMSC 304",
                "CMSC 331", "CMSC 341", "CMSC 411", "CMSC 421", "CMSC 441", "CMSC 447",
                "STAT 355"
            ];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            const electives = normalized.filter(id =>
                /^CMSC\s4/.test(id) &&
                !["CMSC 411", "CMSC 421", "CMSC 441", "CMSC 447"].includes(id)
            );
            if (electives.length < 2) result.missing.push("At least 2 CMSC 4XX electives (beyond core)");
            break;
        }
        case "Computer Science - CyberSecurity": {
            const required = ["CMSC 201", "202", "203", "313", "304", "331", "341", "411", "421", "441", "447", "STAT 355", "CMSC 426", "CMSC 487"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            const fourXX = normalized.filter(id => /^CMSC\s4/.test(id));
            if (fourXX.length < 3) result.missing.push("At least 3 CMSC 4XX electives");
            break;
        }
        case "Computer Science - Data Science": {
            const required = ["CMSC 491", "CMSC 421", "CMSC 447", "CMSC 441"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            const core = ["CMSC 436", "461", "478"];
            if (!core.some(has)) result.missing.push("Missing one DATA CORE (436/461/478)");
            const electives = normalized.filter(id => [
                "CMSC 427", "433", "442", "455", "471", "473", "475", "476", "483", "491",
                "CMPE 422", "CMPE 491"].includes(id));
            if (electives.length < 2) result.missing.push("Need 2 from DATA elective list");
            break;
        }
        case "Computer Science - AI/Machine Learning": {
            const mustHave = ["CMSC 471", "CMSC 478", "CMSC 447"];
            mustHave.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            const aiElectives = normalized.filter(id => /^CMSC\s4/.test(id));
            if (aiElectives.length < 3) result.missing.push("At least 3 CMSC 4XX AI/ML electives");
            break;
        }
        case "Computer Science - Game Development": {
            const required = ["CMSC 435", "CMSC 493"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            const gameDev4xx = normalized.filter(id => ["CMSC 437", "445", "455", "461", "481", "483"].includes(id));
            if (gameDev4xx.length < 2) result.missing.push("At least 2 CMSC 4XX from game dev list");
            break;
        }
        case "Computer Engineering - Cyber Security": {
            const required = ["CMSC 201", "202", "203", "341", "421", "426", "481", "CMPE 212", "306", "310", "311", "314", "316", "320", "349", "413", "450", "451"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            break;
        }
        case "Computer Engineering - Communications": {
            const required = ["CMPE 212", "310", "311", "314", "306", "320", "321", "349", "309", "415", "421", "450", "CMSC 201", "202", "203", "341"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            break;
        }
        case "Computer Engineering - Electronic Systems": {
            const required = ["CMPE 212", "310", "311", "314", "306", "320", "321", "349", "CMSC 201", "202", "203", "341", "451", "453", "460", "467"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            break;
        }
        case "Chemical Engineering - General": {
            const required = ["CHEM 101", "CHEM 102", "CHEM 351", "CHEM 352", "CHEM 352L", "MATH 151", "MATH 152", "MATH 251", "ENES 101", "ENME 110", "CHEM 300", "ENCH 215", "ENCH 300", "ENCH 427", "ENCH 437", "ENCH 440", "ENCH 442", "ENCH 443", "ENCH 444", "ENCH 446", "ENCH 468"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            break;
        }
        case "Chemical Engineering - Biotech/BioEngineering": {
            const required = ["CHEM 101", "CHEM 102", "CHEM 351", "CHEM 352", "CHEM 352L", "BIOL 141", "BIOL 142", "MATH 151", "MATH 152", "MATH 251", "ENES 101", "ENME 110", "CHEM 300", "ENCH 215", "ENCH 300", "ENCH 427", "ENCH 437", "ENCH 440", "ENCH 442", "ENCH 443", "ENCH 444", "ENCH 446", "ENCH 468"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            break;
        }
        case "Chemical Engineering - Environmental Engineering and Sustainability": {
            const required = ["CHEM 101", "CHEM 102", "CHEM 351", "CHEM 352", "CHEM 352L", "MATH 151", "MATH 152", "MATH 251", "ENES 101", "ENME 110", "CHEM 300", "ENCH 215", "ENCH 300", "ENCH 427", "ENCH 437", "ENCH 440", "ENCH 442", "ENCH 443", "ENCH 444", "ENCH 446", "ENCH 468", "ENCH 485"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            break;
        }
        case "Mechanical Engineering - General": {
            const required = ["ENES 101", "ENME 110", "ENME 220", "ENME 221", "ENME 271", "ENME 301", "ENME 304", "ENME 310", "ENME 322", "ENME 331", "ENME 361", "ENME 391", "ENME 392", "ENME 401", "ENME 408", "ENME 415", "ENME 432"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            break;
        }
        case "Information Systems - General": {
            const required = ["IS 101", "IS 147", "IS 240", "IS 295", "IS 310", "IS 410", "IS 420", "IS 425", "IS 436", "IS 450"];
            required.forEach(code => { if (!has(code)) result.missing.push(`Missing: ${code}`); });
            break;
        }
    }

    if (!hasScienceSequence()) result.missing.push("Science sequence (BIOL/CHEM/PHYS)");
    if (!hasLang201()) result.missing.push("Foreign language 201 level");
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
            const result = checkPrerequisites(course, completed, semCourses, nextSemCourses);
            if (!result.valid) return result;
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

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { checkPrerequisites, checkCourseSequence };
}
if (typeof window !== 'undefined') {
    window.checkPrerequisites = checkPrerequisites;
    window.checkCourseSequence = checkCourseSequence;
}

