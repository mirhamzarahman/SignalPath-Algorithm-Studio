<div align="center">

# 🔗 SignalPath Algorithm Studio

A practical JavaScript toolkit for modeling representative values, ordered pattern detection, and efficient hierarchy connectivity.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Ready-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

</div>

---

## 📖 Overview

**SignalPath Algorithm Studio** is a lightweight JavaScript library that turns fundamental algorithmic techniques into reusable software components. The project models three common data-flow situations:

1. **Representative value selection** — identify the middle reading from a small set of measurements.
2. **Ordered pattern detection** — determine how many different ways an event sequence can contain a target pattern.
3. **Hierarchy connectivity** — connect neighboring nodes within a structured hierarchy so information can move horizontally without repeatedly traversing from the root.

Rather than treating these as isolated exercises, SignalPath presents them as components of a conceptual data-processing system.

---

## 🌍 Real-World Conceptual Scenario

Imagine a monitoring platform called **SignalPath** that receives operational data from distributed systems. A monitoring pipeline might need to:
* Summarize a small group of sensor readings.
* Determine how frequently a particular event signature appears in a larger event stream.
* Connect services at the same organizational or network level for fast lateral communication.

These tasks look unrelated at first, but they share an important engineering principle:
> **Choose the right data structure and traversal strategy for the shape of the data.**

SignalPath demonstrates that principle through three focused modules.

---

## 🧠 Core Concept

| Module | Real-World Purpose | Core Technique |
| :--- | :--- | :--- |
| `selectRepresentativeValue()` | Summarize a small group of readings | Sorting |
| `countOrderedPatterns()` | Detect ordered event signatures | Dynamic Programming |
| `connectHierarchyNeighbors()` | Build horizontal communication paths | Tree traversal + pointers |

The project intentionally keeps each algorithm independent so that the implementation can be reused in larger systems.

---

## ⚙️ How the System Works

### 1. Representative Value Selection
A monitoring service may receive three measurements:
```text
18, 7, 12
```
Instead of using the minimum or maximum, the system identifies the value between them:
```text
7 → 12 → 18
     ↑
 representative
```
The implementation sorts the values and selects the middle position.

### 2. Ordered Pattern Detection
Suppose an event stream is:
```text
b a b g b a g
```
and the system is searching for:
```text
b a g
```
The characters do not need to be adjacent. They only need to preserve their original order. The algorithm counts all valid ways to construct the target pattern from the source sequence, useful conceptually for analyzing ordered event signatures.

### 3. Hierarchy Neighbor Connections
Consider a perfect service hierarchy:
```text
                 Gateway
                /       \
             API-A     API-B
             /  \      /  \
          DB-1 DB-2  DB-3 DB-4
```
SignalPath creates horizontal connections:
```text
Gateway → null

API-A → API-B → null

DB-1 → DB-2 → DB-3 → DB-4 → null
```
Once these connections exist, applications can move across a level without repeatedly searching down from the root.

---

## 🏗️ Algorithm & Data Structure Details

* **Sorting (`selectRepresentativeValue`):** For a small collection of measurements, sorting provides a straightforward way to identify the middle value.
  ```text
  [18, 7, 12]  ---(sort)--->  [7, 12, 18]  ---(middle)--->  12
  ```
  Complexity for three values is effectively constant, while general sorting is $O(n \log n)$.

* **Dynamic Programming (`countOrderedPatterns`):** Pattern counting uses a one-dimensional DP array where $\text{dp}[j]$ represents the number of ways to construct the first $j$ target characters. Initial state is $\text{dp}[0] = 1$ (one way to form an empty pattern). When source and target characters match:
  $$\text{dp}[targetIndex] += \text{dp}[targetIndex - 1]$$
  Target indices are processed from right to left to prevent character reuse within the same iteration.

* **Pointer-Based Tree Traversal (`connectHierarchyNeighbors`):** Leverages the property that every internal node has exactly two children. Connects left child to right child, and right child to the next parent's left child, building a complete horizontal chain without requiring an auxiliary queue.

---

## ✨ Key Features

* 🧩 Modular JavaScript functions
* 📊 Representative-value analysis
* 🔎 Ordered pattern-frequency analysis
* 🌳 Constant-space hierarchy linking
* ♻️ Reusable APIs instead of competitive-programming boilerplate
* 📝 Clear documentation and examples
* 🚀 No external runtime dependencies

