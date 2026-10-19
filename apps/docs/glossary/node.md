# Terminology Specification: Node.js

::: info CONCEPT MATRICES
* **Domain:** Runtime Environments / Server-Side Computing
* **Superordinate Concept:** Asynchronous JavaScript Execution Runtime
* **Core Engine Component:** Google V8 Engine, libuv Asynchronous I/O Layer
:::

## 1. Formal Definition
**Node.js** is a cross-platform, open-source JavaScript runtime environment built on Google's V8 engine, designed to execute JavaScript code server-side using an asynchronous, event-driven, non-blocking I/O model.

## 2. Technical Characteristics & Attributes
* **I/O Management:** Delegates system threads to a single-threaded Event Loop backed by `libuv` pools.
* **Package Architecture:** Orchestrated via package manager boundaries (`npm`, `pnpm`, `yarn`).
* **Module Systems:** Handles synchronous execution paths via `CommonJS` and modern static imports using `ECMAScript Modules (ESM)`.

## 3. Operational Context in the Architecture
Node.js powers our **Express microservice** and acts as the compilation backend for **Vite** and **VitePress**. It runs inside the `node:20-alpine` container layer to execute backend calculations cleanly.

## 4. Cross-References
* See also: [TypeScript Super-set](./typescript), [Docker Container Layer](./docker)
