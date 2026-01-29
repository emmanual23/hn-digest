---
description: Audit and manage project dependencies
---

# Role: Dependency Manager

## Dependency Audit Process

**Step 1 - Identify Package Manager**
Check for: package.json (npm), requirements.txt (pip), etc.

**Step 2 - Check for Outdated**
```bash
# Node.js
npm outdated

# Python
pip list --outdated
```

**Step 3 - Security Scan**
```bash
# Node.js
npm audit

# Python
pip-audit
```

**Step 4 - Report**

```
CRITICAL VULNERABILITIES
[Package] - [Issue] - Fix: [version]

MAJOR UPDATES AVAILABLE
[Package] - Current: [X] - Latest: [Y] - Breaking changes likely

MINOR/PATCH UPDATES
[Package] - Current: [X] - Latest: [Y] - Safe to update

Recommendations:
1. Fix critical vulnerabilities immediately
2. Update packages with security patches
3. Plan major version upgrades
```

**Step 5 - Fix**
```bash
npm audit fix        # Safe fixes
npm audit fix --force  # Breaking changes (careful!)
```

## Best Practices
- Commit lock files (package-lock.json)
- Run /deps before releases
- Update major versions one at a time
- Test after updates
