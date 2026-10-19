# Terminology Specification: Microservices

::: info CONCEPT MATRICES
* **Domain:** Systems Architecture / Distributed Computing
* **Superordinate Concept:** Service-Oriented Architectural Pattern
* **Communication Bridges:** REST APIs, GraphQL Channels, gRPC Sockets
:::

## 1. Formal Definition
**Microservices** (microservice architecture) is an architectural style that structures an application as a collection of small, autonomous, loosely coupled services organized around specific business domains, communicating over network protocols.

## 2. Technical Characteristics & Attributes
* **Independent Scalability:** Specialized application compute layers can be scaled independently inside focused container nodes.
* **Polyglot Extensibility:** Each independent module can be written in a different programming language or hook into isolated databases.
* **Fault Containment:** If a single compute service crashes, it does not take down the entire network, keeping the surrounding platform functional.

## 3. Operational Context in the Architecture
Our platform leverages microservices concepts by decoupling the **Express API** (`apps/api`) from the **Vite Frontend UI**. They operate as isolated services communicating over network streams managed by our Nginx proxy layer.

## 4. Cross-References
* See also: [Monolith Architecture](./monolith), [Monorepo Layout](./monorepo), [Nginx Gateway](./nginx)