---

## 💡 Example Use Case

A monitoring application receives readings:
```javascript
const readings = [18, 7, 12];
```
It can identify the representative reading:
```javascript
selectRepresentativeValue(readings); // 12
```
It can inspect an event stream:
```javascript
countOrderedPatterns("babgbag", "bag"); // 5
```
Finally, a service hierarchy can be connected:
```text
        1
      /   \
     2     3
    / \   / \
   4   5 6   7
```
After processing:
```text
1 → null
2 → 3 → null
4 → 5 → 6 → 7 → null
```

---

## 📥 Example Input / Output Summary

* **Representative Value**
  * *Input:* `[5, 2, 6]`
  * *Output:* `5`
* **Ordered Pattern Detection**
  * *Input:* `source = "babgbag"`, `target = "bag"`
  * *Output:* `5` (five distinct ordered ways to construct `"bag"`)
* **Hierarchy Connectivity**
  * *Input:* Perfect binary tree rooted at `1`
  * *Output:* Horizontal linked levels (`1 -> null`, `2 -> 3 -> null`, `4 -> 5 -> 6 -> 7 -> null`)

---

## ⏱️ Complexity Breakdown

| Component | Time Complexity | Extra Space Complexity |
| :--- | :--- | :--- |
| Representative value | $O(n \log n)$ general sorting | $O(n)$ |
| Ordered pattern counting | $O(S \times T)$ | $O(T)$ |
| Hierarchy connectivity | $O(N)$ | $O(1)$ |

*Where $S$ = source length, $T$ = target length, $N$ = number of hierarchy nodes.* The hierarchy algorithm uses $O(1)$ extra space by deliberately avoiding queues or level-order arrays.

---

## 🛠️ Technologies Used

* JavaScript (ES6+)
* Node.js
* Arrays & Binary Trees
* Dynamic Programming & Pointer-based traversal
* Git / GitHub

---

## 📁 Project Structure

```text
signalpath-algorithm-studio/
│
├── src/
│   └── signalPath.js
│
├── examples/
│   └── demo.js
│
├── package.json
├── README.md
└── LICENSE
```

---

## 🚀 How to Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/mirhamzarahman/signalpath-algorithm-studio.git
   ```
2. **Enter the project directory**
   ```bash
   cd signalpath-algorithm-studio
   ```
3. **Run the demonstration**
   ```bash
   node examples/demo.js
   ```
   *(No additional package installation is required).*

---

## 📚 API Reference

### `selectRepresentativeValue(values)`
Returns the middle value from a small collection of numeric readings.
```javascript
selectRepresentativeValue([5, 2, 6]); // 5
```

### `countOrderedPatterns(source, target)`
Counts the number of distinct ways the target sequence can be formed from the source while preserving order.
```javascript
countOrderedPatterns("babgbag", "bag"); // 5
```

### `connectHierarchyNeighbors(root)`
Connects nodes at the same level of a perfect binary hierarchy using `next` pointers. Returns the same root after establishing horizontal connections.
```javascript
connectHierarchyNeighbors(root);
```

---

## 🎓 Learning Outcomes

By exploring this project, you can practice:
* Translating algorithms into reusable software components.
* Working with JavaScript arrays and binary trees.
* Designing 1D dynamic programming solutions and pointer-based traversal.
* Preserving order while counting combinations.
* Reducing auxiliary memory usage and building maintainable modules.

---

## 🔮 Possible Future Improvements

* Add automated unit tests with Node's built-in test runner.
* Add TypeScript type definitions.
* Add benchmark comparisons between alternative implementations.
* Add interactive visualizations for DP state transitions and hierarchies.
* Support non-perfect trees with a queue-based connector.
* Publish the toolkit as an npm package with automated GitHub Actions testing.

---

## 📄 License

This project is available under the [MIT License](LICENSE).

---

## 👤 Author

**Mir Hamza Rahman**
* GitHub: [@mirhamzarahman](https://github.com/mirhamzarahman)

> *"SignalPath Algorithm Studio demonstrates a simple idea: strong software engineering is not only about knowing algorithms, but also about recognizing where those algorithms naturally fit into useful systems."*
