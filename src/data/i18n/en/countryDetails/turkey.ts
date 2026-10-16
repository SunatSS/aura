import type { ContentPage } from '../../../types';

// Facts checked against turkiyeburslari.gov.tr (Criteria & Scholarship Programs,
// Full-Time Programs, Application Calendar, Evaluation and Selection Process,
// Application in 5 Steps, the "Türkiye Scholarships 2026 Applications" announcement).
export const turkey: ContentPage = {
  title: 'Türkiye Burslari: how to win Turkey\'s main scholarship',
  lead: 'The Turkish government scholarship is merit-based: your family income doesn\'t matter — your grades, motivation and a clear plan do. It covers tuition, a dormitory, insurance and a language year, and pays a monthly stipend. Applying is free and online only — you don\'t need any agents.',
  sections: [
    {
      id: 'gives',
      chip: 'What you get',
      badge: '1',
      kicker: 'Scholarship package',
      title: 'What exactly the scholarship covers',
      blocks: [
        { type: 'text', text: 'The programme itself places you at a university and programme from your list of priorities — you don\'t need to apply to the university separately.' },
        {
          type: 'grid',
          items: [
            { title: 'Tuition and placement', text: 'Full tuition and a university place — the programme picks it from your priorities.' },
            { title: 'Stipend', text: 'According to the official website: **6,500 TL/month** for bachelor\'s, **9,500 TL** for master\'s, **13,000 TL** for doctoral students. The lira amounts are revised from time to time — check the website.' },
            { title: 'Housing', text: 'Bachelor\'s students live in a dormitory for the whole programme, paid for by the scholarship. Master\'s and doctoral students get a dormitory for the first year, then a rent allowance.' },
            { title: 'Insurance, language, flights', text: 'Health insurance, a one-year Turkish course and a plane ticket — once at the start of your studies and once after graduation.' },
          ],
        },
        {
          type: 'callout',
          title: 'Merit Scholarship — a double stipend',
          text: 'For very strong candidates there is the Merit Scholarship with a **double stipend**. For a bachelor\'s you need: an average grade of 90% or higher, SAT 1400+ with Math 680+ for engineering or 1350+ for other fields (or IB 33+), TOEFL iBT 80 / IELTS 6.5, and one more of the following two: top 10 in your country\'s national exam or a medal at an international olympiad recognised by TÜBİTAK.',
        },
      ],
    },
    {
      id: 'who',
      chip: 'Requirements',
      badge: '2',
      kicker: 'Who gets in',
      title: 'Formal requirements',
      blocks: [
        {
          type: 'grid',
          items: [
            { title: 'Bachelor\'s', text: 'Age — under 21. Average grade on your school leaving certificate (attestat) — 70% or higher.' },
            { title: 'Medicine, dentistry, pharmacy', text: 'The threshold is higher — 90% or more.' },
            { title: 'Master\'s', text: 'Under 30, average diploma grade — 75% or higher.' },
            { title: 'Doctorate', text: 'Under 35, average grade — 75% or higher. You need a research topic and a sample of written academic work.' },
          ],
        },
        {
          type: 'cards',
          items: [
            { title: 'You can apply from grade 11', text: 'Both graduates and those who will finish school by August of the current academic year are eligible.' },
            { title: 'Who can\'t apply', text: 'Turkish citizens (and those who have lost that citizenship), as well as those already studying at a Turkish university at the same level they are applying for.' },
            { title: 'Language', text: 'For Turkish-taught programmes, a certificate is not required when you apply. For English-taught ones, you need TOEFL, IELTS or an equivalent as the university requires, and often SAT, GRE or GMAT as well.' },
          ],
        },
        { type: 'callout', text: 'The 70/75/90% thresholds are only the minimum for the technical check. You are competing with thousands of candidates, so the real chance goes to those whose grades are noticeably higher.' },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '3',
      kicker: 'How selection works',
      title: 'Five selection stages',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: '10 Jan – 20 Feb', title: 'Online application in TBBS', text: 'Application form, document scans, a motivation letter (letter of intent) and a list of programmes in order of priority at tbbs.turkiyeburslari.gov.tr. No paper documents are needed at this stage.' },
            { when: 'March – April', title: 'Preliminary check and expert review', text: 'First, the formal criteria are checked: age, grades, documents. Then a panel of experts assesses your academic record, interests and goals, **how consistent your chosen programmes are**, your motivation letter and your community involvement.' },
            { when: 'April – June', title: 'Test (for bachelor\'s)', text: '30 questions in 60 minutes: maths, geometry, logic. The questions are in Turkish and English, based on the basic Turkish school curriculum. Sample questions with answers are published on the website. It takes place on the day of the interview.' },
            { when: 'April – June', title: 'Interview', text: 'Usually 15–30 minutes in front of a panel of academics and experts: they check your documents and ask why you are applying, what you know about your field and what your goals are. Bring the documents for your most recent education.' },
            { when: 'Early August', title: 'Results and moving', text: 'The final committee approves the list of scholars. Paperwork in August, arrival in Turkey in September.' },
          ],
        },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '4',
      kicker: 'Scans and originals',
      title: 'Documents and legalisation',
      blocks: [
        { type: 'subheading', text: 'For the online application (scans)' },
        {
          type: 'note',
          intro: 'According to the official list on turkiyeburslari.gov.tr:',
          items: [
            'Passport or ID card',
            'A photo taken no earlier than one year before you apply',
            'School leaving certificate (attestat) or a temporary certificate of graduation',
            'Transcript with your grades',
            'National exam results, if your country has one',
            'SAT/GRE/GMAT and a language certificate — if your chosen programme requires them',
            'For a PhD — a research topic and a sample of academic work',
          ],
        },
        { type: 'subheading', text: 'If you win: university enrolment' },
        {
          type: 'steps',
          badge: 'blue',
          items: [
            { title: 'Original school leaving certificate', text: 'Universities require the original. Sometimes they enrol you conditionally on a temporary certificate, but you\'ll have to bring the original within ~90 days.' },
            { title: 'Translation into Turkish', text: 'A translation of your school leaving certificate, certified by a notary or the Turkish consulate in your country.' },
            { title: 'Denklik — recognition of your certificate', text: 'A certificate stating that your school leaving certificate is equivalent to a Turkish one. It is issued by the education offices at Turkish embassies and consulates, or, if there is no such office, by the Turkish Ministry of Education. It\'s easier to get it while still at home.' },
            { title: 'Apostille if you have no denklik', text: 'Some universities accept documents without denklik only with an apostille or Ministry of Foreign Affairs certification. Requirements vary between universities — check your admission letter.' },
          ],
        },
        { type: 'callout', text: 'The exact list of enrolment documents depends on the university. It will come along with the scholarship decision.' },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'What you pay yourself',
      title: 'Start-up costs',
      blocks: [
        { type: 'text', text: 'The application itself is free. But you\'ll have to pay for a few things before your first stipend arrives.' },
        {
          type: 'costs',
          rows: [
            ['Applying in TBBS', 'free'],
            ['Notarised translation and certifications', 'depends on the country'],
            ['Denklik / apostille', 'depends on the country'],
            ['IELTS / TOEFL / SAT', 'only if the programme requires them or for Merit'],
            ['Travel to the interview in another city', 'at your own expense'],
            ['First weeks in Turkey before the first stipend', 'set aside a reserve'],
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
            { title: 'A logical programme list', text: 'Consistency of priorities is an official assessment criterion. A list like "medicine + journalism + geology" in different cities reads as "take me anywhere". Stick to one line.' },
            { title: 'A letter without clichés', text: 'The panel sees phrases about "a bridge between Europe and Asia" by the thousand. Write about what you have already done in your field, what you will study and how it will be useful back home.' },
            { title: 'Prepare for the test in advance', text: '30 problems in 60 minutes is a fast pace. Work through the official samples and revise school geometry and logic.' },
            { title: 'You need Turkish at C1 level', text: 'Even on an English-taught programme, without a C1 certificate you face a mandatory year of Turkish. By the end of the year you need to reach C1. Start learning the language at home — your first year will be much easier.' },
            { title: 'Check recognition at home', text: 'The programme itself advises making sure your chosen field is recognised in your country. This matters especially for medicine, law and education.' },
            { title: 'You don\'t need agents', text: 'Applying is only through tbbs.turkiyeburslari.gov.tr and is free. If someone asks for money for a "guaranteed" Türkiye Burslari, it\'s a scam.' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: '2027 cycle (approximate)',
      title: 'Calendar',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Oct – Dec', title: 'Preparation', text: 'Gather your school leaving certificate and transcript, awards, photos. Draft your letter and put together your programme list. Take IELTS/SAT if you want to.' },
            { period: '10 Jan – 20 Feb', title: 'Applying', text: 'The 2026 window was 10 January – 20 February. Dates for 2027 haven\'t been announced yet — plan for the same period.' },
            { period: 'Mar – Apr', title: 'Application review', text: 'Preliminary check and expert assessment.' },
            { period: 'Apr – Jun', title: 'Test and interview', text: 'The invitation arrives in your personal account and by email.' },
            { period: 'Early Aug', title: 'Results', text: 'Results are published, paperwork in August.' },
            { period: 'September', title: 'Moving', text: 'Arrival in Turkey and the start of the Turkish language year.' },
          ],
        },
        { type: 'callout', text: 'If you are already studying in Turkey at your own expense, take a look at the **Success Scholarship**: applications open around October – November. It is only a monthly stipend for one academic year, without housing. You must have studied in Turkey for at least a year and not receive any other scholarship.' },
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
            { label: 'Türkiye Burslari — official website', url: 'https://www.turkiyeburslari.gov.tr' },
            { label: 'TBBS — application system', url: 'https://tbbs.turkiyeburslari.gov.tr' },
            { label: 'Criteria and age limits', url: 'https://www.turkiyeburslari.gov.tr/scholarshipsprograms' },
            { label: 'What the scholarship and Merit Scholarship cover', url: 'https://www.turkiyeburslari.gov.tr/fulltimeprograms' },
            { label: 'Selection stages, test and interview', url: 'https://www.turkiyeburslari.gov.tr/evaluationandselectionprocess' },
            { label: 'Application calendar', url: 'https://www.turkiyeburslari.gov.tr/calendar' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'The key is one clear story',
    text: 'A strong application is one clear story: who you are, what you will study in Turkey and why it matters to you and your country. A logical programme list and an honest letter count for more than a stack of participation certificates.',
  },
};
