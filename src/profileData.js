/**
 * Profile + running metrics + badges. Illustrative, same as `data.js` —
 * swap for a real `/me` response and the components downstream keep working.
 */

export const USER = {
  name: 'Rex Stockham',
  handle: '@rex',
  email: 'rex@arena.ai',
  role: 'Staff Engineer',
  team: 'Platform',
  joined: 'Joined March 2024',
  plan: 'Team',
  initials: 'R',
}

export const PRESET_AVATARS = [
  { id: 'moss', label: 'Moss', from: '#2f7d4f', to: '#1f5c3a' },
  { id: 'tide', label: 'Tide', from: '#3987e5', to: '#1c5cab' },
  { id: 'ember', label: 'Ember', from: '#d95926', to: '#9c3d18' },
  { id: 'clay', label: 'Clay', from: '#c98500', to: '#8a5c00' },
  { id: 'slate', label: 'Slate', from: '#5f6b78', to: '#3b444d' },
]

/**
 * Running counters. `series` is the last 14 periods for the sparkline,
 * `delta` is the change vs the previous window of the same length.
 */
export const METRICS = {
  '7d': [
    { id: 'prompts', label: 'Prompts', value: 214, delta: 12, unit: '', series: [22, 19, 28, 31, 24, 35, 29, 33, 26, 38, 30, 41, 36, 44] },
    { id: 'hours', label: 'Agent hours', value: 63, delta: 8, unit: 'h', series: [6, 7, 5, 9, 8, 11, 9, 12, 10, 13, 11, 14, 12, 15] },
    { id: 'streak', label: 'Current streak', value: 9, delta: 0, unit: 'd', series: [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9] },
  ],
  '30d': [
    { id: 'prompts', label: 'Prompts', value: 892, delta: 18, unit: '', series: [48, 55, 61, 58, 66, 72, 69, 78, 74, 83, 79, 88, 84, 92] },
    { id: 'hours', label: 'Agent hours', value: 271, delta: 14, unit: 'h', series: [14, 17, 16, 20, 19, 23, 21, 25, 23, 27, 25, 29, 27, 31] },
    { id: 'streak', label: 'Current streak', value: 9, delta: 0, unit: 'd', series: [3, 5, 2, 7, 4, 9, 6, 8, 5, 9, 7, 9, 8, 9] },
  ],
  all: [
    { id: 'prompts', label: 'Prompts', value: 3412, delta: 24, unit: '', series: [8, 11, 9, 14, 12, 17, 15, 21, 19, 24, 22, 28, 26, 31] },
    { id: 'hours', label: 'Agent hours', value: 1204, delta: 21, unit: 'h', series: [40, 52, 61, 58, 74, 88, 95, 104, 112, 126, 138, 156, 149, 168] },
    { id: 'streak', label: 'Longest streak', value: 63, delta: 0, unit: 'd', series: [7, 12, 9, 21, 16, 28, 24, 39, 31, 47, 42, 58, 51, 63] },
  ],
}

export const RANGES = [
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: 'all', label: 'All time' },
]

/**
 * Badges. Earned ones carry a date; locked ones carry progress toward the
 * threshold so the grid reads as a ladder rather than a wall of grey.
 */
export const BADGES = [
  { id: 'night-owl', name: 'Night Owl', icon: '🌙', tint: 'var(--blue)', desc: '500 prompts sent after 10pm.', earned: 'Apr 2026' },
  { id: 'streak-60', name: 'Iron Streak', icon: '🔥', tint: 'var(--orange)', desc: '60-day run without missing a session.', earned: 'Jul 2026' },
  { id: 'shipper', name: 'Shipper', icon: '🚢', tint: 'var(--green)', desc: '100 agent-authored PRs merged.', earned: 'Jun 2026' },
  { id: 'deleter', name: 'Net Negative', icon: '✂️', tint: 'var(--blue)', desc: 'Deleted more lines than you added over a quarter.', earned: 'May 2026' },
  { id: 'reviewer', name: 'Good Neighbour', icon: '🤝', tint: 'var(--green)', desc: '250 reviews left on teammates’ agent PRs.', earned: 'Aug 2026' },
  { id: 'polyglot', name: 'Polyglot', icon: '🧩', tint: 'var(--yellow)', desc: 'Shipped in six languages in one year.', earned: 'Feb 2026' },
  { id: 'marathon', name: 'Marathon', icon: '⏱', tint: 'var(--orange)', desc: 'A single session over eight hours.', progress: 0.84, goal: '6h 42m of 8h' },
  { id: 'century', name: 'Century', icon: '💯', tint: 'var(--blue)', desc: '100 merged PRs in a single month.', progress: 0.46, goal: '46 of 100 this month' },
  { id: 'mentor', name: 'Mentor', icon: '🧭', tint: 'var(--green)', desc: 'Onboard five teammates to Agent Mode.', progress: 0.6, goal: '3 of 5 onboarded' },
]

export const DEFAULT_SETTINGS = {
  defaultMode: 'agent',
  defaultModel: 'claude-opus-5',
  autoRun: true,
  notifications: true,
  telemetry: false,
  reducedMotion: false,
}

export const SETTINGS_SCHEMA = [
  {
    group: 'Agent',
    fields: [
      { key: 'defaultMode', label: 'Default mode', help: 'What new sessions open in.', type: 'select', options: [ { value: 'agent', label: 'Agent Mode' }, { value: 'ask', label: 'Ask' }, { value: 'edit', label: 'Edit' } ] },
      { key: 'defaultModel', label: 'Default model', help: 'Used unless a session overrides it.', type: 'select', options: [ { value: 'claude-opus-5', label: 'claude-opus-5' }, { value: 'claude-sonnet-5', label: 'claude-sonnet-5' }, { value: 'claude-haiku-4-5', label: 'claude-haiku-4.5' } ] },
      { key: 'autoRun', label: 'Auto-run safe commands', help: 'Read-only shell commands run without a prompt.', type: 'toggle' },
    ],
  },
  {
    group: 'Notifications & privacy',
    fields: [
      { key: 'notifications', label: 'Desktop notifications', help: 'Ping when a long-running agent finishes.', type: 'toggle' },
      { key: 'telemetry', label: 'Share usage analytics', help: 'Anonymous product metrics. Never prompt contents.', type: 'toggle' },
      { key: 'reducedMotion', label: 'Reduce motion', help: 'Turn off count-ups and scroll reveals.', type: 'toggle' },
    ],
  },
]
