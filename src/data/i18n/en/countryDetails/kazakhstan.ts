import type { ContentPage } from '../../../types';

export const kazakhstan: ContentPage = {
  title: 'Kazakhstan on a grant: NU, the government scholarship and university discounts',
  lead: 'Kazakhstan is the closest fully funded option for a student from Central Asia: no visa needed, a familiar language, and both Nazarbayev University and the government scholarship for international students cover tuition and pay a monthly stipend. We break down where an international student can really get money, which tests to take and when.',
  sections: [
    {
      id: 'grants',
      chip: 'Grants',
      badge: '1',
      kicker: 'Where international students get funding',
      title: 'Main grant programmes',
      blocks: [
        {
          type: 'facts',
          items: [
            { value: '550', label: 'government scholarships for international students in 2026/27 (490 for bachelor’s)' },
            { value: '15 000 $', label: 'cost of one year of a bachelor’s at NU without a scholarship' },
            { value: '100%', label: 'of tuition — KIMEP grant for citizens of Tajikistan, Kyrgyzstan, Uzbekistan, Turkmenistan' },
          ],
        },
        {
          type: 'cards',
          items: [
            {
              title: 'Nazarbayev University — Abai Kunanbayev Scholarship',
              text: 'NU’s main scholarship for international students: it covers tuition, basic health insurance and a monthly stipend. There’s no separate application — you apply to a programme, and if the admissions committee recommends you for admission, you’re automatically considered. If you don’t get it, there are partial scholarships by citizenship: **from 50 to 90%** of tuition. A year of a bachelor’s without discounts costs 15 000 $, and the NUFYP foundation year costs 12 000 $.',
            },
            {
              title: 'Kazakhstan Government Scholarship for international students',
              text: 'A programme of the Ministry of Science and Higher Education (run by the Center for International Programs “Bolashak”), operating since 2019. It covers tuition and pays a monthly stipend. For 2026/27 there are 550 places: 490 bachelor’s, 50 master’s, 10 doctoral. Around 27–37 universities take part (KazNU, ENU, Satbayev University, Astana IT University and others). Competition is tough: in 2026 there were 16 098 applications from 71 countries. You apply online on the studyin.kz portal; in 2026 the window ran from 30 March to 31 May.',
            },
            {
              title: 'KIMEP University — grant for Central Asian students',
              text: '100% of tuition for all 4 years, 10 grants. For 2025–2026 school and college graduates who are citizens of Kyrgyzstan, **Tajikistan**, Turkmenistan and Uzbekistan. You need IELTS 5.5 (no band below 5.0) or an equivalent (Duolingo 95, CEFR B2, etc.) and a school certificate average of 4.50 out of 5.00 (90%) or higher. To keep the grant — a GPA of at least 3.00. The grant covers tuition only: housing and other fees are on you.',
            },
            {
              title: 'Quota for kandas (ethnic Kazakhs)',
              text: 'If you’re ethnically Kazakh but not a citizen of Kazakhstan, there’s a separate quota for government grants — 4% of the state-funded places (a Government of Kazakhstan resolution). You compete through the UNT (ENT) alongside local applicants. Your ethnicity must be confirmed by a document. The rules change — check the current version on adilet.zan.kz and with the admissions office.',
            },
          ],
        },
      ],
    },
    {
      id: 'nu',
      chip: 'NU',
      badge: '2',
      kicker: 'The strongest university in the region',
      title: 'How to get into Nazarbayev University',
      blocks: [
        { type: 'text', text: 'NU’s requirements are the same for everyone, regardless of citizenship. Admission runs by category — you pick the one where your results are strongest. For an international student the most realistic route is the **digital SAT**: the NUFYP foundation year admits students via SAT only if they are international.' },
        {
          type: 'grid',
          items: [
            { title: 'English (bachelor’s)', text: 'IELTS Academic 6.0 or higher (writing 6.0, other bands 5.5+) or TOEFL iBT 60+. IELTS Online, IELTS Indicator and TOEFL Home Edition are not accepted — test-centre exams only' },
            { title: 'English (NUFYP)', text: 'IELTS 5.5 or higher (writing and reading 5.5, listening and speaking 5.0) or TOEFL iBT 46+' },
            { title: 'SAT / ACT', text: 'Bachelor’s: SAT 1240+ or ACT 26+. NUFYP (international students only): SAT 1140+ or ACT 24+. No superscoring; digital SAT only' },
            { title: 'NUET', text: 'NU’s own test: maths + critical thinking, each part scored 0–120. Minimum — 120 in total and 50 in each part. Taken in person, fee 7 000 ₸' },
            { title: 'IB / A-level', text: 'IB 30 points or higher (HL: 4, 4, 5) or A-levels of ABB or higher — straight into a bachelor’s' },
            { title: 'Olympiads', text: 'Medallists of international olympiads (IMO, IPhO, IChO, IBO, IOI, Zhautykov, Mendeleev) in the last 3 years — no minimum English score' },
          ],
        },
        {
          type: 'callout',
          title: 'What NUFYP is',
          text: 'NU’s foundation year. If your score is below the bachelor’s cut-off, you may be considered for NUFYP. NUFYP graduates who score 70+ in maths, academic English and Leadership get a bachelor’s offer without competing again.',
        },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '3',
      kicker: 'From registration to moving in',
      title: 'Stages of admission to NU',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: '10–12 months before', title: 'Tests', text: 'Take IELTS/TOEFL at a test centre and the digital SAT. For financial aid in 2027/28, NU counts SAT taken no later than 5 December 2026 and ACT no later than 28 November 2026. Certificates must be valid on 1 August 2027.' },
            { when: 'October – January', title: 'Application at admissions.nu.edu.kz', text: 'Application form, scans of your passport, school certificate (or a letter from your school confirming you’re in your final year), test results. The test centre sends the official certificate to NU itself, and you also upload a scan to your account.' },
            { title: 'Application fee', text: '10 000 ₸ online. In the last two weeks before the deadline and during the extension period — 30 000 ₸. Non-refundable.' },
            { title: 'Interview', text: 'Shortlisted candidates are invited to a video or in-person interview. You don’t need to travel to Kazakhstan for the interview.' },
            { title: 'Offer and financial aid', text: 'After the offer, you fill in the financial aid form in your account, choose one category and upload supporting documents. Once submitted, it can’t be edited.' },
            { title: 'Enrolment', text: 'Confirm your place, pay the guarantee deposit, bring the original school certificate. NU guarantees international students a place in on-campus housing.' },
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'Even a grant isn’t free at the start',
      title: 'Hidden costs',
      blocks: [
        {
          type: 'costs',
          rows: [
            ['NU application', '10 000 ₸ (30 000 ₸ in the last 2 weeks)'],
            ['NUET test', '7 000 ₸'],
            ['SAT, IELTS / TOEFL', 'per the test centre’s price list — check in advance'],
            ['Notarised translation into English', 'depends on the agency; needed for documents not in Kazakh, Russian or English'],
            ['NU guarantee deposit', 'required at enrolment; see your offer for the amount'],
            ['Housing with a KIMEP grant or government scholarship', 'not covered — budget for it'],
            ['NU tuition without a scholarship', '15 000 $/year (NUFYP — 12 000 $)'],
          ],
        },
      ],
    },
    {
      id: 'hacks',
      chip: 'Tips',
      badge: '!',
      kicker: 'Insider knowledge',
      title: 'Tips and common mistakes',
      blocks: [
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Apply to all three at once', text: 'NU, the government scholarship and the KIMEP grant are independent competitions with different deadlines. Nothing stops you from applying to all three and choosing the best result.' },
            { title: 'Don’t wait until the last two weeks', text: 'NU’s application fee triples during this period. On top of that, the website is overloaded and test centres need time to send certificates.' },
            { title: 'IELTS Online won’t work', text: 'NU doesn’t accept IELTS Online, IELTS Indicator or TOEFL Home Edition. Register only for an in-person test at a centre.' },
            { title: 'Check your spam folder', text: 'NU interview invitations and offers arrive by email. Miss the email — miss the deadline.' },
            { title: 'You don’t need an agent', text: 'You submit every application online yourself: admissions.nu.edu.kz, the government scholarship portal, the KIMEP form. Nobody can “guarantee a grant” for money.' },
            { title: 'KIMEP grants are separate from admission', text: 'You apply for KIMEP financial aid through a separate form at finaid.kimep.kz. Without it, you won’t be considered for the grant, even if you’ve been admitted.' },
          ],
        },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '$',
      kicker: 'Paperwork and moving',
      title: 'Documents, translations and registration',
      blocks: [
        {
          type: 'note',
          intro: 'Basic package for NU and most universities:',
          items: [
            'International passport (scan)',
            'School leaving certificate (attestat) with its grades supplement, or a letter from your school confirming you’re in your final year',
            'Notarised translation into English — if the document isn’t in Kazakh, Russian or English',
            'IELTS/TOEFL and SAT/ACT certificates (sent officially by the test centre)',
            'For KIMEP — all pages of the attestat: every grade counts',
          ],
        },
        { type: 'text', text: '**Apostille.** Kazakhstan, Tajikistan, Kyrgyzstan and Uzbekistan are parties to the 1993 Minsk Convention: official documents from one country are usually accepted in another without an apostille or legalisation. But the specific university’s requirements come first — check before you pay a notary.' },
        { type: 'text', text: '**Stay.** Under an intergovernmental agreement, citizens of Tajikistan and Kazakhstan can stay in each other’s country for up to 30 days without registration, and up to 90 with registration. For the period of your studies, your status is arranged through the university’s international office — don’t put this off after you arrive.' },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'Approximate, based on the 2026 cycle',
      title: 'Calendar for the 2027/28 academic year',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Oct 2026', title: 'NU applications open', text: 'Admission for 2027/28 is open. For visa-free countries (including Tajikistan) — from October 2026 to August 2027, but financial aid is allocated much earlier' },
            { period: 'November', title: 'NUET category', text: 'In the 2026 cycle the deadline for NUET applicants was in November' },
            { period: 'December', title: 'Last SAT', text: '5 December 2026 — the last SAT date NU will count for financial aid' },
            { period: 'January – February', title: 'SAT, IB, A-level, olympiads', text: 'In the 2026 cycle the deadline for these categories was at the end of January, extended to 10 February. NU master’s with a grant — until mid-February' },
            { period: 'March – May', title: 'Government scholarship for international students', text: 'In 2026 applications ran from 30 March to 31 May on studyin.kz' },
            { period: 'July', title: 'KIMEP grants', text: 'Central Asia grant — until 12 July inclusive (2026 cycle)' },
          ],
        },
        { type: 'callout', text: 'NU publishes exact dates in its Important Dates section and in your applicant account. Deadlines shift every year — check the official website, not last year’s posts.' },
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
            { label: 'Nazarbayev University — financial aid (bachelor’s and NUFYP)', url: 'https://nu.edu.kz/admissions/how-to-apply/foundation-undergraduate/financial-aid-end-scholarships/' },
            { label: 'NU — information for international applicants', url: 'https://nu.edu.kz/admissions/international-admission/international-admission_general/' },
            { label: 'NU — application portal', url: 'https://admissions.nu.edu.kz' },
            { label: 'KIMEP — grants for newly admitted students', url: 'https://www.kimep.kz/prospective-students/en/financial-aid/scholarships-for-newly-admitted-students/' },
            { label: 'Center for International Programs “Bolashak” — operator of the government scholarship for international students', url: 'https://bolashak.gov.kz/en' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'A strong SAT opens up Kazakhstan',
    text: 'For an international student, the key to NU is the digital SAT and an in-person IELTS. Apply for the government scholarship and to KIMEP at the same time: three independent chances are better than one.',
  },
};
