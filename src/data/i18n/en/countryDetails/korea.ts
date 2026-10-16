import type { ContentPage } from '../../../types';

export const korea: ContentPage = {
  title: 'Korea on a full scholarship: a no-panic guide',
  lead: 'The Korean system is nothing like the American or the European one: what matters most here is discipline, formal precision in your documents and a clear understanding of why you want Korea specifically. We go through it all step by step, simply and to the point.',
  sections: [
    {
      id: 'grants',
      chip: 'Scholarships',
      badge: '1',
      kicker: 'Three levels of funding',
      title: 'The main scholarship programmes',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'GKS (Global Korea Scholarship) — government',
              text: '100% tuition, a free language year, a stipend of ~1,000,000 ₩/month (bachelor\'s) or ~1,300,000 ₩ (master\'s), round-trip tickets, insurance and a settlement allowance. Two tracks: Embassy (3 universities, 3 selection stages) and University (1 university, 2 stages, softer competition in regional and technical fields).',
            },
            {
              title: 'University Merit Scholarships',
              text: 'SKY (SNU, Korea Univ, Yonsei) — a 30–100% discount for GPA and language. The technical flagships (KAIST, UNIST, DGIST, POSTECH) — often automatic full coverage + a stipend with a GPA ≥ 3.0/4.3. TOPIK discount: a level 5–6 certificate cuts the first semester\'s fees by 50–100% at many universities.',
            },
            {
              title: 'Professor grants (Lab Funding)',
              text: 'For master\'s and STEM: a professor takes you into their lab (Research Assistant) and pays your contract and salary from their own budget — relevant if you have found a supervisor in advance.',
            },
          ],
        },
      ],
    },
    {
      id: 'requirements',
      chip: 'Requirements',
      badge: '2',
      kicker: 'Who gets in',
      title: 'Basic candidate profile',
      blocks: [
        {
          type: 'grid',
          items: [
            { title: 'GPA', text: 'Minimum — 80% (3.2/4.0). Competitive for a full scholarship — 90–95%+' },
            { title: 'Korean (TOPIK)', text: 'Often not required for English-taught programmes, but TOPIK 4–6 is a huge advantage even there' },
            { title: 'English', text: 'Minimum — IELTS 5.5–6.0 / TOEFL 71. Competitive — IELTS 7.0–8.0+ / TOEFL 100+' },
            { title: 'Citizenship', text: 'Neither you nor your parents may hold Korean citizenship' },
          ],
        },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '3',
      kicker: 'From start to visa',
      title: 'Five admission stages',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: '10–12 months ahead', title: 'Strategy and tests', text: 'Choose a track (Embassy vs University) or apply directly to universities; take IELTS/TOPIK.' },
            { when: '4–6 months ahead', title: 'Documents and apostille', text: 'School leaving certificate (attestat) with a translation, legalisation, 2 recommendation letters in sealed envelopes, a Personal Statement and a Study Plan.' },
            { title: 'Applying', text: 'A physical package by courier (DHL/FedEx) to Korea or in person at the embassy.' },
            { when: '1–2 months later', title: 'Interview', text: 'Online via Zoom/Teams or in person at the embassy.' },
            { title: 'D-2 / D-4 visa', text: 'Certificate of Admission, proof of funds, student visa application.' },
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'Prepare in advance',
      title: 'Hidden preparation costs',
      blocks: [
        { type: 'text', text: 'Even a scholarship that ends up free is never free at the start.' },
        {
          type: 'costs',
          rows: [
            ['IELTS / TOPIK', '$40–250'],
            ['Apostille + notarised translation', '$100–300'],
            ['Document delivery (DHL/EMS)', '$50–100 per shipment'],
            ['Application fee (outside GKS)', '$80–150'],
            ['Bank balance certificate (not for GKS)', 'from $20,000 in the account'],
            ['First month on site', '$700–1,000'],
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
            { title: 'Don\'t pick all 3 SKY universities', text: 'A classic mistake of strong candidates is choosing SNU, Korea and Yonsei all at once. At the third stage, all three may reject you because of quotas. Strategy: 1 dream university + 1 solid Seoul university (Sungkyunkwan, Hanyang) + 1 strong regional one' },
            { title: 'The Study Plan decides everything', text: 'No "I love Korean culture". You need specific research questions, course titles and professors\' names, a semester-by-semester plan and how it will strengthen your country\'s ties with Korea' },
            { title: 'TOPIK beats perfect English', text: 'All else being equal, a candidate with TOPIK 3–4 wins over a candidate with perfect English but zero Korean — the committee is confident they will adapt faster' },
            { title: 'Formalities decide your application\'s fate', text: 'If the rules say "originals in one envelope, copies in three separate ones", do exactly that. A missing signature or the wrong page order disqualifies your application' },
          ],
        },
      ],
    },
    {
      id: 'letters',
      chip: 'Letters',
      badge: '$',
      kicker: 'Two documents that work together',
      title: 'Personal Statement and Study Plan',
      blocks: [
        { type: 'text', text: 'Korean committees are pragmatic — they don\'t need romance about K-pop. They want a mature candidate who understands why they need Korea and how they will pay back the scholarship. The Personal Statement is who you are (1.5–2 pages: a hook, academic background, practical experience, why Korea specifically). The Study Plan is what you will do, without the lyricism.' },
        {
          type: 'cards',
          items: [
            { title: 'Before Korea and the language year', text: 'Push your IELTS as high as it will go, bring your Korean up to TOPIK 3–4 during the language year, and keep building skills in your field (algorithms in C++, parsers in Python).' },
            { title: 'Years 1–2', text: 'Names of the faculty\'s core courses, membership in clubs (programming, design) to integrate into Korean society.' },
            { title: 'Years 3–4', text: 'Narrow specialised subjects, 1–2 specific labs or professors\' names, internship plans.' },
            { title: 'After graduation', text: 'A master\'s in Korea or returning home — with an emphasis on how this will benefit both countries.' },
          ],
        },
        { type: 'text', text: '**Three writing rules:** no fluff (replace "very" and "a lot" with numbers and names); a respectful but confident tone (no "I\'m the best in my school", but no excessive modesty either); one central theme — all your experience points to one goal.' },
      ],
    },
    {
      id: 'legalization',
      chip: 'Legalisation',
      badge: '$',
      kicker: 'Legalisation',
      title: 'How to prepare your school certificate — step by step',
      blocks: [
        { type: 'text', text: 'Korea is one of the most bureaucratically strict countries: a mistake in the order of stamps disqualifies your application at the very first stage. Originals are not returned, so you legalise your school leaving certificate in a way that lets you send a strong copy and keep the original.' },
        {
          type: 'steps',
          badge: 'blue',
          items: [
            { title: 'Apostille on the original', text: 'It goes strictly on the original, at the Ministry of Education (10–40 days). The committee often rejects an apostille on a notarised copy.' },
            { title: 'Notarised copy', text: 'You copy the already apostilled original in full — certificate, grades supplement, apostille stamp — and a notary certifies that the copy is true.' },
            { title: 'Translation of all the text', text: 'Absolutely everything is translated, including the text of the apostille stamp itself and the notary\'s inscriptions — into English or Korean.' },
            { title: 'Certifying the translator\'s signature', text: 'The translation is bound together with the notarised copy and a notary certifies the translator\'s signature — this thick package is what you send to the committee.' },
          ],
        },
        { type: 'text', text: '**Awards and certificates** are a separate matter: no apostille is needed, a regular translation is enough (ideally with the school\'s/organisation\'s stamp on the translation). Put them together in one A4 portfolio with captions like "Bronze Medal, Iranian Geometry Olympiad, 2024" — print in colour, Korean professors appreciate clear visuals.' },
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Your name — letter for letter', text: 'The spelling of your name in all translations must match your international passport. Saidova Maryam ≠ Saydova Mariyam — the document will be declared invalid' },
            { title: 'A consular stamp as an alternative', text: 'On the Embassy Track, the consul sometimes checks the originals against the copies on the spot and stamps them "true copy" — check with the embassy in advance, the rules change every year' },
            { title: 'Separate envelopes', text: 'Recommendation letters are sealed separately from your school certificate — never bind them together' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'GKS-U, bachelor\'s',
      title: 'Calendar for the autumn cycle',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Feb – Apr', title: 'Language exams', text: 'IELTS and/or TOPIK — leaving time to retake in summer' },
            { period: 'May – Jul', title: 'Choosing universities', text: '3–4 universities, drafts of the Personal Statement and Study Plan, putting together your portfolio' },
            { period: 'Jul – Aug', title: 'Legalisation', text: 'Apostille, notarised translation, finalising your motivation letters' },
            { period: 'Sep – Oct', title: 'Applying', text: 'The Embassy Track closes around 10–15 October; the University Track — mid to late October (send 5–7 days before the deadline)' },
            { period: 'Oct – Nov', title: 'Interview', text: 'Late October — early November' },
            { period: 'Jan – Mar', title: 'Results and start', text: 'Final NIIED and university results in January; departure and start of language courses — late February/March' },
          ],
        },
        { type: 'callout', text: 'You can apply while still in your final school year — with a certificate of expected graduation. The key is to have your school leaving certificate in hand by the time you leave.' },
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
            { label: 'Study in Korea — the official portal for international students', url: 'https://www.studyinkorea.go.kr' },
            { label: 'NIIED — the institute that awards GKS', url: 'https://www.niied.go.kr' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'Discipline matters more than a perfect score',
    text: 'The exact order of your documents and a clear Study Plan often matter more than a couple of extra IELTS points.',
  },
};
