# Terminology Specification: Git

::: info CONCEPT MATRICES
* **Domain:** Software Configuration Management / Version Control
* **Superordinate Concept:** Distributed Version Control System (DVCS)
* **Storage Model:** Directed Acyclic Graph (DAG) using SHA Cryptographic Hashes
:::

## 1. Formal Definition
**Git** is a distributed version control system designed to track changes in source code repositories over time, allowing multiple developers to collaborate non-linearly using local state tracking graphs.

## 2. Technical Characteristics & Attributes
* **Cryptographic Integrity:** Tracks repository states by computing snapshots mapped through SHA hashes.
* **Branch Mechanics:** Implements lightweight pointers pointing directly to targeted nodes inside the commit DAG.
* **State Staging:** Utilizes a three-tier lifecycle area layout: the Working Directory, the Staging Index, and the Repository Store.

## 3. Operational Context in the Architecture
Git initializes our monorepo tracking state (`git init`) from the AlmaLinux shell. It isolates file updates, processes exclusion patterns via `.gitignore`, and bridges our local code commits onto GitHub remote servers.

## 4. Cross-References
* See also: [GitHub Platform](./github), [AlmaLinux Host](./almalinux)
