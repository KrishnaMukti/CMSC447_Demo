// Test/AlgoTest.js

const {
    checkPrerequisites,
    checkCourseSequence
} = require('../Utils/DataAlgo');

// Simple reporter
function report(label, got, want) {
    console.log(`${got === want ? '✅' : '❌'} ${label} — got ${got}, expected ${want}`);
}

// ─── Example 1: OR-Prereq for a single course ────────────────────────────────
// Represented as an array of groups, each group is an array of alternatives.
// Here CMSC 441 needs STAT 355 OR STAT 350:
const cmsc441 = {
    name:   'CMSC 441',
    prereq: [
        ['STAT 355', 'STAT 350']     // this inner array is the OR-group
    ]
};

console.log('\n=== Single-Course OR-Prereq Tests ===\n');

// Test: satisfied by STAT 355
report(
    'CMSC441 with [STAT 355]',
    checkPrerequisites(cmsc441, ['STAT 355']),
    true
);

// Test: satisfied by STAT 350
report(
    'CMSC441 with [STAT 350]',
    checkPrerequisites(cmsc441, ['STAT 350']),
    true
);

// Test: not satisfied
report(
    'CMSC441 with []',
    checkPrerequisites(cmsc441, []),
    false
);

// ─── Example 2: AND-Prereqs for single course ────────────────────────────────
// CMSC 202 needs both CMSC 201 AND MATH 140, so we use two groups (AND between groups):
const cmsc202 = {
    name:   'CMSC 202',
    prereq: [
        ['CMSC 201'],     // group 1
        ['MATH 140']      // group 2
    ]
};

console.log('\n=== Single-Course AND-Prereq Tests ===\n');

report(
    'CMSC202 with [CMSC 201, MATH 140]',
    checkPrerequisites(cmsc202, ['CMSC 201','MATH 140']),
    true
);

report(
    'CMSC202 missing MATH 140',
    checkPrerequisites(cmsc202, ['CMSC 201']),
    false
);

report(
    'CMSC202 missing CMSC 201',
    checkPrerequisites(cmsc202, ['MATH 140']),
    false
);

// ─── Example 3: Sequence tests ───────────────────────────────────────────────
// Now test a flat sequence where position enforces order.
// E.g. CMSC201 → CMSC202 should pass, reversed should fail.
const cmsc201 = { name:'CMSC 201', prereq: [] };

console.log('\n=== Flat Sequence Tests ===\n');

const planValid = [ cmsc201, cmsc202 ];
report(
    'Sequence [201,202] valid',
    checkCourseSequence(planValid),
    true
);

const planInvalid = [ cmsc202, cmsc201 ];
report(
    'Sequence [202,201] invalid',
    checkCourseSequence(planInvalid),
    false
);
