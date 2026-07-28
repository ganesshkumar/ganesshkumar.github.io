# Microcopy

> Built from an interview on 2026-07-26. This extends the voice in `../brand/voice-and-tone.md` to short UI text. Buttons and labels use Title Case, messages use sentence case.

## Principles
- **Plain and calm.** Say what happened and what to do next. No jargon, no drama.
- **No blame.** Never fault the user. Blame the situation or take it on the system.
- **Helpful first.** Every error or empty state offers a next step.
- **Lightly playful where it fits.** A small touch of warmth is welcome in 404 and empty states, never in an error that blocks work.
- **No Unicode emoji.** A rare ASCII `:)` is allowed only in friendly moments like a success or a 404. Never in an error.

## Casing and format
- **Buttons and labels:** Title Case. "Subscribe", "Read More", "Send Message", "Copy Link".
- **Messages, hints, empty states, descriptions:** sentence case, written as normal sentences.
- **Section titles in UI:** Title Case.
- Keep it short. One idea per line. Prefer a verb.

## Buttons and labels
- Verb-first and Title Case: "Subscribe", "Read More", "Send Message", "Copy Code".
- Say what happens: "Download PDF", not "Submit".
- Match the label to the outcome. A newsletter button says "Subscribe", not "Sign Up".
- Destructive actions name the thing: "Delete Draft", not "Delete".

## Form hints and validation
- Hints sit below the field, sentence case, plain: "We'll only email you new posts."
- Validation is specific and kind: "Enter a valid email address", not "Invalid input".
- Confirm success inline: "Saved", or "You're on the list."

## Error messages
Plain, no blame, always a next step.
- Structure: what happened, then what to do.
- Example: "That didn't send. Check your connection and try again."
- Example: "We couldn't load comments right now. Refresh to retry."
- Avoid: "Error 500", "Invalid request", "You entered something wrong."

## Empty states
A light, warm touch is welcome here.
- No results: "No matches for '{query}'. Try a broader term, or browse all articles."
- Nothing yet: "Nothing here yet. Your saved posts will show up here."
- Keep an action nearby: "Browse Articles".

## Success and confirmation
- Short and warm: "Subscribed. Check your inbox to confirm."
- A rare `:)` is fine: "Copied :)".
- Don't over-celebrate. One line is enough.

## Loading and progress
- Calm and brief: "Loading...", "Sending...", "Just a moment...".
- For longer waits, say why: "Fetching the latest posts...".

## 404 and 500 pages
A light, playful touch is welcome.
- 404 heading: "This Page Wandered Off".
- 404 body: "The link may be broken or the page moved. Let's get you back on track."
- 404 actions: "Go Home", "Browse Articles".
- A rare `:)` is fine here: "Well, this is awkward :)".
- 500 heading: "Something Broke on Our End".
- 500 body: "That's on us, not you. Try again in a moment."

## Newsletter CTA
Proposed wording (pick or tweak):
- Heading: "New Posts, Straight to Your Inbox".
- Sub: "Occasional deep-dives on full-stack, distributed systems and AI agents. No spam, unsubscribe anytime."
- Button: "Subscribe".
- Confirmation: "You're on the list. Check your inbox to confirm."

## Notifications and toasts
- One line, sentence case, plain: "Link copied.", "Draft saved.", "Comment posted."
- Errors in toasts still offer a next step: "Couldn't save. Try again."

## Do / don't
- Blame to neutral
  - Don't: "You entered an invalid email."
  - Do: "Enter a valid email address."
- Jargon to plain
  - Don't: "Request failed with status 500."
  - Do: "Something broke on our end. Try again in a moment."
- Vague button to specific
  - Don't: "Submit"
  - Do: "Send Message"

## Related
- Voice and tone: `../brand/voice-and-tone.md`.
- Tokens for states (focus, disabled, error color): `design-foundations.md`.
