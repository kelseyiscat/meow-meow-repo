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
    id: 'hours',
    label: 'Agent hours',
    value: 1204,
    unit: 'h',
    note: '50 straight days of compute',
    spark: [40, 52, 61, 58, 74, 88, 95, 104, 112, 126, 138, 156],
  },
  {
    id: 'prs',
    label: 'PRs merged',
    value: 187,
    note: '14 in one Tuesday',
    spark: [6, 9, 8, 13, 11, 16, 14, 19, 17, 22, 25, 27],
  },
  {
    id: 'lines',
    label: 'Lines shipped',
    value: 412.8,
    unit: 'k',
    note: '181k of them deletions',
    spark: [12, 18, 22, 26, 31, 29, 38, 42, 47, 51, 58, 66],
  },
]

/** Part-to-whole. Three categorical slots — validated all-pairs on the dark surface. */
export const MODES = [
  { name: 'Agent Mode', pct: 61, color: 'var(--blue)', prompts: 2081 },
  { name: 'Ask', pct: 26, color: 'var(--orange)', prompts: 887 },
  { name: 'Edit', pct: 13, color: 'var(--green)', prompts: 444 },
]

/** Magnitude comparison — single hue, length carries the encoding. */
export const LANGUAGES = [
  { name: 'TypeScript', pct: 38, lines: 156866 },
  { name: 'Python', pct: 24, lines: 99074 },
  { name: 'Rust', pct: 14, lines: 57793 },
  { name: 'Go', pct: 11, lines: 45409 },
  { name: 'SQL', pct: 8, lines: 33024 },
  { name: 'CSS', pct: 5, lines: 20640 },
]

export const MODELS = [
  { name: 'claude-opus-5', pct: 44, sessions: 1501, note: 'your default for anything gnarly' },
  { name: 'claude-sonnet-5', pct: 31, sessions: 1058, note: 'the daily driver' },
  { name: 'claude-haiku-4.5', pct: 17, sessions: 580, note: 'when you were in a hurry' },
  { name: 'everything else', pct: 8, sessions: 273, note: 'curiosity, mostly' },
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

export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export const HOURS = ['12a', '2a', '4a', '6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p', '10p']

/**
 * Prompts per day × 2-hour bucket. Generated from a fixed seed so the grid is
 * stable across renders (a real build would fetch this).
 */
export const HEATMAP = (() => {
  const shape = [21, 11, 4, 3, 9, 21, 33, 39, 43, 40, 51, 60]
  let seed = 7
  const rand = () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648
  return DAYS.map((_, day) => {
    const weekend = day >= 5 ? 0.42 : 1
    const thursdayNights = day === 3 ? 1.35 : 1
    return shape.map((base, hour) => {
      const late = hour >= 9 || hour <= 1 ? thursdayNights : 1
      return Math.max(0, Math.round(base * weekend * late * (0.72 + rand() * 0.62)))
    })
  })
})()

export const HEATMAP_MAX = Math.max(...HEATMAP.flat())
export const HEATMAP_PEAK = 'Thursday, 11pm'
