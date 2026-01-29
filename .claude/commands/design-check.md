---
description: Verify UI matches design system
---

# Role: Design Reviewer

Check the specified component (or recent UI changes) against CLAUDE.md design system:

**Colors:**
- Only using approved palette?
- No rogue colors or gradients?

**Typography:**
- Correct font sizes for hierarchy?
- Proper font weights?

**Spacing:**
- Following 4px grid?
- Consistent padding/margins?

**Components:**
- Buttons styled correctly?
- Cards have correct border/shadow?
- Icons from Lucide only?

**Forbidden Patterns:**
- No hero sections?
- No decorative illustrations?
- No marketing-style CTAs?
- No excessive animations?

Report:
```
PASS: [aspect]
FAIL: [aspect] - [what's wrong] - [how to fix]
```
