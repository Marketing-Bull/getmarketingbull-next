import ConsultationPage, { consultationMetadata } from '@/components/ConsultationPage';

// The SMS opt-in URL registered with the A2P 10DLC campaign. Same page as /free-consultation
// (whose canonical it shares), but it must answer 200 here rather than redirect.
export const metadata = consultationMetadata;

export default function GetStartedPage() {
  return <ConsultationPage source="get-started" />;
}
