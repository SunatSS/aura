import type { ContentPage } from '../../../types';

export const commonApp: ContentPage = {
  title: 'How to fill in the Common App',
  lead: 'The Common App isn’t an exam — it’s just a long form with a clear structure. If you go through it section by section, there’s nothing scary about it: we walk through every block and explain when you need financial aid based on need (need-based) and when your grades are enough (merit-based).',
  sections: [
    {
      id: 'sections',
      chip: 'Form sections',
      badge: '1',
      kicker: 'The form',
      title: 'The seven sections of the form',
      blocks: [
        {
          type: 'facts',
          items: [
            { value: '1 August', label: 'The form opens' },
            { value: 'up to 20 universities', label: 'From one account' },
            { value: '7 sections', label: 'Shared by all universities' },
            { value: '650 words', label: 'Personal essay' },
          ],
        },
        { type: 'text', text: 'These are the common blocks — you fill them in once, and they go to every university you add to your list.' },
        {
          type: 'accordion',
          items: [
            { title: 'Profile and Family — who you are', text: 'Basic details: name, date of birth, citizenship, address, language(s), visa status (if already known). In Family you enter information about your parents/guardians — education, workplace. This doesn’t affect how your application is assessed; universities use it for statistics and sometimes to calculate financial aid.' },
            { title: 'Education — your school', text: 'The school you attend/attended, start and graduation dates, GPA (if you have a conversion to the 4.0 scale, enter it; if not, you can leave it as in the original and explain in a comment). This is also where you list the subjects you’ve taken and any additional education.' },
            { title: 'Testing — exams', text: 'SAT/ACT, IELTS/TOEFL — enter them if you’ve taken them. Important: every university has its own testing policy — many made the SAT/ACT optional (test-optional), but not all have kept that rule, so check the policy of the specific university you’re applying to.' },
            { title: 'Courses & Grades — grades by subject', text: 'You enter your subjects and grades for the last 1–2 years of school yourself (self-reported). Not all universities require this section — some ask only for an official transcript sent directly by your school instead. Check the specific university’s requirements in the “Requirements” section after adding it to your list.' },
            {
              title: 'Activities and Experiences — your activities',
              text: 'Up to 10 activities and 5 awards (Honors). For each one — a short role title (up to 50 characters), the organisation (up to 100 characters) and a description of what exactly you did (up to 150 characters).',
              bullets: [
                'Start with a strong action verb (“organised”, “created”, “led”), not just “participated”',
                'Order matters: put at the top what shows the biggest contribution or leadership, not what sounds most impressive by name',
                'This isn’t a repeat of your CV — you can also write about unusual things (a part-time job, looking after younger siblings, an independent project)',
              ],
            },
            {
              title: 'Writing — the personal essay',
              text: 'One essay of 250–650 words that goes to every university on your list. You choose from 7 prompts: a meaningful part of your identity; how you dealt with a difficult situation; a time you questioned a belief; gratitude that changed your perspective; personal growth through an accomplishment; a topic so engaging you lose track of time; and a topic of your choice.',
              bullets: [
                '650 words is a ceiling, not a target; a short but rich essay works just as well',
                'The main mistake is retelling your list of achievements instead of telling a story about yourself',
                'From the 2026–2027 cycle there is a separate “Challenges and Circumstances” section (up to 250 words) — that, not the main essay, is the place to write about circumstances that affected your studies (moving, family difficulties, etc.)',
              ],
            },
            { title: 'My Colleges — recommenders and supplemental essays', text: 'This part is individual for each university on your list. Here you invite your recommenders (usually a school counsellor/homeroom teacher + 1–2 teachers — they get an email invitation and fill in the form themselves, you don’t need to write for them) and write the supplemental essays (Supplements) that this particular university requires — from one or two sentences to a full essay of 150–400 words.' },
          ],
        },
      ],
    },
    {
      id: 'money',
      chip: 'Need vs Merit',
      badge: '$',
      kicker: 'Money',
      title: 'Need-based vs Merit-based',
      blocks: [
        { type: 'text', text: 'These are two different types of help with tuition, and they get confused most often — let’s look at each separately.' },
        {
          type: 'twoLists',
          columns: [
            {
              tag: 'Need-based',
              color: 'purple',
              title: 'Aid based on your family’s need',
              items: [
                'Depends on your family’s financial situation, not on grades — it shows how much your family can actually pay',
                'For US citizens/residents — through FAFSA; FAFSA isn’t available to international students',
                'For international students — through the CSS Profile (used by 250+ universities, including Harvard and Yale); it costs roughly $25 for the first university and $16 for each additional one, and fee waivers for international students are available almost nowhere',
                'At the application stage it’s important to honestly indicate that you’re applying for need-based aid — at “need-aware” universities this can affect the admission decision, at “need-blind” ones it doesn’t',
                'Some universities (usually the best-known private ones) have a “meets full need” policy — they cover the entire gap between your family’s contribution and the full cost',
              ],
            },
            {
              tag: 'Merit-based',
              color: 'orange',
              title: 'Aid for your achievements',
              items: [
                'Doesn’t depend on family income — only on your grades, scores, essays and activities',
                'Often awarded automatically when your regular application is reviewed — no separate application needed',
                'Sometimes requires a separate application or an extra essay — especially the university’s biggest named scholarships',
                'Size — from partial coverage (10–50% of tuition) to full coverage (full-ride) in rare cases',
                'Available to international students almost everywhere it’s available to US citizens — unlike need-based aid',
              ],
            },
          ],
        },
        { type: 'dashed', text: 'You can apply for both types at once — they don’t exclude each other. But few universities give international students full need-based aid, so merit-based scholarships often turn out to be the more realistic path for most non-US applicants.' },
      ],
    },
  ],
  footer: {
    title: 'Where to start right now',
    steps: [
      'Create an account on commonapp.org',
      'Fill in Profile, Family and Education — it takes 20–30 minutes and removes most of the anxiety; after that it gets easier',
      'Pick 1 of the 7 essay prompts and write a draft without editing as you go',
      'Write your list of activities separately in your notes — you’ll move it into the right format later',
      'Add your first university and look at its specific requirements — that will show you exactly what else you need',
    ],
  },
};
