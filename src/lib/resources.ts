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
  {
    slug: 'recoup',
    name: 'Recoup for iPhone, iPad and Mac',
    kind: 'App source on GitHub',
    summary:
      'Track every billable hour, mile and dollar on client projects, and recoup it. One native SwiftUI app runs on iPhone, iPad and Mac, synced through your own iCloud, with no server to host.',
    audience: 'Freelancers, consultants and small agencies who bill by the hour and drive to clients.',
    coversLabel: 'What it does',
    covers: [
      'Time entries with preset chips; the hourly rate resolves from project to client and locks when you save',
      'Mileage with round-trip doubling, one-tap repeat of a recent trip, and a configurable per-mile rate',
      'Expenses with a category grid, recurring items and receipt photos',
      'A dashboard of six summary cards with per-client and per-project breakdowns',
      'Forms that prefill your last client and project, so logging takes seconds',
    ],
    output:
      'Everything syncs between your devices through iCloud (CloudKit), and exports to CSV for invoicing or your accountant. Your data never touches a server of ours.',
    howTo: [
      'Clone the repository on a Mac with Xcode 16 or later and install XcodeGen.',
      'Set your Apple developer team in project.yml, run xcodegen generate, and build to your iPhone and Mac.',
      'No paid developer account? One setting switches iCloud sync off and the app runs fully local.',
    ],
    links: [
      { label: 'View the source', href: 'https://github.com/Marketing-Bull/amb-recoup', note: 'github.com/Marketing-Bull/amb-recoup' },
    ],
    updated: '2026-09-16',
  },
  {
    slug: 'recoup-web',
    name: 'Recoup Web',
    kind: 'App source on GitHub',
    summary:
      'The web version of Recoup for teams: time, mileage, expenses, clients and projects in the browser, with organizations, roles and an admin panel.',
    audience: 'Small agencies and teams who want shared time and expense tracking that they host themselves.',
    coversLabel: 'What it does',
    covers: [
      'Time tracking by date, client and project, with project rates overriding client rates',
      'Mileage with start and end addresses, purpose, round trips and a per-organization rate',
      'Expenses by category with receipt uploads, vendors, recurring schedules and a billable flag',
      'Organizations with admin, member and viewer roles, plus a superuser admin panel',
      'CSV export of clients, projects, time, expenses and mileage',
    ],
    output:
      'A server-rendered FastAPI app (Jinja2 and HTMX, minimal JavaScript) on Supabase for the database, sign-in and receipt storage. It ships with a Dockerfile.',
    howTo: [
      'Clone the repository and create a Supabase project.',
      'Copy .env.example to .env with your Supabase keys, and apply the schema in supabase/migrations.',
      'Run it locally with uvicorn, or deploy the Dockerfile to Railway or any container host.',
    ],
    links: [
      { label: 'View the source', href: 'https://github.com/Marketing-Bull/amb-recoup-web', note: 'github.com/Marketing-Bull/amb-recoup-web' },
    ],
    updated: '2026-07-23',
  },
  {
    slug: 'keyvault',
    name: 'KeyVault',
    kind: 'App source on GitHub',
    summary:
      'A native Mac app for API keys, OAuth credentials and multi-field developer secrets, stored entirely on your Mac with strong encryption. A password manager that understands developer credentials.',
    audience: 'Developers, agencies and anyone juggling API keys for clients and tools.',
    coversLabel: 'What it does',
    covers: [
      'Templates for API keys, OAuth clients, service accounts and AWS IAM, plus custom entries with any fields',
      'AES-256-GCM encryption per field, with the key in the macOS Keychain and Touch ID to unlock',
      'Auto-lock on idle and screen sleep, and copied values that clear after 30 seconds',
      'Expiry dates that warn you before a credential lapses, plus tags and notes',
      'Scoped read or read-write grants so a named script or agent can use one entry, not the whole vault',
    ],
    output:
      'An encrypted vault on your own machine, with encrypted export and import for backups. Nothing is sent to a cloud service.',
    howTo: [
      'Clone the repository on a Mac running macOS 14 or later, with Xcode 15+ and XcodeGen.',
      'Run ./setup.sh to generate the project and open it in Xcode.',
      'Set your signing team and build to your Mac; a free Apple ID works for personal use.',
    ],
    links: [
      { label: 'View the source', href: 'https://github.com/Marketing-Bull/KeyVault', note: 'github.com/Marketing-Bull/KeyVault' },
    ],
    updated: '2026-07-29',
  },
];
