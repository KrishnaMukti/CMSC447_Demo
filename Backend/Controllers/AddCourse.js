// addCourses_CMSConlyFiltered.js - inserts courses, only CMSC prereqs that are also being added
const { MongoClient } = require('mongodb');

// Replace with your connection string.
const uri = "mongodb+srv://test1:Hello12345@4ypdatabase.99j9mje.mongodb.net/?retryWrites=true&w=majority&appName=4YPDatabase";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function addCourses() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB for course insertion");

        // Choose your database and collection
        const database = client.db("4YPDatabase");  // adjust as needed
        const courses = database.collection("courses");

        // Array of course documents to insert
        const courseDocs = [
            {
                courseId:   "CMSC 104",
                title:      "Problem Solving and Computer Programming",
                credits:    3,
                description:"This course is designed to provide an introduction to problem solving and computer programming that does not require prior programming experience. Elementary problem-solving skills and algorithm development will be introduced. Students will be taught the basic use of a programming environment and basic programming constructs (including loops, control statements, functions, and arrays). This course also teaches students the fundamentals of using the UNIX operating system and introduces general computer science concepts.",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 121",
                title:      "Introduction to UNIX",
                credits:    3,
                description:"This is an introductory course on UNIX intended primarily for incoming students new to UNIX and to computing at UMBC. Topics include an introduction to the UMBC computing environment, basics of the UNIX environment, e-mail using Pine and the emacs/Xemacs editor. Students are required to obtain a UMBC GL account prior to the first day of class.",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 201",
                title:      "Computer Science 1",
                credits:    4,
                description:"An introduction to computer science through problem solving and computer programming. Programming techniques covered by this course include modularity, abstraction, top-down design, specifications documentation, debugging and testing. The core material for this course includes control structures, functions, lists, strings, abstract data types, file I/O, and recursion.",
                prereq: [
                    [ { code: "MATH 150", strict: true } ],
                    [ { code: "MATH 151", strict: true } ],
                    [ { code: "MATH 152", strict: true } ],
                    [ { code: "MATH155", strict: true } ]
                ],
                equivData:  []
            },
            {
                courseId:   "CMSC 202",
                title:      "Computer Science 2",
                credits:    4,
                description:"This course continues the student's development of programming and problem-solving skills by providing an introduction to object-oriented design and programming (OOP). The primary focus is on OOP principles and techniques, including encapsulation, composition, inheritance, and polymorphism. Other OOP topics such as exception handling, containers, and generic programming are also covered. This is the second course for students interested in pursuing further study in computer science.",
                prereq: [
                    [ { code: "CMSC 201", strict: true } ]
                ],
                equivData:  []
            },
            {
                courseId:   "CMSC 203",
                title:      "Discrete Structures",
                credits:    3,
                description:"This course introduces the fundamental tools, topics and concepts of discrete mathematics needed to study computer science. This course emphasizes counting methods, proof techniques and problem-solving strategies. Topics include Boolean algebra; set theory; symbolic logic; predicate calculus; number theory; the methods of direct, indirect and inductive proofs; objective functions; equivalence relations; graphs; set partitions; combinatorics; modular arithmetic; summations; and recurrences.",
                prereq: [
                    [ { code: "MATH 140", strict: true } ],
                    [ { code: "MATH 151", strict: true } ]
                ],
                equivData:  []
            },
            {
                courseId:   "CMSC 210",
                title:      "Advanced Computing",
                credits:    3,
                description:"This course strengthens and extends the student's programming and problem-solving skills through the use of advanced programming language constructs, pre-defined libraries, and proper software engineering techniques. Topics include program design, debugging, and testing, source code versioning control, use of a software development environment, data formats, web programming, web data extraction, and data visualization. This is the second course for non-computer science, non-computer engineering majors interested in pursuing further study in applied computing.",
                prereq: [
                    [ { code: "CMSC 201", strict: true } ]
                ],
                equivData:  []
            },
            {
                courseId:   "CMSC 291",
                title:      "Special Topics in Computer Science",
                credits:    3,
                description:"Topics will be published in the Schedule of Classes. This course is repeatable for credit with different topic.",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 299",
                title:      "Independent Study in Computer Science",
                credits:    4,
                description:"A student may enroll in this course to study computer science topics that are not available in a regular course. The student and the faculty member supervising the independent study must determine the objectives of the project, the number of credits to be earned and the evaluation criteria for the project. Students are limited to two independent study courses in computer science. This course is repeatable for credit. Students may complete a maximum of 4 credits.",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 304",
                title:      "Social and Ethical Issues in Information Technology",
                credits:    3,
                description:"",
                prereq: [
                    [ { code: "ENGL 100", strict: true } ],
                    [ { code: "CMSC 202", strict: true } ]
                ],
                equivData:  []
            },
            {
                courseId:   "CMSC 310",
                title:      "Data Analysis and Structures",
                credits:    3,
                description:"The purpose of this course is to introduce non-computer science and non-computer engineering students to principles of algorithms and data structures. This course teaches students how to design increasingly complex programs in a manageable way, using abstract data structures, data analysis and manipulation, and other software engineering concepts. Using these data structures, programs can be designed to analyze and visualize data sets imported from external locations such as websites or databases. The classroom experience will be active combining the introduction of new topics with in-class activities.",
                prereq: [
                    [ { code: "CMSC 210", strict: true } ]
                ],
                equivData:  []
            },
            {
                courseId:   "CMSC 313",
                title:      "Computer Organization and Assembly Language Programming",
                credits:    3,
                description:"This course introduces the student to the low-level abstraction of a computer system from a programmer's point of view, with an emphasis on low-level programming. Topics include data representation, assembly language programming, C programming, the process of compiling and linking, low-level memory management, exceptional control flow, and basic processor architecture.",
                prereq: [
                    [ { code: "CMSC 202", strict: true } ],
                    [ { code: "CMSC 203", strict: true } ]
                ],
                equivData:  []
            },
            {
                courseId:   "CMSC 331",
                title:      "Principles of Programming Language",
                credits:    3,
                description:"This course examines the theory, design and implementation of programming languages and provides students with an introduction to programming languages that are likely to be new to them. Topics include specifications of syntax and semantics, declarations, binding, allocation, data structures, data types, control structures, control and data flow, concurrency, and the implementation and execution of programs. The major language paradigms will be described and explored, including imperative, object-oriented, functional, logic programming, concurrent and others. Programming projects will provide experience in several languages.",
                prereq: [
                    [ { code: "CMSC 202", strict: true } ],
                    [ { code: "CMSC 203", strict: true } ]
                ],
                equivData:  []
            },
            {
                courseId:   "CMSC 340",
                title:      "Advanced C++",
                credits:    3,
                description:"This course will cover advanced programming topics in C++ to include topics like pointers, memory allocation, object-oriented class design, inheritance, polymorphism, operator overloading, templates, and exceptions. In-class programming practice, projects, and design assignments will be used to improve programming skills. This class may be especially helpful for transfer students who have taken Computer Science I & II in Java and are ready to take CMSC 341.",
                prereq: [
                    [ { code: "CMSC 341", strict: true } ]
                ],
                equivData:  []
            },
            {
                courseId:   "CMSC 341",
                title:      "Data Structures",
                credits:    3,
                description:"An examination of a range of advanced data structures, with an emphasis on an object-oriented approach. Topics include asymptotic analysis; various binary search trees, including red-black and splay trees; skip lists as alternatives to binary search trees; data structures for multidimensional data such as K-D trees; heaps and priority queues, including binary heaps, binomial heaps, leftist heaps (and/or other mergeable heaps); B-trees for external storage; other commonly used data structures, such as hash tables and disjoint sets. Programming projects in this course will focus on implementation issues for data structures and on empirical analysis of their asymptotic performance.",
                prereq: [
                    [ { code: "CMSC 202", strict: true } ],
                    [ { code: "CMSC 203", strict: true } ]
                ],
                equivData:  []
            },

            {
                courseId:   "CMSC 352",
                title:      "Women, Gender, and Information Technology",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 391",
                title:      "Special Topics in Computer Science",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 396",
                title:      "Undergraduate Teaching Fellowship",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 404",
                title:      "The History of Computers and Computing",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 411",
                title:      "Computer Architecture",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 421",
                title:      "Principles of Operating Systems",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 426",
                title:      "Principles of Computer Security",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 427",
                title:      "Wearable Computing",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 428",
                title:      "Introduction to Mobile Computing",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 431",
                title:      "Compiler Design Principles",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 433",
                title:      "Scripting Languages",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 435",
                title:      "Computer Graphics",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 436",
                title:      "Data Visualization",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 437",
                title:      "Graphical User Interface Programming",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 438",
                title:      "Graphics for Games",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 441",
                title:      "Design and Analysis of Algorithms",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 442",
                title:      "Information and Coding Theory",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 443",
                title:      "Cryptology",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 444",
                title:      "Information Assurance",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 446",
                title:      "Introduction to Design Patterns",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 447",
                title:      "Software Engineering 1",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 448",
                title:      "Software Engineering 2",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 449",
                title:      "Malware Analysis",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 451",
                title:      "Automata Theory and Formal Languages",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 452",
                title:      "Logic for Computer Science",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 453",
                title:      "Applied Combinatorics and Graph Theory",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 455",
                title:      "Numerical Computations",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 456",
                title:      "Symbolic Computation",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 457",
                title:      "Quantum Computation",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 461",
                title:      "Database Management Systems",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 462",
                title:      "Introduction to Data Science",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 463",
                title:      "Data Privacy",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 471",
                title:      "Introduction to Artificial Intelligence",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 472",
                title:      "Computer Vision",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 473",
                title:      "Introduction to Natural Language Processing",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 474",
                title:      "Introduction to Brain–Computer Interfacing",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 475",
                title:      "Introduction to Neural Networks",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 476",
                title:      "Information Retrieval",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 477",
                title:      "Agent Architectures and Multi-Agent Systems",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 478",
                title:      "Introduction to Machine Learning",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 479",
                title:      "Introduction to Robotics",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 481",
                title:      "Computer Networks",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 483",
                title:      "Parallel and Distributed Processing",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 486",
                title:      "Mobile Telephony Communications",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 487",
                title:      "Introduction to Network Security",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 491",
                title:      "Special Topics in Computer Science",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 493",
                title:      "Capstone Games Group Project",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 495",
                title:      "Honors Thesis",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 498",
                title:      "Independent Study in Computer Science",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 499",
                title:      "Independent Study in Computer Science",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },
            {
                courseId:   "CMSC 4XX",
                title:      "Upper Level Elective",
                credits:    3,
                description:"",
                prereq:     [],
                equivData:  []
            },



            {
                courseId:   "MPLACE5",
                title:      "Math Placement Test Score: 5",
                credits:    0,
                description:"Equivalent to having completed MATH 150",
                prereq:     [],
                equivData:  ["MATH 150"]
            },{
                courseId:   "LANG TRNSFR",
                title:      "Language Equivant of 201 course",
                credits:    0,
                description:"Language Equivant of 201 course",
                prereq:     [],
                equivData:  ["JAPN 101","JAPN 201","JAPN 102","RUSS 101","RUSS 102","RUSS 201","SPAN 101","SPAN 102","SPAN 201"]
            },


            {
                courseId: "MATH 106",
                title: "Algebra and Elementary Functions",
                credits: 3,
                description: "An introduction to the basic techniques and functions of mathematics. This course is especially recommended for those students who need to brush up due to a shaky high school preparation or for those who haven't had a mathematics course in several years. Topics include linear equations and inequalities; quadratic equations; polynomials; and rational functions and their inverses, including the exponential and the logarithm.",
                prereq: [],
                equivData: []
            },
            {
                courseId: "MATH 140",
                title: "Differential Calculus",
                credits: 3,
                description: "This course covers the fundamentals of the differential calculus with review of notions of analytic geometry and trigonometry as needed. Content includes limits; rate of change and velocity; derivatives and rules of differentiation; differentiation of polynomial, algebraic and trigonometric functions; curve sketching and optimization problems; and differentiation of inverse functions, anti-derivatives and indefinite integrals. Note: Math 140 does not cover all the material of Math 151. It is equivalent to the first quarter of calculus at institutions on the quarter system.",
                prereq: [
                    [ { code: "MATH 150", strict: true } ]
                ],
                equivData: []
            },
            {
                courseId: "MATH 141",
                title: "Integral Calculus",
                credits: 3,
                description: "Topics of this course include computation of areas, definition of the definite integral, integrals of algebraic and trigonometric functions, applications of integrals, the calculus of exponential and logarithmic functions, basic and advanced techniques of integration, numerical integration and improper integrals. Note: The combination of Math 140 and Math 141 includes all of the material of Math 151 and can serve as a prerequisite to Math 152. Math 141 is equivalent to the second quarter of calculus at an institution on the quarter system.",
                prereq: [
                    [ { code: "MATH 140", strict: true } ]
                ],
                equivData: []
            },
            {
                courseId: "MATH 150",
                title: "Precalculus Mathematics",
                credits: 4,
                description: "This course provides the mathematical preparation necessary for success in calculus. It also provides preparation for basic physics, computer science and engineering science courses. Topics covered include review of functions and graphing techniques; logarithmic and exponential functions; review of basic right-angle trigonometry followed by an extensive treatment of trigonometric functions, identities and applications to the analytic geometry of the conic sections, applications to two-dimensional vectors and to the geometry of complex numbers.",
                prereq: [
                    [ { code: "MATH 106", strict: true } ]
                ],
                equivData: []
            },
            {
                courseId: "MATH 151",
                title: "Calculus and Analytic Geometry 1",
                credits: 4,
                description: "Topics of this course include limits, continuity, the rate of change, derivatives, differentiation formulas for algebraic, trigonometric, logarithmic, and exponential functions, maxima and minima, integration and computation of areas, the Fundamental Theorem of Calculus, areas and volumes of solids of revolution, and applications. Note: Non-science oriented students should consider MATH 155. Credit will not be given for both MATH 151 and MATH 155.",
                prereq: [
                    [ { code: "CMSC 100", strict: true } ]
                ],
                equivData: []
            },
            {
                courseId: "MATH 152",
                title: "Calculus and Analytic Geometry 2",
                credits: 4,
                description: "Topics of this course include inverse functions, methods of integration, improper integrals, hyperbolic functions, sequences and infinite series, power series, Taylor series, conic sections, polar coordinates, and applications.",
                prereq: [
                    [ { code: "MATH 141", strict: true } ],
                    [ { code: "MATH 151", strict: true } ]
                ],
                equivData: []
            },
            {
                courseId: "MATH 221",
                title: "Introduction to Linear Algebra",
                credits: 3,
                description: "Topics of this course include: linear equations, Gauss-Jordan reduction, matrices and determinants and their properties, vector spaces and subspaces, basis and dimension, linear transformations, kernel and range, eigenvalues and eigenvectors, and matrix diagonalization.",
                prereq: [
                    [ { code: "MATH 141", strict: true } ],
                    [ { code: "MATH 151", strict: true } ]
                ],
                equivData: []
            },
            {
                courseId: "STAT 355",
                title: "Introduction to Probability and Statistics for Scientists and Engineers",
                credits: 4,
                description: "This course is an introduction to probability, statistics and statistical computation for students who have knowledge of univariate calculus. Topics include set-theoretic and axiomatic introduction to probability; sample space; events; conditional probability; Bayes theorem; random variables; cumulative distribution functions; probability density functions; probability mass functions; moments and their properties including discussions on mean, variance and the moment generating function; standard univariate distributions such as the Bernoulli, Binomial, Poisson, Exponential; Gamma and Normal and their properties; the Central Limit Theorem (without proof) and its properties and use in statistics; introduction to the concept of randomness in observed data, estimation of unknown parameters, statistical inference and uncertainty quantification; estimation and inference in one and two sample means, proportions; contingency tables and tests for independence of row and column and equality of proportions; introduction to simple linear regression with estimation, inference, analysis of variance, plots and diagnostics. Statistical software like R or Python for estimation, inference and other statistical tasks will be used.",
                prereq: [
                    [ { code: "MATH 152", strict: true } ]
                ],
                equivData: []
            }
        ];



        // Optionally, create a unique index on courseId
        // await courses.createIndex({ courseId: 1 }, { unique: true });

        // Insert each course document
        for (const courseDoc of courseDocs) {
            try {
                const result = await courses.insertOne(courseDoc);
                console.log(`Course inserted with _id: ${result.insertedId} (${courseDoc.courseId})`);
            } catch (error) {
                console.error(`Error inserting ${courseDoc.courseId}:`, error.message);
            }
        }
    } catch (error) {
        console.error("Error while inserting courses:", error);
    } finally {
        // Close the connection.
        await client.close();
    }
}

addCourses().catch(console.error);