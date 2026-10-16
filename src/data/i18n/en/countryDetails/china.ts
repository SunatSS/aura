import type { ContentPage } from '../../../types';

export const china: ContentPage = {
  title: 'China on a CSC grant: a breakdown without middlemen',
  lead: 'The Chinese Government Scholarship (CSC) is one of the largest government programmes in the world: tuition, a dorm, insurance and a monthly stipend. Since 2026, bachelor’s applicants must take the CSCA exam, so old guides no longer work. Here’s how it works now.',
  sections: [
    {
      id: 'grants',
      chip: 'Grants',
      badge: '1',
      kicker: 'Two ways into one programme',
      title: 'How the CSC grant works',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'Type A — through your own country',
              text: 'A bilateral quota: applications are accepted by your country’s agency or the Chinese embassy, which also recommends candidates to CSC. In Kazakhstan in 2026, documents were accepted by JSC “Center for International Programs” (via egov.kz or in person) — 73 grants for bachelor’s/master’s/PhD. In Tajikistan and Uzbekistan, look for the announcement on the Chinese embassy’s and the education ministry’s websites — each country sets its own quotas and deadlines.',
            },
            {
              title: 'Type B — through a university (University Program)',
              text: 'You apply directly to a Chinese university, and the university selects and nominates you to CSC. Important: under Type B you choose **only one university** (Fudan, for example, states this explicitly). Each university has its own agency number (Fudan — 10246, Tianjin University — 10056) and its own deadline.',
            },
            {
              title: 'What it covers',
              text: 'Tuition, on-campus housing (or a housing allowance), health insurance, and a stipend: **2 500 yuan/month** for a bachelor’s, **3 000** for a master’s, **3 500** for a PhD. Chinese-taught programmes usually add a preparatory year of Chinese. Flights and personal expenses are on you.',
            },
            {
              title: 'Separate university programmes',
              text: 'Some universities run their own tracks within CSC — for example, the Silk Road Program at Tianjin University. But the list of eligible countries is limited (in 2026, Tianjin’s list had no Central Asian countries), so always check that your citizenship qualifies.',
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
            { title: 'Age', text: 'Bachelor’s — under 25, master’s — under 35, PhD — under 40' },
            { title: 'CSCA (bachelor’s)', text: 'Mandatory from the 2026/2027 cycles. Maths — always; physics or chemistry — at least one for engineering, natural science, agriculture and medicine; “Professional Chinese” — only for Chinese-taught programmes' },
            { title: 'Chinese (HSK)', text: 'For Chinese-taught programmes. The threshold depends on the university and level: BLCU asks for HSK 4 for master’s/PhD, Tianjin University — HSK 5 with 180+ points' },
            { title: 'English', text: 'For English-taught programmes — per the university’s rules. A benchmark: IELTS 6.0 / TOEFL 80 (Tianjin University). If you studied in English, a letter confirming it is sometimes enough' },
            { title: 'Grades', text: 'CSC has no single GPA threshold — the university assesses your school certificate, CSCA and motivation. The higher your grades and CSCA scores, the better' },
            { title: 'Health and record', text: 'A medical check on the Foreigner Physical Examination form and a police clearance certificate (usually no older than 6 months)' },
          ],
        },
      ],
    },
    {
      id: 'csca',
      chip: 'CSCA',
      badge: '3',
      kicker: 'New since 2026',
      title: 'The CSCA exam: what you need to know',
      blocks: [
        { type: 'text', text: 'CSCA (China Scholastic Competency Assessment) is a unified academic test for international students applying for a bachelor’s at universities with a CSC grant. Without a CSCA score report, most universities simply won’t accept your bachelor’s application.' },
        {
          type: 'facts',
          items: [
            { value: '5 times', label: 'a year: January, March, April, June, December' },
            { value: '450 ¥', label: 'for one subject; 700 ¥ for two or more' },
            { value: '100', label: 'points — the scale for each subject' },
          ],
        },
        {
          type: 'cards',
          items: [
            { title: 'Subjects', text: 'Maths (48 questions, 60 minutes), physics and chemistry (48 questions, 60 minutes each), Professional Chinese (80 questions, 90 minutes). Maths, physics and chemistry can be taken in English or Chinese — as the university requires.' },
            { title: 'Format', text: 'A computer-based or paper test at an authorised centre, or online from home with proctoring. Results: 7 working days (computer/online), 14 for the paper version.' },
            { title: 'When to take it', text: 'In advance: many universities (for example, BLCU) require the test to be taken before their deadline. In Kazakhstan in 2026, CSCA was taken after the Type A selection — the rules depend on the application channel.' },
          ],
        },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '4',
      kicker: 'From choosing a university to a visa',
      title: 'Five stages of applying',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: '10–12 months before', title: 'University, language and CSCA', text: 'Choose a university and programme from the CSC list, take HSK or IELTS, and register for the next CSCA session (for a bachelor’s).' },
            { when: '3–6 months before', title: 'Letter from the university', text: 'For a master’s/PhD you almost always need a pre-admission letter or a supervisor’s consent. BLCU, for example, issues it free of charge by email within 3–5 working days. For a bachelor’s — per the university’s rules.' },
            { title: 'CSC application form', text: 'Fill in the online form at campuschina.org: for Type A — your country’s agency number, for Type B — the university’s number. Print it, sign it, and upload it to the university’s system along with your package.' },
            { title: 'Selection', text: 'The university checks your documents and may hold an interview and a written exam (at Tianjin University — May–July), then CSC approves the final list.' },
            { when: 'July–August', title: 'Admission Notice and visa', text: 'You receive the Admission Notice and the JW201/JW202 form, and with them an X1 student visa. Registration at the university is at the end of August or start of September; arriving late without agreement cancels the grant.' },
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'Prepare in advance',
      title: 'What the grant doesn’t cover',
      blocks: [
        { type: 'text', text: 'Applying to CSC is free, but preparing isn’t. Prices for exams, the notary and the medical check depend on your city — check locally.' },
        {
          type: 'costs',
          rows: [
            ['CSCA', '450 ¥ for 1 subject, 700 ¥ for 2+'],
            ['HSK / IELTS', 'per the price list of the centre in your city'],
            ['Medical check on the Foreigner Physical Examination form', 'depends on the clinic; valid for 6 months'],
            ['Notarised copies and translations', 'depends on the notary and the volume'],
            ['Flight to China', 'not covered by the grant'],
            ['First weeks before the stipend arrives', 'set aside money for food, a SIM card, small things'],
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
            { title: 'Type B — one shot per cycle', text: 'Since under Type B you can choose only one university, don’t pick the very top one at random. Compare your grades and CSCA scores with the university’s profile and choose realistically' },
            { title: 'Medical check — not too early', text: 'The form is valid for 6 months. Do it in September, and by registration in August it will have expired' },
            { title: 'Scans, not photos', text: 'Tianjin University says it plainly: colour scans from a scanner; phone photos are not accepted. Many universities silently reject unreadable files' },
            { title: 'Read the Study Plan requirements', text: 'The length varies a lot: from 200 words for a bachelor’s at BLCU to 600 at Tianjin. Be specific: courses, labs, what you’ll do after graduating' },
            { title: 'Under 18?', text: 'You’ll need documents from a guardian in China — the university provides its own form. Collect them early; this is the slowest item' },
            { title: 'A CV without gaps', text: 'Some universities ask for your study history from high school onwards with no gaps between years — fill in every period' },
          ],
        },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '$',
      kicker: 'Document package',
      title: 'What to collect and how to certify it',
      blocks: [
        {
          type: 'note',
          intro: 'A typical bachelor’s package (the exact list is in your university’s guide):',
          items: [
            'CSC application form from campuschina.org and the university’s application form',
            'Passport — scan of the main page, valid for at least 12 months from the start of studies',
            'Notarised copy of your school leaving certificate (attestat) (or a letter confirming expected graduation) and your transcript of grades',
            'CSCA score report',
            'Language certificate (HSK or IELTS/TOEFL — depending on the programme)',
            'Study Plan in English or Chinese',
            'Recommendation letter from a teacher (for master’s/PhD — two from professors)',
            'Foreigner Physical Examination Form with the doctor’s signature, clinic stamp and photo',
            'Police clearance certificate (usually no older than 6 months)',
            'For applicants under 18 — documents from a guardian in China',
          ],
        },
        { type: 'text', text: 'All documents not in Chinese or English need a **notarised translation**. Since 7 November 2023, China has been a party to the Apostille Convention, as are Tajikistan, Uzbekistan and Kazakhstan. For the application itself, universities usually ask for notarised copies and translations; whether you need an apostille at registration — check with the university.' },
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'Your name — exactly as in your passport', text: 'The Latin spelling in your translations, CSC form and CSCA must match your international passport letter for letter' },
            { title: 'Bring the originals', text: 'If you applied with a letter confirming expected graduation, you must present the original attestat before registration — otherwise the grant may be withdrawn' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'Approximate, based on the 2026 cycle',
      title: 'Calendar for the 2027 intake',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Sep – Nov', title: 'Choosing a university and language', text: 'HSK/IELTS, CSCA registration. The first universities open Type B as early as October: in the last cycle Fudan accepted master’s/PhD applications from 13 October to 10 December' },
            { period: 'Dec – Feb', title: 'CSCA and Type A', text: 'CSCA sessions in December and January. The Type A window through your own agency is usually January–February (Kazakhstan 2026: 21 January – 10 February, then extended to 18 February)' },
            { period: 'Mar – May', title: 'Type B deadlines', text: 'Most university deadlines. Some programmes keep the window open longer: Silk Road at Tianjin — until 18 May 2026' },
            { period: 'May – Jul', title: 'Selection', text: 'Interviews and exams at universities, review by CSC' },
            { period: 'Jul – Aug', title: 'Results', text: 'Admission Notice, JW201/JW202, X1 visa' },
            { period: 'Late Aug – Sep', title: 'Start', text: 'Registration at the university strictly on the stated dates' },
          ],
        },
        { type: 'callout', text: 'Deadlines change every year and differ between universities. The dates above are a guide based on the last cycle; always check the final deadline in the university’s guide or with your agency (for Type A).' },
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
            { label: 'Campus China — CSC portal and online application form', url: 'https://www.campuschina.org' },
            { label: 'CSCA — official exam website', url: 'https://csca.cn' },
            { label: 'Chinese Test — HSK registration', url: 'https://www.chinesetest.cn' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'The key thing is not to miss the CSCA',
    text: 'Strong grades won’t save you anymore without a CSCA taken on time. Register for the next session, then polish your Study Plan.',
  },
};
