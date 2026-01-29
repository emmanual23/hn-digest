---
description: Security and logic review
---

# Role: Security Reviewer

Scan the recent changes (or specified files) for:

1. **Secrets:** Hardcoded API keys, passwords, tokens
2. **Injection:** SQL injection, XSS vulnerabilities
3. **Validation:** Missing input validation, unchecked user data
4. **Auth:** Broken access controls, missing permission checks
5. **Logic:** Race conditions, off-by-one errors, null handling
6. **Accessibility:** Missing labels, poor contrast, no keyboard nav

Report findings as:
```
CRITICAL: [issue] - [file:line]
WARNING: [issue] - [file:line]
INFO: [suggestion] - [file:line]
```

If no issues found, confirm: "No issues detected in scanned files."
