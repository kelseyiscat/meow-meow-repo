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
    { id: 'merged', label: 'PRs merged', value: 11, delta: -2, unit: '', series: [1, 2, 1, 3, 2, 1, 2, 3, 1, 2, 2, 3, 1, 2] },
    { id: 'accepted', label: 'Diff accept rate', value: 82, delta: 3, unit: '%', series: [74, 76, 73, 78, 80, 77, 81, 79, 83, 80, 84, 82, 85, 82] },
    { id: 'streak', label: 'Current streak', value: 9, delta: 0, unit: 'd', series: [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 9, 9, 9] },
    { id: 'reviews', label: 'Reviews given', value: 17, delta: 5, unit: '', series: [1, 2, 2, 3, 1, 2, 3, 2, 1, 3, 2, 4, 3, 2] },
  ],
  '30d': [
    { id: 'prompts', label: 'Prompts', value: 892, delta: 18, unit: '', series: [48, 55, 61, 58, 66, 72, 69, 78, 74, 83, 79, 88, 84, 92] },
    { id: 'hours', label: 'Agent hours', value: 271, delta: 14, unit: 'h', series: [14, 17, 16, 20, 19, 23, 21, 25, 23, 27, 25, 29, 27, 31] },
    { id: 'merged', label: 'PRs merged', value: 46, delta: 9, unit: '', series: [2, 3, 4, 3, 5, 4, 3, 5, 4, 6, 4, 5, 6, 4] },
    { id: 'accepted', label: 'Diff accept rate', value: 79, delta: 1, unit: '%', series: [72, 74, 71, 76, 78, 75, 79, 77, 80, 78, 81, 79, 82, 79] },
    { id: 'streak', label: 'Current streak', value: 9, delta: 0, unit: 'd', series: [3, 5, 2, 7, 4, 9, 6, 8, 5, 9, 7, 9, 8, 9] },
    { id: 'reviews', label: 'Reviews given', value: 63, delta: 11, unit: '', series: [3, 5, 4, 6, 5, 7, 4, 8, 6, 7, 5, 8, 6, 9] },
  ],
  all: [
    { id: 'prompts', label: 'Prompts', value: 3412, delta: 24, unit: '', series: [8, 11, 9, 14, 12, 17, 15, 21, 19, 24, 22, 28, 26, 31] },
    { id: 'hours', label: 'Agent hours', value: 1204, delta: 21, unit: 'h', series: [40, 52, 61, 58, 74, 88, 95, 104, 112, 126, 138, 156, 149, 168] },
    { id: 'merged', label: 'PRs merged', value: 187, delta: 16, unit: '', series: [6, 9, 8, 13, 11, 16, 14, 19, 17, 22, 25, 27, 24, 29] },
    { id: 'accepted', label: 'Diff accept rate', value: 77, delta: 6, unit: '%', series: [61, 64, 67, 66, 70, 69, 72, 71, 74, 73, 76, 75, 78, 77] },
    { id: 'streak', label: 'Longest streak', value: 63, delta: 0, unit: 'd', series: [7, 12, 9, 21, 16, 28, 24, 39, 31, 47, 42, 58, 51, 63] },
    { id: 'reviews', label: 'Reviews given', value: 421, delta: 19, unit: '', series: [12, 18, 15, 24, 21, 29, 26, 34, 30, 38, 35, 43, 39, 47] },
  ],
}

export const RANGES = [
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: 'all', label: 'All time' },
]

import nanoBananaTester from '../badge/nano-banana-tester.gif'
import fable5Tester from '../badge/fable-5-tester.gif'
import earlyAccessPioneer from '../badge/early-access-pioneer.gif'
import goodTaste from '../badge/good-taste.gif'
import leaderboardWhisperer from '../badge/leaderboard-whisperer.gif'
import trendsetter from '../badge/trendsetter.gif'
import onARoll from '../badge/on-a-roll.gif'
import weekendWarrior from '../badge/weekend-warrior.gif'
import modelExplorer from '../badge/model-explorer.gif'
import dailyDevotee from '../badge/daily-devotee.gif'
import consistencyChamp from '../badge/consistency-champ.gif'
import fairJudge from '../badge/fair-judge.gif'
import calibrationPro from '../badge/calibration-pro.gif'
import expertPrompter from '../badge/expert-prompter.gif'
import edgeCaseHunter from '../badge/edge-case-hunter.gif'
import creativeSpark from '../badge/creative-spark.gif'
import promptCurator from '../badge/prompt-curator.gif'

/**
 * Badges. Earned ones carry a date; locked ones carry progress toward the
 * threshold so the grid reads as a ladder rather than a wall of grey.
 * Icons are the animated GIFs from /badge.
 */
