import type { Metadata } from 'next';
import VerticalPage from '@/components/VerticalPage';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'For Law Firms',
  description: 'Growth consulting for personal injury and plaintiff firms: the site that gets you found, the authority that gets you called, and the intake that gets the case signed.',
  alternates: { canonical: `${COMPANY.website}/services/law-firms` },
};

export default function LawFirmsPage() {
  return (
    <VerticalPage
      eyebrow="Law firms · Personal injury & plaintiff"
      title="The prospect calls three firms in ten minutes. Be the one that answers."
      subtitle="We work with personal injury and plaintiff firms on the three places a case is won or lost before an attorney ever sees it: search, the website, and the first phone call."
      problemTitle="The case is decided before the consult."
      problem={[
        'A personal injury prospect does not comparison-shop the way someone buying a car does. They are hurt, stressed, and often frightened, and they call several firms in quick succession. The firm that answers first, sounds competent, and captures their information usually signs the case. Reputation matters — but only among the firms that picked up.',
        'That means most firms are not losing on legal quality. They are losing on a slow website, a Google or AI answer that names someone else, or a front desk that sends a new lead to voicemail at 5:01 pm. Those are operational problems, and they are fixable in weeks, not years.',
        'Our job is to find which of the three is costing you cases, put a dollar figure on it, and build the fix — inside Florida Bar advertising rules and inside infrastructure your firm owns.',
      ]}
      lenses={[
        { label: 'Found', question: 'When someone searches, does your site earn the call?', body: 'A conversion-built site on a modern stack, with practice-area pages, click-to-call, and local schema — live in fourteen days, owned by the firm.', offer: 'website-in-14-days' },
        { label: 'Called', question: 'When they ask Google or ChatGPT "best PI lawyer near me," is your firm in the answer?', body: 'Weekly, attorney-reviewed content built to rank in search and be cited by AI engines, with monthly reporting on both.', offer: 'ai-content-engine' },
        { label: 'Signed', question: 'When they call, what actually happens?', body: 'Two scored mystery-shop calls, a full intake audit, and an ROI report on the cases slipping through the front desk.', offer: 'intake-gap-audit' },
      ]}
      weKnow={[
        'Florida Bar Rule 4-7 advertising requirements — what can be claimed, what needs a disclaimer, and what gets a letter.',
        'How PI intake actually works: speed-to-lead, after-hours coverage, qualification, and follow-up cadence.',
        'Case management and CRM platforms firms run on — Litify, Clio, Filevine, Lawmatics, and the phone systems that feed them.',
        'Spanish-language and multilingual acquisition in South Florida and New York markets.',
        'Cost per signed case, not cost per click — the attribution that makes a marketing budget defensible to a partner.',
        'What a slip-and-fall prospect does at nine on a Saturday night, and who they call next when nobody answers.',
      ]}
      faqs={[
        { q: 'We already have a marketing agency. Why would we need this?', a: 'Most agencies are paid to generate leads, not to sign them. If your leads are arriving and your signed-case count is not moving, the leak is downstream of the agency — usually intake — and the audit will show you exactly where. We are happy to work alongside an existing agency.' },
        { q: 'Do you work with firms outside Florida?', a: 'Yes. Everything is delivered remotely and we have worked with firms in New York and elsewhere. Florida firms get the benefit of our familiarity with Florida Bar rules; outside Florida, you will want your own compliance review on marketing copy.' },
        { q: 'What size firm is this for?', a: 'Firms already spending on lead generation who suspect they are not converting it — typically two to fifteen attorneys. Solo practitioners get the most out of the website and the audit; larger firms tend to start with the content engine.' },
        { q: 'Will you run our Google Ads?', a: 'Not as a standalone service. Paid search is included where an engagement calls for it, but we do not sell ad management on its own — it is where firms get locked into opaque retainers, and we would rather fix the things that make ads work.' },
      ]}
      caseStudySlugs={['1-800-hurt-511']}
      testimonialNames={['Todd D. Muhlstock, Esq.', 'Isak Yuhan', 'Laura Cole, Esq.']}
    />
  );
}
