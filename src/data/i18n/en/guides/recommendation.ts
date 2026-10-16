import type { ContentPage } from '../../../types';

export const recommendation: ContentPage = {
  title: 'Recommendation letter: the complete guide',
  lead: 'This is the only document in your application that you don’t write. Its job is to confirm your achievements and show your soft skills through the eyes of someone who has seen you in action.',
  sections: [
    {
      id: 'who',
      chip: '1. Who to ask',
      badge: '1',
      kicker: 'Choosing strategically',
      title: 'Who to ask',
      blocks: [
        { type: 'text', text: 'The main rule: how well the person knows you matters more than their title. A letter from a school principal who only knows your surname looks generic and is more likely to hurt your application than help it.' },
        {
          type: 'grid',
          items: [
            { title: 'Academic recommender', text: 'A teacher of a subject related to your major whom you worked with often and for a long time. They’ll confirm your ability to master complex material and your analytical thinking.' },
            { title: 'Extracurricular / professional', text: 'A project supervisor, coach, internship mentor or volunteer group leader. They’ll show your leadership, teamwork and ability to see things through.' },
          ],
        },
      ],
    },
    {
      id: 'how',
      chip: '2. How to ask',
      badge: '2',
      kicker: 'Preparation',
      title: 'How to ask: the Brag Sheet',
      blocks: [
        { type: 'text', text: 'Ask for the letter **1.5–2 months** before the deadline, and always give your mentor a polite way to say no: “Do you feel we’ve worked together closely enough for you to write me a strong letter?”' },
        { type: 'text', text: 'To make the writer’s job easier, prepare a Brag Sheet (a cheat sheet of your achievements):' },
        {
          type: 'highlights',
          items: [
            { tag: 'Goal', text: 'where you’re applying and what they value (leadership, research, social impact)' },
            { tag: 'Link to the essay', text: 'the key ideas of your personal statement, so the recommendation complements it rather than contradicts it' },
            { tag: 'Specifics', text: 'a reminder of concrete episodes when you worked together' },
          ],
        },
        { type: 'callout', text: '“Mr Ivanov, it would be great if you could mention how we spent two months wrestling with the research project, and I rewrote the final report three times until we got it just right.”' },
      ],
    },
    {
      id: 'structure',
      chip: '3. Structure',
      badge: '3',
      kicker: 'Structure',
      title: 'The anatomy of a great letter',
      blocks: [
        { type: 'text', text: 'A strong letter is one page (300–500 words), on official letterhead, in four logical blocks:' },
        {
          type: 'timeline',
          rows: [
            { period: 'Introduction', title: 'How they know you and the writer’s credibility', text: '“I am a professor with 15 years of experience. I have known the candidate for 3 years: he attended my seminars and captained the school team.”' },
            { period: 'Hard Skills', title: 'Competence shown through a concrete fact', text: '*“Put together a team of five and, in two months, build a working prototype for the city olympiad — with no budget and no experienced mentor.”*' },
            { period: 'Soft Skills', title: 'Handling difficulties, working with people', text: '“When part of the data was lost the day before the deadline, the candidate didn’t panic — he redistributed the tasks and found a workaround.”' },
            { period: 'Conclusion', title: 'A confident recommendation', text: '“He is among the top 5% of students in my course. I strongly recommend him for your programme.”' },
          ],
        },
      ],
    },
    {
      id: 'flags',
      chip: '4. Red flags',
      badge: '4',
      kicker: 'What to avoid',
      title: 'Red flags',
      blocks: [
        {
          type: 'cards',
          accent: 'yellow',
          items: [
            { title: '“A flawless superhero”', text: 'A letter made only of words like “brilliant” and “impeccable” raises suspicion. A story about a gap in knowledge, asking for feedback and overcoming it sounds much stronger.' },
            { title: 'Copying your CV', text: 'The committee already sees your grades and certificates in the application. The letter should focus on how the result was achieved, not what was achieved.' },
            { title: 'The same voice', text: 'If you draft both letters yourself, make sure they don’t sound alike. An academic letter is drier and about studies; a mentor’s letter is livelier and about teamwork.' },
          ],
        },
        { type: 'callout', text: 'The anonymity test: remove the name from the letter — would the writer still know who it’s about from the situations described? If yes, it’s an excellent letter.' },
      ],
    },
    {
      id: 'culture',
      chip: 'Culture',
      badge: '5',
      kicker: 'A nuance',
      title: 'The cultural gap in tone',
      blocks: [
        { type: 'text', text: 'Teachers from the CIS and Western professors write recommendations in very different languages of enthusiasm.' },
        {
          type: 'compare',
          bad: { tag: 'CIS modesty', text: '“The student attended classes regularly, did his homework and got an A. A good student” — to a foreign university this reads as “nothing outstanding”.' },
          good: { tag: 'Western standard', text: '“One of the brightest minds I have seen in 10 years of teaching”, “the engine of creativity in the classroom” — a normal level of enthusiasm, not an exaggeration.' },
        },
        { type: 'text', text: 'If you’re helping a teacher with a draft, don’t be shy about turning up the enthusiasm: where the letter will be read, that’s the standard, not bragging.' },
      ],
    },
    {
      id: 'verify',
      chip: 'Verification',
      badge: '6',
      kicker: 'The technical side',
      title: 'Verification and spam filters',
      blocks: [
        { type: 'text', text: 'Universities check whether a student wrote the letter themselves.' },
        {
          type: 'cards',
          items: [
            { title: 'Institutional email', text: 'Ideally the teacher writes from an email address on the school’s domain (for example, name@school.edu).' },
            { title: 'If they only have Gmail/Mail.ru', text: 'The letter is printed on school letterhead, stamped and signed, scanned and sent as a PDF as additional proof.' },
            { title: 'The problem with links', text: 'Automatic links for uploading the letter end up in “Spam” or “Promotions” in roughly 30% of cases — be sure to check this with your recommender.' },
          ],
        },
      ],
    },
    {
      id: 'peer',
      chip: 'Peer Rec',
      badge: '7',
      kicker: 'An unusual format',
      title: 'Peer Recommendation — a letter from someone your age',
      blocks: [
        { type: 'text', text: 'The format was popularised by Dartmouth College, and scholarship programmes and leadership bootcamps ask for it more and more often. If a teacher answers the question “how smart and disciplined is this person”, a peer answers “what is it like to work on a project with them at 2 a.m.”' },
        { type: 'subheading', text: 'Who to choose as the writer' },
        {
          type: 'compare',
          good: { tag: 'Good choice', text: 'A co-founder of your school startup, a hackathon teammate, a sports team captain, a close friend from a shared volunteer project.' },
          bad: { tag: 'Bad choice', text: 'A brother/sister (conflict of interest), an acquaintance with an impressive title you’ve talked to a couple of times, someone who only knows you from parties.' },
        },
        { type: 'subheading', text: 'Anatomy of a letter from a friend' },
        {
          type: 'timeline',
          rows: [
            { period: 'Honest context', title: 'How you met and why the writer knows you better than others', text: '“We met in 9th grade on a joint history project — since then we’ve spent hundreds of hours together, from brainstorming sessions to arguments about design.”' },
            { period: 'Stress test', title: 'A situation that revealed empathy, humour, resilience', text: '*“At the hackathon our code broke an hour before the presentation. While everyone panicked, she made coffee, put on some music and started hunting for the bug.”*' },
            { period: 'Detail', title: 'A small, vivid touch', text: '“She remembers all her friends’ birthdays and always carries a spare pen because she knows I’ll forget mine.”' },
            { period: 'Summary', title: 'What you will bring to the community', text: '“She’s the person you want on your team when everything goes wrong.”' },
          ],
        },
      ],
    },
    {
      id: 'cheatsheet',
      badge: '★',
      kicker: 'You can forward this to a friend',
      title: 'A cheat sheet for your friend',
      blocks: [
        {
          type: 'note',
          intro: 'Hi! You’re writing me a Peer Recommendation — here’s how to do it in 10 minutes:',
          items: [
            'No list of achievements — the committee already knows about my grades and medals from the application. Write about what kind of person I am.',
            'Show, don’t tell — instead of “he’s determined”, describe a specific moment: “he retook his driving test three times and each time went back to the driving range even more determined”.',
            'Don’t be afraid to be informal — you can write in a lively way, with humour and even slang like obsessed or stubborn in a good way. It makes the letter sound more genuine.',
            'Pick one vivid story — a stressful moment or a funny habit — and describe it in detail; that’s stronger than any list of qualities.',
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'What matters is specifics, not adjectives',
    text: 'Any letter, academic or from a friend, works because of one vivid story — not a list of words of praise.',
  },
};
