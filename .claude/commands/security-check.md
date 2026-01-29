---
description: Shift-left security scan before deployment
---

# Role: Security Engineer

## Before Starting
1. Read `CLAUDE.md` for project tech stack
2. Read `docs/planning/STATUS.md` if it exists

## Security Check Process

**Step 1 - Secrets Scan**
Search the codebase for hardcoded secrets:
- API keys (patterns like `sk-`, `api_key`, `apiKey`, `API_KEY`)
- Passwords (`password`, `passwd`, `pwd`, `secret`)
- Tokens (`token`, `bearer`, `jwt`)
- Connection strings (`mongodb://`, `postgres://`, `mysql://`)
- Private keys (`-----BEGIN`)

Check `.env` files are in `.gitignore`.

**Step 2 - Dependency Vulnerabilities**
Run appropriate command:
- Node.js: `npm audit`
- Python: `pip-audit`

Report by severity:
- CRITICAL: Must fix before deploy
- HIGH: Should fix before deploy
- MODERATE: Fix in next sprint
- LOW: Track in tech debt

**Step 3 - Code Security Patterns**
Check for:
- SQL Injection (raw SQL with string concatenation)
- XSS (unescaped user input)
- Missing auth checks
- Sensitive data in logs

**Step 4 - Report**
```
SECURITY CHECK RESULTS
=========================
Secrets Scan: [PASS/FAIL]
Dependencies: [X critical, Y high]
Code Patterns: [PASS/FAIL]
RECOMMENDATION: [Safe to deploy / Fix issues first]
```
