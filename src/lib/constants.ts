export const COMPANY = {
  name: 'Marketing Bull',
  tagline: 'Helping You Grow Your Business, One Customer At A Time',
  logo: '🐂 Marketing Bull',
  phone: '1-833-GET-BULL',
  phoneFormatted: '1-833-438-2855',
  email: 'hello@getmarketingbull.com',
  address: '319 Clematis Street, Suite 300, West Palm Beach, FL 33401',
  city: 'West Palm Beach',
  state: 'FL',
  zip: '33401',
  country: 'USA',
  website: 'https://getmarketingbull.com',
};

export const TESTIMONIALS = [
  {
    name: 'Laura Cole, Esq.',
    title: 'Attorney',
    quote: 'Marketing Bull is excellent!!',
    rating: 5,
  },
  {
    name: 'Angela McMullin',
    company: '3D Dental',
    quote: 'Alexander is the best!',
    rating: 5,
  },
  {
    name: 'Dr. Manoj Sadhnani',
    company: 'Queens Hyperbaric',
    quote: '30 new faces every month',
    rating: 5,
  },
  {
    name: 'Isak Yuhan',
    company: '1-800-HURT-511',
    quote: 'They delivered results beyond expectations',
    rating: 5,
  },
  {
    name: 'Todd D. Muhlstock, Esq.',
    company: 'WeSueThem.com',
    quote: 'I could trust the results',
    rating: 5,
  },
  {
    name: 'Vinay Gaonkar',
    company: 'GreenBills',
    quote: 'Excellent results on leads and client conversions',
    rating: 5,
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  {
    label: 'Services',
    href: '/services',
    submenu: [
      { label: 'Overview', href: '/services' },
      { label: 'For Law Firms', href: '/services/law-firms' },
      { label: 'For Medical', href: '/services/medical' },
    ],
  },
  { label: 'Contact', href: '/contact-us' },
  { label: 'Free Consultation', href: '/free-consultation', cta: true },
];

export const SERVICE_CATEGORIES = [
  {
    icon: '⚖️',
    title: 'For Law Firms',
    description:
      'Reach more clients, optimize your intake, and grow your practice with targeted legal marketing.',
    href: '/services/law-firms',
  },
  {
    icon: '🏥',
    title: 'For Medical',
    description:
      'Acquire more patients and streamline your operations with healthcare-focused strategies.',
    href: '/services/medical',
  },
  {
    icon: '🔨',
    title: 'For Home Services',
    description:
      'Deliver your services to more local customers with expertly targeted marketing.',
    href: '/services/home-services',
  },
];
