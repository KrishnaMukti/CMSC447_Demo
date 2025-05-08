
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
        const database = client.db("4YPDatabase");
        const courses = database.collection("courses");

        // Array of course documents to insert or update
        const courseDocs = [
            {
                courseId: "CHEM 102",
                title: "Principles of Chemistry 2",
                credits: 4,
                description: `Principles of chemical and physical equilibrium, liquids and solids, elementary thermodynamics, electron and proton transfer reactions, electrochemistry, chemical kinetics and a further study of the periodic properties of the elements. (Fall/Spring/Summer)`,
                prereq: [[{"code": "CHEM 101", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CHEM 102L",
                title: "Introductory Chemistry Lab 1",
                credits: 2,
                description: `Companion course to CHEM 102, intended for all students who require two or more years of chemistry. (Fall/Spring/Summer)`,
                prereq: [[{"code": "CHEM 101", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CHEM 301",
                title: "Physical Chemistry 1",
                credits: 3,
                description: `A lecture course covering the laws of thermodynamics, with emphasis on their application to chemical systems. Topics considered include thermochemistry, equations of state, physical and chemical equilibrium, electrochemistry, kinetic theory of gases, chemical kinetics and the theory of rate processes. (Fall)`,
                prereq: [[{"code": "CHEM 102", "strict": true}], [{"code": "MATH 152", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CHEM 302",
                title: "Physical Chemistry 2",
                credits: 3,
                description: `Continuation of CHEM 301. Topics considered include molecular structure and bonding, interpretation of spectra, and introductory quantum and statistical mechanics. (Spring)`,
                prereq: [[{"code": "CHEM 301", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CHEM 311L",
                title: "Advanced Laboratory 1",
                credits: 3,
                description: `Laboratory exercises encompassing experimental problems in physical, inorganic, synthetic and instrumental analytical chemistry. Emphasis is placed on the analysis of data, the techniques of measurement and computer-interfaced instrumentation. (Fall)`,
                prereq: [[{"code": "CHEM 102L", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CHEM 351",
                title: "Organic Chemistry 1",
                credits: 3,
                description: `The chemistry of aliphatic and aromatic compounds, including bonding, stereochemistry and reactions of functional groups. Reaction mechanisms, synthetic methods and characterization of organic molecules.`,
                prereq: [[{"code": "CHEM 102", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMPE 212",
                title: "Principles of Digital Design",
                credits: 3,
                description: `This course introduces students to the science of digital design. The topics covered include Boolean algebra; logic theorems; logic circuits and methods for their simplification, including Karnaugh maps and the Quine-McCluskey algorithm; combinational design; electrical characteristics of gates, timing, races and hazards; sequential circuits, their specification via state machines and minimization; principles of register transfer notation; exposure to hardware description language(s); and synthesis tools. This course includes a laboratory. Departmental permission required.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMPE 310",
                title: "Systems Design and Programming",
                credits: 3,
                description: `This course provides computer engineering students with system design software and hardware experience. This course covers hardware features that support advanced process and memory management in modern architectures such as the Pentium. The details of the entire chipset for 8086 are covered, including topics related to the register architecture, machine language, clock generator, bus controller and memory, I/O and interrupt interface. Other details of a complete computer system are discussed, including I/O bus protocols and support chips, memory chips, interrupt handler hardware and external support chips for disk storage, video and direct memory access. This course includes a laboratory that focuses on assembly language programming and board design software.`,
                prereq: [[{"code": "CMSC 203", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMPE 311",
                title: "C Programming and Embedded Systems",
                credits: 3,
                description: `In this course, students learn about hardware and software aspects of embedded systems. Students learn C programming language through use in an embedded platform. The course builds on CMPE 310, introducing advanced topics including communication interfaces, advanced IO devices and other peripherals, multitasking, firmware, real-time operating systems/embedded operating systems and device drivers. The course will provide a hands-on experience in designing and ramming an embedded system using a microcontroller-based development platform.`,
                prereq: [[{"code": "CMPE 310", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMPE 316",
                title: "Programmable Logic Devices",
                credits: 3,
                description: `This course covers the concepts, structure and programming characteristics of programmable logic devices such as PLDs and FPGAs. Hardware Description Languages (HDLs) are used to create designs that are tested on FPGA devices.`,
                prereq: [[{"code": "CMPE 310", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMPE 320",
                title: "Probability, Statistics, and Random Processes",
                credits: 3,
                description: `This course presents the fundamental concepts of probability, statistics and random processes from a computer and electrical engineering perspective, emphasizing applications in communications, signal processing, and machine learning. Students will learn basic methods to analyze and model the probabilistic behavior of engineering systems and to analyze experimental data associated with such systems. A brief use-driven introduction of multivariate calculus concepts will be provided. (Spring)`,
                prereq: [[{"code": "MATH 152", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMPE 413",
                title: "Principles of VLSI Design",
                credits: 3,
                description: `This course provides an introduction to the concepts and techniques of VLSI (Very Large Scale Integration) design, including the VLSI design process, details of the MOS transistor, CMOS processing technology and device fabrication, design rules, digital CMOS circuits, VLSI structures, timing issues, simulation, real circuits and performance. This course includes a laboratory that uses the CADENCE design tools.`,
                prereq: [[{"code": "CMPE 314", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMPE 451",
                title: "Capstone 2",
                credits: 3,
                description: `This is the second half of a two-semester capstone experience, taken in consecutive Fall and Spring semesters. Students to engage in a complete project design experience over two semesters, integrating the technical concepts learned in prior courses. Entrepreneurship, team leadership and project management skills are emphasized. Students function in a classroom environment that closely simulates professional and entrepreneurial practice including budgetary, time, technical and sometimes social, ethical and environmental constraints.`,
                prereq: [[{"code": "CMPE 311", "strict": true}], [{"code": "CMPE 450", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMPE ELA",
                title: "CMPE Elective List A",
                credits: 3,
                description: `A student chose CMPE elective from list A`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMPE ELB",
                title: "CMPE Elective List B",
                credits: 3,
                description: `A student chosen CMPE elective from list B`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMPE EAB",
                title: "CMPE Elective List A or B",
                credits: 3,
                description: `A student chosen CMPE elective from list A or B`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CEL ELC",
                title: "Cyber Elective List C",
                credits: 3,
                description: `A student chosen Cyber Elective from list C`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 104",
                title: "Problem Solving and Computer Programming",
                credits: 3,
                description: `This course is designed to provide an introduction to problem solving and computer programming that does not require prior programming experience. Elementary problem-solving skills and algorithm development will be introduced. Students will be taught the basic use of a programming environment and basic programming constructs (including loops, control statements, functions, and arrays). This course also teaches students the fundamentals of using the UNIX operating system and introduces general computer science concepts.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 121",
                title: "Introduction to UNIX",
                credits: 3,
                description: `This is an introductory course on UNIX intended primarily for incoming students new to UNIX and to computing at UMBC. Topics include an introduction to the UMBC computing environment, basics of the UNIX environment, e-mail using Pine and the emacs/Xemacs editor. Students are required to obtain a UMBC GL account prior to the first day of class.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 201",
                title: "Computer Science 1",
                credits: 4,
                description: `An introduction to computer science through problem solving and computer programming. Programming techniques covered by this course include modularity, abstraction, top-down design, specifications documentation, debugging and testing. The core material for this course includes control structures, functions, lists, strings, abstract data types, file I/O, and recursion.`,
                prereq: [[{"code": "MATH 150", "strict": true}], [{"code": "MATH 151", "strict": true}], [{"code": "MATH 152", "strict": true}], [{"code": "MATH155", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 203",
                title: "Discrete Structures",
                credits: 3,
                description: `This course introduces the fundamental tools, topics and concepts of discrete mathematics needed to study computer science. This course emphasizes counting methods, proof techniques and problem-solving strategies. Topics include Boolean algebra; set theory; symbolic logic; predicate calculus; number theory; the methods of direct, indirect and inductive proofs; objective functions; equivalence relations; graphs; set partitions; combinatorics; modular arithmetic; summations; and recurrences.`,
                prereq: [[{"code": "MATH 140", "strict": true}], [{"code": "MATH 151", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 291",
                title: "Special topics in Computer Science",
                credits: 3,
                description: `Topics will be published in the Schedule of Classes. This course is repeatable for credit with different topic.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 299",
                title: "Independent Study in Computer Science",
                credits: 4,
                description: `A student may enroll in this course to study computer science topics that are not available in a regular course. The student and the faculty member supervising the independent study must determine the objectives of the project, the number of credits to be earned and the evaluation criteria for the project. Students are limited to two independent study courses in computer science. This course is repeatable for credit. Students may complete a maximum of 4 credits.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 304",
                title: "Social and Ethical Issues in Information Technology",
                credits: 3,
                description: `A survey course that reviews social issues and the ethical impact of information technology throughout the world. The course examines the policy issues that relate to the use of information technology, such as persona, privacy, rights of access, security, transborder information flow and confidentiality.`,
                prereq: [[{"code": "ENGL 100", "strict": true}], [{"code": "CMSC 202", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 310",
                title: "Data Analysis and Structures",
                credits: 3,
                description: `The purpose of this course is to introduce non-computer science and non-computer engineering students to principles of algorithms and data structures. This course teaches students how to design increasingly complex programs in a manageable way, using abstract data structures, data analysis and manipulation, and other software engineering concepts. Using these data structures, programs can be designed to analyze and visualize data sets imported from external locations such as websites or databases. The classroom experience will be active combining the introduction of new topics with in-class activities.`,
                prereq: [[{"code": "CMSC 210", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 331",
                title: "Principles of Programming Language",
                credits: 3,
                description: `This course examines the theory, design and implementation of programming languages and provides students with an introduction to programming languages that are likely to be new to them. Topics include specifications of syntax and semantics, declarations, binding, allocation, data structures, data types, control structures, control and data flow, concurrency, and the implementation and execution of programs. The major language paradigms will be described and explored, including imperative, object-oriented, functional, logic programming, concurrent and others. Programming projects will provide experience in several languages.`,
                prereq: [[{"code": "CMSC 202", "strict": true}], [{"code": "CMSC 203", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 340",
                title: "Advanced C++",
                credits: 3,
                description: `This course will cover advanced programming topics in C++ to include topics like pointers, memory allocation, object-oriented class design, inheritance, polymorphism, operator overloading, templates, and exceptions. In-class programming practice, projects, and design assignments will be used to improve programming skills. This class may be especially helpful for transfer students who have taken Computer Science I & II in Java and are ready to take CMSC 341.`,
                prereq: [[{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 341",
                title: "Data Structures",
                credits: 3,
                description: `An examination of a range of advanced data structures, with an emphasis on an object-oriented approach. Topics include asymptotic analysis; various binary search trees, including red-black and splay trees; skip lists as alternatives to binary search trees; data structures for multidimensional data such as K-D trees; heaps and priority queues, including binary heaps, binomial heaps, leftist heaps (and/or other mergeable heaps); B-trees for external storage; other commonly used data structures, such as hash tables and disjoint sets. Programming projects in this course will focus on implementation issues for data structures and on empirical analysis of their asymptotic performance.`,
                prereq: [[{"code": "CMSC 202", "strict": true}], [{"code": "CMSC 203", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 391",
                title: "Special Topics in Computer Science",
                credits: 3,
                description: `Topics will be published in the Schedule of Classes. This course is repeatable for credit with different topic.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 404",
                title: "The History of Computers and Computing",
                credits: 3,
                description: ``,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 411",
                title: "Computer Architecture",
                credits: 3,
                description: `This course covers the design of complex computer systems making heavy use of the components and techniques discussed in CMSC 313, CMPE 212 and CMPE 310. All parts of the computer system - CPU, memory and input/output - are discussed in detail. Topics include information representation, floating-point arithmetic, instructions set design issues (RISC vs. CISC), microprogrammed control, hardwired control, pipelining, memory cashes, bus control and timing, input/output mechanism and issues in the construction of parallel processors.`,
                prereq: [[{"code": "CMSC 313", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 421",
                title: "Principles of Operating Systems",
                credits: 3,
                description: `An introduction to the fundamentals of operating systems. Topics include interprocess communication, process scheduling, deadlock, memory management, virtual memory, file systems and distributed systems. Formal principles are illustrated with examples and case studies of one or more contemporary operating systems.`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "CMSC 131", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 426",
                title: "Principles of Computer Security",
                credits: 3,
                description: `This course will provide an introduction to computer security, with specific focus on the computing aspects. Topics covered will include basics of computer security including an overview of threat, attack, and adversary models; social engineering; essentials of cryptography; traditional computing security models; malicious software; secure programming; operating system security in practice; trusted operating system design; public policy issues including legal, privacy, and ethical issues; network and database security overview.`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "CMSC 313", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 428",
                title: "Introduction to Mobile Computing",
                credits: 3,
                description: `This course aims to provide an overview of existing and emerging mobile computing and applications, and its key building components. Mobile computing will require hand-on experiences in developing applications in a broad range of areas to include wireless network protocols, location awareness, user interface design, local storage, mobile games, and security/privacy concerns. (Spring)`,
                prereq: [[{"code": "CMSC 421", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 431",
                title: "Compiler Design Principles",
                credits: 3,
                description: `A detailed study of the design and implementation of a compiler for a high-level programming language. Topics include lexical analysis, parsing techniques (including LL and LR parsers), semantic routines, run-time storage allocation, code generation and optimization.`,
                prereq: [[{"code": "CMSC 313", "strict": true}], [{"code": "CMSC 331", "strict": true}], [{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 433",
                title: "Scripting Languages",
                credits: 3,
                description: `This course is a study of a class of programming languages and tools known as scripting languages. Topics include writing scripts to control and connect other programs, strengths and weaknesses of interpreted languages, extending scripting languages to include new functionality, embedding functions of a scripting language in other tools, and the syntax and usage of regular expressions. Programming projects in multiple languages will be required.`,
                prereq: [[{"code": "CMSC 331", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 435",
                title: "Computer Graphics",
                credits: 3,
                description: `An introduction to the fundamentals of interactive computer graphics. Topics include graphics hardware, line drawing, area filling, clipping, two-dimensional and three-dimensional geometrical transforms, three-dimensional perspective viewing, hidden surface removal, illumination, color and shading models.`,
                prereq: [[{"code": "CMSC 313", "strict": true}], [{"code": "CMSC 341", "strict": true}], [{"code": "MATH 221", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 437",
                title: "Graphical User Interface Programming",
                credits: 3,
                description: `This is a practical, hands-on course in how to program interactive 2-D graphical user interfaces using the X11/Motif package and OpenGL. Graphical user interfaces are taken here to mean not just standard widget sets, but also various interactive, pointer-based techniques that comprise the modern desktop metaphor. This course also will introduce some of the concepts and software techniques used to implement such applications. In addition, it briefly will review some of the larger issues, history and future directions of programming graphical interfaces. While the primary emphasis of the course is on 2-D interfaces, there will be a short introduction to some of the 3-D capabilities of OpenGL, as well as a discussion of 3-D interaction and virtual reality.`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "MATH 221", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 438",
                title: "Graphics for Games",
                credits: 3,
                description: `This course is an introduction to some of the computer graphics methods commonly used in 3D computer games, for both real-time rendering and offline preprocessing. Students will learn several common algorithms in each topic area with sufficient depth for implementation. (Fall)`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "MATH 151", "strict": true}], [{"code": "MATH 221", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 441",
                title: "Design and Analysis of Algorithms",
                credits: 3,
                description: `This course studies fundamental algorithms, strategies for designing algorithms, and mathematical tools for analyzing algorithms. Fundamental algorithms studied in this course include algorithms for sorting and searching, hashing, and graph algorithms. Mathematical tools include asymptotic notations and methods for solving recurrences. Algorithm design strategies include the greedy method, divide-and-conquer, dynamic programming, and randomization.`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "MATH 152", "strict": true}], [{"code": "STAT 355", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 443",
                title: "Cryptology",
                credits: 3,
                description: `An introduction to cryptology, the science of making and breaking codes and ciphers. Topics include conventional and public-key cryptosystems, including DES, RSA, shift register systems and selected classical systems; examples of cryptanalytic techniques; digital signatures; pseudo-random number generation; cryptographic protocols and their applications; and an introduction to the theories of cryptographic strength based on information theory and complexity theory.`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "MATH 221", "strict": true}], [{"code": "STAT 335", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 444",
                title: "Information Assurance",
                credits: 3,
                description: `Selected recent research topics in information assurance, such as social engineering, buffer overflow, malicious code, spyware, denial of service, information warfare, computer forensics, recovery and response, enterprise security, clandestine channels and emissions security, security analysis, security models and formal techniques, best practices, and national policy for information assurance. Taking a broad, practical view of security - including people, policies and procedures, and technology - this course will help students devise and implement security solutions that meaningfully raise the level of confidence in computer systems. This course will minimize discussion of intrusion detection, firewalls, operating systems security, and mathematical cryptology, which are emphasized in other CMSC security courses.`,
                prereq: [[{"code": "CMSC 421", "strict": true}], [{"code": "CMSC 481", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 446",
                title: "Introduction to Design Patterns",
                credits: 3,
                description: `This course is an introduction to software design patterns. Each pattern represents a best practice solution to a software problem in some context. The course will cover the rationale and benefits of object-oriented software design patterns. Several example problems will be studied to investigate the development of good design patterns.Specific patterns, such as observer, state, adapter, strategy, decorator and abstract factory will be discussed. Programming projects in the Java language will provide experience in the use of these patterns. In addition, distributed object frameworks, such as RMI and Jini, will be studied for their effective use of design patterns.`,
                prereq: [[{"code": "CMSC 331", "strict": true}], [{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 447",
                title: "Software Engineering 1",
                credits: 3,
                description: `This course introduces the basic concepts of software engineering, including software life cycle, requirements analysis and software design methods. Professional ethics in computer science and the social impact of computing are discussed as an integral part of the software development process. Additional topics may include tools for software development, software testing, software metrics and software maintenance.`,
                prereq: [[{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 449",
                title: "Malware Analysis",
                credits: 3,
                description: `Malicious software (malware) is a constant threat to the information and intellectual property of organizations. By analyzing malware using both static and dynamic methods, students will be introduced to those increasingly sophisticated attacks. This course will provide a foundation for understanding emerging trends in malware designs, including efforts to deter analysis. Discussions and hands-on exercises will cover object file formats, and the use of tools such as debuggers, virtual machines, and disassemblers. Finally, obfuscation and packing schemes will be discussed, along with various issues related to operating systems internals.`,
                prereq: [[{"code": "CMSC 313", "strict": true}], [{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 451",
                title: "Automata Theory and Formal Languages",
                credits: 3,
                description: `This course introduces the basic concepts in the theory of formal languages. Topics include regular grammars and finite automata, context-free grammars and push-down automata, Turing machines and the halting problem, and an introductory treatment of computable and non-computable functions.`,
                prereq: [[{"code": "CMSC 202", "strict": true}], [{"code": "CMSC 203", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 455",
                title: "Numerical Computations",
                credits: 3,
                description: `Topics include numerical linear algebra, interpolation, solving non-linear systems and the numerical solution of differential equations. This course also provides some emphasis on numerical algorithms and computation in a parallel environment.`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "MATH 221", "strict": true}], [{"code": "MATH 152", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 456",
                title: "Symbolic Computation",
                credits: 3,
                description: `The theme of this course is abstract algebra from an algorithmic perspective. Algorithms for computing in groups, rings, fields, ideals, quotient rings and other algebraic objects are studied. For example, the Coxeter coset enumeration and the Groebner basis algorithms are studied. Algebraic varieties play a key role in this course. The course also covers many applications of symbolic computation, such as applications to algebraic coding theory, robotics and automatic theorem proving. There are various projects using a symbolic computation package such as Maple or Mathematica.`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "MATH 221", "strict": true}], [{"code": "MATH 152", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 461",
                title: "Database Management Systems",
                credits: 3,
                description: `This course covers database management and the different data models used to structure the logical view of databases. The course also covers database design and implementation techniques, including file organization, query processing, concurrency control, recovery, integrity and security.`,
                prereq: [[{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 471",
                title: "Introduction to Artificial Intelligence",
                credits: 3,
                description: `This course provides a broad introduction to artificial intelligence, its sub-fields and their applications. Topics include problem-solving approaches, problem spaces and search, knowledge representation and reasoning, logic and deduction, planning, expert systems, handling uncertainty, learning and natural language understanding.`,
                prereq: [[{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 473",
                title: "Introduction to Natural Language Processing",
                credits: 3,
                description: `Natural language processing (NLP), the first non-numerical application of computing, was first studied more than 50 years ago. The ultimate goal of NLP is to enable computers to communicate with people the same way that people communicate among themselves. To do so, the computers must be able to understand and generate text. The course will introduce the students to the problems, methods, and applications of NLP.`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "STAT 355", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 474",
                title: "Introduction to Brain-Computer Interaction",
                credits: 3,
                description: `This course will introduce students to the latest advances and methods used in BCIs. The key objectives include understanding the framework of BCIs and understanding and simulating the applications of BCIs. It consists of topics such as robotics and exoskeletons, motion tracking, neural pattern recognition, linear and nonlinear machine learning models and algorithms, applications in motor and cognitive areas, significance of biofeedback, virtual reality, challenges, and opportunities in BCIs, etc. The course provides several hands-on exercises and examples for students to gain working knowledge in the field of BCI. (Spring)`,
                prereq: [[{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 475",
                title: "Introduction to Neural Networks",
                credits: 3,
                description: `This course is an in-depth introduction to neural networks. Topics include characteristics of neural network computing; major neural network models and their related algorithms; supervised, unsupervised and reinforcement learning; and neural network application in function approximation, pattern analysis, optimization and associative memories.`,
                prereq: [[{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 476",
                title: "Information Retrieval",
                credits: 3,
                description: `This course is an introduction to the theory and implementation of software systems designed to search through large collections of text. The first course objective is to cover the fundamentals of Information Retrieval (IR): retrieval models, search algorithms and IR evaluation. The second is to give a taste of the implementation issues through the construction and use of a text search engine.`,
                prereq: [[{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 477",
                title: "Agent Architectures and Multi-Agent Systems",
                credits: 3,
                description: `This course covers fundamental techniques for developing intelligent agents and multi-agent systems, including cognitive, logic-based, reactive and belief-desire-intention architectures; inter-agent communication languages and protocols; distributed problem-solving, planning and constraint satisfaction methods; distributed models of rational behavior; and learning and adaptation in multi-agent systems. This course is repeatable up to 3 credits.`,
                prereq: [[{"code": "CMSC 471", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 478",
                title: "Introduction to Machine Learning",
                credits: 3,
                description: `This course covers fundamental concepts, methodologies, and algorithms related to machine learning, which is the study of computer programs that improve some task with experience. Topics covered include decision trees, perceptrons, logistic regression, linear discriminant analysis, linear and non-linear regression, basic functions, support vector machines, neural networks, genetic algorithms, reinforcement learning, naive Bayes and Bayesian networks, bias/variance theory, ensemble methods, clustering, evaluation methodologies, and experiment design.`,
                prereq: [[{"code": "CMSC 341", "strict": true}], [{"code": "MATH 221", "strict": true}], [{"code": "STAT 355", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 479",
                title: "Introduction to Robotics",
                credits: 3,
                description: `This course covers fundamental concepts, methodologies, and algorithms related to autonomous mobile robotics, touching on mechanical, motor, sensory, perceptual, and cognitive aspects of the problem of building robots that move about and decide what to do on their own. Specific topics covered include legged and wheeled location, kinematic models and constraints, mobile robot maneuverability, motion control, sensors and sensing, perception, localization, belief representations, map representations, probabilistic map-based localization, autonomous map building, planning, reacting, and navigation architectures.`,
                prereq: [[{"code": "CMSC 471", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 481",
                title: "Computer Networks",
                credits: 3,
                description: `This course introduces the fundamentals of data communication and computer networking, including circuit and packet switching; network architectures and protocols; local/metropolitan/wide-area networks, OSI and TCP/IP standards; network programming and applications; and network management.`,
                prereq: [[{"code": "CMSC 341", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 483",
                title: "Parallel and Distributed Processing",
                credits: 3,
                description: `This course provides a project and applications-oriented approach to parallel and distributed programming. Students will learn a specific parallel language and programming environment and will complete a large programming project. Topics include a selected parallel programming language, a survey of parallel and distributed architectures and associated programming styles, an introduction to parallel and distributed algorithms, and a study of trade-offs between computation and communication in parallel processing.`,
                prereq: [[{"code": "CMSC 421", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 493",
                title: "Capstone Games Group Project",
                credits: 3,
                description: `The computer games capstone course is designed to allow students completing the computer science games track to engage in a complete group project development experience. This will help them to integrate the various technical concepts they have learned in earlier courses. The course aims to impart a foundation in team leadership and project management ability that will allow graduates to function effectively within multi-disciplinary teams.`,
                prereq: [[{"code": "CMSC 435", "strict": true}], [{"code": "CMSC 471", "strict": true}]],
                equivData: []
            },
            {
                courseId: "CMSC 495",
                title: "Honors Thesis",
                credits: 3,
                description: `Under the supervision of a faculty advisor, students in the Computer Science Honors Program will write and submit a scholarly paper reporting on their senior project.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 498",
                title: "Independent Study in Computer Science for CMSC Interns and Coop Students",
                credits: 3,
                description: `Consult the department Web page on CMSC 498 for more information.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 499",
                title: "Independent Study in Computer Science",
                credits: 3,
                description: `A student may enroll in this course to study computer science topics that are not available in a regular course. The student and the faculty member supervising the independent study must determine the objectives of the project, the number of credits to be earned and the evaluation criteria for the project. Students are limited to two independent study courses in computer science. This course is repeatable for credit. Students may complete a maximum of 4 credits.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "CMSC 4XX",
                title: "Upper Level Elective",
                credits: 3,
                description: `Upper Level CMSC course chosen by student.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "ECON 121",
                title: "Principles of Accounting 1",
                credits: 3,
                description: `The principles of financial accounting for individuals and business entities, including the use of accounting data in making business decisions and public policy.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "ECON 122",
                title: "Principles of Accounting 2",
                credits: 3,
                description: `Continuation of ECON 121.`,
                prereq: [[{"code": "ECON 121", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH 215",
                title: "Chemical Engineering Analysis",
                credits: 3,
                description: `Introduction to methods of chemical engineering calculations and analysis. Stoichiometric relations; material and energy balances; and behavior of gases, vapors, liquids and solids. Analytical and computer methods are presented. (Fall)`,
                prereq: [[{"code": "CHEM 102", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH 225L",
                title: "Chemical Engineering Problem Solving and Experimental Design Lab",
                credits: 3,
                description: `Introduction to the scientific method as applied to chemical engineering processes associated with thermodynamics and fluid, heat and mass transport. Computational and experimental tools are introduced. Students will formulate hypotheses to test physical phenomena associated with chemical engineering processes, design experiments based on their hypotheses, perform experiments, and use appropriate computational and programming tools as well as statistical methods to analyze their data and its significance. Issues of safety and ethics, as applied to chemical engineering, also will be discussed.`,
                prereq: [[{"code": "ENGL 100", "strict": true}], [{"code": "ENCH 215", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH 300",
                title: "Chemical Process Thermodynamics",
                credits: 3,
                description: `Principles of thermodynamics and their application to engineering problems. First and second laws of thermodynamics; properties of gases; liquids and solids; phase equilibrium; flow and non-flow systems; energy conversion; production of work from heat; thermodynamic analysis of processes; equilibrium-stage operations and the thermodynamics of chemically reacting systems. (Fall)`,
                prereq: [[{"code": "CHEM 351", "strict": true}], [{"code": "ENCH 215", "strict": true}], [{"code": "MATH 251", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH 437L",
                title: "Chemical Engineering Laboratory",
                credits: 3,
                description: `Application of chemical engineering process and unit operation principles in small-scale, semi-commercial equipment. Data from experimental observations are used to evaluate performance and efficiency of operations. Emphasis is placed on correct presentation of results in both written and oral form.`,
                prereq: [[{"code": "ENCH 225L", "strict": true}], [{"code": "ENCH 427", "strict": true}], [{"code": "ENCH 440", "strict": true}], [{"code": "ENGL 100", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH 440",
                title: "Chemical Engineering Kinetics.",
                credits: 3,
                description: `Fundamentals of chemical reaction kinetics and their application to the design and operation of chemical reactors. Reaction rate theory, homogeneous reactions in batch and flow systems, heterogeneous reactions and catalysis, and biochemical reactions. Catalytic reactor design. (Spring)`,
                prereq: [[{"code": "ENCH 300", "strict": true}], [{"code": "ENCH 425", "strict": true}], [{"code": "CHEM 301", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH 442",
                title: "    Chemical Process Control and Safety",
                credits: 3,
                description: `Dynamic response of process systems. Analysis, optimization, and design of simple control systems, closed-loop response, and dynamic testing. Design and simulation of systems for chemical process safety.`,
                prereq: [[{"code": "ENCH 225", "strict": true}], [{"code": "ENCH 300", "strict": true}], [{"code": "ENCH 425", "strict": true}], [{"code": "MATH 225", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH 444",
                title: "Process Engineering Economics and Design.",
                credits: 3,
                description: `Overall, the course is about applications of engineering principles in preliminary design of a process, taking into account economic and environmental factors. Ideation, process synthesis, flowsheet development, equipment sizing, cost estimation, process optimization, economic evaluation of the project, and the utilization of computer aids, such as process simulators, are integral to the course. (Fall)`,
                prereq: [[{"code": "ENCH 427", "strict": true}], [{"code": "ENCH 440", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH 445",
                title: "Separation Processes",
                credits: 3,
                description: `Solution thermodynamics. Phase equilibrium. Characteristics of separation processes. Simple and multistage equilibrium processes. Design and operation of binary and multicomponent separation processes. Computational approaches. (Fall)`,
                prereq: [[{"code": "ENCH 427", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH 446",
                title: "Process Engineering Economics and Design 2",
                credits: 4,
                description: `Application of chemical engineering principles for the design of chemical processing equipment. Typical problems in the design of chemical plants. Comprehensive reports are required. (Spring)`,
                prereq: [[{"code": "ENCH 444", "strict": true}], [{"code": "ENCH 445", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENCH XXX",
                title: "Chemical Engineering Elective",
                credits: 3,
                description: `Student choice chemical engineering elective.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "ENGL GEP",
                title: "ENGL GEP",
                credits: 3,
                description: `English GEP`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "ENME 110",
                title: "Statics",
                credits: 3,
                description: `The equilibrium of stationary bodies under the influence of various kinds of forces. Forces, moments, couples, equilibrium, trusses, frames and machines, centroids,moments of inertia, beams, friction and hydrostatics. Vector and scalar methods are used to solve problems.`,
                prereq: [[{"code": "MATH 151", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME 204",
                title: "Introduction to Engineering Design with CAD",
                credits: 3,
                description: `Sophomores are introduced to engineering design using the science and tools (CAD) of prior courses. The course will cover design specifications, design analysis, performance predictions, design, changes, final design and operation specifications. Students will be required to make written and oral presentations and produce a design report.`,
                prereq: [[{"code": "ENES 100", "strict": true}], [{"code": "ENGL 100", "strict": true}], [{"code": "ENME 220", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME 220",
                title: "Mechanics of Materials",
                credits: 3,
                description: `Mechanics of Materials is a fundamental course on the mechanical behavior of deformable bodies under axial loads, torsion, flexure, and combined loads. The concepts of stress, strain, and material properties are introduced and used to relate external forces with the resulting internal forces and deformation of a body. Practical applications involving the design of mechanical and structural elements under various load conditions are emphasized.`,
                prereq: [[{"code": "ENME 110", "strict": true}], [{"code": "MATH 152", "strict": true}], [{"code": "PHYS 121", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME 320",
                title: "Fluid Mechanics",
                credits: 3,
                description: `Fluid flow concepts and basic equations, effects of viscosity and compressibility, dimensional analysis and laws of similarity, flow through pipes and over-immersed bodies, and principles of flow measurement.`,
                prereq: [[{"code": "ENME 217", "strict": true}], [{"code": "ENME 220", "strict": true}], [{"code": "ENME 221", "strict": true}], [{"code": "MATH 225", "strict": true}], [{"code": "MATH 251", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME 321",
                title: "Transfer Process",
                credits: 3,
                description: `Conduction by steady state and transient heat flow; laminar and turbulent flow; free and forced convection; radiation, evaporation and condensation of vapors; and transfer of mass, heat and momentum.`,
                prereq: [[{"code": "ENME 320", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME 332L",
                title: "Solid Mechanics and Materials Laboratory",
                credits: 3,
                description: `A laboratory course in testing mechanical properties of materials. Emphasis will be on experimental techniques in solid mechanics, strain gages, strain gage rosettes, photoelasticity, acoustic emissions, metallurgical and electron microscopy.`,
                prereq: [[{"code": "ENGL 100", "strict": true}], [{"code": "ENME 220", "strict": true}], [{"code": "ENME 301", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME 360",
                title: "Vibrations",
                credits: 3,
                description: `Dynamic characteristics of machinery with emphasis on systems with single and multiple degrees of freedom.`,
                prereq: [[{"code": "ENME 220", "strict": true}], [{"code": "ENME 221", "strict": true}], [{"code": "ENME 303", "strict": true}], [{"code": "MATH 225", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME 403",
                title: "Automatic Controls",
                credits: 3,
                description: `Hydraulic, electrical, mechanical and pneumatic automatic control systems; open and closed loops; steady-state and transient operations; stability criteria; linear and non-linear systems; and Laplace transforms.`,
                prereq: [[{"code": "CMPE 306", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME 444",
                title: "Mechanical Engineering Systems Design",
                credits: 3,
                description: `This course allows students completing the Mechanical Engineering curriculum to engage in a complete system design experience, integrating the various technical concepts they have learned in prior courses and is the last in a sequence of design courses that are an integral component of the undergraduate program. The course imparts a foundation in team leadership and project management and emphasizes entrepreneurial skills necessary to function in any organization, regardless of size. Engineers in industry solve problems that simultaneously resolve budgetary, time, technical and sometimes social, ethical and environmental constraints. Students will enjoy an experience that closely matches this environment.`,
                prereq: [[{"code": "ENME 320", "strict": true}], [{"code": "ENME 303", "strict": true}], [{"code": "ENME 301", "strict": true}], [{"code": "ENME 304", "strict": true}], [{"code": "ENME 321", "strict": true}], [{"code": "ENME 360", "strict": true}], [{"code": "ENME 332L", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME 482L",
                title: "Vibrations/Controls Laboratory",
                credits: 3,
                description: `Methods and instrumentation for determining the vibration properties of mechanical systems. Various methods of spectral and modal analysis. Open- and closed-loop control experiments.`,
                prereq: [[{"code": "ENME 360", "strict": true}], [{"code": "ENME 403", "strict": true}]],
                equivData: []
            },
            {
                courseId: "ENME XXX",
                title: "Mechanical Engineering Elective",
                credits: 3,
                description: `Student Choice Mechanical Engineering elective.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "IS 125",
                title: "Information Systems Logic and Structured Design",
                credits: 3,
                description: `This course teaches the development of well-structured solutions to various programming applications as a preparation for programming language courses. Concepts of data representation, handling and physical/logical interface are emphasized. Various logical and mathematical tools for problem-solving are introduced.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "IS 147",
                title: "Introduction to Computer Programming",
                credits: 3,
                description: `This course introduces the basic principles and techniques involved in computer programming and computing. Methods of algorithm development, program development, and program design are taught using an object-oriented programming language. Projects are geared toward those typically encountered in the Information Systems field.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "IS 202",
                title: "Systems Analysis Methods",
                credits: 3,
                description: `Overview of the system development life cycle. Emphasis on current system documentation through the use of both classical and structured tools/techniques for describing process flows, data flows, data structures, file designs, input and output designs, and program specifications. Discussion of the information gathering and reporting activities and of the transition from analysis to design.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "IS 246",
                title: "Topics in Programming Languages and Tools",
                credits: 3,
                description: `This course will introduce a high-level programming language or a development tool. The specific language or tool may vary and more than one may be offered (the letter suffix will be used to distinguish them). Topics will be published in the Schedule of Classes. This course is repeatable for credit with different topic.`,
                prereq: [[{"code": "CMSC 201", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 300",
                title: "Management Information Systems",
                credits: 3,
                description: `An overview of management information systems (MIS), including the development of transaction processing systems and their relationship to management reporting systems. The course objectives include developing an understanding of the purpose, functions, components and applications of transaction processing systems and management reporting systems in private and public organizations and describing and evaluating policies for information resource management.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "IS 303",
                title: "Fundamentals of Human-Computer Interaction",
                credits: 3,
                description: `This course provides a survey of human factors and human computer interaction relevant to the design and use of information systems. It describes the contributions of information systems, computer science, psychology, sociology and engineering to human-computer interaction. Emphasis is placed on human factors theories, human information processing concepts, interaction design approaches and usability evaluation methods. Application areas and current research are also reviewed.`,
                prereq: [[{"code": "IS 202", "strict": true}], [{"code": "IS 300", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 310",
                title: "Software and Hardware Concepts",
                credits: 3,
                description: `A survey of technical topics related to computer systems with emphasis on the relationships between hardware architecture, system software and applications software. The architecture of processors and storage systems are explored, and the implications for systems software design are covered, along with the impact of hardware and system software design on the development of application programs in a business environment.`,
                prereq: [[{"code": "IS 147", "strict": true}], [{"code": "MATH 151", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 320",
                title: "Advanced Business Applications",
                credits: 3,
                description: `Students will analyze, design and implement solutions to examples of real-world business problems using advanced database and spreadsheet software that is commonly found in business today.`,
                prereq: [[{"code": "IS 295", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 325",
                title: "Introduction to Management Science",
                credits: 3,
                description: `A survey of the concepts and techniques of management science, including decision-making tools, mathematical programming, networks and operations management, and simulation.`,
                prereq: [[{"code": "IS300", "strict": true}], [{"code": "MATH 151", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 350",
                title: "Business Communications Systems",
                credits: 3,
                description: `A survey of business data communications for end users of computer networks. Students will gain a basic understanding of the features, operations and limitations of different types of communications and network systems. Topics covered include fundamentals of data and signals, telecommunications systems, wired and wireless media, error control, local-area networks, wide-area networks, the Internet and network security. This course will provide the student the knowledge and ability to interact with the system professional administering these areas.`,
                prereq: [[{"code": "IS 300", "strict": true}], [{"code": "MATH 151", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 410",
                title: "    Introduction to Database Design",
                credits: 3,
                description: `This course introduces the student to the process of database development, including data modeling, database design and database implementation. Students learn basic interactive SQL for both data definition and queries. Students practice design skills by developing a small database project. This course requires consent of the department, where consent will be granted only to students who have completed the IS BS Gateway.`,
                prereq: [[{"code": "IS 300", "strict": true}], [{"code": "IS 310", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 413",
                title: "GUI Systems Using JAVA",
                credits: 3,
                description: `This course introduces the student to graphical user interface systems using the most current version of Java. Students will learn to implement a series of interactive stand-alone or Web-based interfaces. Event handling and multi-threaded Java programs will be studied. Image and data transmission via the Internet will be presented. Students will read articles from the current research literature that offer guidelines in interface design. Familiarity with UNIX file and directory manipulation is recommended.`,
                prereq: [[{"code": "CMSC 202", "strict": true}], [{"code": "IS 247", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 420",
                title: "Database Application Development",
                credits: 3,
                description: `The course offers hands-on experience for developing client/server database applications using a major database management system. Students learn how to create and manipulate database objects, including tables, views and sequences; develop program units using SQL; and implement client applications such as forms and reports. The course provides students with firsthand experience developing prototype client/server applications.`,
                prereq: [[{"code": "IS 410", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 425",
                title: "Decision Support Systems",
                credits: 3,
                description: `This course provides an overview of theoretical and organizational aspects of decision support systems (DSS), including descriptive and prescriptive decision-making concepts, individual and group decision support systems, and executive information systems. Management of DSS within the end-user environment also is discussed. Projects using DSS software are required, and case examples are discussed.`,
                prereq: [[{"code": "IS 410", "strict": true}], [{"code": "MGMT 210", "strict": true}], [{"code": "MATH 215", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 436",
                title: "Structured Systems Analysis and Design",
                credits: 3,
                description: `A capstone course involving advanced study and application of structured analysis and design methods throughout the system life cycle. Emphasis is given to the common approaches for gathering requirements, modeling, analyzing and designing information systems. Managing the complexity of system development projects is also addressed. These skills are applied via a semester-long, team-based, field research project.`,
                prereq: [[{"code": "IS 410", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 440",
                title: "Integrating Technology into Business Processes",
                credits: 3,
                description: `Office information and decision support systems are examined as emerging and critical elements in business data and information systems. Emphasis is given to information processing considerations at the systems level, including analysis and management of support activities such as data and records management, electronic filing and retrieving systems, word processing, micro- and reprographics, and (tele)communications. The course includes discussion of person/machine interfaces and appraisals of current and future technological trends and their impacts on data processing and office equipment.`,
                prereq: [[{"code": "IS 202", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 448",
                title: "Markup and Scripting Languages",
                credits: 3,
                description: `IS 448 covers the history, theory, and practice of markup languages and their associated scripting languages. This course covers client-side web technology, such as JavaScript and server-side web technology, such PHP, markup languages, such as XML, and common databases used with web technology.`,
                prereq: [[{"code": "IS 247", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 450",
                title: "Data Communications and Networks",
                credits: 3,
                description: `This is an introductory survey course in data communications and networking. It surveys basic theory and technology of computer networking. A single networking protocol stack is also covered in depth.`,
                prereq: [[{"code": "IS 300", "strict": true}], [{"code": "IS 310", "strict": true}], [{"code": "MATH 221", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 451",
                title: "Network Design and Management",
                credits: 3,
                description: `This course covers implementation and administration of enterprise networking and distributed applications. It includes readings and case studies on middleware, network architecture for distributed applications and selected technologies to support enterprise systems.`,
                prereq: [[{"code": "IS 450", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 471",
                title: "Data Analytics for Cybersecurity",
                credits: 3,
                description: `Cyber security is pervasive in the areas of not only computer networks but also sensor networks, industrial control systems and user devices. One common thread in these types of systems and end users is data. This course provides an introduction to data analytics for multiple aspects of cyber security and focuses on data analytics methods for discovering anomalies pertaining to Cyber threats through exercises in programming and hands on data analytics tools.`,
                prereq: [[{"code": "IS 410", "strict": true}]],
                equivData: []
            },
            {
                courseId: "IS 4XX",
                title: "Information Sciences Upper Level Elective",
                credits: 3,
                description: `400 Level IS elective`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "MATH 150",
                title: "Precalculus Mathematics",
                credits: 4,
                description: `This course provides the mathematical preparation necessary for success in calculus. It also provides preparation for basic physics, computer science and engineering science courses. Topics covered include review of functions and graphing techniques; logarithmic and exponential functions; review of basic right-angle trigonometry followed by an extensive treatment of trigonometric functions, identities and applications to the analytic geometry of the conic sections, applications to two-dimensional vectors and to the geometry of complex numbers.`,
                prereq: [[{"code": "MATH 106", "strict": true}]],
                equivData: []
            },
            {
                courseId: "MATH 152",
                title: "Calculus and Analytic Geometry 2",
                credits: 4,
                description: `Topics of this course include inverse functions, methods of integration, improper integrals, hyperbolic functions, sequences and infinite series, power series, Taylor series, conic sections, polar coordinates, and applications.`,
                prereq: [[{"code": "MATH 141", "strict": true}], [{"code": "MATH 151", "strict": true}]],
                equivData: []
            },
            {
                courseId: "MGMT 210",
                title: "The Practice of Management",
                credits: 3,
                description: `The study of the role of the manager in leading and controlling organizations ranging from small entrepreneurships to large corporate environments. Topics will include management theories, corporate culture, goal setting and measuring performance.`,
                prereq: [],
                equivData: []
            },
            {
                courseId: "PHYS 122",
                title: "Introductory Physics 2",
                credits: 3,
                description: `This is the second-semester introductory calculus-based physics course. Topics include thermodynamics, electricity, DC circuits, and magnetism. This course consists of lectures and discussions. (Fall/Spring)`,
                prereq: [[{"code": "PHYS 121", "strict": true}]],
                equivData: []
            },
            {
                courseId: "STAT 355",
                title: "Introduction to Probability and Statistics for Scientists and Engineers",
                credits: 4,
                description: `This course is an introduction to probability, statistics and statistical computation for students who have knowledge of univariate calculus. Topics include set-theoretic and axiomatic introduction to probability; sample space; events; conditional probability; Bayes theorem; random variables; cumulative distribution functions; probability density functions; probability mass functions; moments and their properties including discussions on mean, variance and the moment generating function; standard univariate distributions such as the Bernoulli, Binomial, Poisson, Exponential; Gamma and Normal and their properties; the Central Limit Theorem (without proof) and its properties and use in statistics; introduction to the concept of randomness in observed data, estimation of unknown parameters, statistical inference and uncertainty quantification; estimation and inference in one and two sample means, proportions; contingency tables and tests for independence of row and column and equality of proportions; introduction to simple linear regression with estimation, inference, analysis of variance, plots and diagnostics. Statistical software like R or Python for estimation, inference and other statistical tasks will be used.`,
                prereq: [[{"code": "MATH 152", "strict": true}]],
                equivData: []
            }
        ];

        // Insert or update each course document
        for (const courseDoc of courseDocs) {
            try {
                const result = await courses.updateOne(
                    { courseId: courseDoc.courseId },
                    { $set: courseDoc },
                    { upsert: true }
                );
                if (result.upsertedCount > 0) {
                    console.log(`Inserted new course: ${courseDoc.courseId}`);
                } else if (result.modifiedCount > 0) {
                    console.log(`Updated existing course: ${courseDoc.courseId}`);
                } else {
                    console.log(`No change for: ${courseDoc.courseId}`);
                }
            } catch (error) {
                console.error(`Error inserting/updating ${courseDoc.courseId}:`, error.message);
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
