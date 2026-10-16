import type { ContentPage } from '../../../types';

export const uae: ContentPage = {
  title: 'UAE: where the scholarship is real and where it\'s just a discount',
  lead: 'The UAE has no single government scholarship for international students — the money comes from the universities themselves. There are a few programmes with genuinely full coverage and lots of "discounts" dressed up as scholarships. We break down which is which — based on the universities\' official pages.',
  sections: [
    {
      id: 'grants',
      chip: 'Scholarships',
      badge: '1',
      kicker: 'Main options',
      title: 'Universities where you can really study for free',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'NYU Abu Dhabi — need-based aid', text: 'The New York University campus. You apply through the Common App, and all aid for non-Emiratis is based on financial need (CSS Profile). The full cost without aid is about **$84,400 a year** in direct costs alone (2026/27), so studying there without aid is nearly impossible. Finalists are invited to Candidate Weekend in Abu Dhabi, and NYUAD pays for the flight, visa, accommodation and meals.' },
            { title: 'MBZUAI — AI bachelor\'s', text: 'A university of artificial intelligence. Tuition is $45,000 a year. There are merit- and need-based scholarships **covering up to 100% of tuition and accommodation**. You need an average grade of 90% or higher and IELTS 6.5+. Olympiad winners (IMO, IOI, IPhO, etc.) get special priority.' },
            { title: 'MBZUAI — master\'s and PhD', text: 'Funded students get free tuition, a stipend (for Fall 2027, **15,500 AED/month** for international MSc students), a ticket home once a year, insurance and a visa. For a PhD, the university funds the first year, then your supervisor does. For an MSc, funding is **not guaranteed**: without an assistantship you pay tuition yourself.' },
            { title: 'AUS — President’s Scholarship', text: 'American University of Sharjah. For those who finished school outside the UAE: 100% of tuition, a stipend, a dormitory, three round-trip flights, insurance. The bar is high: 98% + SAT 1400, IELTS 7.0 / TOEFL 94, a portfolio, a video and 2 recommendations.' },
            { title: 'Khalifa University — tiers', text: 'An engineering university in Abu Dhabi. International students are given one of the tiers: Tier I — 100% of tuition, II — 75%, III — 50%, IV — 25%, V — no discount. Your tier is stated in the offer; there is no separate scholarship application. **There is no stipend for bachelor\'s students** — neither for Emiratis nor for international students.' },
          ],
        },
      ],
    },
    {
      id: 'reality',
      chip: 'Scholarship or discount',
      badge: '2',
      kicker: 'Honestly',
      title: 'What is fully covered and what isn\'t',
      blocks: [
        {
          type: 'twoLists',
          columns: [
            {
              tag: 'Full coverage',
              color: 'purple',
              title: 'You can live without your family\'s money',
              items: [
                'NYUAD — if your demonstrated need is high (aid depends on the CSS Profile)',
                'MBZUAI bachelor\'s — with a full scholarship',
                'MBZUAI PhD and funded MSc — tuition + stipend',
                'AUS President’s Scholarship — everything, including a stipend',
              ],
            },
            {
              tag: 'Discount',
              color: 'orange',
              title: 'Major costs remain',
              items: [
                'Khalifa University: even Tier I covers tuition only, with no stipend for bachelor\'s students',
                'AUS merit discount — 10–20% of tuition for an average grade of 95%+ in grades 10–11',
                'AUS grants in total — up to 55% of tuition and fees',
                'UAE University: tuition discounts (e.g. 75% with a GPA of 3.6+), housing not covered',
              ],
            },
          ],
        },
        { type: 'callout', text: 'If the offer says "scholarship", look for the numbers: what percentage of tuition, whether housing is included and whether there is a stipend. A 25% discount on tuition of $30,000+ a year is not a scholarship.' },
      ],
    },
    {
      id: 'requirements',
      chip: 'Requirements',
      badge: '3',
      kicker: 'Who gets in',
      title: 'Thresholds by university',
      blocks: [
        {
          type: 'grid',
          items: [
            { title: 'Khalifa University', text: 'IELTS Academic 6.0 or TOEFL iBT 79 (online IELTS is not accepted). For the Russian school certificate system, the stated requirement is maths and one science with a grade of 4.0 or higher in grade 11 (for your country\'s certificates, check with the admissions office). Shortlisted applicants may be invited to internal tests in maths and physics/chemistry.' },
            { title: 'MBZUAI (bachelor\'s)', text: 'Average grade of 90% or higher, IELTS 6.5 / TOEFL 90 / Duolingo 120 (Duolingo — only if other tests are unavailable). At-home versions of tests are not accepted.' },
            { title: 'AUS', text: 'President’s Scholarship: 98% and SAT 1400, IELTS 7.0. Merit discount: 95%+ for grades 10–11; grade 12 is not counted.' },
            { title: 'NYUAD', text: 'Holistic review, as at top US universities. In the 2026/27 cycle, NYU remains test-optional. The final stage is the mandatory Candidate Weekend.' },
          ],
        },
      ],
    },
    {
      id: 'legalization',
      chip: 'Legalisation',
      badge: '$',
      kicker: 'Paperwork',
      title: 'School certificate: attestation and equivalency',
      blocks: [
        { type: 'text', text: 'UAE universities almost always require two documents from international graduates: an attested school leaving certificate (attestat) and a certificate of equivalency from the UAE Ministry of Education.' },
        {
          type: 'steps',
          badge: 'blue',
          items: [
            { title: 'Your country\'s education authority', text: 'Your school leaving certificate and transcript are attested by the authorised education body (usually the Ministry of Education).' },
            { title: 'Your country\'s Ministry of Foreign Affairs', text: 'The next stamp comes from the Ministry of Foreign Affairs.' },
            { title: 'UAE embassy', text: 'The final attestation is done at the UAE embassy. Check in advance with the embassy or the UAE Ministry of Foreign Affairs whether this procedure works for documents from your country.' },
            { title: 'Certificate of Equivalency', text: 'After you are admitted, you apply for the certificate of equivalency via moe.gov.ae — at least 2 months before classes start. Some universities (AUS, Khalifa) let you start studying conditionally while it is being processed.' },
          ],
        },
        { type: 'callout', text: 'Complete the whole attestation chain **before you leave** your country. It\'s much harder to do from the UAE.' },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '4',
      kicker: 'Step by step',
      title: 'Admission stages',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: '12 months ahead', title: 'Choosing a strategy', text: 'NYUAD follows US university rules (Common App + CSS Profile). MBZUAI, Khalifa and AUS use their own portals. Take IELTS/TOEFL at a test centre, not at home.' },
            { when: 'Sep – Nov', title: 'Early round', text: 'NYUAD Early Decision I and MBZUAI Early Action — 1 November. For NYUAD, the CSS Profile is due by 10 November.' },
            { when: 'Dec – Feb', title: 'Main round', text: 'NYUAD ED II — 1 January, Regular — 5 January. MBZUAI Regular — 1 February. MBZUAI master\'s and PhD — 15 December.' },
            { when: 'Jan – Mar', title: 'AUS President’s', text: 'First you need to get an AUS offer, then apply for the scholarship with a portfolio. In 2026 the deadline was 19 March.' },
            { when: 'Spring – summer', title: 'Offer, visa, equivalency', text: 'The student visa is usually arranged by the university. You gather the attested documents and apply for equivalency.' },
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'Figures from university websites',
      title: 'What it costs without a scholarship',
      blocks: [
        {
          type: 'costs',
          rows: [
            ['NYUAD — direct costs, 2026/27', '≈ $84,400 a year'],
            ['MBZUAI — bachelor\'s tuition', '$45,000 a year + accommodation'],
            ['AUS — tuition, 2026/27', '110,876 AED a year'],
            ['Khalifa University — application', 'free'],
            ['CSS Profile (for NYUAD)', '$25 + $16 for each additional university'],
            ['Certificate attestation and equivalency', 'depends on the country'],
          ],
        },
        { type: 'text', text: 'If the discount covers only tuition, you are still left with housing, food and transport in one of the most expensive countries in the region. Work out your budget for all 4 years in advance.' },
      ],
    },
    {
      id: 'hacks',
      chip: 'Tips',
      badge: '!',
      kicker: 'Common mistakes',
      title: 'Tips and red flags',
      blocks: [
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'ED at NYUAD is a commitment', text: 'If you are rejected in Early Decision, you can\'t apply again in Regular in the same year. And if you are admitted, you commit to studying there.' },
            { title: 'Don\'t miss Candidate Weekend', text: 'Invited candidates must confirm attendance within 48 hours and come on their assigned weekend. Otherwise you are out of the running.' },
            { title: 'Test centre only, not at home', text: 'Khalifa doesn\'t accept online IELTS, and MBZUAI doesn\'t accept the Home Edition. Book your exam at a test centre straight away.' },
            { title: 'Be careful with agents', text: 'If an agent promises a "50% scholarship" at a private university, it is almost always a discount off the list price, not a scholarship — and life in the UAE is expensive. Check the terms on the university website and ask for an offer with numbers. All the universities on this page accept applications directly.' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'Fall 2027 intake',
      title: 'Calendar (approximate)',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: '7 September', title: 'MBZUAI portal', text: 'Applications open for bachelor\'s and master\'s/PhD.' },
            { period: '1 November', title: 'Early deadlines', text: 'NYUAD ED I (CSS Profile — 10 November), MBZUAI Early Action.' },
            { period: '15 December', title: 'MBZUAI master\'s/PhD', text: 'Final deadline for most programmes.' },
            { period: '1 – 5 January', title: 'NYUAD ED II and Regular', text: 'CSS Profile — 10 January (ED II) and 1 February (Regular).' },
            { period: '1 February', title: 'MBZUAI Regular', text: 'Decisions by 1 April.' },
            { period: 'March', title: 'AUS President’s Scholarship', text: 'In 2026 — by 19 March. Khalifa\'s schedule for Fall 2027 hasn\'t been published yet.' },
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
            { label: 'NYU Abu Dhabi — scholarships and financial aid', url: 'https://nyuad.nyu.edu/en/apply/undergraduate/scholarships-and-financial-aid.html' },
            { label: 'NYU Abu Dhabi — key dates and deadlines', url: 'https://nyuad.nyu.edu/en/apply/undergraduate/apply/key-dates-and-deadlines.html' },
            { label: 'MBZUAI — bachelor\'s', url: 'https://mbzuai.ac.ae/admissions/undergraduate-admissions' },
            { label: 'MBZUAI — master\'s and funding', url: 'https://mbzuai.ac.ae/admissions/graduate-masters-admissions' },
            { label: 'Khalifa University — scholarship FAQ', url: 'https://www.ku.ac.ae/scholarship-faqs' },
            { label: 'Khalifa University — undergraduate requirements', url: 'https://www.ku.ac.ae/undergraduate-admissions' },
            { label: 'AUS — grants and scholarships', url: 'https://www.aus.edu/admissions/financial-grants-and-scholarships' },
            { label: 'AUS — certificate of equivalency', url: 'https://www.aus.edu/admissions/bachelors-degrees/uae-certificate-of-equivalency' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'Look at the numbers, not the word "scholarship"',
    text: 'Full scholarships do exist in the UAE, but there are few of them and the competition is strong. Before celebrating an offer, work out how much you\'ll have to pay over 4 years.',
  },
};
