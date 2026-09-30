/**
 * SignalPath Algorithm Studio
 *
 * Core algorithms for:
 * 1. Representative value selection
 * 2. Ordered pattern counting
 * 3. Perfect hierarchy neighbor linking
 */

/**
 * Finds the representative value from a collection of numeric readings.
 *
 * For a three-value reading set, the representative value is the
 * value that lies between the minimum and maximum.
 *
 * @param {number[]} readings
 * @returns {number}
 */
function selectRepresentativeValue(readings) {
    if (readings.length !== 3) {
        throw new Error("Exactly three readings are required.");
    }

    const sortedReadings = [...readings].sort((a, b) => a - b);

    return sortedReadings[1];
}

/**
 * Counts how many distinct ordered ways a target pattern
 * can be formed from a source sequence.
 *
 * Characters do not need to be adjacent, but their order
 * must remain unchanged.
 *
 * @param {string} source
 * @param {string} target
 * @returns {number}
 */
function countOrderedPatterns(source, target) {
    const patternLength = target.length;

    // dp[i] = number of ways to form target[0..i-1].
    const ways = new Array(patternLength + 1).fill(0);

    // There is exactly one way to form an empty pattern.
    ways[0] = 1;

    for (const sourceCharacter of source) {
        // Traverse backwards so the current source character
        // can only contribute once during this iteration.
        for (let targetIndex = patternLength; targetIndex >= 1; targetIndex--) {
            if (sourceCharacter === target[targetIndex - 1]) {
                ways[targetIndex] += ways[targetIndex - 1];
            }
        }
    }

    return ways[patternLength];
}

/**
 * Node used by the hierarchy connector.
 */
class HierarchyNode {
    /**
     * @param {number} value
     */
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.next = null;
    }
}

/**
 * Connects neighboring nodes at each level of a perfect
 * binary hierarchy.
 *
 * The function uses existing `next` pointers to traverse
 * each level, so no queue or additional level array is needed.
 *
 * @param {HierarchyNode|null} root
 * @returns {HierarchyNode|null}
 */
function connectHierarchyNeighbors(root) {
    if (root === null) {
        return null;
    }

    let firstNodeOfLevel = root;

    // A perfect tree has children until the leaf level.
    while (firstNodeOfLevel.left !== null) {
        let currentNode = firstNodeOfLevel;

        while (currentNode !== null) {
            // Connect siblings.
            currentNode.left.next = currentNode.right;

            // Connect this subtree to the next subtree.
            if (currentNode.next !== null) {
                currentNode.right.next = currentNode.next.left;
            }

            currentNode = currentNode.next;
        }

        firstNodeOfLevel = firstNodeOfLevel.left;
    }

    return root;
}

module.exports = {
    HierarchyNode,
    selectRepresentativeValue,
    countOrderedPatterns,
    connectHierarchyNeighbors
};
