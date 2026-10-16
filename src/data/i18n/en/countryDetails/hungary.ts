import type { ContentPage } from '../../../types';

export const hungary: ContentPage = {
  title: 'Hungary: Stipendium Hungaricum without intermediaries',
  lead: 'Stipendium Hungaricum is the Hungarian government scholarship for bachelor\'s, master\'s and PhD studies. Applying is free and everything is done online; candidates are first selected by your own country, then by the Hungarian university. The key thing to understand: the scholarship covers tuition and housing, but it won\'t be enough to live on.',
  sections: [
    {
      id: 'grants',
      chip: 'Scholarship',
      badge: '1',
      kicker: 'What it covers',
      title: 'Stipendium Hungaricum',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'Bachelor\'s and master\'s',
              text: 'Free tuition, a stipend of **43,700 HUF/month** (≈ €110) 12 months a year, a free dormitory place or **40,000 HUF/month** (≈ €100) towards housing, medical care under Hungarian law and additional insurance of up to 65,000 HUF a year.',
            },
            {
              title: 'PhD',
              text: 'Free tuition, a stipend of **140,000 HUF/month** (≈ €355) in the first phase (4 semesters) and **180,000 HUF/month** (≈ €460) in the second. Housing and insurance — the same as for bachelor\'s students.',
            },
            {
              title: 'What\'s not included',
              text: 'Flights are not covered. The programme itself says the payments only help with living costs and don\'t cover them in full. Euro amounts use the exchange rate as of 13.10.2025.',
            },
          ],
        },
        { type: 'callout', text: 'About 30 universities and 900+ programmes. You can choose **2 programmes** — choose both, it improves your chances. You can\'t change your choice after applying.' },
      ],
    },
    {
      id: 'partners',
      chip: 'Quotas',
      badge: '2',
      kicker: 'Who nominates you',
      title: 'Nomination through your country',
      blocks: [
        { type: 'text', text: 'You apply yourself, but **only those nominated by the sending partner** — an agency in your country — go further. Each country has its own restrictions on fields of study and its own additional requirements.' },
        {
          type: 'grid',
          items: [
            { title: 'Kazakhstan', text: 'Partner — the Center for International Programs "Bolashak". Full degree and exchange at all levels, any field' },
            { title: 'Uzbekistan', text: 'Ministry of Higher Education (MHSSE). Bachelor\'s — any field except law, sports, arts and art education. Master\'s and PhD — any field, including medicine. Documents go only into the SH system; nothing is sent separately to the ministry' },
            { title: 'Tajikistan', text: 'Ministry of Education (maorif.tj). Bachelor\'s and master\'s — only in the listed fields (e.g. agriculture, engineering, medicine). PhD — any field' },
            { title: 'Kyrgyzstan', text: 'Ministry of Education and Science. Full degree and exchange at all levels, any field; it has its own application system, student.edu.gov.kg' },
          ],
        },
        { type: 'callout', variant: 'black', text: 'The list of fields and conditions for your country changes every year. Before applying, open the Partners page on the SH website and your agency\'s website: they may have their own deadlines and additional documents.' },
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
            { title: 'Age', text: 'By 31 August of the year your studies start, you must be **18** (for the 2026/27 cycle — born no later than 31.08.2008). The exception is dance programmes' },
            { title: 'Citizenship', text: 'You apply only through the country of your citizenship. Hungarian citizens (including dual citizens), refugees and holders of a Hungarian residence permit can\'t apply' },
            { title: 'Language', text: 'The minimum English level is set by the university — check the programme page in the application system. For Hungarian-taught programmes — B2; if you don\'t speak Hungarian, you can take a preparatory year' },
            { title: 'University exam', text: 'Universities hold an entrance exam or interview. To make the final list, you need to score **at least 56 out of 100**' },
          ],
        },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '4',
      kicker: 'The 2026/27 cycle as a guide',
      title: 'Six stages',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: 'Nov – Dec', title: 'Choosing programmes', text: 'You check which fields are open for your country, choose 2 programmes and check the university\'s requirements.' },
            { when: 'Dec', title: 'Contact with the sending partner', text: 'You check your agency\'s requirements, register in the SH system and upload your documents.' },
            { when: '15 January', title: 'Deadline', text: 'In the 2026/27 cycle — 15 January 2026, 14:00 Central European Time. Nothing is accepted after that.' },
            { when: 'Feb', title: 'Nomination', text: 'Your country selects the best candidates; their applications are passed on to Hungarian universities.' },
            { when: 'Mar – May', title: 'University exams', text: 'An online exam or interview. The threshold is 56/100.' },
            { when: 'Late June – early July', title: 'Results', text: 'The official decision from Tempus Public Foundation.' },
          ],
        },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '5',
      kicker: 'What to upload',
      title: 'Document package',
      blocks: [
        {
          type: 'note',
          intro: 'For bachelor\'s and master\'s (based on the 2026/27 cycle documents):',
          items: [
            'A scan of your original school leaving certificate (attestat) (or diploma) and its official notarised translation',
            'Transcript with your grades for the years completed (it can\'t be submitted after the deadline)',
            'A language certificate at the level the university requires',
            'Motivation letter: at least 1 page, Times New Roman 12, in the language of the programme or in Hungarian',
            'Passport page (if you don\'t have a passport yet — an ID card and a commitment to upload the passport later)',
            'Online application form in English with a photo no older than 2 years',
          ],
        },
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'For this year\'s graduates', text: 'Your school leaving certificate, language certificate and passport can be submitted after the deadline with a signed declaration — no later than 1 August. Your grade transcript can\'t' },
            { title: 'Medical certificate', text: 'Only needed by winners, on the programme\'s mandatory template signed by a doctor. It isn\'t uploaded to the system: you bring it to Hungary for the mandatory medical check. Issue date — no earlier than the one stated in the call' },
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'Prepare in advance',
      title: 'What you\'ll need your own money for',
      blocks: [
        { type: 'text', text: 'Applying is free, but the stipend (~€110) won\'t be enough to live on. Budget your own money for the start and for every month.' },
        {
          type: 'costs',
          rows: [
            ['Application', '€0'],
            ['Language certificate (one the university accepts)', 'at the test centre\'s price in your country'],
            ['Notarised translations', 'school certificate, transcript, other documents'],
            ['Flights', 'at your own expense — the scholarship doesn\'t cover them'],
            ['Living costs beyond the stipend', 'food, transport, phone — the amount depends on the city'],
          ],
        },
      ],
    },
    {
      id: 'hacks',
      chip: 'Tips',
      badge: '!',
      kicker: 'Insider view',
      title: 'Tips and common mistakes',
      blocks: [
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Check your age in advance', text: 'If you won\'t be 18 by 31 August of the year your studies start, your application won\'t be accepted. Many graduates from CIS countries lose a year because of this' },
            { title: 'Two programmes, not one', text: 'Apply for 2 programmes (at the same or different universities). The order matters: you are considered for your first programme first, and the order can\'t be changed after the deadline' },
            { title: 'Hungarian language is mandatory', text: 'On bachelor\'s and master\'s programmes you must complete 2 semesters of Hungarian. The course is free, but if you don\'t complete it, your scholarship may be reduced or cancelled' },
            { title: 'Don\'t fall behind on credits', text: 'If over the last two semesters you average fewer than 18 credits per semester (36 for the two), the university may terminate your scholarship' },
            { title: 'Don\'t disappear after winning', text: 'If you accept the scholarship but don\'t arrive and don\'t notify them by 15 October, you won\'t be allowed to apply in future cycles' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: '2027/28 cycle — approximate',
      title: 'Calendar',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Sep – Oct', title: 'Preparation', text: 'IELTS or another certificate, translations of your school certificate, a draft motivation letter' },
            { period: 'Nov – Dec', title: 'Applications open', text: 'The call for applications usually comes out in autumn; choose 2 programmes and check your country\'s conditions' },
            { period: 'Mid-Jan', title: 'Deadline', text: 'In the last cycle — 15 January, 14:00 CET. Check the exact date for 2027/28 in the new call' },
            { period: 'Feb – May', title: 'Nomination and exams', text: 'Selection in your country, then university exams and interviews' },
            { period: 'Jun – Jul', title: 'Results', text: 'Final results; studies start in September' },
          ],
        },
        { type: 'callout', text: 'You can apply in your final school year: you are allowed to submit your school leaving certificate by 1 August. But the transcript with your grades is needed by the deadline.' },
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
            { label: 'Stipendium Hungaricum — official website', url: 'https://stipendiumhungaricum.hu' },
            { label: 'How to apply (stages and deadlines)', url: 'https://stipendiumhungaricum.hu/apply/' },
            { label: 'Sending partners — conditions for your country', url: 'https://stipendiumhungaricum.hu/partners/' },
            { label: 'Study in Hungary — university portal', url: 'https://studyinhungary.hu' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'Your country first, then the university',
    text: 'Without a nomination from the sending partner, your application won\'t go any further. Check your age, the fields open to your country and the university\'s language requirements in advance.',
  },
};
