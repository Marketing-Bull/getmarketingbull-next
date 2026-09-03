import type { Metadata } from 'next';
import VerticalPage from '@/components/VerticalPage';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'For Medical Practices',
  description: 'Growth consulting for medical practices and specialty clinics: a website that books, search and AI visibility that fills the schedule, and a front desk that converts the call.',
  alternates: { canonical: `${COMPANY.website}/services/medical` },
};

export default function MedicalPage() {
  return (
    <VerticalPage
      eyebrow="Medical practices · Specialty clinics"
      title="An empty slot is lost revenue. A patient who can't book online books elsewhere."
      subtitle="We work with chiropractic, imaging, hyperbaric, dental, orthopedic, and wellness practices on the three places a patient is won or lost: being found, being chosen, and being booked."
      problemTitle="Patients choose the practice that made it easy."
      problem={[
        'Most practices we meet have strong clinical outcomes and a marketing engine that does not reflect it. The website is dated or slow, there is no online booking, the Google Business Profile has a handful of old reviews, and nobody is writing the content that would make an unfamiliar treatment feel credible to someone searching at 10 pm.',
        'Meanwhile the patient is comparing you to whoever appeared first in Maps, whoever ChatGPT named, and whoever let them book without calling. Clinical quality never enters the decision if the front door is closed.',
        'We find which of the three is costing you patients, build the fix inside infrastructure the practice owns, and stay accountable for the schedule — not the impressions. Everything we build respects HIPAA boundaries; we never touch PHI, and we say so in writing.',
      ]}
      lenses={[
        { label: 'Found', question: 'When someone searches your specialty near them, does your site earn the booking?', body: 'A conversion-built site with online scheduling, service pages, reviews surfaced, and local schema — live in fourteen days, owned by the practice.', offer: 'website-in-14-days' },
        { label: 'Called', question: 'When they ask Google or an AI who is good, is your practice in the answer?', body: 'Weekly, physician-reviewed content built to rank in search and be cited by AI engines, plus Google Business Profile posts, with monthly reporting.', offer: 'ai-content-engine' },
        { label: 'Booked', question: 'When they call, does the front desk convert?', body: 'Two scored mystery-shop calls, a full front-desk and booking audit, and an ROI report on the patients lost between the call and the calendar.', offer: 'intake-gap-audit' },
      ]}
      weKnow={[
        'HIPAA boundaries in marketing: what a website, a review request, or a recall message may and may not contain.',
        'Specialty acquisition where the patient has never heard of the treatment — hyperbaric, regenerative, functional — and credibility has to be built before the call.',
        'Google Business Profile and Maps as the primary front door for local medical search.',
        'Online scheduling and EHR-adjacent booking integrations, without touching PHI.',
        'Review generation that stays inside platform rules and patient-consent norms.',
        'Personal-injury referral relationships between medical providers and PI firms in South Florida.',
      ]}
      faqs={[
        { q: 'Will you need access to our EHR or patient data?', a: 'No. Nothing we build touches protected health information. Booking integrations are handled through the scheduling vendor\'s public tools, and content review happens with your clinicians, not your records.' },
        { q: 'Can you write medical content without misrepresenting outcomes?', a: 'Yes, and that is the point of the physician-review step in the content engine: nothing publishes without a clinician in your practice approving it. We flag anything that reads as a guarantee or an unsupported claim.' },
        { q: 'We are a small practice. Is this too much?', a: 'The website and the audit are one-time engagements sized for a single-location practice. The content engine is for practices that want organic visibility to compound month over month without hiring a writer.' },
        { q: 'Do you work with practices outside South Florida?', a: 'Yes. Our medical clients have been in New York and Florida; everything is delivered remotely.' },
      ]}
      caseStudySlugs={['queens-hyperbaric', 'metropolitan-orthopedics']}
      testimonialNames={['Dr. Manoj Sadhnani', 'Angela McMullin']}
    />
  );
}
