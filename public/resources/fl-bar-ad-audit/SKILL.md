---
name: fl-bar-ad-audit
description: Audit a law firm website, landing page, social profile, or print/direct-mail/ad piece for compliance with Florida Bar lawyer advertising rules (Subchapter 4-7) and produce a findings report with fixes.
---

# Florida Bar Advertising Compliance Audit

Audits lawyer marketing against Rules Regulating The Florida Bar, Subchapter 4-7 (Rules 4-7.11 through 4-7.23). Output: a prioritized findings report with exact location, offending text, rule cite, and a compliant rewrite.

**Not legal advice.** The responsible Florida Bar member signs off. Frame findings as "risk / likely noncompliant" — never "approved." Never write "Florida Bar approved" anywhere (that itself violates 4-7.13(b)(10)).

---

## Step 0 — Freshness check (every run)

Rules and fees change. Before auditing, fetch and skim these two official pages for revision dates or changes vs. this skill:
- https://www.floridabar.org/ethics/etad/checklist-websites-sm-video-sharing/
- https://www.floridabar.org/ethics/etad/advertising-filing-requirements/

Baseline this skill was built on (verified Oct 2026): checklists revised Aug 21, 2023 (website page updated Jul 2026); filing fee **$250 timely / $750 late**; online filing via MyFloridaBar portal since Jul 2026. Last 4-7 rule amendments: 4-7.19/4-7.20 (eff. Jul 14, 2025 — fee adjustment authority, legal-aid exemption); 4-7.15 comment (Oct 2024); 4-7.12/.13/.14/.18/.22 (Aug 21, 2023 — "clear and conspicuous" standard). If anything newer appears, note it at the top of the report and apply it.

## Step 1 — Classify the piece (determines filing duty)

| Medium | File with Bar? | Notes |
|---|---|---|
| Firm's own website, pop-ups on it | **No** (4-7.20(g)) | Must still meet ALL substantive rules 4-7.12–4-7.17, 4-7.21 |
| Firm's own organic social pages / video channels | No | Same substantive rules |
| Sponsored / boosted / promoted posts | **Yes** | |
| Print, billboard, TV, radio, banner/display, PPC ads | **Yes**, 20+ days before first use | Unless content is ONLY 4-7.16 "safe harbor/tombstone" info |
| Direct mail / direct email (unsolicited) | **Always yes**, 20+ days before use | Plus 4-7.18(b) requirements — no tombstone exemption |
| Letterhead, business cards | No | Unless used in direct mail or reproduced in an ad |
| Newsletters | First issue yes | Later issues only if promo content changes |
| Bar Journal/News ads, legal listings, mail to existing/former clients or lawyers, requested info | No | Substantive rules still apply (except where noted) |

A whole website can't be filed; a specific page/statement can be filed voluntarily (4-7.19(d)).

**Tombstone test (4-7.16)** — exempt from filing only if the ad contains nothing beyond: names, office locations, parking, accessibility, phone/web/email, hours, "attorney"/"law firm"; bar admission dates & bar positions; former legal positions with dates; years practicing; # of lawyers; other licenses/degrees with dates; military service; languages; practice areas (incl. official certification logos); prepaid plan participation; credit cards; consultation fee/fee schedule (with cost disclosure); salutary phrases ("proudly serving your community"); plain scales of justice, gavel, Lady Justice, Statue of Liberty, flags, eagle, plain law books, courthouse, columns, diplomas; lawyer photo on plain solid background or plain books. Anything else (slogans, testimonials, results, lifestyle imagery) → must be filed.

## Step 2 — Gather everything that counts as "the ad"

**Websites** — crawl (WebFetch / Firecrawl / Chrome) and inspect:
- Home, About/Why Us, every attorney bio, every practice-area page, Results/Verdicts, Testimonials/Reviews widgets, FAQ, Contact, Locations pages, footer, header, sticky bars, pop-ups/exit intents, chat widgets
- A sample of blog posts (CTAs and author boxes especially)
- **Non-visible content**: `<title>`, meta descriptions, OG tags, image alt text, schema/JSON-LD (`aggregateRating`, `award`, `knowsAbout`), hidden/display:none text, keyword-stuffed areas. Hidden text visible only to search engines is almost always deceptive (4-7.13(a)(3); Bar SEO/meta-tag opinion).
- Spanish/other-language pages — required disclosures must appear in that language (4-7.12(c))
- Google Business Profile / Avvo / social bios if in scope
- Mobile render — disclosures must still be clear and conspicuous

