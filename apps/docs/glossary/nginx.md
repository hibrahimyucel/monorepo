# Terminology Specification: Nginx

::: info CONCEPT MATRICES
* **Domain:** Computer Networking / Hypermedia Delivery
* **Superordinate Concept:** Reverse Proxy Server / Load Balancer
* **Architecture Model:** Asynchronous Event-Driven EventLoop
:::

## 1. Formal Definition
**Nginx** is a high-performance web server, reverse proxy, and load balancer engineered to process thousands of concurrent connections efficiently via an asynchronous, event-driven internal lifecycle loop.

## 2. Technical Characteristics & Attributes
* **Routing Strategy:** Operates as a reverse proxy gateway by intercepting external network ports and mapping routes upstream.
* **MIME Verification:** Enforces content stream security by verifying binary file encodings via standard `mime.types`.
* **SPA Optimization:** Implements `try_files` query fallbacks to seamlessly delegate nested Client-Side Routing paths onto single entry files.

## 3. Operational Context in the Architecture
Nginx sits as our **edge router** (`infra/nginx/nginx.conf`). It listens on port 80, acts as a static delivery engine for Vite (`/`) and VitePress (`/docs/`), and proxies API payloads directly onto the Express runtime cluster.

## 4. Cross-References
* See also: [Docker Containers](./docker), [VitePress Engine](./vitepress)
