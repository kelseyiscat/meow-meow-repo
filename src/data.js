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

export const REPOS = [
  { name: 'meow-meow-repo', sessions: 842, agentPct: 61 },
  { name: 'arena-web', sessions: 611, agentPct: 44 },
  { name: 'ledger-svc', sessions: 388, agentPct: 72 },
  { name: 'infra-terraform', sessions: 217, agentPct: 39 },
  { name: 'docs-site', sessions: 96, agentPct: 28 },
]

export const FACTS = [
  { k: 'Longest session', v: '6h 42m', d: "February 14th. We're not going to comment on that." },
  { k: 'Longest streak', v: '63 days', d: 'Broken only by a flight with no wifi.' },
  { k: 'Most-typed word', v: '“actually”', d: '1,038 times. Usually followed by “wait”.' },
  { k: 'Fastest merge', v: '4m 12s', d: 'Prompt to production. No tests were harmed.' },
  { k: 'Files touched', v: '9,481', d: "Across 5 repos and 3 languages you don't know." },
  { k: 'Top teammate', v: '@dana', d: "You two reviewed 74 of each other's agent PRs." },
]

export const ARCHETYPE = {
  title: ['The Midnight', 'Refactorer'],
  blurb:
    "You don't start projects. You inherit them, stare at them until 1am, and quietly delete a third of the codebase. Your agents have learned to be brief.",
  tags: ['Top 3% in Agent Mode', '63-day streak', 'More deletions than additions'],
  share: [
    'My Arena Wrapped 2026 — The Midnight Refactorer',
    '3,412 prompts · 1,204 agent-hours · 412.8k lines shipped',
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

/* ============================================================
   Sessions that defined the year
   Three superlatives, each with the stat that earned it.
   ============================================================ */
export const SESSIONS = [
  {
    id: 'latest',
    kicker: 'Your latest session',
    title: 'how long will melatonin take effect',
    stat: '3:34',
    unit: 'AM',
    meta: 'Dec 29 · Ask · 4 turns · 1m 12s',
    note: 'You closed the tab nine minutes later. We hope it worked.',
    metrics: [
      ['Started', '3:34 AM'],
      ['Turns', '4'],
      ['Mode', 'Ask'],
    ],
  },
  {
    id: 'longest',
    kicker: 'Your longest session',
    title: 'egg first or chicken first',
    stat: 102,
    unit: 'turns',
    meta: 'Aug 11 · Ask · 6h 42m',
    note: 'Neither of you conceded. The session is technically still open.',
    metrics: [
      ['Turns', '102'],
      ['Duration', '6h 42m'],
      ['Conclusions reached', '0'],
    ],
  },
  {
    id: 'complex',
    kicker: 'Your most complex session',
    title: 'Final prepare for Operating System',
    stat: 18,
    unit: 'steers',
    meta: 'May 04 · Agent Mode · 3h 05m',
    note: 'You steered 18 times and left 12 praise-and-complain signals. Micromanagement, but productive.',
    metrics: [
      ['Steers', '18'],
      ['Praise signals', '7'],
      ['Complaint signals', '5'],
    ],
  },
]

/* ============================================================
   Favorite field + the prompts that built it
   `w` is a 1–5 weight: it drives type size in the cloud and
   ranks the table fallback. No colour encoding — size only.
   ============================================================ */
export const FIELD = {
  name: 'Software & IT Services',
  pct: 47,
  sessions: 1604,
  runnersUp: [
    { name: 'Software & IT Services', pct: 47 },
    { name: 'Education & Research', pct: 21 },
    { name: 'Finance & Markets', pct: 14 },
    { name: 'Health & Lifestyle', pct: 11 },
    { name: 'Everything else', pct: 7 },
  ],
}

export const QUESTION_CLOUD = [
  { q: 'why is my build failing', w: 5, count: 214 },
  { q: 'explain this stack trace', w: 4, count: 168 },
  { q: 'refactor this into a hook', w: 4, count: 151 },
  { q: 'is this O(n log n)', w: 2, count: 44 },
  { q: 'write a migration for this schema', w: 3, count: 97 },
  { q: 'docker compose wont start', w: 3, count: 88 },
  { q: 'what does this regex do', w: 2, count: 61 },
  { q: 'make the tests pass', w: 5, count: 203 },
  { q: 'best way to cache this', w: 2, count: 52 },
  { q: 'rewrite this commit message', w: 1, count: 29 },
  { q: 'why is the CSS not applying', w: 3, count: 84 },
  { q: 'kubernetes pod crashloopbackoff', w: 2, count: 47 },
  { q: 'summarize this PR for review', w: 3, count: 79 },
  { q: 'typescript type error help', w: 4, count: 142 },
  { q: 'how do I undo a git rebase', w: 2, count: 58 },
  { q: 'is this thread safe', w: 1, count: 26 },
  { q: 'design a rate limiter', w: 2, count: 41 },
  { q: 'name this variable for me', w: 1, count: 33 },
  { q: 'ship it', w: 4, count: 130 },
]