**Print / PPC / social ads** — read the image/PDF; capture every word, image, and voiceover script.

## Step 3 — Audit checklist (rule by rule)

Severity: 🔴 Violation (fix before publishing/keep live) · 🟠 High risk / needs proof · 🟡 Best practice / verify.

### A. Required content — 4-7.12
- 🔴 Name of at least one lawyer or the firm responsible (a(1))
- 🔴 City, town, or county of at least one **bona fide office** (a(2)). Virtual/"satellite" offices with no lawyer presence don't count. Location pages for cities with no office must not imply an office there.
- 🔴 If cases will be **referred out**, say so (b)
- 🔴 All required info in **every language** used (c)
- 🔴 Required info/disclaimers must be **clear and conspicuous**: a reasonable person would notice, read/hear, and understand it — not buried in tiny footer text, low contrast, or behind a click (d)

### B. Deceptive / inherently misleading — 4-7.13
- 🔴 Factually/legally inaccurate material statements (a)(1)
- 🔴 Material omissions — e.g., "50+ years of experience" that is combined firm experience or includes non-lawyer time (a)(2)
- 🔴 Implying nonexistent facts — offices in states where not licensed; "founding member" when newly admitted (a)(3)
- 🔴 **Guarantees/predictions** (b)(1). Flag: "we'll get you," "we will win," "get the compensation you deserve," "maximum compensation," "we win," "I can save your home." Fix with aspirational/process words: *strive, pursue, seek, dedicated, goal, may, could, designed to*.
- 🔴/🟠 **Past results** (b)(2) — must be objectively verifiable, not atypical, and not omit material facts (default judgment, uncontested, policy limits, gross vs. net, far short of damages). Needs client informed consent (4-1.6) even if public record. Flag "millions recovered," "$X recovered for clients" totals, "record verdict," "successful," "won" without definition.
- 🔴 **Unverifiable comparisons/characterizations** (b)(3): "best," "top," "#1," "leading," "premier," "elite," "second to none," "most experienced," "finest," "Florida's top injury lawyers." OK if true & verifiable: "largest PI-only firm in [city]." Personal traits OK: aggressive, honest, compassionate, creative.
- 🔴 Practice areas the firm doesn't actually practice or intend to (b)(4) — common with templated practice-area pages
- 🔴 Actors/models/stock people who appear to be firm lawyers/staff without clear disclaimer (b)(5) — check team photos, stock "attorney" images, AI-generated people
- 🔴 Dramatizations not obviously dramatizations → need disclaimer (b)(6)
- 🔴 Actor portraying a profession (doctor, etc.) → disclaimer (b)(7)
- 🔴 Implying unethical/illegal tactics (b)(8) — e.g., pit bull imagery, "1-800-PITBULL" (Fla. Bar v. Pape), "pit bull," "shark," "we fight dirty," "bully the insurance company"
- 🔴 **Testimonials/reviews** (b)(9) — each must be: actual experience of the person; on matters a client can judge (courtesy, responsiveness, communication — not legal skill/results quality); representative of typical client experience; not written/drafted by the lawyer; nothing of value given for it; AND carry a clear and conspicuous disclaimer that **prospective clients may not obtain the same or similar results**. Applies to embedded Google review widgets and video testimonials.
- 🔴 Any claim/implication of Florida Bar approval of the ad or lawyer (b)(10). "Licensed in Florida" and Bar board certification are fine.
- 🔴 Judicial/executive/legislative title **before** a name — "Judge Smith (Ret.)," "Former Senator Doe," "Retired Judge Smith" (b)(11). OK: "Jane Doe, retired circuit judge"; "John Smith, former state representative."
- 🔴 Implied affiliation with a lawyer/firm not actually affiliated (b)(12) — departed attorneys still listed; competitor names in copy/keywords. **PPC conquesting:** an ad triggered by another lawyer/firm's name must show the advertising firm's name as the first text (plus the responsible lawyer's name first if the firm uses a trade name).

### C. Potentially misleading — 4-7.14 (curable with clarifying info, 4-7.14(b))
- 🟠 Statements with multiple reasonable readings, one misleading (a)(1); literally true but misleading (a)(2)
- 🟠 **Awards/ratings/memberships** (a)(3): only bona fide orgs with objective, uniformly applied criteria and a reasonable cross-section of members. Must use the actual award name and year (year can be omitted only if awarded in the current year/current rating). Example OK: "Named a 2025 Florida Super Lawyer by Super Lawyers Magazine." Flag pay-to-play badges and vague "award-winning."
- 🔴 **Board certified/certified** (a)(4): only an individual lawyer, only in their actual area, with area + certifying org named ("Board Certified in Civil Trial Law by The Florida Bar"). A **firm can never be "certified."** Can't say "certified in personal injury" if certified in Civil Trial. Verify in Bar member directory.
- 🟠 **"Specialist/expert/specializes/expertise"** (a)(5–6): lawyer must be certified or objectively verify via education/training/experience/substantial involvement. Firm claims need ≥1 qualifying lawyer AND, unless all qualify, a clear and conspicuous disclaimer adjacent to the claim, same-or-larger text: "Not all lawyers in the firm specialize in [area]." Safe alternatives: "focuses on," "concentrates in," "limits practice to" (if true).
- 🔴 **Fees** (a)(7): any fee info — including **"No Fee Unless We Win"/"No Recovery, No Fee"** — must disclose cost responsibility. Compliant: "No Fee if No Recovery, but Client is Responsible for Costs" — or, only if true, "No Fees or Costs if No Recovery." "Free consultation" alone is fine. Advertised specific fees must be honored 90 days (1 year for annual directories).

### D. Unduly manipulative — 4-7.15
- 🔴 Emotional-appeal images/video/sound over rational evaluation (a) — graphic injuries, crying child taken from mother, adjuster pressuring victim to sign. Informational imagery is fine (crash car, crutches, x-ray, construction site).
- 🔴 Judge/police officer (or actor portraying one) endorsing or as spokesperson (b)
- 🔴 Celebrity voice/image (c) — except a local announcer who doesn't endorse, or a compliant testimonial from a celebrity who is an actual client
- 🔴 **Economic incentives** to hire or review ads (d) — gift cards, giveaways, "$100 for your review," contest entries. Discounted fees and free legal info are OK.

### E. Payment & referrals — 4-7.17, 4-7.22
- 🔴 Ad paid by a lawyer outside the firm or by a nonlawyer (e.g., a chiropractor or medical provider co-funding PI ads)
- 🟠 Lead-gen/matching/"tips or leads" providers and directories must meet 4-7.22 qualifying-provider rules; flag pay-per-lead arrangements for lawyer review

### F. Direct contact & direct mail/email — 4-7.18
- 🔴 No in-person, phone, or real-time video solicitation for pecuniary gain without prior family/professional relationship (applies to agents, intake staff, "runners")
- 🔴 PI/wrongful death/accident/disaster mail: **not until 30+ days after** the incident
- 🔴 "**Advertisement**" on each enclosure and envelope face (self-mailer: address panel + inside + each enclosure), larger and contrasting text; email **subject line must begin with "Advertisement"**, attachments marked too
- 🔴 Statement of lawyer/firm background, training, and specific experience in the relevant area
- 🔴 Enclosed contract: "SAMPLE" in red, one size larger than largest type, top of every page; "DO NOT SIGN" on client signature line
- 🔴 Must not resemble pleadings/legal documents
- 🔴 Disclose if another lawyer will handle or case will be referred
- 🔴 Disclose how the lawyer got the info (specific enough to gauge extent of knowledge)
- 🔴 Envelope/outside must not reveal the recipient's legal problem
- 🔴 Not to people known to be represented, who've opted out, or whose state impairs judgment; not to injunction respondents not yet served
- Must be filed with the Bar 20+ days before use

### G. Firm names — 4-7.21
- 🔴 Trade/fictitious name must appear on all advertising, letterhead, cards, signage, pleadings
- 🟠 Name must not be misleading (implying government affiliation, partners who don't exist, departed lawyers, size)

### H. Other website-specific checks
- 🔴 AI chatbots/intake bots must not present as a human lawyer; disclose that the user is interacting with AI, avoid giving legal advice or guaranteeing outcomes, and protect confidentiality (Ethics Op. 24-1)
- 🟠 Responses to online reviews must not reveal client confidential info (Ethics Ops. 20-1, 21-1)
- 🟠 Location/"near me" pages for cities without a bona fide office — don't imply an office there
- 🟠 Departed attorneys removed everywhere (bios, schema, author boxes, Google profiles)
- 🟡 Out-of-state lawyers on the site: make clear who is and isn't Florida-licensed (4-7.11 scope; 4-5.5)

## Step 4 — Report format

Deliver as a document (or the user's requested format). Structure:

1. **Header**: Firm, URL/piece, date audited, pages/assets reviewed, rule-currency note from Step 0.
2. **Verdict summary**: counts by severity + top 3 fixes. One line on filing status ("Website: exempt from filing, substantive rules apply" / "This print ad must be filed ≥20 days before first use; $250 fee").
3. **Findings table**:

| # | Severity | Location (URL + section / page of print piece) | Exact text / element | Rule | Why it's a problem | Compliant fix |
|---|---|---|---|---|---|---|

Quote the offending text exactly. Give a drop-in rewrite, not just "remove."

4. **Proof needed from firm** — claims that may be OK if documented (results, awards, "largest," specialization, years of experience, client consent for results).
5. **Global fixes** — sitewide footer disclaimers, testimonial disclaimer component, fee/cost line, schema cleanup.
6. **Sign-off line** for the responsible Florida Bar member.

## Rewrite library (quick swaps)

| Instead of | Use |
|---|---|
| "We'll get you the compensation you deserve" | "We'll pursue the full compensation the law allows." |
| "Florida's best / top / #1 injury lawyers" | "Personal injury lawyers serving [County] since [year]." / verifiable fact |
| "No fee unless we win" | "No Fee if No Recovery, but Client is Responsible for Costs" (or "No Fees or Costs if No Recovery" only if true) |
| "Expert car accident attorneys" (firm) | "Our practice focuses on car accident cases." — or keep claim + "Not all lawyers in the firm specialize in car accident cases." |
| "Board certified personal injury lawyer" | "[Name], Board Certified in Civil Trial Law by The Florida Bar" |
| "Award-winning" | "[Name] — [Award], [Org], [Year]" |
| "Millions recovered" | Specific verifiable result with context + client consent, or remove |
| "Judge Smith (Ret.)" | "Mary Smith, retired circuit judge" |
| "Aggressive pit bull lawyers" | "Aggressive, prepared trial lawyers" |
| Testimonial with no disclaimer | Add adjacent: "Prospective clients may not obtain the same or similar results." |
| "We win" | "Our goal is the best possible result in your case." |
| "Proudly serving Tampa" (no Tampa office) | "Office in [City]; we represent clients throughout [region]." |

## Step 5 — Verify before delivering
- Every finding cites a rule subdivision and quotes the real text found
- Board certifications checked against the Florida Bar member directory
- Spanish/other-language versions checked for disclosure parity
- Hidden/meta/schema content checked, not just visible copy
- Report states it is a compliance review, not legal advice or Bar approval

## Sources
- Website/social checklist: https://www.floridabar.org/ethics/etad/checklist-websites-sm-video-sharing/
- Print/TV/radio/sponsored checklist: https://www.floridabar.org/ethics/etad/quick-reference-checklist-print-internet-sponsored-social-media-not-targeted-tv-radio-ads/
- Filing requirements & exemptions: https://www.floridabar.org/ethics/etad/advertising-filing-requirements/
- Handbook, opinions, sample ads: https://www.floridabar.org/ethics/etad/
- Bar ethics/advertising hotline: 850-561-5780 / 800-235-8619
