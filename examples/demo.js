const {
    HierarchyNode,
    selectRepresentativeValue,
    countOrderedPatterns,
    connectHierarchyNeighbors
} = require("../src/signalPath");

// --------------------------------------------------
// 1. Representative reading
// --------------------------------------------------

const readings = [5, 2, 6];

console.log("Representative reading:");
console.log(selectRepresentativeValue(readings));
// 5

// --------------------------------------------------
// 2. Ordered event-pattern detection
// --------------------------------------------------

const eventStream = "babgbag";
const eventPattern = "bag";

console.log("\nOrdered pattern matches:");
console.log(countOrderedPatterns(eventStream, eventPattern));
// 5

// --------------------------------------------------
// 3. Hierarchy neighbor connections
// --------------------------------------------------

const root = new HierarchyNode(1);

root.left = new HierarchyNode(2);
root.right = new HierarchyNode(3);

root.left.left = new HierarchyNode(4);
root.left.right = new HierarchyNode(5);

root.right.left = new HierarchyNode(6);
root.right.right = new HierarchyNode(7);

connectHierarchyNeighbors(root);

console.log("\nHierarchy connections:");

console.log(`Level 1: ${root.value} -> null`);

console.log(
    `Level 2: ${root.left.value} -> ${root.left.next.value} -> null`
);

console.log(
    `Level 3: ${root.left.left.value} -> ` +
    `${root.left.left.next.value} -> ` +
    `${root.left.left.next.next.value} -> ` +
    `${root.left.left.next.next.next.value} -> null`
);
