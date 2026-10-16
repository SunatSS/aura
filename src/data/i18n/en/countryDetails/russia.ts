import type { ContentPage } from '../../../types';

export const russia: ContentPage = {
  title: 'Russia for free: the quota, Open Doors and state-funded places',
  lead: 'For a school student from Central Asia, Russia is one of the most accessible options for free study. There are several suitable routes: the Government quota, the Open Doors olympiad, state-funded places on equal terms with Russians (for some CIS countries) and university olympiads. We break down what each route gives you and where to apply without intermediaries.',
  sections: [
    {
      id: 'ways',
      chip: 'Routes',
      badge: '1',
      kicker: 'How to study for free',
      title: 'Four routes to a state-funded place',
      blocks: [
        {
          type: 'cards',
          items: [
            { title: 'Russian Government quota', text: 'About 30,000 state-funded places a year for international students: bachelor\'s, specialist degree, master\'s, postgraduate. You apply at education-in-russia.com; the first round of selection is run by the Rossotrudnichestvo offices (Russian Houses) in your country.' },
            { title: 'Open Doors', text: 'An online olympiad by the Global Universities Association with 24 universities. Winners get a state-funded place within the quota without the usual entrance exams.' },
            { title: 'On equal terms with Russian citizens', text: 'Citizens of **Belarus, Kazakhstan, Kyrgyzstan and Tajikistan** can apply for state-funded places on general terms, "by right of citizenship" — with Unified State Exam (EGE) results or the university\'s entrance exams. Compatriots can also apply on equal terms with Russians if they confirm their status with documents.' },
            { title: 'University olympiads', text: 'Winners and prize-winners of university olympiads can be admitted without exams. These olympiads usually run from October to March.' },
          ],
        },
        { type: 'callout', text: 'You can combine routes: apply for the quota, take part in Open Doors and prepare for the EGE or university exams at the same time. If you are from Uzbekistan or Turkmenistan, your main routes are the quota and olympiads.' },
      ],
    },
    {
      id: 'quota',
      chip: 'Quota',
      badge: '2',
      kicker: 'What you get',
      title: 'What the quota covers',
      blocks: [
        {
          type: 'grid',
          items: [
            { title: 'Tuition', text: 'Completely free, paid from the federal budget — for the full length of the programme.' },
            { title: 'Stipend', text: 'Paid throughout your studies. The amount depends on the university and is usually small — not enough to live on.' },
            { title: 'Dormitory', text: 'Quota students are guaranteed a dormitory place on preferential terms. The fee is small, but not zero.' },
            { title: 'Preparatory faculty', text: 'If you don\'t know Russian, you first spend about a year at the preparatory faculty, then move on to the main programme.' },
          ],
        },
        { type: 'text', text: '**At your own expense:** travel, health insurance, medical examination and daily expenses. The quota means free tuition, not full support like the Turkish or Hungarian scholarships.' },
        { type: 'text', text: 'Competition is high: more than 80,000 applications came in for the 2024/25 cycle. Tajikistan was among the top three countries by number of applications in both 2023/24 and 2024/25. The most popular field is medicine.' },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '3',
      kicker: 'education-in-russia.com',
      title: 'How to apply for the quota',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: 'From September', title: 'Registration', text: 'Create an account on education-in-russia.com under your real name, exactly as in your passport. In the "My applications" section, click "Create a new application".' },
            { title: 'Application form and choice of universities', text: 'Choose the level of study, the field and **up to 6 universities in order of priority**.' },
            { title: 'Documents and submission', text: 'Upload the scans and submit your application for review. Applications with the "Draft" status don\'t take part in the competition.' },
            { title: 'Stage 1 — in your country', text: 'Selection is run by Rossotrudnichestvo and the embassy: they assess your academic record and motivation. For CIS countries, this is usually an online test.' },
            { title: 'Stage 2 — universities', text: 'If you make the list of second-stage candidates, universities review your application. You\'ll receive an email about portal access — after that, follow your status in your personal account.' },
            { when: 'Spring – summer', title: 'Placement and arrival', text: 'The result is a referral to one of your chosen universities, followed by an invitation to study and the move.' },
          ],
        },
      ],
    },
    {
      id: 'opendoors',
      chip: 'Open Doors',
      badge: '4',
      kicker: '2026/27 olympiad',
      title: 'Open Doors: a state-funded place through an olympiad',
      blocks: [
        {
          type: 'steps',
          badge: 'blue',
          items: [
            { when: '20 Aug – 1 Nov 2026', title: 'Registration and portfolio', text: 'An account on od.globaluni.ru, a track (bachelor\'s, master\'s, PhD) and one of 14 fields — from applied mathematics and AI to clinical medicine. Up to 6 universities in order of priority. Portfolio: passport, education document (or transcript), motivation letter, entrance test. Language certificates are optional.' },
            { when: '13 Nov – 21 Dec 2026', title: 'Stage two — online', text: 'A 180-minute task with online proctoring in a slot you choose. You must sign up by 16 November.' },
            { when: 'By 26 Feb 2027', title: 'Interview (PhD only) and results', text: 'PhD candidates have an interview with their future supervisors. 26 February 2027 — final lists of winners.' },
          ],
        },
        { type: 'callout', text: 'The winner\'s tuition is covered (Russian Government quota) and they receive a monthly stipend whose amount depends on the university. Travel, housing, insurance and personal expenses are on you. Participation is free; you can enter several fields, with a separate motivation letter for each.' },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '$',
      kicker: 'Legalisation and recognition',
      title: 'Documents',
      blocks: [
        {
          type: 'note',
          intro: 'For the quota application (scans):',
          items: [
            'Passport',
            'School leaving certificate (attestat), or a certificate of enrolment if you are still in grade 11',
            'Transcript / grades supplement',
            'For master\'s, residency and postgraduate programmes — a motivation letter and an essay or article on your future research',
          ],
        },
        {
          type: 'steps',
          badge: 'blue',
          items: [
            { title: 'Legalisation', text: 'For enrolment you need a legalised education document: an apostille or consular legalisation, depending on the country. CIS countries have mutual recognition agreements — check with the admissions office whether you need an apostille.' },
            { title: 'Translation into Russian', text: 'Documents in a foreign language are translated into Russian and certified by a notary.' },
            { title: 'Recognition in Russia', text: 'Check whether your document is recognised automatically — there is a service on the Rosakkredagentstvo website. If not, you need to apply for recognition and pay a state fee of 6,500 ₽.' },
          ],
        },
        { type: 'callout', text: 'Your name in Latin and Cyrillic letters must match your passport in all documents and on the portal. This is a common cause of enrolment delays.' },
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
            { title: 'Don\'t pick 6 universities in the capital', text: 'MSU, HSE and MGIMO on one list is a classic mistake. Add strong regional universities (Kazan, Tomsk, Novosibirsk, Yekaterinburg): your chances of getting a place there are noticeably higher.' },
            { title: 'Submit your application, not a draft', text: 'Every year candidates fill everything in but never click "submit". A draft doesn\'t take part in the competition.' },
            { title: 'Medicine is the toughest competition', text: 'If you dream of medicine, brush up on chemistry and biology early. Keep some less competitive universities on your list too.' },
            { title: 'You don\'t need intermediaries', text: 'Selection is run by Rossotrudnichestvo and the universities. If someone is selling you a "guaranteed quota" for money, it\'s fraud. Rossotrudnichestvo\'s quota hotline: +7 985 870-21-27.' },
            { title: 'Keep track of the Russian language rules', text: 'Right now each university tests international applicants\' Russian on its own. In September 2026, a draft single Russian-language entrance exam for international applicants was under discussion — check whether it will be introduced by your year.' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: '2027/28 intake (approximate)',
      title: 'Calendar',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: '20 August', title: 'Open Doors starts', text: 'Registration and portfolio — until 1 November 2026.' },
            { period: 'September', title: 'The quota opens', text: 'In the last cycle, applications opened on 15 September 2025.' },
            { period: 'November – December', title: 'Open Doors, stage 2', text: 'Online tasks, results on 21 December.' },
            { period: 'Until ~15 January', title: 'Quota deadline', text: 'In the 2026/27 cycle, applications were accepted until 15 January 2026. Check the exact date for 2027/28 on the portal and with the Russian House in your country.' },
            { period: '20 June – July', title: 'State-funded places on equal terms with Russians', text: 'For citizens of Belarus, Kazakhstan, Kyrgyzstan, Tajikistan: bachelor\'s applications open on 20 June and close between 10 and 25 July, depending on the university and exams.' },
            { period: 'August', title: 'Enrolment and arrival', text: 'Enrolment orders, the move, migration registration and medical examination through the university\'s international office.' },
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
            { label: 'Education in Russia — Russian Government quota portal', url: 'https://education-in-russia.com' },
            { label: 'Open Doors — Global Universities Association olympiad', url: 'https://od.globaluni.ru' },
            { label: 'Study in Russia — admission routes and documents', url: 'https://studyinrussia.ru/education' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'Free doesn\'t mean no expenses',
    text: 'The quota covers tuition and gives you a dormitory, but you pay for travel, insurance and living costs. Apply for the quota and Open Doors in parallel and choose universities wisely — it greatly improves your chances.',
  },
};
