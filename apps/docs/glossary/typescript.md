# Terminology Specification: TypeScript

::: info CONCEPT MATRICES
* **Domain:** Programming Languages / Static Type Verification
* **Superordinate Concept:** Syntactic Typed JavaScript Super-set
* **Compilation Process:** Transpilation (Source-to-Source Compilation via `tsc`)
:::

## 1. Formal Definition
**TypeScript** is a strongly-typed, open-source programming language developed by Microsoft that acts as a strict syntactical super-set of JavaScript, adding optional static type checking to the language.

## 2. Technical Characteristics & Attributes
* **Static Verification:** Evaluates structural constraints at compile time before erasing type definitions during transpilation.
* **Configurable Strictness:** Driven by declarative rulesets mapped inside workspace `tsconfig.json` files.
* **Compilation Output:** Outputs pure ECMAScript code alongside explicit `.d.ts` declaration graph files.

## 3. Operational Context in the Architecture
TypeScript guarantees end-to-end type safety in our monorepo. Shared configurations (`packages/config`) enforce standard compiler rules across our UI layer, Vite frontend, and Express api space.

## 4. Cross-References
* See also: [Node.js Runtime](./node), [Monorepo Workspace](./monorepo)
