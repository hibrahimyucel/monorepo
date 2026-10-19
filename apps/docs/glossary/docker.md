# Terminology Specification: Docker

::: info CONCEPT MATRICES
* **Domain:** Virtualization / Application Containment
* **Superordinate Concept:** OS-Level Virtualization Engine
* **Underlying Technologies:** Linux Namespaces, Control Groups (cgroups), OverlayFS
:::

## 1. Formal Definition
**Docker** is an open-source platform that automates the deployment of applications inside lightweight, portable, and isolated software sandboxes known as containers, sharing the host operating system's kernel.

## 2. Technical Characteristics & Attributes
* **Isolation Framework:** Utilizes `namespaces` to segment network/process spaces and `cgroups` to ration hardware resources.
* **Storage Optimization:** Implements layer-based storage systems (e.g., OverlayFS) to maximize disk cache reuse.
* **Orchestration Unit:** Driven by declarative blueprints via `Dockerfile` and multi-container orchestration manifests (`docker-compose.yml`).

## 3. Operational Context in the Architecture
In this workspace, Docker isolates our **Express backend server application** (`saas_api_backend`) from our **Nginx gateway router** (`saas_edge_router`). It ensures their runtimes spin up uniformly on AlmaLinux without library conflicts.

## 4. Cross-References
* See also: [AlmaLinux Operating System](./almalinux), [Nginx Reverse Proxy](./nginx)
