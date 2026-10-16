import type { ContentPage } from '../../../types';

// US admissions strategy with financial aid. Filling in the Common App is
// covered in a separate guide — this page only covers what is specific to the US.
export const usa: ContentPage = {
  title: 'The USA with financial aid: a strategy without an agency',
  lead: 'The US has no government grant for international students — the money comes from the universities themselves. Some top universities cover 100% of your financial need, even if your family can’t pay anything. What matters is understanding how a university looks at your request for aid and which financial documents it will ask for.',
  sections: [
    {
      id: 'aid',
      chip: 'Grants',
      badge: '1',
      kicker: 'How international students get funded',
      title: 'Need-blind, need-aware and full need',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Need-based aid', text: 'Aid based on need. The university looks at your family’s income and assets (via the CSS Profile) and works out how much you can really pay. It covers the difference with a grant that you don’t have to repay. This is the main path to a “full grant” in the US.' },
            { title: 'Need-blind for international students', text: 'Asking for aid **does not affect** the admission decision. There are about a dozen such universities for international students. Almost all of them also cover 100% of demonstrated need.' },
            { title: 'Need-aware', text: 'This is how most universities work: when admitting an international student, they take into account whether you’re asking for money. They may give aid, but the competition among those who ask for aid is noticeably tougher.' },
            { title: 'Merit scholarships', text: 'Scholarships for achievements, regardless of income. Usually a partial discount. A full merit grant for an international student is rare, and at top universities it barely exists.' },
          ],
        },
        { type: 'subheading', text: 'Need-blind for international students (according to official university websites)' },
        {
          type: 'highlights',
          items: [
            { tag: 'Harvard', text: 'International students get the same aid as Americans. From 2025/26, families earning up to $100 000 pay nothing.' },
            { tag: 'MIT', text: 'Need-blind, covers full need. Aid is grants and sometimes a campus job, no loans.' },
            { tag: 'Yale, Princeton, Amherst', text: 'Need-blind for everyone regardless of citizenship for a long time.' },
            { tag: 'Dartmouth', text: 'Need-blind for international students since the Class of 2026 intake, 100% of need.' },
            { tag: 'Bowdoin', text: 'Need-blind for international students since the 2022/23 cycle.' },
            { tag: 'Brown', text: 'Need-blind for international students since the Class of 2029 (fall 2025 intake).' },
            { tag: 'Notre Dame', text: 'Need-blind for international students since fall 2025, 100% of need with grants.' },
            { tag: 'Washington and Lee', text: 'Need-blind since the Class of 2029, 100% of need without loans.' },
          ],
        },
        { type: 'callout', text: 'The list changes almost every year. Before applying, open each university’s financial aid page and check two things: **need-blind for international** and **meets full demonstrated need**.' },
      ],
    },
    {
      id: 'requirements',
      chip: 'Requirements',
      badge: '2',
      kicker: 'Who gets in',
      title: 'Candidate profile',
      blocks: [
        {
          type: 'grid',
          items: [
            { title: 'Grades', text: 'There’s no formal threshold, but at top universities almost everyone is among the best in their school. Your progress across grades 9–11 and the difficulty of your subjects matter.' },
            { title: 'SAT/ACT', text: 'The test-optional era is ending. Harvard and MIT require the SAT/ACT again. According to public sources, so do Yale, Dartmouth, Brown, Cornell and Penn. Other universities, such as NYU, are still test-optional in the 2026/27 cycle. Check each university’s policy.' },
            { title: 'English', text: 'MIT as an example: IELTS 7+ (7.5 recommended), Duolingo 120+, TOEFL iBT 90+ on the old scale or 5+ on the new 1–6 scale (for tests from 21.01.2026). Each university has its own minimums.' },
            { title: 'Everything else', text: 'Essays, extracurricular activities with real results, recommendations from teachers and your school counsellor. Details are in the Common App guide.' },
          ],
        },
        { type: 'callout', text: 'If the SAT is hard to take in your country, Harvard in exceptional cases accepts national school-leaving exam results, IB or A-Level instead. It’s an exception, not the rule: if you can take the SAT, take it.' },
      ],
    },
    {
      id: 'finance',
      chip: 'CSS Profile',
      badge: '$',
      kicker: 'Financial documents',
      title: 'CSS Profile and IDOC',
      blocks: [
        { type: 'text', text: 'To get need-based aid, applying to the university isn’t enough. You also need a financial package — and it matters just as much as your essays.' },
        {
          type: 'steps',
          badge: 'blue',
          items: [
            { title: 'CSS Profile', text: 'The College Board form about your family’s income, assets and expenses. Opens on 1 October. It costs **$25 for the first university and $16 for each additional one**. College Board fee waivers are usually only available to families living in the US. For international students, the university itself sometimes provides payment codes (for example, NYU) — ask.' },
            { title: 'IDOC', text: 'If the university asks, you upload supporting documents through the College Board IDOC service: income statements, tax documents and so on. Everything in English or with a translation, amounts in US dollars.' },
            { title: 'Both parents', text: 'If your parents are divorced, many universities require a CSS Profile from the other parent too, or an official waiver request. Without it you can lose eligibility for institutional grants.' },
            { title: 'Deadlines', text: 'The CSS Profile is submitted together with your application: for the early round — around 1–15 November, for regular — January–February. Each university has its own date.' },
          ],
        },
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'The numbers must match', text: 'Income in the CSS Profile, in IDOC documents and in the visa application must be consistent. Discrepancies raise questions both at the aid office and with the consul.' },
            { title: 'Report unofficial income too', text: 'If your parents don’t have official income statements (seasonal work, money from relatives abroad), don’t hide it. Describe it honestly in the explanations section.' },
          ],
        },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '3',
      kicker: 'From a university list to a visa',
      title: 'Stages of admission',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: '12–18 months before', title: 'University list and tests', text: 'A three-tier list: need-blind + full need, need-aware with generous aid for international students, plus a few “realistic” options. First attempt at the SAT and IELTS/TOEFL/Duolingo.' },
            { when: 'Summer before grade 11', title: 'Essays and activities', text: 'Essay drafts, agreeing with teachers on recommendations, taking your projects through to results.' },
            { when: 'Oct – Nov', title: 'Early round', text: 'Early Decision or Early Action — usually by 1 November. CSS Profile goes in with the application.' },
            { when: 'Jan', title: 'Regular Decision', text: 'Main deadline — 1–15 January, financial documents — by February.' },
            { when: 'Mar – May', title: 'Decisions and choice', text: 'Decisions arrive in March–April together with the financial aid package. You usually need to reply by 1 May.' },
            { when: 'May – Aug', title: 'I-20 and F-1 visa', text: 'The university issues the I-20 → you pay the SEVIS fee → fill in the DS-160 → attend an interview at the US embassy.' },
          ],
        },
      ],
    },
    {
      id: 'visa',
      chip: 'Visa and costs',
      badge: '$',
      kicker: 'Prepare in advance',
      title: 'F-1 visa and hidden costs',
      blocks: [
        {
          type: 'costs',
          rows: [
            ['CSS Profile', '$25 + $16 for each additional university'],
            ['University application fee', 'many universities charge one; you can ask for a fee waiver'],
            ['SAT, IELTS / TOEFL / Duolingo', 'depends on the test and the country'],
            ['F-1 visa fee (MRV)', '$185'],
            ['SEVIS I-901', '$350'],
            ['Visa Integrity Fee', '$250 — some consulates charge it after the visa is approved'],
            ['Travel to the capital for the interview', 'at your own expense'],
          ],
        },
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Social media — public', text: 'Since June 2025, the State Department asks F/M/J applicants to make all their social media profiles public. Consuls check your online presence, and this can lengthen the screening.' },
            { title: 'Interview — in your own country', text: 'Since September 2025, non-immigrant visa applicants are asked to book an appointment at the embassy in their country of citizenship or permanent residence. Going to a neighbouring country “where it’s faster” may not work.' },
            { title: 'Turkmenistan', text: 'Citizens of Turkmenistan are on the list of partial entry restrictions. Under the proclamation in force from 1 January 2026, F student visas can be issued to them, but immigrant visas cannot. The rules change — check before applying.' },
          ],
        },
      ],
    },
    {
      id: 'hacks',
      chip: 'Tips',
      badge: '!',
      kicker: 'Free help and mistakes',
      title: 'EducationUSA and tips',
      blocks: [
        { type: 'text', text: '**EducationUSA** is the US State Department’s official network of advising centres, and consultations are free. In Central Asia, the centres are run by American Councils: in Dushanbe, Almaty, Astana and Shymkent, as well as in Bishkek. In Tashkent the format and address have changed — check the current details on educationusa.state.gov.' },
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Don’t ask for aid “just in case”', text: 'At need-aware universities, asking for aid is a real factor in admission. But if you can’t go without a grant, definitely ask. At many universities (for example, Washington and Lee, NYU Abu Dhabi), if you’re admitted without a grant, you won’t get one later.' },
            { title: 'Early Decision is a commitment', text: 'ED is a commitment to attend that university if you’re admitted. Choose an ED university whose aid will definitely work for you (ideally need-blind + full need), and calculate your need in advance with the university’s Net Price Calculator.' },
            { title: 'You need a school counsellor', text: 'US universities expect a recommendation and a School Report from a counsellor. Schools in Central Asia usually don’t have this role — arrange it in advance with your deputy head or class teacher and explain what will be required of them.' },
            { title: 'Agents and “guarantees”', text: 'Nobody can guarantee a grant in the US — only the university makes decisions. Paying an agent for a “guaranteed scholarship” is pointless. Free help is available at EducationUSA.' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'Fall 2027 intake',
      title: '2026/27 cycle calendar',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Spring – summer', title: 'Tests and university list', text: 'SAT and a language test — with time to spare for a retake.' },
            { period: '1 October', title: 'CSS Profile opens', text: 'Start gathering your family’s financial information.' },
            { period: '1 – 15 November', title: 'Early Decision / Early Action', text: 'For example, Harvard REA — 1 November. Financial documents are submitted together with the application.' },
            { period: '1 – 15 January', title: 'Regular Decision', text: 'For example, Harvard — 1 January. Missing aid documents — by ~1 February.' },
            { period: 'March – April', title: 'Decisions', text: 'The financial aid package arrives together with the decision.' },
            { period: 'By 1 May', title: 'Choosing a university', text: 'Next — I-20, SEVIS and booking your visa interview.' },
          ],
        },
        { type: 'callout', text: 'Dates are approximate and differ between universities. Write down each university’s deadlines separately — both for the application and for the CSS Profile.' },
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
            { label: 'EducationUSA — free advising and centres', url: 'https://educationusa.state.gov' },
            { label: 'CSS Profile — College Board', url: 'https://cssprofile.collegeboard.org' },
            { label: 'Common App', url: 'https://www.commonapp.org' },
            { label: 'SEVIS I-901 fee payment', url: 'https://www.fmjfee.com' },
            { label: 'Harvard — how financial aid works', url: 'https://college.harvard.edu/financial-aid/how-aid-works' },
            { label: 'MIT — test and English requirements', url: 'https://mitadmissions.org/apply/firstyear/tests-scores/' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'Strategy matters more than the number of applications',
    text: 'The right university list, an honest and careful CSS Profile and early SAT preparation get you further than 20 random applications.',
  },
};
