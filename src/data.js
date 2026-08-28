/**
 * All Wrapped content lives here so the components stay presentational.
 * Numbers are illustrative — swap this module for a real API response and
 * every component downstream keeps working.
 */

export const PERIOD = 'Jan 1 – Dec 31, 2026'

export const KPIS = [
  {
    id: 'prompts',
    label: 'Prompts sent',
    value: 3412,
    note: '9.3 a day, every day',
    spark: [8, 11, 9, 14, 12, 17, 15, 21, 19, 24, 22, 28],
  },
  {
    id: 'votes',
    label: 'Votes cast',
    value: 2794,
    note: 'left, right, tie, or both bad',
    spark: [6, 9, 8, 12, 11, 15, 14, 18, 17, 21, 20, 25],
  },
  {
    id: 'models',
    label: 'Models met',
    value: 118,
    note: 'of the 327 on the leaderboard',
    spark: [9, 14, 21, 28, 36, 47, 58, 71, 83, 94, 106, 118],
  },
]

/** Part-to-whole. Three categorical slots — validated all-pairs on the dark surface. */
export const MODES = [
  {
    name: 'Battle',
    pct: 64,
    color: 'var(--blue)',
    prompts: 2184,
    note: 'two anonymous models, picked for you',
  },
  {
    name: 'Side-by-side',
    pct: 24,
    color: 'var(--orange)',
    prompts: 819,
    note: 'you named both contenders',
  },
  {
    name: 'Direct Chat',
    pct: 12,
    color: 'var(--green)',
    prompts: 409,
    note: 'one model, no vote at the end',
  },
]

/** Magnitude comparison — single hue, length carries the encoding. */
export const MODELS = [
  { name: 'claude-opus-5', pct: 44, votes: 1229, note: 'your pick in the close ones' },
  { name: 'claude-sonnet-5', pct: 31, votes: 866, note: 'the daily driver' },
  { name: 'claude-haiku-4.5', pct: 17, votes: 475, note: 'when you wanted it terse' },
  { name: 'everything else', pct: 8, votes: 224, note: 'codenames you never saw again' },
]

/** Session digest — the three conversations worth pulling out of the log. */
export const SESSIONS = [
  {
    id: 'latest',
    label: 'Latest session',
    value: '3:34',
    unit: 'AM',
    prompt: 'how long will melatonin take effect',
    accent: 'var(--blue)',
    chips: ['Ask mode', '38s to a full answer'],
    note: 'Sent at 3:34 in the morning, which is exactly on brand for you. We hope the melatonin won.',
  },
  {
    id: 'longest',
    label: 'Longest session',
    value: '102',
    unit: 'turns',
    prompt: 'egg first or chicken first',
    accent: 'var(--orange)',
    chips: ['4h 12m long', 'No verdict reached'],
    note: 'A hundred and two exchanges on the oldest question there is. The chicken remains at large.',
  },
  {
    id: 'complex',
    label: 'Most complex session',
    value: '18',
    unit: 'steers',
    prompt: 'Final prepare for Operating System',
    accent: 'var(--green)',
    chips: ['12 praise & complaint signals', 'OS final: survived'],
    note: 'You steered the model 18 times and issued 12 verdicts along the way. Socratic, arguably.',
  },
]

/** Favorite field + a fake cloud of the prompts that filled it. */
export const FIELD = {
  name: 'Software & IT services',
  share: 41,
  prompts: 1399,
  cloud: [
    { q: 'why is my docker container exiting', w: 5 },
    { q: 'how do I exit vim', w: 5 },
    { q: 'explain this stack trace', w: 5 },
    { q: 'undo a git rebase', w: 4 },
    { q: 'regex for ISO dates', w: 4 },
    { q: 'why does my build only fail on CI', w: 4 },
    { q: 'rust or go for the backend', w: 4 },
    { q: 'what does this SQL query do', w: 3 },
    { q: 'fix my nginx config', w: 3 },
    { q: 'is 8GB RAM enough for a dev machine', w: 3 },
    { q: 'monorepo or polyrepo', w: 3 },
    { q: "explain CAP theorem like I'm five", w: 3 },
    { q: 'what is a race condition', w: 2 },
    { q: 'kubernetes for absolute beginners', w: 2 },
    { q: 'clean up this typescript', w: 2 },
    { q: 'best language for a side project', w: 2 },
    { q: 'why is my laptop fan so loud', w: 1 },
    { q: 'have you tried turning it off and on again', w: 1 },
  ],
}

export const ARCHETYPE = {
  title: ['The Midnight', 'Refactorer'],
  blurb:
    "You don't start projects. You inherit them, stare at them until 1am, and quietly delete a third of the codebase. Your agents have learned to be brief.",
  tags: ['Top 3% in Agent Mode', '63-day streak', 'More deletions than additions'],
  share: [
    'My Arena Wrapped 2026 — The Midnight Refactorer',
    '3,412 prompts · 1,204 agent-hours · 187 PRs merged · 412.8k lines',
    '61% Agent Mode · peak hour: Thursday 11pm · 63-day streak',
  ].join('\n'),
}