export const BADGES = [
  { id: 'early-access-pioneer', name: 'Early Access Pioneer', icon: earlyAccessPioneer, tint: 'var(--yellow)', desc: 'Joined Arena before general availability.', earned: 'Mar 2024' },
  { id: 'nano-banana-tester', name: 'Nano Banana Tester', icon: nanoBananaTester, tint: 'var(--yellow)', desc: 'Battled the Nano Banana image model during its trial run.', earned: 'Feb 2026' },
  { id: 'fable-5-tester', name: 'Fable 5 Tester', icon: fable5Tester, tint: 'var(--blue)', desc: 'Ran evaluation sessions on Fable 5 before launch.', earned: 'Apr 2026' },
  { id: 'good-taste', name: 'Good Taste', icon: goodTaste, tint: 'var(--green)', desc: 'Your picks matched the community consensus 100 times.', earned: 'May 2026' },
  { id: 'trendsetter', name: 'Trendsetter', icon: trendsetter, tint: 'var(--orange)', desc: 'Backed five models before they hit the top ten.', earned: 'Jun 2026' },
  { id: 'on-a-roll', name: 'On A Roll', icon: onARoll, tint: 'var(--orange)', desc: '25 voting sessions completed in a single week.', earned: 'Jul 2026' },
  { id: 'weekend-warrior', name: 'Weekend Warrior', icon: weekendWarrior, tint: 'var(--blue)', desc: 'Active every weekend for two months straight.', earned: 'Jul 2026' },
  { id: 'model-explorer', name: 'Model Explorer', icon: modelExplorer, tint: 'var(--green)', desc: 'Compared 50 different models head to head.', earned: 'Aug 2026' },
  { id: 'fair-judge', name: 'Fair Judge', icon: fairJudge, tint: 'var(--blue)', desc: 'Cast 500 blind votes without peeking at model names.', earned: 'Aug 2026' },
  { id: 'creative-spark', name: 'Creative Spark', icon: creativeSpark, tint: 'var(--yellow)', desc: 'Ten of your prompts were featured on the explore page.', earned: 'Aug 2026' },
  { id: 'leaderboard-whisperer', name: 'Leaderboard Whisperer', icon: leaderboardWhisperer, tint: 'var(--blue)', desc: 'Predict the monthly leaderboard top three, three months running.', progress: 0.67, goal: '2 of 3 months' },
  { id: 'daily-devotee', name: 'Daily Devotee', icon: dailyDevotee, tint: 'var(--orange)', desc: 'Vote every day for 30 days straight.', progress: 0.3, goal: '9 of 30 days' },
  { id: 'consistency-champ', name: 'Consistency Champ', icon: consistencyChamp, tint: 'var(--green)', desc: 'Keep a 90-day streak without missing a session.', progress: 0.74, goal: '67 of 90 days' },
  { id: 'calibration-pro', name: 'Calibration Pro', icon: calibrationPro, tint: 'var(--blue)', desc: 'Reach 90% agreement with expert panel rankings.', progress: 0.86, goal: '77% of 90% agreement' },
  { id: 'expert-prompter', name: 'Expert Prompter', icon: expertPrompter, tint: 'var(--yellow)', desc: 'Send 1,000 prompts that produce a decisive winner.', progress: 0.62, goal: '618 of 1,000 prompts' },
  { id: 'edge-case-hunter', name: 'Edge Case Hunter', icon: edgeCaseHunter, tint: 'var(--orange)', desc: 'File 50 prompts that break a frontier model.', progress: 0.44, goal: '22 of 50 finds' },
  { id: 'prompt-curator', name: 'Prompt Curator', icon: promptCurator, tint: 'var(--green)', desc: 'Have 25 prompts adopted into the shared eval set.', progress: 0.52, goal: '13 of 25 adopted' },
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

/* ============================================================
   Model / arena statistics
   ============================================================ */

/** The one model you reach for. `runnersUp` gives it context, not a ranking chart. */
export const MOST_USED_MODEL = {
  name: 'claude-opus-5',
  share: 44,
  sessions: 1501,
  hours: 612,
  note: 'Your default for anything gnarly — and 71% of everything you merged.',
  firstUsed: 'First used Feb 2026',
  runnersUp: [
    { name: 'claude-sonnet-5', share: 31 },
    { name: 'claude-haiku-4.5', share: 17 },
    { name: 'everything else', share: 8 },
  ],
}

/**
 * Preview models you voted for while they were still under a codename.
 * Some have since been revealed; the rest are still in the blind pool.
 */
export const PRIVATE_MODELS = [
  { codename: 'anonymous-otter', votes: 312, winRate: 68, revealed: null },
  { codename: 'stealth-marmot', votes: 244, winRate: 61, revealed: 'claude-opus-5' },
  { codename: 'quiet-heron', votes: 198, winRate: 57, revealed: null },
  { codename: 'hidden-lynx', votes: 141, winRate: 54, revealed: 'claude-sonnet-5' },
  { codename: 'silent-pika', votes: 96, winRate: 49, revealed: null },
]

/** Where you spend your battles. Share of 2,938 votes cast. */
export const ARENAS = [
  { name: 'Code Arena', icon: '⌘', share: 41, battles: 1204, note: 'You voted here more than the next two combined.' },
  { name: 'WebDev Arena', icon: '◧', share: 23, battles: 676 },
  { name: 'Text Arena', icon: '¶', share: 18, battles: 529 },
  { name: 'Vision Arena', icon: '◎', share: 11, battles: 323 },
  { name: 'Image Arena', icon: '✦', share: 7, battles: 206 },
]

/**
 * The last seven days, oldest first. Sums to the 214 prompts reported by the
 * 7-day metric tile, so the two never disagree.
 */
export const LAST_WEEK = [
  { day: 'Sat', date: 'Aug 22', prompts: 14, hours: 3.1 },
  { day: 'Sun', date: 'Aug 23', prompts: 11, hours: 2.4 },
  { day: 'Mon', date: 'Aug 24', prompts: 32, hours: 8.6 },
  { day: 'Tue', date: 'Aug 25', prompts: 41, hours: 11.2 },
  { day: 'Wed', date: 'Aug 26', prompts: 37, hours: 10.4 },
  { day: 'Thu', date: 'Aug 27', prompts: 52, hours: 14.8 },
  { day: 'Fri', date: 'Aug 28', prompts: 27, hours: 7.3, partial: true },
]
