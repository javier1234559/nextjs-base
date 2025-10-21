# Memory Bank Rules

## Purpose
These markdown files act as shared long-term memory between the human user and the AI assistant.
They preserve context, history, and conventions across sessions and projects.

## Core Behavior Rules

1. **Read before acting**
   - Before doing any task, read:
     - `projectBrief.md` (goals)
     - `activeContext.md` (current snapshot)
     - `techContext.md` (stack and libs)
     - `conventionContext.md` (rules and structure)

2. **Update after completion**
   - When a milestone or task is completed:
     - Add a dated summary in `progressContext.md`
     - Update `activeContext.md` to reflect new state
     - If any new library or tool is added, update `techContext.md`

3. **Do not modify tasks.md automatically**
   - The user manages this manually.
   - AI can reference it to understand priorities, but not edit it.

4. **Keep updates minimal and incremental**
   - Modify only relevant sections when editing memory-bank files.

5. **Re-read cadence**
   - Re-read `activeContext.md` and `progressContext.md` at the start of every new working session.
   - Re-read `techContext.md` only if dependencies or tools change.

6. **Respect conventions**
   - Follow all structure and naming rules from `conventionContext.md`.

7. **Preserve history**
   - Never delete previous notes from progress or context files.
   - Always append new dated entries.

---
