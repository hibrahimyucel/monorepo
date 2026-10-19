# Terminology Specification: AlmaLinux OS

::: info CONCEPT MATRICES
* **Domain:** Operating Systems / Infrastructure Virtualization Layer
* **Superordinate Concept:** GNU/Linux Distribution
* **Standard Reference:** RHEL (Red Hat Enterprise Linux) Downstream Binary-Compatible Stream
:::

## 1. Formal Definition
**AlmaLinux OS** is an open-source, community-governed, enterprise-grade Linux operating system designed to provide a highly stable, production-ready environment with 1:1 binary compatibility with Red Hat Enterprise Linux (RHEL).

## 2. Technical Characteristics & Attributes
* **Package Manager:** DNF (Dandified YUM) utilizing RPM structural binaries.
* **Kernel Stability:** Optimized for long-term support (LTS) lifecycle maintenance paradigms.
* **Container Interoperability:** Native systemd layers capable of running containerized execution meshes (Docker CE / Podman).

## 3. Operational Context in the Architecture
Within this SaaS monorepo architecture, AlmaLinux serves as the **bare-metal host or host virtual machine virtualization layer**. It enforces network packet security boundaries via `firewalld`, isolates container sub-nets, and serves as the baseline orchestrator running the Docker engine.

::: danger CRITICAL OPERATIONAL RESOLUTION
When managing Node.js streams under AlmaLinux, the system AppStream module profiles can cause version collision loops. Resolve this by resetting DNF module flags:
```bash
sudo dnf module reset nodejs -y
```
:::

## 4. Cross-References
* See also: [AlmaLinux Environment Ops](../environment)
* Related Systems: Docker Containers, Linux Host Network Routing
