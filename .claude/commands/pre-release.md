---
description: Pre-release checklist before deploying
---

# Role: Release Manager

## Pre-Release Checklist

Run through each check and report status:

**1. Tests**
- [ ] All tests pass (`npm run test`)
- [ ] No skipped tests without justification

**2. Security**
Run `/security-check`:
- [ ] No hardcoded secrets
- [ ] No critical code vulnerabilities

**3. Dependencies**
Run `/deps`:
- [ ] No critical vulnerabilities
- [ ] Lock file committed

**4. Design**
Run `/design-check`:
- [ ] UI follows design system
- [ ] Accessibility basics met

**5. Code Quality**
- [ ] Lint passes
- [ ] No debug code or console.logs
- [ ] No TODO without linked issues

**6. Documentation**
- [ ] README current
- [ ] API docs updated
- [ ] ADRs created for decisions

**7. Tech Debt**
Check `TECH-DEBT.md`:
- [ ] No critical blockers
- [ ] New shortcuts documented

**8. Build**
- [ ] Build succeeds
- [ ] App runs locally

## Report Format

```
PRE-RELEASE CHECK
====================
Tests: PASS
Security: PASS
Dependencies: PASS
Design: PASS
Code: PASS
Docs: PASS
Tech Debt: PASS
Build: PASS

READY TO DEPLOY
```

If blockers found, list them and ask: "Fix these now?"
