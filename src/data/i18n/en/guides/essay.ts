import type { ContentPage } from '../../../types';

export const essay: ContentPage = {
  title: 'How to write a personal statement they’ll remember',
  lead: 'A blank page is scary — especially when it feels like you have to “sell yourself” in 650 words. But the essay isn’t a test for straight-A students. It’s the only place in your application where you do the talking, not your grades. We break the whole process into 4 stages — from “what do I even write about” to the final check before you hit submit. Whether you code, dance, run experiments with test tubes or organise volunteer drives — the examples below work for any story.',
  sections: [
    {
      id: 'what',
      chip: '1. What to write about',
      badge: '1',
      kicker: 'Unpacking your experience',
      title: 'What to write about',
      blocks: [
        { type: 'text', text: 'The main trap is trying to cram your whole life into the essay: sport, cooking, volunteering and three more Coursera courses. What you get isn’t a story — it’s a CV in prose. Pick one or two themes that genuinely overlap — the strongest essays are always born where disciplines meet.' },
        { type: 'callout', text: '“The most interesting thing about you isn’t your list of activities — it’s what happens between them.”' },
        { type: 'text', text: 'Look for non-obvious connections — how one skill unexpectedly “leaks” into another area of your life:' },
        {
          type: 'grid',
          items: [
            { title: 'Sport → code', text: 'The captain of a volleyball team realises that debugging code is just like reviewing a lost match: you’re not looking for someone to blame, but for the moment the plan broke.' },
            { title: 'Music → architecture', text: 'Years at the piano taught you to hear rhythm and pauses — and the same sense of rhythm shows up in how you arrange space and light in a building model.' },
            { title: 'Volunteering → management', text: 'Organising a donation drive for an animal shelter taught you to keep four tasks in your head at once — the same skill you need to lead a team at a startup.' },
          ],
        },
        { type: 'text', text: 'The second ingredient is conflict. A story without difficulties sounds like bragging. Think of a moment when the plan fell apart:' },
        {
          type: 'highlights',
          items: [
            { tag: 'Team conflict:', text: 'in a tournament final, the team’s two leaders argue about tactics in the last minute — and you have to either push your own idea through or actually listen to the other person' },
            { tag: 'Technical failure:', text: 'your device prototype breaks down during the demo in front of the judges an hour before your presentation' },
            { tag: 'Creative block:', text: 'for three weeks you keep redoing the same sketch, and not a single version feels like “yours”' },
          ],
        },
        { type: 'text', text: 'Not a “success story”, but a story of how you think when things don’t go to plan — that’s what admissions committees actually read for.' },
      ],
    },
    {
      id: 'structure',
      chip: '2. Structure',
      badge: '2',
      kicker: 'Structure',
      title: 'The structure of a great essay',
      blocks: [
        { type: 'text', text: 'The classic format is three parts with clear proportions. They’re easy to remember: 15% / 70% / 15%.' },
        { type: 'subheading', text: 'The Hook — 15%' },
        { type: 'text', text: 'Start with action or a concrete scene, not a general statement. Drop the reader straight into the middle of things.' },
        {
          type: 'compare',
          bad: { tag: 'Don’t', text: '“Ever since I was a child, I have been interested in technology and always dreamed of creating something useful for people.”' },
          good: { tag: 'Do', text: '“An hour before our presentation, our prototype started smoking right on the judges’ table — and I realised the soldering iron was in another building of the school.”' },
        },
        { type: 'subheading', text: 'The main body (STAR method) — 70%' },
        { type: 'text', text: 'Any experience breaks down into four blocks — this keeps the text focused and stops you from drifting into a pointless retelling of events.' },
        {
          type: 'letters',
          rows: [
            { letter: 'S', title: 'Situation — the context', text: 'Our local school didn’t have a single robotics club, even though students were interested — there was just nowhere to put that interest to use.' },
            { letter: 'T', title: 'Task — your goal', text: 'Put together a team of five and, in two months, build a working prototype for the city olympiad — with no budget and no experienced mentor.' },
            { letter: 'A', title: 'Action — what you did', text: 'Found free online courses, arranged to rent tools at a local fab lab, and assigned team roles based on each person’s strengths.' },
            { letter: 'R', title: 'Result — a measurable outcome', text: 'The prototype took third place out of twenty teams, and after the olympiad the club became permanent — and it taught you that limited resources often lead to more inventive solutions.' },
          ],
        },
        { type: 'subheading', text: 'The future vector — 15%' },
        { type: 'text', text: 'Connect your past experience to why you need this specific programme right now — not in general terms, but with a formula:' },
        { type: 'formula', lines: ['My experience in [Field A]', '+ interest in [Field B]', '+ your programme’s resources', '= a technological / scientific / social breakthrough'] },
        { type: 'text', text: 'For example: software development experience + interest in biology + a university lab with access to bioinformatics = a project that simply can’t be built without this programme.' },
      ],
    },
    {
      id: 'editing',
      chip: '3. Editing',
      badge: '3',
      kicker: 'Editing',
      title: 'Golden rules of editing',
      blocks: [
        { type: 'highlights', items: [{ tag: 'Show, don’t tell.', text: 'Words like “driven”, “responsible” and “creative” prove nothing — facts do.' }] },
        {
          type: 'compare',
          bad: { tag: 'Weak', text: '“I am a very responsible and creative person.”' },
          good: { tag: 'Strong', text: '“For three months I got up at 6 a.m. to feed the dogs at the shelter before school — and I never missed a single shift.”' },
        },
        {
          type: 'highlights',
          items: [
            { tag: 'Depth beats breadth.', text: 'Better 300 words about one insight than a list of ten courses and awards — lists belong in the activities section, so don’t duplicate it in the essay.' },
            { tag: 'Don’t be afraid of vulnerability.', text: 'The admissions committee doesn’t need a ready-made professor — they need a student who understands what they still lack and knows why this particular programme is the way to get it.' },
          ],
        },
      ],
    },
    {
      id: 'checklist',
      chip: '4. Checklist',
      badge: '4',
      kicker: 'Final check',
      title: 'Final checklist before you submit',
      blocks: [
        {
          type: 'steps',
          badge: 'blue',
          items: [
            { title: 'The lost essay test', text: 'Print the text, remove your name and leave it on a desk. Would your friends know you wrote it — from your voice, not from the facts?' },
            { title: 'The “So what?” test', text: 'After every paragraph, ask yourself: “So what?”. If there’s no answer, the paragraph is either unnecessary or you need to dig deeper.' },
            { title: 'The read-aloud check', text: 'Read the essay out loud. If you run out of breath on a sentence, it’s too long. Split it in two.' },
          ],
        },
      ],
    },
  ],
  footer: {
    title: 'The blank page isn’t scary anymore',
    text: 'Pick one story, lay it out using STAR and start with action — the rest will come together as you write.',
  },
};
