# SaaS Core Telemetry & Security Specification [v7.6]

This document details the architectural layout, real-time ingestion parameters, and edge protection mechanisms locked at Git tag `[checkpoint-v7.6]`.

## 1. Network Topology & Edge Ingestion

All client traffic is routed via the `saas_edge_router` running **Nginx v4 PostCSS Engine Proxies**. The core gateway enforces explicit layer-7 throttling rules before traffic reaches the runtime execution loop.

### 1.1 Edge Rate Limiting Parameters
* **Memory Ingress Zone:** `api_limit_zone` (Allocated memory size: `10m`, capacity ~160k tracking states)
* **Velocity Ingress Threshold:** `5r/s` (5 requests per second per distinct binary client IP)
* **Burst Toleration Pool:** `burst=5 nodelay`
* **Exclusion Standard:** Rejections seamlessly yield an explicit HTTP status code `429 Too Many Requests`.

```nginx
# Operational Configuration Registry (infra/nginx/nginx.conf)
limit_req_zone $binary_remote_addr zone=api_limit_zone:10m rate=5r/s;

location /api/ {
    limit_req zone=api_limit_zone burst=5 nodelay;
    limit_req_status 429;
    proxy_pass http://saas_api_backend:5000/;
}
```

## 2. In-Memory Real-Time Metrics & Persistent Logging

The backend core architecture executes directly via compiled NodeNext ESM bundles (`node dist/index.js`), neutralizing startup resource overhead inside the AlmaLinux container loop.

### 2.1 JSON Telemetry Ingestion Schema
The endpoint `/api/telemetry/snapshot` delivers low-overhead JSON streams consumed dynamically by the Vite front-end:

| Property | Data Type | Description | Source Provider |
| :--- | :--- | :--- | :--- |
| `systemLoad` | `string` | Core host single load average percentage | `os.loadavg()` |
| `memoryUsage` | `string` | Total active system memory utilization | `os.freemem() / os.totalmem()` |
| `networkInterface` | `string` | Actively verified container network loop | `process.env.SERVER_IFACE` |
| `clientRouteIp` | `string` | Inbound real client network identifier | Nginx `X-Real-IP` header |

### 2.2 Asynchronous Persistent Logging Pipeline
* **Engine:** Structured JSON logging powered by **Pino Asynchronous Transports**.
* **Storage Path:** Mount-synchronized target directory mapped to `/app/infra/logs/api-backend.log`.
* **Rotation Policy:** Daily rotation via `pino-roll` with a strict `20MB` maximum size barrier per slice.

## 3. End-to-End Test Suite Assertion Matrix
Continuous integration and execution safety are maintained under headless **Playwright E2E** environments validating:
1. Header structure presence (`SaaS Core Telemetry Panel`).
2. HTML5 Canvas isolation and dynamic Neon Sparkline graph rendering (`#canvas-cpu-widget`).
3. Security boundary checks actively confirming `429` mitigations under synthetic heavy request loads.

