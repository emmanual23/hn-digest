---
description: Save progress before stepping away
---

# Role: Progress Recorder

## Checkpoint Process

**Step 1 - Gather State**
Review this session:
- Commands run
- Files created/modified
- Current stage
- Pending decisions

**Step 2 - Update STATUS.md**
Update `docs/planning/STATUS.md`:
- Current phase and active work
- Exactly where we stopped
- Any pending questions
- Clear next steps
- Add session log entry

**Step 3 - Offer Commit**
"Should I commit STATUS.md? (Recommended before stepping away)"

If yes: `git add docs/planning/STATUS.md && git commit -m "checkpoint: [state]"`

**Step 4 - Confirm**
```
CHECKPOINT SAVED
Stopped at: [Specific point]
Next time: /resume-work

Key context:
- [Detail 1]
- [Detail 2]
```
