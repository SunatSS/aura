import type { ContentPage } from '../../../types';

export const germany: ContentPage = {
  title: 'Germany: tuition-free universities and DAAD scholarships',
  lead: 'Germany has two very different routes. For a bachelor’s, almost nobody offers a full grant, but public universities in most federal states charge no tuition, so you only pay for living costs. For a master’s or PhD, there are real full DAAD scholarships, including EPOS for people who already have work experience. We walk through both routes honestly, with a Central Asian school leaving certificate (attestat) in mind.',
  sections: [
    {
      id: 'grants',
      chip: 'Grants',
      badge: '1',
      kicker: 'Where the money is, and where it’s just free tuition',
      title: 'Main programmes',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'DAAD EPOS — master’s for professionals with experience',
              text: 'Development-Related Postgraduate Courses: a stipend of **992 €/month** for a master’s (1 300 € for a PhD, 1 400 € from February 2026), insurance, travel costs, and sometimes extra allowances for rent and family. Duration 12–42 months. You need at least **2 years of work experience** after your bachelor’s, a degree no older than 6 years, and grades in the top third of your graduating class. You apply **not to DAAD but directly to the programme you choose** — up to three.',
            },
            {
              title: 'DAAD Study Scholarships — master’s in any field',
              text: '992 €/month, 460 € a year for study costs, insurance, travel. Tuition (if the university charges it) is not covered. Duration 10–24 months. The programme isn’t open to every country: you pick your country from the list on the scholarship page, and if yours isn’t there, you can’t apply. The portal opens on 1 June; the deadline depends on the country.',
            },
            {
              title: 'Tuition-free bachelor’s at a public university',
              text: 'This isn’t a grant — it’s simply no tuition fee. You only pay the semester contribution (usually from ~100 to ~400 €, 97 € at TUM) and cover your own living costs. Exceptions: in the state of **Baden-Württemberg**, non-EU students pay **1 500 € per semester**, and **TUM** (Munich) charges non-EU students 2 000–3 000 € per semester (2 300–3 400 € from winter semester 2027/28).',
            },
            {
              title: 'Deutschlandstipendium — once you’re already a student',
              text: '300 €/month, citizenship doesn’t matter. You apply through your university if it takes part. Selection is based on grades and social engagement. It’s a top-up to your budget, not full funding.',
            },
          ],
        },
      ],
    },
    {
      id: 'access',
      chip: 'Certificate',
      badge: '2',
      kicker: 'The most important part for school students',
      title: 'Is your school certificate enough?',
      blocks: [
        {
          type: 'text',
          text: 'As a rule, an 11-year school leaving certificate (attestat) from Central Asia does not give you direct access to a German university the way the German Abitur does. The decision is based on the **anabin** database (decisions of the Standing Conference of Education Ministers, KMK) and, ultimately, by the university. The routes are:',
        },
        {
          type: 'grid',
          items: [
            { title: 'Uzbekistan', text: 'Attestat (11 years) → **Studienkolleg** and the Feststellungsprüfung exam, giving access to all fields. Or **1 successful year** at a recognised university at home → direct admission in the same or a related field (KMK decision of 24.06.2021).' },
            { title: 'Tajikistan', text: 'The attestat alone isn’t enough. **1 year** of study at a public or recognised private university in Tajikistan → Studienkolleg in your subject area. **2 years** → direct admission in the same or a related field (KMK decision of 15.06.2023).' },
            { title: 'Kazakhstan', text: 'The rules depend on the type of document (regular attestat, NIS Grade 12 certificate, etc.). For NIS Grade 12 there are separate conditions based on five exams. Check your document in anabin or the DAAD database.' },
            { title: 'Other countries', text: 'Open the DAAD Admission Database, choose your country and document type. It’s a preliminary assessment — the final decision is made by the university.' },
          ],
        },
        {
          type: 'callout',
          title: 'Studienkolleg — what it is',
          text: 'A preparatory year (usually 2 semesters) by subject track: T — technology, M — medicine, W — economics, and others. At the end you take the Feststellungsprüfung. Public colleges usually charge no tuition, but there is an entrance exam in German (usually B1–B2 level) and often in maths. Places are limited and the competition is real. Each college has its own rules, so check its website.',
        },
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
            { title: 'German (bachelor’s)', text: 'Most bachelor’s programmes are taught in German. German-taught programmes usually require DSH-2 or TestDaF 4. For Studienkolleg — B1–B2 at entry' },
            { title: 'English (master’s)', text: 'Each programme sets its own IELTS/TOEFL threshold. English-taught EPOS programmes require IELTS or TOEFL; the institutional TOEFL is not accepted' },
            { title: 'Grades', text: 'EPOS: a bachelor’s degree (usually 4 years) with results in the top third of your class. For a bachelor’s, what matters is your attestat average converted to the German grading scale' },
            { title: 'Experience and degree age', text: 'EPOS: at least 2 years of experience after your bachelor’s. DAAD Study Scholarships and EPOS: degree usually no older than 6 years, and you have lived in Germany for no more than 15 months' },
          ],
        },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '4',
      kicker: 'The bachelor’s route via Studienkolleg',
      title: 'Five stages of admission',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: '12–18 months before', title: 'German and checking your certificate', text: 'Learn German to B1–B2 and check in anabin or the DAAD database whether you need a Studienkolleg or a year of university at home.' },
            { when: '6–9 months before', title: 'Choosing a college and universities', text: 'Find a public Studienkolleg and the university it admits through. Find out whether you apply via uni-assist or directly.' },
            { when: 'By 15 July / 15 January', title: 'Application', text: 'Via uni-assist it’s often: by 15 July for the winter semester, by 15 January for the summer semester. Studienkollegs and master’s programmes sometimes have earlier deadlines. Apply at least 8 weeks before the deadline.' },
            { title: 'Entrance exam', text: 'The Studienkolleg test (German, often maths). Then the admission letter (Zulassung).' },
            { title: 'Blocked account and visa', text: 'Open a Sperrkonto, arrange insurance, and book an appointment at the German embassy for a national D visa. Book right away: the wait can be long.' },
          ],
        },
        {
          type: 'note',
          intro: 'The EPOS (master’s) route is shorter:',
          items: [
            'Choose up to three programmes from the EPOS list on the DAAD website',
            'Send the full application directly to the programme (not to DAAD) before its deadline',
            'The programme’s committee recommends candidates, and DAAD makes the final decision',
            'If you’re nominated, upload your documents to the DAAD portal',
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'Tuition-free ≠ money-free',
      title: 'How much you need to start',
      blocks: [
        { type: 'text', text: 'If you don’t have a scholarship, the embassy requires proof that you have enough money for a year of living. Usually this is a **blocked account** (Sperrkonto), which pays you a fixed amount each month. The amount is reviewed regularly, so check the current figure with your German embassy before transferring money.' },
        {
          type: 'costs',
          rows: [
            ['Blocked account (student with admission)', '992 €/month → 11 904 € per year'],
            ['Blocked account (without admission, § 17 AufenthG)', 'higher: embassy guidance sheets say 1 091 €/month'],
            ['uni-assist', '75 € for the first programme, 30 € for each additional one in the same semester'],
            ['Student health insurance (public fund, 2026)', '≈ 141–146 €/month'],
            ['Semester contribution', 'usually ~100–400 € (depends on the university)'],
            ['Tuition for non-EU students', '0 € in most states; 1 500 €/semester in Baden-Württemberg; at TUM — 2 000–3 000 €'],
            ['Document translations and certifications', 'depends on the country; budget for it in advance'],
          ],
        },
        { type: 'callout', variant: 'black', text: 'If you have a scholarship, funding is usually proven with the scholarship letter instead of a Sperrkonto. Check with your embassy exactly what they accept.' },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '5',
      kicker: 'Translations and legalisation',
      title: 'How to prepare your paperwork',
      blocks: [
        {
          type: 'accordion',
          items: [
            {
              title: 'What to upload to uni-assist',
              text: 'Documents in the original language plus a translation into German or English. Everything is uploaded to your My assist account.',
              bullets: [
                'Kazakhstan: a translation made in Kazakhstan is accepted only if a Kazakh notary has certified the translator’s signature and identity (this applies to translation agencies too). For certificates issued in 2015–2018, they also ask for the student’s personal file (lichnoe delo) as proof of 11 years of schooling',
                'Tajikistan: a translation made in Tajikistan is accepted only with notarial certification of the translator’s signature and identity',
                'If you’re already at university: an academic transcript with all your grades, issued after the end of the academic year',
              ],
            },
            {
              title: 'The apostille doesn’t work everywhere',
              text: 'Germany objected to Tajikistan joining the Hague Convention, so the apostille is not valid between the two countries: if a document needs legalisation, it’s a consular procedure. There is similar information for Uzbekistan, but it’s outdated. For university applications, certified copies and translations are usually enough, but check the requirements for each specific document with the university and the embassy.',
            },
            {
              title: 'EPOS application package',
              text: 'Signed checklist, EPOS application form, CV in Europass format, motivation letter, recommendation from your employer, employment certificates, language certificates, diplomas and transcripts. English or German only. Incomplete applications are not considered.',
            },
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
            { title: 'A year of university at home is a working strategy', text: 'If you’re from Uzbekistan, one successfully completed year at a recognised university gives you direct access to the same field without a Studienkolleg. Don’t drop out at home until you have your Zulassung' },
            { title: 'Don’t confuse “free” with “grant”', text: 'Even without tuition, you need almost 12 000 € in your account for the first year. Plan for this money from day one, or aim for a master’s with a DAAD scholarship' },
            { title: 'You don’t need APS', text: 'The APS certificate is mandatory for China, India and Vietnam (and, according to some sources, Mongolia). It isn’t required for Central Asia — don’t pay agents who sell it' },
            { title: 'Apply 8 weeks early', text: 'uni-assist takes 4–6 weeks to process an application. If you apply on the last day and something is missing, you won’t have time to send it' },
            { title: 'Apply for EPOS while working', text: 'Experience only counts after your bachelor’s and must be related to the programme’s subject. An employer recommendation is mandatory — arrange it in advance' },
          ],
        },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: 'Approximate — check every year',
      title: 'Calendar',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'Jun', title: 'DAAD portal opens', text: 'Study Scholarships: applications open on 1 June; the deadline depends on the country and is updated every year' },
            { period: 'Aug – Oct', title: 'EPOS', text: 'Each programme has its own deadline; many accept applications in summer and autumn a year before the start (which is in autumn of the following year)' },
            { period: 'Nov – Jan', title: 'Summer semester applications', text: 'Via uni-assist often by 15 January; Studienkollegs sometimes have earlier deadlines' },
            { period: 'Feb – Jul', title: 'Winter semester applications', text: 'Via uni-assist often by 15 July; apply 8 weeks early' },
            { period: 'Sep – Oct', title: 'Start', text: 'Winter semester begins; DAAD scholarships usually start on 1 October (earlier if you begin with a German course)' },
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
            { label: 'DAAD — scholarship database', url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/' },
            { label: 'DAAD EPOS — programme description', url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777' },
            { label: 'DAAD — check your certificate (Admission Database)', url: 'https://www.daad.de/en/studying-in-germany/requirements/admission-database/' },
            { label: 'anabin — recognition of qualifications (KMK)', url: 'https://anabin.kmk.org' },
            { label: 'uni-assist — university applications', url: 'https://www.uni-assist.de/en/' },
            { label: 'Study in Germany — official portal', url: 'https://www.study-in-germany.de/en/' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'Germany is a marathon, not a sprint',
    text: 'German language, a year of university at home or a Studienkolleg, and money in a blocked account all need 1.5–2 years of preparation. If you want a full grant, aim for a DAAD master’s.',
  },
};
