# Set up the GHL follow-up workflow for AI Website Audit leads

You are setting up one workflow in GoHighLevel (GHL) for Marketing Bull. Work in the
**Marketing Bull sub-account** (location ID `TpaL2rALzbFCdbM1sxmH`). Build it, test it,
and publish it only after the test in step 6 passes. Stop and ask the owner (Alex)
whenever these instructions say so, or whenever something in GHL doesn't match what is
described here.

## 1. What already happens (don't rebuild any of this)

When someone runs the free audit at https://www.getmarketingbull.com/ai-website-audit
and unlocks the fix prompt with their name and email, the website:

- creates the contact in GHL, or updates it if the email already exists, and adds the
  tags **`mb-site-lead`** and **`ai-website-audit`**
- shows the visitor the fix prompt on the page. **The site does not email the prompt,**
  so this workflow must not promise it or try to resend it.
- emails a new-lead notification to hello@getmarketingbull.com through Resend

The contact arrives with:

| Field | Value |
| --- | --- |
| First / last name, email | As typed |
| Company name | Firm or practice name (optional, may be blank) |
| Website | The URL they audited |
| Source | `Marketing Bull Site` |
| Custom field `n3Ur3Tm4gLb7BfhPFJt5` (lead source) | `ai-website-audit` |
| Custom field `ssDT5kiOUvt30YA6vX15` (message) | See below |
| Custom field `nOLB2wsnl4T71In4ybss` (website) | The audited URL |
| Custom field `PqYofPTdo3wZf6li9v9I` (SMS consent) | Always `no` |

The message custom field looks like this:

```
Industry: Law firm

AI Website Audit of https://example-firm.com/: 41/100 (D), built with Lovable.
Issues: 1 critical, 3 high, 4 medium, 2 low.
- [critical] Search engines and AI assistants see a blank page
- [high] The page title is the builder's placeholder
...
```

`Industry` is one of `Law firm`, `Medical practice` or `Other`.

The audit form **collects no phone number and no SMS consent.** This workflow is email
only. Don't add SMS, call or voicemail steps.

Look up the display names of the four custom fields by their IDs (Settings → Custom
Fields) before you build anything, and use those names in the workflow.

## 2. Check existing workflows first

1. List the workflows whose trigger involves the tag `mb-site-lead` or the
   `Marketing Bull Site` source, for example a general consultation nurture.
2. If one would also enroll audit leads, **don't change it.** Tell the owner which
   workflow it is and what it sends, and ask whether to add the filter
   "tag does not include `ai-website-audit`" to its trigger. One person should not get
   two sequences at once.
3. Check whether a workflow named like "AI Website Audit" already exists. If it does,
   stop and ask before creating another.

## 3. Create the workflow

- **Name:** `Lead magnet: AI Website Audit follow-up`
- **Trigger:** Contact Tag → tag added → `ai-website-audit`
- **Allow re-entry:** off. A visitor who audits a second site shouldn't restart the
  sequence.
- **Stop on response:** on. Any email reply from the contact ends the workflow.
- **Sender:** Alex at Marketing Bull, from the address the sub-account already uses for
  lead follow-up. If more than one is set up, ask which one to use.

### Goal / exit conditions

Add a goal (or "remove from workflow" conditions) so the contact leaves the sequence when
any of these happens:

