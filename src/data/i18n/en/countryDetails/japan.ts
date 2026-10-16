import type { ContentPage } from '../../../types';

export const japan: ContentPage = {
  title: 'Japan on a MEXT scholarship: a no-panic guide',
  lead: 'MEXT is the Japanese government scholarship: free tuition, a monthly allowance and flights. You don\'t need to know Japanese beforehand — but you do have to pass exams at the embassy and be honest with yourself about the rules: your university is assigned to you, and you can\'t change your field of study.',
  sections: [
    {
      id: 'grants',
      chip: 'Scholarships',
      badge: '1',
      kicker: 'MEXT categories',
      title: 'The main scholarship tracks',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'Undergraduate Students — bachelor\'s',
              text: '**117,000 yen per month** (+2,000–3,000 yen in some regions), no fees for the entrance exam, admission or tuition, and a round-trip economy-class ticket. 5 years: 1 year of preparatory Japanese + 4 years of bachelor\'s study (medicine, dentistry, veterinary science and 6-year pharmacy — 7 years).',
            },
            {
              title: 'Research Students — master\'s and PhD',
              text: 'You start as a research student and move on to a master\'s or doctoral programme. Stipend: 143,000 yen (preparatory and non-degree research students), 144,000 (master\'s), 145,000 (doctoral) per month.',
            },
            {
              title: 'Embassy vs University Recommendation',
              text: 'The main route for a school student is through the Japanese embassy in your country. There is also a recommendation through the university itself, but not every university has such quotas — check the website of the specific university.',
            },
            {
              title: 'Other programmes',
              text: 'The embassy in Uzbekistan, for example, also recruits for "Japanese Studies", a teacher training programme and Young Leaders (a master\'s for civil servants). There are tracks for colleges of technology and specialised training colleges — also up to age 25.',
            },
          ],
        },
        { type: 'callout', title: 'Housing is not included', text: 'Even in a preparatory-centre or university dormitory, you pay for accommodation yourself — out of your stipend. This is the main difference between MEXT and many other scholarships.' },
      ],
    },
    {
      id: 'requirements',
      chip: 'Requirements',
      badge: '2',
      kicker: 'Who gets in',
      title: 'Basic candidate profile (2027 intake)',
      blocks: [
        {
          type: 'grid',
          items: [
            { title: 'Age', text: 'Bachelor\'s — born on or after 2 April 2002. Research Students — on or after 2 April 1992' },
            { title: 'Education', text: '12 years of school, or a school equivalent to a Japanese upper secondary school — by March of the starting year. Our schools have 11 grades: check with the embassy whether your school leaving certificate (attestat) qualifies' },
            { title: 'Japanese', text: 'Not required. You need to be willing to learn the language and study in Japanese. JLPT is a plus, but not a condition' },
            { title: 'English and grades', text: 'MEXT rules set no fixed IELTS or GPA threshold — English and maths are tested in a written exam at the embassy' },
            { title: 'Citizenship', text: 'You apply only through the embassy of the country of your citizenship. You can\'t be a former MEXT scholar or apply to another MEXT programme at the same time' },
            { title: 'Health', text: 'A medical certificate on the MEXT form, filled in by a doctor' },
          ],
        },
      ],
    },
    {
      id: 'exams',
      chip: 'Exams',
      badge: '3',
      kicker: 'First screening at the embassy',
      title: 'What to take for each field',
      blocks: [
        { type: 'text', text: 'When you apply, you choose a field (Social Sciences and Humanities A/B or Natural Sciences A/B/C) and up to three majors within it. Your exams depend on the field. **Calculators are not allowed.**' },
        {
          type: 'letters',
          rows: [
            { letter: 'A', title: 'Humanities A and B', text: 'Law, political science, education, sociology, literature, history, Japanese (A); economics and business administration (B). Exams: Japanese, English, Mathematics (A)' },
            { letter: 'B', title: 'Natural Sciences A', text: 'Mathematics, physics, chemistry, electronics, IT, mechanical engineering, civil engineering, chemical engineering. Exams: Japanese, English, Mathematics (B), Chemistry, Physics' },
            { letter: 'C', title: 'Natural Sciences B and C', text: 'Agricultural sciences, veterinary science, pharmacy, nursing, biology (B); medicine and dentistry (C). Exams: Japanese, English, Mathematics (B), Chemistry, Biology' },
          ],
        },
        { type: 'text', text: 'Arts, including music, are not eligible. Every candidate takes the Japanese exam, even with zero knowledge. MEXT later also uses your exam results when assigning universities — so every point counts twice.' },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '4',
      kicker: 'From application to departure',
      title: 'Five selection stages',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: 'April', title: 'Call for applications', text: 'The embassy announces the intake and publishes the forms. Official forms and guidelines are on Study in Japan.' },
            { when: 'April – May', title: 'Applying to the embassy', text: 'Two sets: originals and copies. In Uzbekistan in 2026, applications were accepted until 25 May.' },
            { when: 'June – July', title: 'Exams and interview', text: 'Written tests for your field and an interview at the embassy. Those who pass the first screening are recommended to MEXT.' },
            { when: 'Dec – Feb', title: 'Final MEXT selection', text: 'MEXT decides who gets the scholarship and which university they go to. Reasons for rejection are not given, and you can\'t contest your placement.' },
            { when: '1–7 April', title: '"Student" visa and departure', text: 'You get your visa at the Japanese embassy in your country. If you arrive late for personal reasons, your ticket won\'t be covered.' },
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'Prepare in advance',
      title: 'Hidden costs',
      blocks: [
        { type: 'text', text: 'MEXT is generous, but the money doesn\'t arrive right away: the first payment comes 1–1.5 months after you land.' },
        {
          type: 'costs',
          rows: [
            ['Cash for the first month and a half (MEXT recommendation)', '≈ $2,000'],
            ['Dormitory / apartment accommodation', 'from your stipend'],
            ['Travel to the international airport, fees, baggage', 'at your own expense'],
            ['Translating documents into English/Japanese', 'depends on the agency'],
            ['JLPT / IELTS (optional)', 'per the test centre\'s prices'],
            ['National health insurance in Japan', 'you sign up yourself after arrival'],
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
            { title: 'Your field is for good', text: 'You can\'t change your track (Humanities A/B, Natural Sciences A/B/C) or transfer to another university. Choose your field as if you were signing a 5-year contract' },
            { title: 'The preparatory year is not a formality', text: 'If you can\'t keep up with the preparatory course or fail the university entrance exam after it, the scholarship is cancelled and you are sent home. Start learning Japanese before you fly out' },
            { title: 'Want to go straight to university? You need the language', text: 'Direct placement (no preparatory year) is possible if your Japanese is good enough or the university programme is taught in English. This is where JLPT helps' },
            { title: 'JLPT is close by', text: 'JLPT is held in Tashkent, Almaty, Dushanbe and Bishkek — in July and December (in Astana — December only). For MEXT, the certificate must be no older than 2 years' },
            { title: 'Maths without a calculator', text: 'The exam is handwritten — practise solving problems without gadgets, especially if you are applying for the natural sciences' },
          ],
        },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '$',
      kicker: 'Document package',
      title: 'What to collect and how to prepare it',
      blocks: [
        {
          type: 'steps',
          badge: 'blue',
          items: [
            { title: 'FY2027 application form', text: 'Only the current year\'s form. Photo 4.5×3.5 cm, no older than 6 months, with your name and citizenship on the back.' },
            { title: 'Transcript for all years of upper secondary school', text: 'With the grading scale. Issued by the school or a government body. If you are still studying — a transcript to date; you\'ll submit the final one later.' },
            { title: 'School leaving certificate (attestat) or certificate of expected graduation', text: 'Don\'t send originals — documents are not returned. The copy is certified by an authorised person at the school or government body.' },
            { title: 'Recommendation and medical certificate', text: 'A letter from your homeroom teacher or principal (free format, a sample is provided) and a medical certificate on the MEXT form from a doctor.' },
            { title: 'Language certificates (if you have them)', text: 'JLPT, IELTS, TOEFL — 2 copies, issued no earlier than 2 years before you apply.' },
          ],
        },
        { type: 'text', text: 'Anything not in Japanese or English needs a translation into one of these languages. In the top right corner of the first page of each document, write its number from the MEXT list (① – ⑨). MEXT rules don\'t require an apostille for the application, but a particular embassy may ask for its own — check the announcement.' },
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Two sets', text: 'A full set of originals + a full set of copies. Bound documents may be taken apart during checks — don\'t bind them' },
            { title: 'Your name — letter for letter', text: 'The spelling of your name on the application form, translations and passport must match' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'Embassy Recommendation, bachelor\'s',
      title: 'Calendar for the 2028 intake',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Oct – Mar', title: 'Preparation', text: 'Maths, English, basic Japanese. The December JLPT — if you want a certificate' },
            { period: 'April', title: 'Announcement', text: 'The embassy announces the intake; new forms on Study in Japan come out in April' },
            { period: 'Apr – May', title: 'Applying', text: 'Roughly until the end of May (Uzbekistan 2026 — until 25 May)' },
            { period: 'Jun – Jul', title: 'Exams and interview', text: 'At the embassy in your country' },
            { period: 'Aug', title: 'First screening results', text: 'Successful candidates are recommended to MEXT' },
            { period: 'Dec – Feb', title: 'Final result', text: 'MEXT\'s decision and university placement' },
            { period: 'April', title: 'Departure', text: 'Arrival on 1–7 April, start of the preparatory year' },
          ],
        },
        { type: 'callout', text: 'The 2027 intake is already closed (May–June 2026). The next one is in spring 2027, for a start in April 2028. In Tajikistan and Kazakhstan, keep an eye on the Japanese embassy websites: each embassy announces its own dates and format.' },
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
            { label: 'Study in Japan — MEXT scholarship', url: 'https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/' },
            { label: 'Study in Japan — MEXT forms and guidelines for undergraduates', url: 'https://www.studyinjapan.go.jp/en/smap-stopj-applications-undergraduate.html' },
            { label: 'Embassy of Japan in Uzbekistan — MEXT programmes', url: 'https://www.uz.emb-japan.go.jp/itpr_ru/programMEXT.html' },
            { label: 'JLPT — Japanese language exam', url: 'https://www.jlpt.jp/e/' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'The embassy exam matters more than your school certificate',
    text: 'Solid maths and English plus a confident interview — and you have a real chance of going to Japan without paying a single tuition fee.',
  },
};
