# Voice and Tone

> Built from an interview, a voice study (reference: [Arpit Bhayani](https://arpitbhayani.me/blogs)) and Ganessh's writing style guide drawn from 43 posts, on 2026-07-26. The mechanics here follow that style guide.

## Voice in one line
Casual, curious and grounded. I explain hard systems from first principles, like a builder telling a peer what I just made and what I learned.

## Voice attributes
Five traits, each as a "this, not that":
- **Grounded, not hand-wavy.** Build from fundamentals with concrete numbers, real scenarios and working code. No vague claims.
- **Conversational, not stiff.** Write like I talk: contractions, direct address, short asides. Clean, never sloppy.
- **Curious and trade-off-aware, not dogmatic.** Lead with a "why", show both sides, and say when the opposite choice is right.
- **Playful, not goofy.** A light touch of wit and the occasional war story. Humor serves the point, never distracts.
- **Practical, not padded.** Real takeaways, respect the reader's time, cut the fluff.

This sits on the brand personality (calm and editorial, practical, curious, approachable): calm and uncluttered in structure, warm and casual in words.

## Point of view
- **"I" is dominant.** My own work, opinions and experience. "I was trying to...", "From my experience...", "I'd avoid this."
- **"You" is rising, especially in tutorials and how-tos.** Address the reader directly for steps and guidance. "You'll add a vector clock", "then verify it works."
- **"We" is rare.** Use it only for a genuinely shared frame, never as a softening device.
- Never impersonal or corporate. This is one builder talking to another.

## Formality and personality
- **Casual and conversational.** Contractions always (it's, you'll, here's). Plain words over jargon for its own sake.
- **Warm and authoritative, without arrogance.** Back every claim with a reason, a command or cited experience. Hedge uncertainty honestly ("I haven't tested X"). Avoid absolutes like "always", "never" and "the best". Skip self-deprecation like "I'm probably wrong, but".
- **Lightly playful.** Wit in titles and asides is welcome, in service of clarity.
- **No hype.** Confidence comes from clear reasoning, not superlatives or marketing-speak.

## How I explain (the signature move)
Explain from fundamentals. The default method:
1. **Hook with the real problem or trade-off.** "Strong consistency seems obvious, so why do most systems pick eventual?"
2. **Build from the ground up.** Define terms, then reason up to the hard part. Assume curiosity, not prior knowledge.
3. **Make it concrete.** Numbers, a real scenario and code the reader can run or read.
4. **Show the trade-offs honestly.** When it wins, and when the opposite is right.
5. **Land a grounded takeaway.** What to actually do, kept simple.

## Openings and closings
Always open with a hook and always close warm. Never start flat, never stop flat.

Openings (pick one):
- **Problem-narrative:** "I was trying to X. It broke with Y. Here's how I fixed it."
- **Anecdote:** "Discovering X changed how I work. Let me share what I learned."
- **Quote or insight:** a short observation, then personal experience, then what the piece will show.

Closings (pick one):
- **Warm sign-off:** recap in one line, then "Happy coding!", "Happy learning!" or "Have fun :)".
- **Summary and teaser:** "That's how I solved it. There's more on X, I'll cover it next time."
- **Open-ended hedge:** "I haven't figured out the edge case yet. Drop me a line, I'm keen to learn."

## Tone by context
Voice stays constant, tone flexes. (Tables are fine in an internal reference doc like this one. Avoid them in blog bodies.)

| Context | Tone |
|---|---|
| Long-form deep-dive | Curious, first-principles, patient. The full method above. |
| How-to / tutorial | Direct and stepwise. More "you", code-first, still grounded. |
| Newsletter / announcement | Warm and personal. Short, a little playful, one clear point. |
| Project / case study | Reflective and honest. What I built, what broke, what I learned. |
| UI microcopy and errors | Plain, calm, helpful. No jokes, no blame. See `../design-system/microcopy.md`. |
| Social posts | Punchy and curious. A hook and a link, never clickbait. |

## Vocabulary
- **Prefer:** plain verbs (use, build, cut, ship), concrete nouns and precise technical terms when they earn their place.
- **Avoid:** hype and filler. "leverage", "seamlessly", "revolutionary", "game-changer", "10x", "blazing-fast" and "simply/just" when it hides real difficulty.
- **Idioms that are ours:** "I was trying to...", "From my experience...", "And honestly, it changed how I work", "I'll explore it next time", "I haven't figured out X yet."
- **Names:** capitalize and spell brand and tech names correctly, and verify every command, path and filename. PostgreSQL, Next.js, Kafka, TypeScript, WhatsApp.

## Grammar and mechanics
These follow Ganessh's style guide.
- **Person and tense:** first person. Present tense for explanation, past tense for war stories. Imperative for steps ("Run X", "Check Y"), declarative for explanation ("The flag `-h` makes output human-readable").
- **Sentence length:** aim for 14–18 words in prose, 12–16 in steps, 20–30 in dense technical explanation. Drop in a fragment for punch.
- **Paragraphs:** 2–3 sentences to open, 3–5 in the body, 1–2 to close.
- **Em dash:** never. Use a colon, comma, period or parentheses instead.
- **En dash:** numeric ranges only (14–18, 2024–2025). Never in prose.
- **Oxford comma:** no by default ("Python, JavaScript and Go"). Use it only to remove ambiguity.
- **Semicolon:** rare. Prefer a period.
- **Colon:** frequent, to introduce lists and explanations.
- **Exclamation:** one to three per post, for warm sign-offs. Don't overdo it.
- **Ellipsis:** occasional, for a trailing thought.
- **Emoji:** zero Unicode emoji anywhere. The only exception is an ASCII `:)` or `:D` in a sign-off, and even then rarely.
- **Numbers:** numerals for measurements, counts, versions and ranges (5ms, 2/3, 14–18, 43 posts).
- **Headings (in posts):** `## Title Case` for sections, `###` for sub-topics, avoid H4 and deeper. No trailing punctuation.
- **Lists:** bullet-heavy, each bullet a complete thought introduced by a colon. Numbered lists only for sequential steps. Nest at most two levels.
- **Code:** fenced blocks with a language tag (`shell`, `js`, `python`, `yaml`, `powershell`) and comments on non-obvious lines. Inline `code` for commands, filenames, paths, variables and package names.
- **Tables and images:** avoid tables in a blog body. Keep zero to three purposeful images per post.
- **Links:** always inline `[text](url)`, never reference-style. Link sparingly.

## Do / don't
- Hype to grounded
  - Don't: "This revolutionary approach seamlessly 10x's your throughput."
  - Do: "This trades a little staleness for much lower latency. Writes drop from ~300ms to ~5ms."
- Vague to concrete
  - Don't: "It makes things faster."
  - Do: "It cuts the write path to one local replica. Sync happens in the background."
- Cold to warm-authoritative
  - Don't: "Obviously you should just use nginx. Anyone who picks Apache is wrong."
  - Do: "From my experience, nginx needed less config than Apache on my setup. Your mileage may vary. Give it a try."

## Reference (north star)
[Arpit Bhayani](https://arpitbhayani.me/blogs) is the deep-dive reference: first-principles explanations, "why/how/what" framing, concrete examples and code, honest trade-offs and a no-fluff close. What's ours: a builder's first-person voice, a lighter and more playful touch, warm sign-offs and the wider full-stack plus agentic range.

## Related
- The article-production parts of the source style guide (post types, frontmatter, output contract, article workflows) belong in [../content-and-information-architecture/editorial-style-guide.md](../content-and-information-architecture/editorial-style-guide.md) and [../content-and-information-architecture/content-model.md](../content-and-information-architecture/content-model.md).
- UI writing lives in [../design-system/microcopy.md](../design-system/microcopy.md).
