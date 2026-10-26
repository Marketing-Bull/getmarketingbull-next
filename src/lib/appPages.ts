/**
 * Product pages for the open-source apps: /recoup and /keyvault, rendered by
 * components/AppDetailPage. Everything here is read from each app's README and source
 * (Marketing-Bull/amb-recoup, amb-recoup-web, KeyVault), not from marketing copy.
 * When the app changes, re-read the repo before editing a claim here.
 */
export interface AppPageEdition {
  name: string;
  platforms: string;
  status: string;
  summary: string;
  repo: string;
  requirements: string[];
  steps: string[];
}

export interface AppPageData {
  slug: 'recoup' | 'keyvault';
  name: string;
  /** <title> before the site suffix, and the meta description. */
  seoTitle: string;
  description: string;
  kicker: string;
  headline: string;
  lede: string;
  /** Short facts in the hero strip. */
  badges: string[];
  /** Why it exists: three short cards. */
  why: { title: string; body: string }[];
  features: { title: string; items: string[] }[];
  /** Where the data lives and what protects it. */
  data: { title: string; points: string[] };
  editions: AppPageEdition[];
  stack: { layer: string; tech: string }[];
  /** Planned, not built. Shown under that heading so nothing reads as shipped. */
  roadmap?: string[];
  faqs: { q: string; a: string }[];
}