- they reply to an email (covered by "stop on response")
- they book an appointment on any Marketing Bull calendar
- an opportunity for them moves past the first stage in any pipeline
- they unsubscribe from email (GHL's DND for email handles this)

### Internal steps (right after the trigger)

1. **Opportunity:** ask the owner which pipeline and stage audit leads should go into.
   If they name one, add a "Create/Update Opportunity" step: name
   `{{contact.company_name}} – AI audit` (or `{{contact.name}} – AI audit` when the
   company is blank), source `ai-website-audit`. If they say none, skip this step.
   Don't create a new pipeline yourself.
2. **No internal notification step.** Resend already emails hello@ on every lead.

### Industry branch

After the internal steps, add an **If/Else** on the message custom field:

- **Law firm:** message contains `Industry: Law firm`
- **Medical practice:** message contains `Industry: Medical practice`
- **Else:** everyone else

All three branches send the same three emails. Only the one sentence marked
`[INDUSTRY LINE]` in email 2 changes. If GHL makes per-branch copies awkward, use one
branch with the "Else" sentence for everyone and tell the owner that you did.

### The sequence

| Step | Wait | Email |
| --- | --- | --- |
| 1 | 15 minutes after the trigger | Email 1 |
| 2 | 2 days | Email 2 |
| 3 | 4 days | Email 3 |

Send emails only Monday to Friday, 8 am to 6 pm Eastern (a send window on each wait
step). After email 3 the workflow ends. Don't add more emails: the page promises
follow-up "about your results", not a newsletter.

## 4. The emails

Use these exactly, as plain-text-style emails with no images, no banner, and a
signature of name, company, phone and address. Merge fields are in GHL's `{{…}}` syntax;
check each one resolves in the preview.

The re-run link uses the page's `?url=` parameter, which pre-fills the address box.

### Email 1 (15 minutes after unlock)

**Subject:** Your website audit, and how to check the fixes

> Hi {{contact.first_name}},
>
> Thanks for running {{contact.website}} through the AI Website Audit.
>
> Once you've pasted the fix prompt into the tool that built your site and it has made
> the changes, run the audit again to confirm they worked:
>
> https://www.getmarketingbull.com/ai-website-audit?url={{contact.website}}
>
> Two tips from watching people do this:
>
> 1. Fix the first item before anything else. If the audit said search engines see a
>    blank page, nothing further down the list matters to Google until that's fixed.
> 2. When the AI asks for your phone number, address or business details, give it the
>    real ones. The prompt tells it not to invent them, but check anyway.
>
> If anything in the results doesn't make sense, just reply. I read these myself.
>
> Alex
> Marketing Bull · 1-833-GET-BULL
> 319 Clematis Street, Suite 300, West Palm Beach, FL 33401

### Email 2 (2 days later)

**Subject:** The problem most AI-built sites have

> Hi {{contact.first_name}},
>
> The most common thing the audit finds on sites built with Lovable, Bolt and similar
> tools is the first item on the list: the server sends an empty page and JavaScript
> draws everything in the visitor's browser.
>
> People see a finished site. Google sees it late and unreliably. ChatGPT, Claude and
> Perplexity mostly don't run JavaScript at all, so when someone asks them for a
> recommendation, a site like that has nothing for them to read.
>
> [INDUSTRY LINE]
>
> The fix prompt covers it, but it's the step where AI tools most often get stuck,
> because it changes how the site is built rather than what's on it. If yours struggled,
> reply and tell me what happened. I'll tell you whether it's a quick fix or a rebuild.
>
> Alex
> Marketing Bull · 1-833-GET-BULL
> 319 Clematis Street, Suite 300, West Palm Beach, FL 33401

`[INDUSTRY LINE]` for each branch:

- **Law firm:** "For a law firm, that's the difference between showing up when someone
  asks 'who's a good injury lawyer near me' and not existing for them."
- **Medical practice:** "For a practice, that's the difference between showing up when
  someone asks for a doctor nearby who takes their insurance and not existing for them."
- **Else:** "For a local business, that's the difference between showing up when someone
  asks for a recommendation nearby and not existing for them."

### Email 3 (4 days after email 2)

**Subject:** If you'd rather not fix it yourself

> Hi {{contact.first_name}},
>
> Last note from me on the audit.
>
> Some owners are happy pasting prompts and checking the results. Others would rather
> spend that time on clients. If you're in the second group: we build law firm and
> medical practice websites that are fast, readable by Google and AI assistants, and
> set up to turn visits into calls. The scope and price are fixed before we start, the
> site is live in 14 business days, and you own the code.
>
> https://www.getmarketingbull.com/products/website-in-14-days
>
> Or book a free consultation and we'll go through your audit together:
>
> https://www.getmarketingbull.com/free-consultation
>
> Either way, the audit is free to run as often as you like.
>
> Alex
> Marketing Bull · 1-833-GET-BULL
> 319 Clematis Street, Suite 300, West Palm Beach, FL 33401

### Rules for the copy

If you change any wording, keep to these:

- **No prices or dollar figures** for any Marketing Bull service. Fees are quoted per
  firm. "The scope and price are fixed before we start" is the only claim allowed.
- **No promised results.** Don't promise rankings, traffic, leads or cases.
- Don't say Marketing Bull built or reviewed their site, or that a person read their
  audit. It was automated.
- Every email needs the physical address and GHL's unsubscribe link (CAN-SPAM).
- No SMS, ever: these contacts haven't consented to texts.

## 5. Contacts who came in before the workflow was live

The trigger only fires for tags added after you publish. Search for contacts with the
tag `ai-website-audit` created before then, and **report the list to the owner instead
of enrolling them.** They decide whether to add them manually.

## 6. Test before publishing

1. Use a test inbox you control. Don't use the owner's address or a real prospect's.
2. Keep the workflow in draft. Create a test contact with that email, first name `Test`,
   website `https://example.com/`, and the message field set to the sample in section 1
   (with `Industry: Law firm`). Then add the tag `ai-website-audit`, or use GHL's
   "Test workflow" on that contact.
3. Shorten the waits to 1 minute for the test only, and confirm:
   - the contact enters the law-firm branch
   - all three emails arrive, merge fields filled in, with the address and an
     unsubscribe link
   - the re-run link in email 1 opens the audit page with the address box pre-filled
   - replying to email 1 removes the contact from the workflow
4. Put the waits back to 15 minutes, 2 days and 4 days, then delete the test contact.
5. Publish the workflow.

## 7. Report back

Tell the owner:

- the workflow name and a link to it
- what you decided or found in section 2 (overlapping workflows) and section 3
  (pipeline)
- the result of each test check, and the contacts found in section 5
- anything you changed from these instructions, and why
