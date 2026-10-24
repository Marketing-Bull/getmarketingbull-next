/**
 * Free resources listed on /resources. Files live under /public/resources so the links
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
  /** What it checks or does, in the reader's terms. */
  covers: string[];
  /** What you get back. */
  output: string;
  /** Short how-to, one step per line. */
  howTo: string[];
  downloads: { label: string; href: string; note: string }[];
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
    downloads: [
      { label: 'Download the skill (.zip)', href: '/resources/fl-bar-ad-audit.zip', note: 'For the Claude app or Claude Code' },
      { label: 'Read SKILL.md', href: '/resources/fl-bar-ad-audit/SKILL.md', note: 'The full checklist as plain Markdown' },
    ],
    caveat:
      'A compliance review that flags risk. It is not legal advice and not Florida Bar approval; the responsible Florida Bar member signs off on every ad.',
    updated: '2026-10-24',
  },
];
