import type { ContentPage } from '../../../types';

export const northCyprus: ContentPage = {
  title: 'Northern Cyprus: discounts, degree recognition and agents',
  lead: 'Northern Cyprus is heavily advertised as “Europe at 50–100% off”. In reality these are partial tuition discounts at universities on an unrecognised territory. Only Turkey recognises it. Before you go, check two things: what the “grant” actually covers, and whether this degree will be recognised back home.',
  sections: [
    {
      id: 'reality',
      chip: 'What “grants”?',
      badge: '1',
      kicker: 'Honestly',
      title: 'What a “scholarship” really means here',
      blocks: [
        { type: 'text', text: 'Almost all “grants” here are a **tuition discount**. It is given on admission based on your grades. You pay for accommodation, registration fees, insurance, the medical check-up and living costs yourself. There are no government scholarships for international students like in Turkey or Hungary.' },
        {
          type: 'cards',
          items: [
            { title: 'METU NCC', text: 'A campus of Turkey’s METU (Ankara). Tuition discounts of 25/50/75/90/100% based on grades. The full price for international Bachelor’s students in 2025/26 is $9 450 a year. But even with 100% you still pay a registration fee of **$500 per semester** and the dormitory: scholarship holders pay for it themselves.' },
            { title: 'Eastern Mediterranean University (EMU)', text: 'According to the university’s materials, international Bachelor’s and Master’s students get a 50% “scholarship” right on admission (except medicine, pharmacy and dentistry). So 50% is effectively the base price for an international student, not a reward. For Master’s and PhD there are limited quotas for 100% tuition coverage with separate deadlines.' },
            { title: 'Other universities', text: 'Near East, CIU and other private universities also advertise discounts for international students. Conditions change every year — check them only on the university’s official website and in a written offer.' },
          ],
        },
        { type: 'callout', text: 'Almost everywhere the discount can be withdrawn for poor grades. At METU NCC the scholarship is suspended if your CGPA is below 2.00 for two semesters in a row. Find out your university’s condition before enrolling.' },
      ],
    },
    {
      id: 'recognition',
      chip: 'Recognition',
      badge: '2',
      kicker: 'The main risk',
      title: 'Will your degree be recognised?',
      blocks: [
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Only Turkey recognises the territory', text: 'Turkey recognises degrees from Northern Cypriot universities, which is why many graduates go on to work or study there. For the rest of the world it is an unrecognised territory. Diplomats of the Republic of Cyprus have publicly stated that visas and degrees issued there have no international validity.' },
            { title: 'The Morocco precedent', text: 'In 2024 Morocco abruptly suspended recognition of degrees from Northern Cypriot universities. In 2026 graduates are still protesting: they came home with degrees the state cannot validate.' },
            { title: 'The Kenya precedent', text: 'Kenya’s Commission for University Education warned that Cyprus International University is not accredited there.' },
            { title: 'METU NCC — the exception', text: 'The degree is issued by METU’s main campus in Ankara, it is recognised by YÖK, and it comes with a Europass Diploma Supplement. The recognition risk here is lower than at local private universities.' },
          ],
        },
        { type: 'callout', variant: 'black', title: 'Do this before applying', text: 'Write to or visit your country’s ministry of education (the department for recognition/nostrification of foreign degrees) and ask in writing: will the degree from this specific university in your field be recognised? This is especially important for medicine, dentistry, pharmacy, law and teaching. The rules can change while you are studying — as happened in Morocco.' },
      ],
    },
    {
      id: 'agents',
      chip: 'Agents',
      badge: '!',
      kicker: 'An aggressive market',
      title: 'Agents and red flags',
      blocks: [
        { type: 'text', text: 'Northern Cypriot universities actively recruit students through agents in Asia and Africa. Agents promote cheap tuition, an easy visa and an “internationally recognised” degree. Nigerian authorities have specifically warned about dishonest agents, and NGOs have warned that people are drawn into human trafficking under the guise of studying.' },
        {
          type: 'twoLists',
          columns: [
            {
              tag: 'Red flags',
              color: 'orange',
              title: 'Walk away if',
              items: [
                'They promise a “100% grant” without grades or documents',
                'They ask for a deposit to a personal card or a transfer to the “agent” rather than the university',
                'They say the degree is “recognised everywhere in Europe”',
                'They promise legal work and a move to the EU after graduation',
                'They rush you: “the discount expires tomorrow”',
              ],
            },
            {
              tag: 'The right way',
              color: 'purple',
              title: 'Do it yourself',
              items: [
                'Apply directly through the university website — you don’t need an agent for that',
                'Ask for a written offer stating the discount percentage and the conditions for keeping it',
                'Pay only to the university’s official bank details',
                'Check degree recognition at home before paying',
                'Find graduates from your country on social media and ask them directly',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'METU NCC example, 2025/26',
      title: 'What you’ll pay even with a discount',
      blocks: [
        {
          type: 'costs',
          rows: [
            ['Registration fee (non-refundable)', '$500 per semester'],
            ['Dormitory (not covered by the scholarship)', '≈ $1 430 – 2 960 per semester'],
            ['Dormitory deposit (refundable)', '$200'],
            ['Withdrawing before registration', '$1 125 + 5% VAT is withheld'],
            ['Health insurance when applying for a residence permit', '10% of the monthly minimum wage per year'],
            ['Medical tests on arrival', 'at your own expense'],
            ['Flights only via Turkey', 'depends on the route'],
          ],
        },
        { type: 'text', text: 'Figures are from the official METU NCC page. Amounts differ at other universities, but the cost items are the same: registration, dormitory, insurance, medical check-up, travel.' },
      ],
    },
    {
      id: 'arrival',
      chip: 'Moving',
      badge: '3',
      kicker: 'Visa and residence permit',
      title: 'How to enter and get a residence permit',
      blocks: [
        {
          type: 'steps',
          items: [
            { title: 'Flying via Turkey', text: 'All flights to Northern Cyprus go via Turkey, to Ercan airport. You can’t get to the campus through the Republic of Cyprus’s airports. Whether you need a Turkish transit visa depends on your citizenship — check with the Turkish embassy.' },
            { title: 'Entry', text: 'Most countries don’t need an entry visa, but the rules depend on your citizenship. Bring your letter of admission with you.' },
            { title: 'Medical check-up', text: 'The student residence permit requires a medical report: tests for HIV, hepatitis B and C, syphilis (RPR) and a chest X-ray for tuberculosis. It is done at approved local labs or at Turkish state hospitals.' },
            { title: 'Student residence permit', text: 'You apply online through the government portal within the first weeks after arrival (1–2 months depending on the university). Without a residence permit you can be deported — the university’s international office will explain the procedure.' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'Approximate',
      title: 'When to apply',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'All year round', title: 'Bachelor’s applications', text: 'Most universities accept applications on a rolling basis. At METU NCC the international admissions committee reviews applications every week.' },
            { period: 'Spring – July', title: 'Best window', text: 'Apply early: better chances of a high discount and a dormitory place. EMU gives an extra discount for paying the full year early: 8% in June, 6% in July, 5% in August (2026/27).' },
            { period: 'Early August', title: 'EMU Master’s — 100%', text: 'Applications for the 100% scholarship for autumn 2026 were accepted until 6 August. For the spring semester — until 9 January 2026.' },
            { period: 'September', title: 'Studies begin', text: 'Arrival, registration, medical check-up and residence permit application.' },
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
            { label: 'METU NCC — fees and scholarships', url: 'https://international.ncc.metu.edu.tr/en/tuition-scholarships' },
            { label: 'METU NCC — FAQ: travel, residence permit, medical check-up, recognition', url: 'https://international.ncc.metu.edu.tr/en/faq' },
            { label: 'EMU — scholarships for Master’s and PhD', url: 'https://grad.emu.edu.tr/en/fees/scholarships' },
            { label: 'Cyprus Mail — Morocco refuses to recognise Northern Cyprus degrees (2026)', url: 'https://cyprus-mail.com/2026/07/21/moroccans-to-hold-sit-in-as-country-refuses-to-recognise-northern-cyprus-degrees' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'Cheap doesn’t mean worth it',
    text: 'Northern Cyprus can work if you plan a career in Turkey or are going to METU NCC. In all other cases, first get a written answer from your ministry about degree recognition — and only then pay.',
  },
};