export const APP_PAGES: Record<AppPageData['slug'], AppPageData> = {
  recoup: {
    slug: 'recoup',
    name: 'Recoup',
    seoTitle: 'Recoup: Time, Mileage and Expense Tracker',
    description:
      'Recoup tracks billable hours, mileage and expenses on client projects. A native iPhone, iPad and Mac app synced through your own iCloud, plus a self-hosted web version for teams. Open source (MIT).',
    kicker: 'Open source (MIT) · iPhone, iPad, Mac and web',
    headline: 'Track every billable hour, mile and dollar. Then recoup it.',
    lede:
      'Recoup makes logging time, mileage and expenses fast enough that it actually happens, on whichever device is in your hand. We built it for our own client work and published the source.',
    badges: ['iPhone, iPad and Mac', 'Synced through your own iCloud', 'No server to run', 'CSV export of everything'],
    why: [
      { title: 'Logging has to take seconds', body: 'Forms prefill your last client and project, hours are preset chips instead of typing, and a recent trip repeats in one tap.' },
      { title: 'Rates you can trust later', body: 'The hourly rate resolves from project to client and is locked when the entry is saved, so changing a rate next month never rewrites last month.' },
      { title: 'Your data stays yours', body: 'The native app keeps everything on your devices and in your private iCloud database. There is no Marketing Bull account and no server of ours.' },
    ],
    features: [
      {
        title: 'Time',
        items: [
          'Log hours with preset chips, no keyboard needed',
          'Hourly rate resolves project, then client, and locks at save',
          'Filtered totals and CSV export',
        ],
      },
      {
        title: 'Mileage',
        items: [
          'Round trips double automatically',
          'Repeat a recent trip in one tap',
          'Deductible and billable totals at your mileage rate (set in Settings)',
        ],
      },
      {
        title: 'Expenses',
        items: [
          'Amount first, then a tappable category grid',
          'Recurring expenses show their annualized value',
          'Receipt photos from the camera or library, compressed before saving',
        ],
      },
      {
        title: 'Clients and projects',
        items: [
          'Hourly rates per client, with per-project overrides',
          'Archive instead of delete, so history stays intact',
        ],
      },
      {
        title: 'Dashboard',
        items: [
          'Date-range presets and six summary cards',
          'Breakdowns per client and per project',
        ],
      },
      {
        title: 'Settings',
        items: [
          'Import sample data to try the app before entering your own',
          'Export a full CSV backup of everything',
          'Reset all data when you need a clean start',
        ],
      },
    ],
    data: {
      title: 'Where your data lives',
      points: [
        'The native app stores everything on-device with SwiftData and syncs between your iPhone, iPad and Mac through your private iCloud (CloudKit) database, including the shared mileage rate.',
        'Without iCloud it runs fully local; one line in the source switches sync off.',
        'The web version runs on a Supabase project you create, so the database, sign-in and receipt storage are in your account, not ours.',
      ],
    },
    editions: [
      {
        name: 'Recoup for iPhone, iPad and Mac',
        platforms: 'iOS 17+ and macOS 14+',
        status: 'TestFlight beta',
        summary: 'One SwiftUI codebase that runs natively on all three devices. Nothing to host or maintain.',
        repo: 'https://github.com/Marketing-Bull/amb-recoup',
        requirements: ['A Mac with Xcode 16 or later', 'XcodeGen (brew install xcodegen)', 'A paid Apple Developer account for iCloud sync; without one, the app runs fully local'],
        steps: [
          'Clone the repository and set your developer team in project.yml.',
          'Set the iCloud container in the two entitlements files, then run xcodegen generate.',
          'Build and run on your Mac and your iPhone. The first signed build creates the iCloud container.',
        ],
      },
      {
        name: 'Recoup Web',
        platforms: 'Any browser, self-hosted',
        status: 'Source available',
        summary: 'The same tracking for teams, with organizations, admin, member and viewer roles, and an admin panel.',
        repo: 'https://github.com/Marketing-Bull/amb-recoup-web',
        requirements: ['Python 3.12', 'A Supabase project (database, sign-in and receipt storage)', 'Any container host: the repo ships a Dockerfile'],
        steps: [
          'Clone the repository, install the requirements and copy .env.example to .env with your Supabase keys.',
          'Apply the schema in supabase/migrations and create a public receipts bucket.',
          'Run it with uvicorn, or deploy the Dockerfile to Railway, Render or Fly.io.',
        ],
      },
    ],
    stack: [
      { layer: 'Native app', tech: 'Swift, SwiftUI, SwiftData, CloudKit' },
      { layer: 'Web app', tech: 'Python, FastAPI, Jinja2 templates, HTMX' },
      { layer: 'Web data and sign-in', tech: 'Supabase: Postgres, Auth, Storage' },
      { layer: 'Builds', tech: 'XcodeGen; CI builds iOS Simulator and macOS and runs the unit tests on every push' },
    ],
    faqs: [
      {
        q: 'Is Recoup free?',
        a: 'Yes. The source is published under the MIT License, so you can use it, change it and build it yourself at no cost.',
      },
      {
        q: 'Is it on the App Store?',
        a: 'Not yet. The native app is in TestFlight beta. Until it ships, you can build it from the source with Xcode.',
      },
      {
        q: 'Do I need an Apple Developer account?',
        a: 'Only for iCloud sync between devices. Without one, change a single setting in the source and the app runs fully local on each device.',
      },
      {
        q: 'Can my team share one account?',
        a: 'Use Recoup Web for that. It has organizations with admin, member and viewer roles, and you host it on your own Supabase project.',
      },
      {
        q: 'Can I get my data out?',
        a: 'Yes. Both versions export clients, projects, time, mileage and expenses as CSV files you can open in any spreadsheet or hand to your accountant.',
      },
    ],
  },

  keyvault: {
    slug: 'keyvault',
    name: 'KeyVault',
    seoTitle: 'KeyVault: Developer Secrets Manager for Mac',
    description:
      'KeyVault is a native Mac app for API keys, OAuth credentials and multi-field developer secrets, encrypted per field and stored only on your Mac. Open source (MIT).',
    kicker: 'Open source (MIT) · macOS 14+',
    headline: 'A password manager that understands developer credentials.',
    lede:
      'General password managers treat every credential as a username and password. KeyVault knows an AWS key has a Region and an OAuth client has a token URL and two tokens. Every entry gets the right fields, encrypted and kept on your Mac.',
    badges: ['Native Mac app', 'AES-256-GCM per field', 'Touch ID unlock', 'Nothing leaves your Mac'],
    why: [
      { title: 'The right fields for each credential', body: 'Templates for API keys, OAuth clients, service accounts and AWS IAM, plus custom entries with any fields you need.' },
      { title: 'Encrypted field by field', body: 'Every field value is encrypted on its own, with the key kept in the macOS Keychain and unlocked with Touch ID.' },
      { title: 'No cloud in the middle', body: 'The vault lives on your Mac. There is no account, no sync service and no server that ever sees a secret.' },
    ],
    features: [
      {
        title: 'Entry templates',
        items: [
          'API Key: the key',
          'OAuth: client ID, client secret, token URL, scope, access and refresh tokens',
          'Service Account: project ID, client email, private key',
          'AWS IAM: access key ID, secret access key, region',
          'Custom: any fields you define',
        ],
      },
      {
        title: 'Security',
        items: [
          'AES-256-GCM encryption for each field value',
          'Key derived with PBKDF2-SHA256 at 100,000 iterations',
          'Key stored in the macOS Keychain, never on disk in plain text',
          'Touch ID unlock with a password fallback',
        ],
      },
      {
        title: 'Day to day',
        items: [
          'Locks after 5 minutes idle, on screen sleep and on system lock',
          'Copied values clear from the clipboard after 30 seconds',
          'Sensitive fields stay masked until you reveal them',
        ],
      },
      {
        title: 'Organizing',
        items: [
          'Three-column layout: sidebar, entry list, detail',
          'Free-form tags and notes on every entry',
          'Expiry dates, with a macOS notification a week before a credential lapses',
        ],
      },
      {
        title: 'Backups',
        items: [
          'Export the whole vault as one encrypted file',
          'Import it again with the same master password',
        ],
      },
      {
        title: 'Agent access records',
        items: [
          'Record which named scripts or agents may use an entry',
          'Read or read-and-write, per entry, and revocable',
        ],
      },
    ],
    data: {
      title: 'Where your secrets live',
      points: [
        'On your Mac only, in an on-device SwiftData store. Nothing is sent to a cloud service.',
        'Each field value is encrypted with AES-256-GCM. The key is derived from your master password and kept in the macOS Keychain.',
        'Backups are encrypted files you control, readable only with your master password.',
      ],
    },
    editions: [
      {
        name: 'KeyVault for Mac',
        platforms: 'macOS 14 (Sonoma) or later',
        status: 'Source available',
        summary: 'Build it with Xcode and run it on your own Mac.',
        repo: 'https://github.com/Marketing-Bull/KeyVault',
        requirements: ['A Mac running macOS 14 or later', 'Xcode 15 or later', 'XcodeGen (brew install xcodegen)'],
        steps: [
          'Clone the repository and run ./setup.sh to generate the project and open it in Xcode.',
          'Select the KeyVault target and set your signing team. A free Apple ID works for personal use.',
          'Build and run on your Mac (not the simulator: Touch ID and the Keychain need a real device).',
        ],
      },
    ],
    stack: [
      { layer: 'App', tech: 'Swift, SwiftUI, SwiftData' },
      { layer: 'Encryption', tech: 'CryptoKit (AES-256-GCM), PBKDF2-SHA256' },
      { layer: 'Key storage and unlock', tech: 'macOS Keychain, Touch ID (LocalAuthentication)' },
      { layer: 'Builds', tech: 'XcodeGen' },
    ],
    roadmap: [
      'Full-text search across names, providers, tags and field values',
      'An audit log of every agent access',
      'Quick copy from the menu bar',
      'Rotation reminders and a configurable auto-lock timeout',
    ],
    faqs: [
      {
        q: 'Is KeyVault free?',
        a: 'Yes. The source is published under the MIT License. Build it with Xcode and use it at no cost.',
      },
      {
        q: 'Does KeyVault sync to the cloud?',
        a: 'No. The vault stays on your Mac. To move it, export an encrypted backup and import it on the other machine with the same master password.',
      },
      {
        q: 'What happens if I forget my master password?',
        a: 'The vault cannot be decrypted without it, by design. Keep an encrypted export and your master password somewhere safe.',
      },
      {
        q: 'Does it run on iPhone or Windows?',
        a: 'No. KeyVault is a native Mac app for macOS 14 or later.',
      },
      {
        q: 'Do I need a paid Apple Developer account?',
        a: 'No. A free Apple ID can sign it for personal use; the README explains the one entitlement to remove first.',
      },
    ],
  },
};
