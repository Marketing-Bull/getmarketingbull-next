/**
 * Free resources listed on /resources. Skill files live under /public/resources so the links
 * work for everyone: the source repository (Marketing-Bull/claude-skills) is private.
 * When a skill changes there, copy the new SKILL.md here and rebuild its zip.
 */
export interface Resource {
  slug: string;
  name: string;
  kind: string;
  /** One line on what it is. */
  summary: string;
  /** Who it is for. */
  audience: string;
  /** Heading over `covers`, e.g. "What it checks". */
  coversLabel: string;
  /** What it checks or does, in the reader's terms. */
  covers: string[];
  /** What you get back. */
  output: string;
  /** Short how-to, one step per line. */
  howTo: string[];
  /** The first link is the primary button. A .zip href downloads; anything else opens in a new tab. */
  links: { label: string; href: string; note: string }[];
  /** Shown beside the resource; compliance tools are never legal advice. */
  caveat?: string;
  updated: string;
}

export const RESOURCES: Resource[] = [
  {
    slug: 'fl-bar-ad-audit',
    name: 'Florida Bar Ad Audit',
    kind: 'Claude skill',
    summary:
      'Audits a law firm website, landing page, social profile, or print, direct-mail or PPC ad against the Florida Bar lawyer advertising rules (Subchapter 4-7, Rules 4-7.11 to 4-7.23) and returns a findings report with a rule cite and a compliant rewrite for every problem.',
    audience: 'Florida law firms, and the marketers and agencies who write their ads.',
    coversLabel: 'What it checks',
    covers: [
      'Whether the piece has to be filed with the Bar, and whether it qualifies for the "tombstone" exemption',
      'Required content: the responsible lawyer or firm, a bona fide office location, referral disclosures, every language used',
      'Guarantees and predictions ("we’ll get you the compensation you deserve")',
      'Past results, testimonials and review widgets, and the disclaimer each one needs',
      'Unverifiable claims such as "best", "#1", "top" and "expert"',
      'Stock or AI-generated people who look like the firm’s lawyers, dramatizations, and judicial titles',
      'Hidden content search engines see: titles, meta descriptions, alt text and schema',
    ],
    output:
      'A prioritized findings table (location, exact text, rule, why it is a problem, drop-in fix), the proof the firm needs to keep a claim, sitewide fixes, and a sign-off line for the responsible Florida Bar member.',
    howTo: [
      'Download the zip and upload it in the Claude app under Settings → Capabilities → Skills, or copy the fl-bar-ad-audit folder into .claude/skills/ for Claude Code.',
      'Ask Claude to audit a site or ad, e.g. "Audit examplelawfirm.com for Florida Bar compliance."',
      'Each run starts by checking the Bar’s checklist pages for rule changes since the skill was written.',
    ],
    links: [
      { label: 'Download the skill (.zip)', href: '/resources/fl-bar-ad-audit.zip', note: 'For the Claude app or Claude Code' },
      { label: 'Read SKILL.md', href: '/resources/fl-bar-ad-audit/SKILL.md', note: 'The full checklist as plain Markdown' },
    ],
    caveat:
      'A compliance review that flags risk. It is not legal advice and not Florida Bar approval; the responsible Florida Bar member signs off on every ad.',
    updated: '2026-10-24',
  },
  {
    slug: 'markdown-editor',
    name: 'Markdown Editor',
    kind: 'Free web app',
    summary:
      'A fast, offline-first Markdown, HTML and Mermaid editor that runs entirely in your browser. No accounts, no cloud, no tracking: your text never leaves your device.',
    audience: 'Anyone who writes in Markdown: marketers, developers, and teams drafting docs, briefs and diagrams.',
    coversLabel: 'What it does',
    covers: [
      'Live preview as you type, side by side or one pane at a time',
      'Mermaid diagrams: flowcharts, sequence, ER, Gantt and more',
      'HTML files with a sandboxed live preview, and JSON validation with the error line and column',
      'Several files open at once in tabs, with find and replace',
      'A distraction-free reading mode and your choice of accent color',
      'Installs as an app and works offline; drag in .md, .txt or .html files',
    ],
    output:
      'Export to PDF or standalone HTML, or share a document as a link. Work auto-saves to your browser only; nothing is sent to a server.',
    howTo: [
      'Open md.getmarketingbull.com in any modern browser.',
      'Type or drop in a file; the preview updates as you write.',
      'To use it offline, install it from your browser\u2019s address bar.',
    ],
    links: [
      { label: 'Open the editor', href: 'https://md.getmarketingbull.com', note: 'md.getmarketingbull.com' },
    ],
    updated: '2026-03-18',
  },
];
