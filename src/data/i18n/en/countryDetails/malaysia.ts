import type { ContentPage } from '../../../types';

export const malaysia: ContentPage = {
  title: 'Malaysia: a state grant for Master’s students and discounts for school leavers',
  lead: 'The main government programme — the Malaysia International Scholarship (MIS) — is only for Master’s and PhD, and Tajikistan, Uzbekistan, Kazakhstan, Kyrgyzstan and Turkmenistan are on the list of eligible countries. For a Bachelor’s there is no full state grant: here it’s about affordable tuition and partial university discounts.',
  sections: [
    {
      id: 'grants',
      chip: 'Grants',
      badge: '1',
      kicker: 'Two different scenarios',
      title: 'What you can get',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'MIS — Malaysia International Scholarship',
              text: 'A government scholarship from Malaysia’s Ministry of Higher Education (MOHE) for full-time Master’s and PhD studies. Tuition is paid **directly to the university** for the whole programme + **RM 1 500 a month** for living costs (paid every 4 months after an academic progress report). Current students can also apply if they have at least 2 semesters left.',
            },
            {
              title: 'Where MIS applies',
              text: '20 public universities (UM, UTM, USM, UPM, UKM, IIUM, etc.) and 4 private ones: Universiti Teknologi Petronas, UNITEN, Multimedia University, INCEIF. Priority fields are education, humanities, social sciences, business and law, natural sciences, IT, engineering and agricultural sciences. Medicine, nursing and pharmacy are excluded.',
            },
            {
              title: 'Bachelor’s: private university discounts',
              text: 'Example — Sunway International Bursaries for international students: RM 6 000 or RM 11 000 for a Bachelor’s depending on your grades (each country has its own threshold). Many “100% scholarships” at private universities are only for Malaysian citizens — check the conditions before applying.',
            },
            {
              title: 'Bachelor’s: affordable public universities',
              text: 'At Universiti Malaya, according to the 2025/26 fee table, a whole Bachelor’s for an international student costs, for example, RM 70 600 (biotechnology) or RM 78 400 (mathematics, actuarial science) for the minimum study period — excluding accommodation.',
            },
          ],
        },
      ],
    },
    {
      id: 'requirements',
      chip: 'Requirements',
      badge: '2',
      kicker: 'Who MIS accepts',
      title: 'Basic candidate profile',
      blocks: [
        {
          type: 'grid',
          items: [
            { title: 'Age', text: 'Master’s — no older than 40, PhD — no older than 45 at the time of application' },
            { title: 'Grades', text: 'Master’s: CGPA 3.00 / Second Class Upper for your Bachelor’s. PhD: CGPA 3.00 / excellent results in a relevant Master’s' },
            { title: 'English', text: 'IELTS 6.0+ or TOEFL PBT 550+ (or equivalent). Or an official letter from your university confirming that you studied in English' },
            { title: 'Research proposal', text: 'For research Master’s and PhD — at least 1 000 words on your future research topic' },
            { title: 'Study mode', text: 'Full-time only. Paid work — only with the university’s written permission' },
            { title: 'Bachelor’s', text: 'Requirements are set by the university. For the Sunway bursary, for example, you need a certain percentage or score on your school leaving certificate (attestat) — different for each country' },
          ],
        },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '3',
      kicker: 'MIS, Master’s and PhD',
      title: 'Five stages of applying',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: '6–12 months before', title: 'University, supervisor, IELTS', text: 'Choose a university from the MIS list and a programme, find a potential supervisor, take IELTS/TOEFL, start your research proposal.' },
            { title: 'Applying to the university', text: 'Getting admitted is your responsibility: apply to the university separately. If you already have an admission letter, attach it to your MIS application.' },
            { when: 'March – April', title: 'MIS online application', text: 'A form on the MOHE portal and PDF scans. In 2026 the window was from 4 March to 3 April.' },
            { title: 'Shortlist and interview', text: 'Those who pass the initial screening are invited to an interview; you check your status on the same portal.' },
            { when: 'Oct – Dec', title: 'Offer and visa', text: 'Checking your status and confirming the offer (in 2026 — from 8 October to 31 December). Then a student visa through EMGS, including a medical check-up.' },
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'Prepare in advance',
      title: 'What you will still pay for',
      blocks: [
        { type: 'text', text: 'MIS pays for tuition and gives you a monthly allowance. Flights and visa costs are not mentioned in the MIS rules — include them in your budget.' },
        {
          type: 'costs',
          rows: [
            ['MIS stipend', 'RM 1 500 a month, paid every 4 months'],
            ['IELTS / TOEFL', 'per the test centre’s price list'],
            ['Student visa via EMGS + medical check-up', 'at your own expense, fees on the EMGS website'],
            ['Certified copies and translations', 'depends on the notary'],
            ['Flight and initial accommodation', 'at your own expense'],
            ['Bachelor’s without a grant (UM, example)', 'RM 70 600 – 78 400 per programme + accommodation'],
          ],
        },
        { type: 'callout', text: 'The first MIS payment doesn’t arrive on day one — the stipend is paid every 4 months. You need savings for your first months of living there.' },
      ],
    },
    {
      id: 'hacks',
      chip: 'Tips',
      badge: '!',
      kicker: 'Behind the scenes',
      title: 'Tips and common mistakes',
      blocks: [
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'A Malaysia-related topic is a plus', text: 'The MIS selection criteria say it directly: preference goes to research related to Malaysia. Link your proposal topic to a local problem — energy, agriculture, IT, education' },
            { title: 'Get a university offer early', text: 'An admission letter isn’t mandatory, but MIS doesn’t enrol you at the university. Without admission the scholarship is useless — apply to the university in parallel' },
            { title: 'Bachelor’s discounts come after you start', text: 'Sunway reviews bursaries 2 weeks after classes begin. Don’t count on it when planning your budget — plan for the full price' },
            { title: 'Check who the “100%” is for', text: 'Almost all full scholarships at private universities (Sunway Excellence, Nottingham Malaysia YTAR) are only for Malaysian citizens. Read the Eligibility section' },
            { title: 'Official portal only', text: 'The MIS application is submitted only through the MOHE portal. Aggregator sites often show old dates as “open”' },
          ],
        },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '$',
      kicker: 'MIS document package',
      title: 'What to collect and how to certify it',
      blocks: [
        {
          type: 'note',
          intro: 'Everything is scanned to PDF and uploaded to the online form:',
          items: [
            'Certified copy of your passport (valid for at least 6 months)',
            'Certified Bachelor’s transcripts (for PhD — Master’s too) for all courses',
            'Official university letter on the grading system if your transcript has no CGPA',
            'IELTS / TOEFL or a letter confirming you studied in English',
            'Two recommendation letters',
            'Admission letter from a Malaysian university (if you already have one)',
            'CV',
            'Research proposal (for research Master’s and PhD)',
          ],
        },
        { type: 'text', text: 'All documents must be in English or come with a **certified translation**. Malaysia is not a party to the Apostille Convention, so an apostille on its own doesn’t guarantee recognition there. If the university or EMGS asks for legalisation, check the procedure with the university and the Malaysian embassy in your country.' },
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Your name — letter for letter', text: 'Latin spelling in all translations — exactly as in your international passport' },
            { title: 'The visa is a separate story', text: 'The MIS grant doesn’t guarantee a visa. You apply for the student visa yourself through EMGS; the medical check-up is mandatory' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'MIS, estimated from the 2026 cycle',
      title: 'Calendar for 2027/28',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Oct – Feb', title: 'Preparation', text: 'University and supervisor, IELTS, research proposal draft, recommendations' },
            { period: 'Mar – Apr', title: 'MIS window', text: 'In 2026 — from 4 March to 3 April. Expect a similar window in spring 2027' },
            { period: 'Apr – Sep', title: 'Shortlist and interview', text: 'Dates aren’t published in advance — keep an eye on your status on the portal' },
            { period: 'Oct – Dec', title: 'Offer', text: 'In 2026 — checking and confirmation from 8 October to 31 December' },
            { period: 'After the offer', title: 'Visa and start', text: 'Student visa via EMGS, studies start according to your university’s calendar' },
          ],
        },
        { type: 'callout', text: 'The MIS window is short — about a month. The date of the next cycle hasn’t been officially announced yet: have your documents ready by February so you can apply in the first days.' },
      ],
    },
    {
      id: 'sources',
      badge: '!',
      kicker: 'Official source',
      title: 'Check here',
      blocks: [
        {
          type: 'links',
          items: [
            { label: 'MOHE — Malaysia International Scholarship (application portal)', url: 'https://biasiswa.mohe.gov.my/INTER/index.php' },
            { label: 'EMGS — student visa for Malaysia', url: 'https://visa.educationmalaysia.gov.my' },
            { label: 'Education Malaysia — official portal', url: 'https://educationmalaysia.gov.my' },
            { label: 'Sunway — International Bursaries', url: 'https://scholarship.sunway.edu.my/scholarship/sunway-international-bursaries' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'Malaysia — a strong move for a Master’s',
    text: 'For a Bachelor’s it’s more of an affordable option with discounts. But MIS after your Bachelor’s is a real state grant, and your country is on the list.',
  },
};
