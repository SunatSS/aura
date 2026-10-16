import type { ContentPage } from '../../../types';

export const uk: ContentPage = {
  title: 'United Kingdom: Chevening and the honest truth about a Bachelor’s',
  lead: 'Britain’s main full grant is Chevening: one year of a Master’s paid for by the UK government. But it’s for those who already have a Bachelor’s degree and two years of work experience. For school students there are almost no full grants, and a CIS school leaving certificate (attestat) is usually not enough for direct admission. We go through both paths without illusions.',
  sections: [
    {
      id: 'grants',
      chip: 'Grants',
      badge: '1',
      kicker: 'What actually exists',
      title: 'Main programmes',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'Chevening — Master’s, full grant',
              text: 'A UK government scholarship for a **one-year Master’s**. It covers full tuition fees, a monthly living stipend, a return flight, the visa fee and a travel grant for Chevening events. It runs in Kazakhstan, Uzbekistan, Tajikistan and other countries in the region.',
            },
            {
              title: 'Bachelor’s — almost no full grants',
              text: 'The UK does not give state grants to international students for a Bachelor’s. There are some scholarships from the universities themselves (some for citizens of countries on the development-aid list), but they are very few and competition is huge. Without your own money or an external sponsor, a British Bachelor’s is hard to count on.',
            },
          ],
        },
        { type: 'callout', text: 'If you’re a school student and want to study in the UK for free, the realistic plan is: get a Bachelor’s in a country with a full grant, work for 2 years and apply for Chevening.' },
      ],
    },
    {
      id: 'requirements',
      chip: 'Requirements',
      badge: '2',
      kicker: 'Who Chevening accepts',
      title: 'Basic candidate profile',
      blocks: [
        {
          type: 'grid',
          items: [
            { title: 'Work experience', text: 'At least **2 800 hours** (≈ 2 years of full-time work) **after** finishing your Bachelor’s. Full-time and part-time jobs, volunteering and internships all count. Experience before and during your studies doesn’t count' },
            { title: 'Degree', text: 'A Bachelor’s that qualifies you for a UK Master’s. You must have the diploma in hand by the interview' },
            { title: 'Three universities', text: 'You need to apply to 3 different Master’s programmes and get an unconditional offer from at least one of them by the deadline' },
            { title: 'Returning home', text: 'A commitment to return to your country for at least 2 years after the scholarship ends. There is no upper age limit' },
          ],
        },
        { type: 'text', text: '**English:** since 2020 Chevening hasn’t required its own language certificate, but each university sets its own IELTS/TOEFL threshold. Without a certificate at the required level there will be no unconditional offer. Pre-sessional language courses don’t count towards this condition.' },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '3',
      kicker: '2027/28 cycle',
      title: 'Six stages of Chevening',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: 'August', title: 'Applications open', text: 'Online form: 4 essays, details of your studies and work, 3 programmes.' },
            { when: 'October', title: 'Deadline', text: 'In the 2027/28 cycle applications closed in October 2026 (exact date on your country’s page, time — 11:00 UTC).' },
            { when: 'Oct – Jan', title: 'Eligibility check and essay assessment', text: 'First they check you meet the requirements, then a panel reads the applications.' },
            { when: 'Mid-Feb', title: 'Shortlist', text: 'They announce who is invited to interview.' },
            { when: 'Mar – Apr', title: 'Interview', text: 'Documents must be uploaded no later than 7 working days before the interview.' },
            { when: 'Jun – Jul', title: 'Results and offer', text: 'Results — from mid-June. Unconditional offer — by 8 July 2027, 17:00 London time. Studies start in September/October 2027.' },
          ],
        },
      ],
    },
    {
      id: 'essays',
      chip: 'Essays',
      badge: '4',
      kicker: 'Four essays — equal weight',
      title: 'What the essays are assessed on',
      blocks: [
        {
          type: 'letters',
          rows: [
            { letter: 'L', title: 'Leadership and influence', text: 'Concrete examples with results: you changed a process in an organisation, launched a project, solved a problem. You don’t have to be the boss' },
            { letter: 'N', title: 'Networking', text: 'How you built working relationships and what came out of that collaboration — in numbers and facts' },
            { letter: 'C', title: 'Course choice', text: 'Why these three courses, with a focus on the first: modules, professors, the link to your experience and goals' },
            { letter: 'P', title: 'Career plan', text: 'Measurable short-, medium- and long-term goals, and how you will work with the UK after your studies' },
          ],
        },
        { type: 'callout', variant: 'black', text: 'Chevening explicitly forbids generating answers with AI. Check the word limit in your cycle’s application form.' },
      ],
    },
    {
      id: 'bachelor',
      chip: 'Bachelor’s',
      badge: '5',
      kicker: 'If you’re still at school',
      title: 'A Bachelor’s in the UK: as it is',
      blocks: [
        {
          type: 'accordion',
          items: [
            {
              title: 'An attestat is usually not enough',
              text: 'British universities work with A-levels or IB. Example: for Kazakhstan, UCL lists an A-level equivalent of ABB, and of local qualifications it considers **2 years** of a Bachelor’s at a recognised Kazakh university with a GPA of 4.5/5. Each university has its own requirements — see the “International / Information by country” section.',
              bullets: [
                'Foundation year — a preparatory year at the university (e.g. UCL UPC), applied for directly with the university, not through UCAS',
                'A-levels or IB at an international school',
                '1–2 years of university at home — accepted by some universities',
              ],
            },
            {
              title: 'UCAS deadlines for 2027',
              text: 'All Bachelor’s applications go through UCAS.',
              bullets: [
                'Oxford, Cambridge and most medicine, dentistry and veterinary programmes — by 15 October 2026, 18:00 London time',
                'Main equal-consideration deadline — 13 January 2027, 18:00 London time',
                'Final application deadline for 2027 — 23 September 2027 (places are often already filled by then)',
              ],
            },
            {
              title: 'Money for the visa',
              text: 'For a student visa you need to show living funds: **£1 529/month** in London or **£1 171/month** outside London, for a maximum of 9 months. The money must be in your account for **28 consecutive days**, and that period must end no more than 31 days before you apply. The visa fee is £558. Plus the mandatory health surcharge (IHS) — check the amount on gov.uk.',
            },
          ],
        },
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
            { title: 'Count your hours honestly', text: 'The system counts the hours itself (weeks × hours per week), and you can list up to 15 periods. If you have fewer than 2 800 hours after graduating, your application will be rejected' },
            { title: 'The offer is your job', text: 'Chevening doesn’t apply to universities for you. Apply to universities in parallel and take IELTS early so your offer becomes unconditional by 8 July' },
            { title: 'Don’t wait for the opening', text: 'The application window is about two months (August–October). Start your essays, IELTS and programme choice in summer, before applications open' },
            { title: 'Don’t confuse it with a Bachelor’s', text: 'Chevening is only a 1-year Master’s. Websites promising “Chevening for school students” are misleading' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'Chevening 2028/29 — estimated',
      title: 'Calendar',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Jan – Jul', title: 'Preparation', text: 'IELTS, choosing 3 programmes, drafts of the 4 essays, employment letters' },
            { period: 'August', title: 'Opening', text: 'Applications for 2028/29 will open in August 2027' },
            { period: 'October', title: 'Deadline', text: 'Based on the 2027/28 cycle — early October; check the exact date on your country’s page' },
            { period: 'Feb – Apr', title: 'Shortlist and interview', text: 'Shortlist in mid-February, interviews in March–April' },
            { period: 'Jun – Jul', title: 'Results', text: 'Results from mid-June, unconditional offer — by early July' },
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
            { label: 'Chevening — official website', url: 'https://www.chevening.org' },
            { label: 'Chevening — cycle timeline', url: 'https://www.chevening.org/scholarships/application-timeline/' },
            { label: 'Chevening — eligibility', url: 'https://chevening.org/resource-hub/guidance/eligibility/' },
            { label: 'UCAS — applying for a Bachelor’s', url: 'https://www.ucas.com' },
            { label: 'GOV.UK — student visa and money', url: 'https://www.gov.uk/student-visa/money' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'The UK — a goal for after your Bachelor’s',
    text: 'For a school student a full grant in the UK is almost out of reach. But a Bachelor’s on a grant in another country plus two years of work make Chevening a realistic goal.',
  },
};
