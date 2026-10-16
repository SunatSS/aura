import type { ContentPage } from '../../../types';

export const italy: ContentPage = {
  title: 'Italy: a grant based on family income (DSU)',
  lead: 'In Italy the main “grant” isn’t for olympiads — it’s for a low family income. The regional DSU scholarship can cover tuition, give you real money for the year and a place in a dorm. But first you have to get through three bureaucratic filters: recognition of your school certificate, the Universitaly pre-application and the ISEE parificato income statement. We go through it step by step.',
  sections: [
    {
      id: 'grants',
      chip: 'Grants',
      badge: '1',
      kicker: 'Where the money comes from',
      title: 'Main programmes',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'Regional DSU scholarship (Diritto allo Studio)',
              text: 'It’s awarded not by the university but by a regional agency: ER.GO in Emilia-Romagna, EDISU in Piedmont, DiSCo in Lazio, etc. ER.GO for 2026/27 as an example: up to **7 171 € a year** for students from out of town (fuori sede), a tuition fee waiver, a refund of the regional tax (140 €), and a family income threshold of **ISEE up to 25 000 €**. You can also apply for a place in a dorm. International students can apply too, but they need income documents from their home country.',
            },
            {
              title: 'Italian Government Scholarships (MAECI)',
              text: 'Through the Study in Italy portal: 9-month scholarships for master’s, PhD and AFAM (renewable on multi-year programmes), as well as 3-month scholarships for Italian language courses. The list of countries is in the call text. Selection depends on citizenship, and you can apply under one country only. In the 2026/27 cycle, applications closed on 26 March 2026.',
            },
            {
              title: 'University discounts and scholarships',
              text: 'Many universities reduce fees based on ISEE and offer merit scholarships themselves. Each university has its own conditions — look for the “Fees and scholarships” section on its website.',
            },
          ],
        },
        { type: 'callout', text: 'DSU is an income-based grant, not a talent-based one. If your family income is above the threshold, you won’t get the scholarship, no matter how good your grades are.' },
      ],
    },
    {
      id: 'access',
      chip: 'Certificate',
      badge: '2',
      kicker: 'The 12-year rule',
      title: 'Is an 11-year school certificate enough?',
      blocks: [
        {
          type: 'text',
          text: 'Italy requires **12 years** of school before university. A school leaving certificate (attestat) after 11 years (as in most CIS countries) doesn’t on its own give you the right to enrol. The ministry’s (MUR) annual circular for 2026/27 allows a university to require **one** of the following:',
        },
        {
          type: 'steps',
          badge: 'blue',
          items: [
            { title: 'First year of university at home', text: 'A certificate from your university confirming you’ve passed **all first-year exams** (with 11 years of school; with 10 years — two years of university).' },
            { title: 'A year of college/technical school', text: 'An official document confirming a year of post-secondary (non-university) education in a field close to your chosen programme.' },
            { title: 'Foundation year', text: 'A preparatory course at an Italian university (or a recognised foreign one) that makes up the missing year. Example: Padua — 1 year, 6 000 €, English B2.' },
          ],
        },
        { type: 'callout', variant: 'black', text: 'These additional documents only let you enrol in year 1. You can’t get credit for subjects or shorten your studies based on them.' },
      ],
    },
    {
      id: 'requirements',
      chip: 'Requirements',
      badge: '3',
      kicker: 'Who gets in',
      title: 'Basic candidate profile',
      blocks: [
        {
          type: 'grid',
          items: [
            { title: 'Family income', text: 'The main DSU criterion. The threshold is set by the region (at ER.GO for 2026/27 — ISEE up to 25 000 €)' },
            { title: 'Italian', text: 'For Italian-taught programmes — usually B2 (for example, CLIQ). Not needed for English-taught programmes' },
            { title: 'English', text: 'For English-taught programmes the level is set by the university; often B2 or higher. Check the programme page for the specific certificate and score' },
            { title: 'Academic performance', text: 'For year 1, DSU is awarded based on income. To keep the scholarship the following year, you need to earn a minimum number of credits (CFU) by the deadline set in the scholarship rules (bando)' },
          ],
        },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '4',
      kicker: 'From application to visa',
      title: 'Six stages of admission',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: 'Winter – spring', title: 'University selection', text: 'Apply on the university’s website (pre-evaluation or admission rounds). Each university has its own deadlines and rounds.' },
            { when: 'Spring', title: 'Family documents for ISEE', text: 'Collect certificates on your family composition, income and property at home, then translate and legalise them. This takes the longest — start early.' },
            { when: 'By July – September', title: 'Universitaly pre-application', text: 'Required for the visa. The university sets the deadline: for example, in 2026 Turin — by 15 July, Pisa and Venice — by 30 September.' },
            { when: 'July – September', title: 'DSU application', text: 'Online on the regional agency’s website. Example: ER.GO — by 24 August 2026 (scholarship and dorm for first-year students).' },
            { when: 'By 30 November', title: 'Visa', text: 'Submit your documents to the Italian embassy based on your pre-application. The pre-application doesn’t guarantee a visa.' },
            { when: '8 days after arrival', title: 'Permesso di soggiorno', text: 'Within 8 days of arriving, apply for your residence permit.' },
          ],
        },
      ],
    },
    {
      id: 'isee',
      chip: 'ISEE',
      badge: '$',
      kicker: 'Income statement',
      title: 'How to get an ISEE parificato',
      blocks: [
        { type: 'text', text: 'If your family’s income and property are abroad, the regular Italian ISEE won’t work. You need an **ISEE parificato**: it’s calculated by an accredited CAF centre based on your foreign documents. Your university or regional agency tells you which CAF to use and where to send things. An example list (Bocconi, 2027/28):' },
        {
          type: 'note',
          intro: 'What they usually ask for:',
          items: [
            'Passport and codice fiscale (tax code; the CAF can calculate it for you)',
            'A family composition certificate listing all members',
            'Income of each family member for the year stated in the rules (for 2027/28 at Bocconi — 2024), or a certificate of no income for adults',
            'Family real estate with floor area in m², or a certificate of no real estate',
            'Bank account and deposit balances as of 31 December of the same year',
            'A certificate about the family business or a declaration that there isn’t one; the divorce decree if your parents are divorced',
          ],
        },
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Legalisation or apostille', text: 'Documents must be issued by the authorities of the country where the income was earned and must be legalised at the Italian consulate or apostilled. The Italian translation is certified by the consulate or an official translator' },
            { title: 'Missing items won’t be accepted', text: 'Bocconi says it plainly: an incomplete, untranslated or non-legalised package can’t be completed after the deadline, and the ISEE won’t be calculated' },
            { title: 'Particularly poor countries', text: 'For countries on MUR’s annual list, the procedure is simpler. Check whether your country is on it (for 2026/27 it’s MUR decree No. 176 of 24.02.2026)' },
          ],
        },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '5',
      kicker: 'Certificate and visa',
      title: 'Certificate recognition and the visa package',
      blocks: [
        {
          type: 'accordion',
          items: [
            {
              title: 'Dichiarazione di Valore or CIMEA',
              text: 'The university and the consulate ask you to confirm that your school certificate is genuine and gives you the right to study. There are two ways to do this — your choice:',
              bullets: [
                'Dichiarazione di Valore (DoV) — issued by the Italian embassy in your country',
                'Statement of Comparability and Verification from CIMEA (the Italian ENIC-NARIC centre)',
                'Plus your legalised school certificate (or a letter replacing it) with an official translation into Italian',
              ],
            },
            {
              title: 'Visa: what the embassy checks',
              text: 'The Italian embassy in Tashkent (which also handles citizens of Tajikistan) asks for bank statements for the last 3 months, employment and salary certificates of whoever is supporting you, insurance of at least 30 000 € covering the whole Schengen area, and proof of accommodation for at least the first month. Statements must have the bank’s blue stamp and be no older than 10 working days.',
            },
            {
              title: 'Apostille',
              text: 'Kazakhstan, Uzbekistan, Tajikistan and Kyrgyzstan are parties to the Hague Apostille Convention, as is Italy. But for each document, still check exactly what the university, the CAF or the consulate requires.',
            },
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
            { title: 'Complete your first year at home', text: 'The cheapest way to cover the “12 years” is to pass all year-1 exams in your own country. Get a certificate listing the subjects and hours — it will also help with recognition' },
            { title: 'ISEE — start in February', text: 'Family certificates, translations and legalisation can take months. If you miss the DSU deadline, you’ll have to pay for the year yourself' },
            { title: 'The region matters more than the university', text: 'The scholarship amount, ISEE threshold and deadlines are set by the regional agency. Compare the bandi of 2–3 regions before choosing a university' },
            { title: 'The money doesn’t arrive straight away', text: 'The scholarship is paid in instalments, and the first one doesn’t arrive on the day you land. You need your own money for housing and food for the first months' },
            { title: 'Don’t lose your scholarship', text: 'If you don’t earn the required credits by the deadline, you can lose the scholarship or part of the payments. Read the bando section on academic requirements' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'Approximate, based on the 2026/27 cycle',
      title: 'Calendar',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Nov – Jun', title: 'University selection', text: 'Admission rounds for English-taught programmes; each university has its own dates, and strong universities hold their first rounds as early as November' },
            { period: 'Feb – May', title: 'Family documents', text: 'Certificates for ISEE parificato, translations, legalisation; DoV or CIMEA for your school certificate' },
            { period: 'Jul – Sep', title: 'Universitaly', text: 'Pre-application by the university’s deadline (in 2026: Turin — 15.07, Pisa and Venice — 30.09)' },
            { period: 'Jul – Sep', title: 'DSU', text: 'Application for the scholarship and dorm (ER.GO in 2026 — by 24.08)' },
            { period: 'By 30 Nov', title: 'Visa', text: 'The final deadline for visa applications in 2026/27; in practice, apply as early as possible' },
          ],
        },
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
            { label: 'Universitaly — pre-application for international students', url: 'https://www.universitaly.it/studenti-stranieri' },
            { label: 'CIMEA — recognition and verification of your certificate', url: 'https://www.cimea.it' },
            { label: 'Study in Italy (MAECI) — government scholarships', url: 'https://studyinitaly.esteri.it' },
            { label: 'ER.GO — an example of a regional DSU agency', url: 'https://www.er-go.it' },
            { label: 'Italian Embassy in Tashkent — visas and legalisation', url: 'https://ambtashkent.esteri.it' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'In Italy, whoever starts with the paperwork wins',
    text: 'Certificate recognition, the ISEE parificato and the Universitaly pre-application matter more than your motivation letter. Gather your family documents early, and DSU becomes real full funding.',
  },
};
