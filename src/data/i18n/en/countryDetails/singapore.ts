import type { ContentPage } from '../../../types';

export const singapore: ContentPage = {
  title: 'Singapore: a grant with a work bond and scholarships for the strongest',
  lead: 'Singapore has no government “full grant” for school students from Central Asia. There is the MOE Tuition Grant — it cuts the fee almost in half, but commits you to working in Singapore for 3 years. And there are university scholarships that cover everything — for very strong candidates. Here is the honest breakdown.',
  sections: [
    {
      id: 'grants',
      chip: 'Grants',
      badge: '1',
      kicker: 'What is actually available',
      title: 'Main funding options',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              title: 'MOE Tuition Grant (TG) — a government subsidy',
              text: 'Available to foreigners on selected programmes at autonomous universities (NUS, NTU, SMU, etc.). It covers a large part of the fee — you pay the “subsidised” amount. In return — **a contract to work for 3 years** at a Singapore organisation after graduation, plus two guarantors.',
            },
            {
              title: 'NTU Science and Technology Undergraduate Scholarship',
              text: 'For citizens of Asian countries (except Singapore) in Computing, Engineering and Science. It covers the subsidised fee (after TG) and compulsory fees, **S$6 000 a year** for living costs, a hostel allowance, S$200 settling-in allowance, S$1 750 for a computer, and airfare. Condition — a **6-year** work bond and a CGPA of at least 3.5/5.0.',
            },
            {
              title: 'NUS scholarships and other NTU scholarships',
              text: 'NUS and NTU also have other merit scholarships for international students — the list and conditions change every year. You apply for the scholarship at the same time as you apply for admission.',
            },
            {
              title: 'ASEAN Undergraduate Scholarship — not for you',
              text: 'Only for citizens and residents of ASEAN countries (Indonesia, Vietnam, Malaysia, etc.). Central Asia is not part of ASEAN — don’t waste your time on it.',
            },
          ],
        },
        { type: 'text', text: 'For a PhD, look separately at the A*STAR SINGA scholarship and the universities’ own research scholarships — that is a different track with different deadlines.' },
      ],
    },
    {
      id: 'requirements',
      chip: 'Requirements',
      badge: '2',
      kicker: 'Who gets in',
      title: 'What you need with our school leaving certificate',
      blocks: [
        { type: 'text', text: 'School leaving certificates (attestat) from Tajikistan, Uzbekistan and Kazakhstan fall into the “other international qualifications” category. The requirements are stricter than for students who take A-Levels or IB.' },
        {
          type: 'grid',
          items: [
            { title: 'SAT / ACT / AP — mandatory for NUS', text: 'For “other” certificates NUS requires a standardised test: SAT, ACT with Writing or AP. Without it your application is incomplete' },
            { title: 'Grades', text: 'Your attestat and transcript, with a “good” result. There is no fixed cut-off — competition is very high, so aim for excellent grades in the subjects relevant to your programme' },
            { title: 'Grading scale', text: 'You need to attach an explanation of your school’s grading system — otherwise the committee has nothing to compare your “5”s with' },
            { title: 'English', text: 'NUS does not require a separate test for this category, but NTU has a Qualifying English Test after enrolment. Without strong English you won’t manage the studies' },
            { title: '12 years of schooling', text: 'NUS requires you to finish school with 12 years of general education by July of the application year. We have 11 grades — check the requirements for your qualification on the university website' },
            { title: 'Programme restrictions', text: 'If you take your final exams after the deadline, medicine, dentistry and law at NUS are not available to you' },
          ],
        },
      ],
    },
    {
      id: 'stages',
      chip: 'Stages',
      badge: '3',
      kicker: 'From the SAT to the TG contract',
      title: 'Five stages of admission',
      blocks: [
        {
          type: 'steps',
          items: [
            { when: '12–15 months before', title: 'SAT and choosing programmes', text: 'Take the SAT early so you have time to retake it. Choose your programmes and check their prerequisites (maths, physics and chemistry are often required).' },
            { when: 'Oct – Feb', title: 'Online application', text: 'NTU: from 15 October to 20 January. NUS: from 16 December to 17 February. Documents for NTU — within 3 days after the window closes.' },
            { title: 'Scholarship application', text: 'At NTU — the “Apply for Scholarship” link at the end of the application: an essay of up to 250 words, a photo and an online teacher reference (7 days, not a relative).' },
            { when: 'Mar – Jul', title: 'Offers and interviews', text: 'NUS replies to international-certificate applicants by July. The NTU scholarship interview — within 2 months of the offer.' },
            { title: 'TG and Student’s Pass', text: 'You accept the offer, apply for the Tuition Grant online (registration, guarantors, signing the contract) and get your Student’s Pass.' },
          ],
        },
      ],
    },
    {
      id: 'costs',
      chip: 'Costs',
      badge: '$',
      kicker: 'NTU figures, 2026/27',
      title: 'How much it costs',
      blocks: [
        { type: 'text', text: 'Singapore is an expensive country. Even with TG but without a university scholarship, you need to cover both the fee and living costs. Example — NTU’s official annual prices for international (non-ASEAN) students:' },
        {
          type: 'costs',
          rows: [
            ['With Tuition Grant — most programmes', 'S$21 400 a year'],
            ['With Tuition Grant — business and accountancy', 'S$21 800 a year'],
            ['Without the grant — laboratory / non-laboratory', 'S$40 600 / S$36 350 a year'],
            ['Without the grant — business programmes', 'S$45 600 a year'],
            ['Medicine (only with TG)', 'S$91 250 a year'],
            ['SAT, application fee, Student’s Pass', 'per the organiser’s and university’s price list'],
          ],
        },
        { type: 'text', text: 'Prices include 9% GST and are fixed for the whole duration of study for your intake. NUS has its own fee table — check it on the NUS website for your programme.' },
      ],
    },
    {
      id: 'hacks',
      chip: 'Tips',
      badge: '!',
      kicker: 'Behind the scenes',
      title: 'Tips and common mistakes',
      blocks: [
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: 'The work bond is a legal contract', text: '3 years under TG and 6 years under the NTU scholarship are not a formality. Read the whole contract and make sure you are ready to live and work in Singapore after graduation' },
            { title: 'Apply for the scholarship straight away', text: 'The scholarship window coincides with the admission window, and you apply before you know your result. Miss it — and you will no longer be considered for the scholarship' },
            { title: 'Don’t miss the TG window', text: 'Registration and signing of the TG contract happen within a short time after enrolment. Miss it — and you pay the full, unsubsidised price' },
            { title: 'Find guarantors in advance', text: 'TG requires two guarantors of any nationality, aged 21 to 65, not bankrupt and without their own TG obligations' },
            { title: 'Originals will be checked', text: 'NUS verifies original documents on arrival. If you don’t show up or the documents don’t match — you may be expelled' },
          ],
        },
      ],
    },
    {
      id: 'documents',
      chip: 'Documents',
      badge: '$',
      kicker: 'Document package',
      title: 'What to upload to the application',
      blocks: [
        {
          type: 'note',
          intro: 'Applications are fully online. A typical set for “other” certificates:',
          items: [
            'School leaving certificate (attestat) or latest transcript (if you graduate later)',
            'Explanation of the school’s grading system',
            'SAT / ACT with Writing / AP (mandatory for NUS)',
            'Passport and photo',
            'Criminal record declaration for NTU — filled in even if you have no record',
            'For the scholarship: essay, photo, online teacher reference',
          ],
        },
        { type: 'text', text: 'Documents must be in English or translated. Since 16 September 2021 Singapore has been a party to the Apostille Convention. An apostille is usually not requested for the online application, but originals are checked at enrolment — ask the university whether your attestat needs an apostille by then.' },
      ],
    },
    {
      id: 'deadlines',
      chip: 'Deadlines',
      badge: '!',
      kicker: '2027/28 intake, Bachelor’s',
      title: 'Application calendar',
      blocks: [
        {
          type: 'timeline',
          rows: [
            { period: 'May – Sep', title: 'SAT and preparation', text: 'SAT with time to spare for a retake, translating your transcript, choosing programmes' },
            { period: '15 Oct – 20 Jan', title: 'NTU', text: '“All other international qualifications”. Documents — within 3 days after closing' },
            { period: '16 Dec – 17 Feb', title: 'NUS', text: 'International Qualifications (except IB)' },
            { period: 'Mar – Jul', title: 'Offers', text: 'NUS for international certificates — by July; scholarship interviews' },
            { period: 'Summer', title: 'TG and visa', text: 'Applying for the Tuition Grant and Student’s Pass' },
            { period: 'August', title: 'Start', text: 'The academic year begins' },
          ],
        },
        { type: 'callout', text: 'Dates are based on NTU and NUS announcements for the 2027/28 cycle. They are revised every year — double-check on the university website before applying.' },
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
            { label: 'MOE — Tuition Grant Scheme', url: 'https://www.moe.gov.sg/financial-matters/tuition-grant-scheme' },
            { label: 'NTU — fees and Tuition Grant', url: 'https://www.ntu.edu.sg/admissions/undergraduate/fees-and-funding/tuition-fees' },
            { label: 'NTU — application dates', url: 'https://www.ntu.edu.sg/admissions/undergraduate/important-links/important-dates' },
            { label: 'NTU Science and Technology Undergraduate Scholarship', url: 'https://www.ntu.edu.sg/admissions/undergraduate/scholarships-and-awards/scholarship-opportunities/detail/ntu-science-and-technology-undergraduate-scholarship' },
            { label: 'NUS — application dates', url: 'https://www.nus.edu.sg/oam/admissions/important-dates' },
            { label: 'NUS — requirements for “other” certificates', url: 'https://www.nus.edu.sg/oam/admissions/international-qualifications-for-foreigners/international-qualifications/other-high-school-qualifications' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'Singapore — for those ready to stay',
    text: 'The subsidy and scholarships here are tied to working in the country after graduation. If that is your plan, Singapore offers one of the best starts in Asia.',
  },
};
