---
name: anti-slop-web
description: Rules for website copy and prose that doesn't read as AI-written, plus the design defaults to avoid. Use before writing or editing page copy, blog posts, emails, READMEs, PR descriptions or UI text, and to audit existing text.
---

# Anti-slop writing and web design

AI slop comes from filling gaps with averages. Close the gaps with real material, then ban the defaults. The prose rules merge our anti-slop checklist with the `unslop` skill from Lauren Tan's pstack (github.com/cursor/plugins, `pstack/skills/unslop`).

## Step 1: Gather raw material before writing

Ask for it, or pull it from the files and connectors you have:

- Real proof. Case results or patient outcomes, years in practice, cities and neighborhoods served, awards you can verify.
- Real reviews, quoted word for word.
- The owner's voice. A call transcript, an email, a video or a Loom.
- Real photos of the people, office and location. No stock photos and no AI-generated faces.
- Two or three sites the client likes, and what exactly they like about each.
- The visitor's moment, in detail. "Rear-ended on I-95 yesterday, neck hurts, the adjuster already called," not "accident victims."

Never invent stats, testimonials, logos, awards or client names. Write `[PLACEHOLDER: what's needed]` instead.

## Step 2: Propose directions, then commit (new sites and redesigns)

Give three concepts that really differ, for example editorial, industrial and quiet luxury. For each one, give:

- A one-line concept, such as "a law firm that feels like a private bank."
- A display font and a body font.
- A palette in hex, with one dominant color and one sharp accent.
- A layout idea.
- One signature element a visitor would remember.

Wait for the user to pick. If nobody is there to ask, pick the boldest direction that still fits the brand and say which one you picked. Don't reuse fonts or palettes from other clients.

## Step 3: Write the copy first

### Substance

- Open with the reader's situation, not the firm's history.
- Specific beats impressive. Use real numbers, places, timeframes and names.
- Say what it does, not how it feels. Name the mechanism or the number.
- Cut any sentence a competitor could paste onto their own site unchanged.
- Name the source of a claim. Delete "experts believe" and "studies show" if you can't name one.
- End a section on a specific fact or next step. Delete the summary sentence and the generic conclusion.

### Sentences

- One idea per sentence. Split any sentence the reader has to read twice.
- One idea per section.
- Active voice. Name who does the thing, unless that's unknown or doesn't matter.
- Vary sentence length. Use contractions.
- Read-aloud test: would the owner say this sentence on a phone call?
- Write whole sentences with their articles and verbs. Spell out arrows and abbreviations.
- Use one name for each thing and repeat it. Don't rotate synonyms.
- Use one hedge at most, and make it "may."
- Cut adverbs. Give the number or use a stronger verb.
- Use the literal phrase. No metaphors, aphorisms, personified code or figurative verbs where a plain phrase works.

### Banned words

Use the plain word instead.

- Marketing filler: elevate, unlock, seamless, empower, cutting-edge, tailored, navigate, journey, game-changer, robust, holistic, leverage, utilize, vibrant, showcase.
- AI vocabulary: delve, additionally, crucial, enhance, foster, landscape, pivotal, testament, underscore.
- Abstract metaphor nouns: substrate, wedge, vector, nexus, primitive, harness, surface, scaffolding, paradigm, ratchet, north star, flywheel.
- Inflated verbs: "serves as," "stands as," "boasts," "features." Write "is" or "has."
- Phrases: "in today's fast-paced world," "look no further," "we pride ourselves," "it is important to note that." Write "to," not "in order to."
- Chatbot lines: "I hope this helps," "Let me know if," "Great question," and any opener that praises or agrees before answering.

### Banned structures

- "It's not X, it's Y" and "not just X, but Y." State the point.
- Ideas forced into groups of three.
- Dashes of any kind. No em dashes, no en dashes, no hyphens used as dashes, and no parentheses standing in for them. Use a period or a comma.
- A colon used mid-sentence as a connector. A colon goes before a list or an example. Don't give every section a "Headline: Subhead" title.
- Trailing "-ing" phrases that add no fact, such as "highlighting its value" or "ensuring a smooth process."
- "From X to Y" unless X and Y sit on a real scale.
- Rhetorical questions as openers.
- Claims with no number behind them.

### Formatting

- Sentence case for headings.
- Straight quotes.
- Bold only what the reader must not miss. Don't bold every proper noun or acronym. A bold label followed by a colon that restates its own line is banned. A bold lead-in that ends in a period and adds new detail is fine.
- No decorative emoji.
- CTAs say what happens next ("Talk to an attorney in 10 minutes"), never "Get Started" or "Learn More."

## Step 4: Build the design

- Type. Choose a distinctive display face for the concept. Never use Inter, Roboto, Open Sans, Poppins, Montserrat, Arial or system-ui as the display font. Body text may use them.
- Color. Commit to the palette. No purple-to-blue gradients, gradient text, glassmorphism or glowing blobs.
- Layout. Break the "centered hero, three icon cards, testimonial carousel, CTA" template. Use asymmetry, editorial grids, oversized type and full-bleed real photos.
- Icons. No emoji, and few icons. Numbers and photos do more work.
- Signature element. Exactly one per site, such as a custom illustration, a texture, a data element or unusual navigation.
- Motion. One well-built page-load or scroll moment, not hover effects on everything.

## Step 5: Audit before delivering

Run these searches on the changed files, then fix each hit or justify it:

```bash
grep -nE '—|–| - ' <files>
grep -niwE 'elevate|unlock|seamless|empower|cutting-edge|tailored|navigate|journey|game-changer|robust|holistic|leverage|utilize|vibrant|showcase|delve|additionally|crucial|enhance|foster|landscape|pivotal|testament|underscore|substrate|nexus|paradigm|flywheel|scaffolding' <files>
grep -niE "serves as|stands as|boasts|not just|in order to|it's not .*, it's|look no further|pride ourselves|fast-paced" <files>
```

Then check by reading:

- [ ] Could a competitor paste the hero headline onto their own site unchanged? Rewrite it.
- [ ] Is any stat, testimonial, logo or award invented? Remove it or make it a placeholder.
- [ ] Does any group of three exist only for rhythm?
- [ ] Does any section end on a summary or a generic conclusion?
- [ ] Did the design drift back to defaults, away from the Step 2 concept?
- [ ] Is there one thing a visitor would remember tomorrow?
- [ ] Does every CTA say what happens next?

## Legal and medical sites

- Attorney sites. Testimonials, past results and "expert" or "specialist" claims fall under Bar advertising rules. Flag them for compliance review, and run the `fl-bar-ad-audit` skill if it's available.
- Medical sites. Don't guarantee outcomes. Patient stories need written consent and must follow HIPAA.
