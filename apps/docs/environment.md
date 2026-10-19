# AlmaLinux Environment Operations

A comprehensive structural log tracking system dependencies, package manager overrides, and recovery protocols.

## Resolving DNF Repository Conflicts

When installing NodeSource streams alongside default AlmaLinux AppStream presets, reset the active system package indices to bypass version locking errors:

```bash
# 1. Clear conflicting module states out of system memory
sudo dnf module reset nodejs -y
sudo dnf remove -y nodejs nodejs-npm nodejs-libs

# 2. Flush corrupt repository descriptors completely out of tracking folders
sudo rm -f /etc/yum.repos.d/*docker*.repo

# 3. Provision the baseline docker runtime engines safely using the shell bypass hook
curl -fsSL https://docker.com -o get-docker.sh && sudo sh get-docker.sh
```

## Production Docker Recovery

To guarantee microservices automatically restart if the AlmaLinux host kernel restarts, verify that the infrastructure files explicitly declare container policies:

```yaml
services:
  api-upstream:
    container_name: saas_api_backend
    restart: always # Enforces persistent recovery loops automatically
```
