import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Panel, Section } from '../components/Section'
import { StatTile } from '../components/StatTile'
import { ModeStack } from '../components/ModeStack'
import { BarList } from '../components/BarList'
import { DataTable } from '../components/DataTable'
import { ActivityHeatmap } from '../components/ActivityHeatmap'
import { SessionHighlights } from '../components/SessionHighlights'
import { QuestionCloud } from '../components/QuestionCloud'
import { Archetype } from '../components/Archetype'
import { KPIS, LANGUAGES, MODELS } from '../data'

const fmt = (n) => n.toLocaleString('en-US')

export default function Wrapped({ tablesOpen }) {
  return (
    <div className="wrap">
      <Hero />

      <Section kicker="The headline" title="A year in three numbers.">
        {(shown) => (
          <div className="kpis">
            {KPIS.map((kpi, i) => (
              <StatTile key={kpi.id} {...kpi} active={shown} delay={i * 70} />
            ))}
          </div>
        )}
      </Section>

      <Section
        kicker="How you worked"
        title="Mostly, you let it drive."
        sub="Share of all 3,412 prompts by mode. Agent Mode overtook Ask in March and never gave it back."
      >
        <Panel>
          <ModeStack tablesOpen={tablesOpen} />
        </Panel>
      </Section>

      <Section
        kicker="Where the lines went"
        title="Six languages, one obsession."
        sub="Share of 412,806 lines your agents wrote, edited, or mercifully deleted."
      >
        <Panel>
          {(shown) => (
            <>
              <BarList
                items={LANGUAGES}
                active={shown}
                tooltip={(l) => (
                  <>
                    {l.name}&nbsp;<b>{l.pct}%</b> <span>· {fmt(l.lines)} lines</span>
                  </>
                )}
              />
              <DataTable
                open={tablesOpen}
                caption="Lines by language"
                head={['Language', 'Share', 'Lines']}
                rows={LANGUAGES.map((l) => [l.name, `${l.pct}%`, fmt(l.lines)])}
              />
            </>
          )}
        </Panel>
      </Section>

      <Section
        kicker="Who you worked with"
        title="You had a type."
        sub="Share of sessions by the model behind the agent."
      >
        <Panel>
          {(shown) => (
            <>
              <BarList
                items={MODELS}
                active={shown}
                tooltip={(m) => (
                  <>
                    {m.name}&nbsp;<b>{m.pct}%</b> <span>· {fmt(m.sessions)} sessions</span>
                  </>
                )}
              />
              <DataTable
                open={tablesOpen}
                caption="Sessions by model"
                head={['Model', 'Share', 'Sessions', 'Notes']}
                rows={MODELS.map((m) => [m.name, `${m.pct}%`, fmt(m.sessions), m.note])}
              />
            </>
          )}
        </Panel>
      </Section>

      <Section
        kicker="When you worked"
        title="You are, statistically, nocturnal."
        sub="Prompts by day and hour. Darker means quieter; brighter means you were very much awake."
      >
        <Panel>
          <ActivityHeatmap tablesOpen={tablesOpen} />
        </Panel>
      </Section>

      <Section
        kicker="Your standouts"
        title="Three sessions that defined the year."
        sub="The latest, the longest, and the one you would not stop steering."
      >
        <SessionHighlights tablesOpen={tablesOpen} />
      </Section>

      <Section
        kicker="What you asked about"
        title="You lived in Software & IT Services."
        sub="47% of your sessions landed in one field. Here's the language you brought to it — bigger means you typed it more."
      >
        <Panel>{(shown) => <QuestionCloud active={shown} tablesOpen={tablesOpen} />}</Panel>
      </Section>

      <Archetype />

      <footer className="foot">
        <div>arena.ai · Wrapped 2026 · Numbers are illustrative</div>
        <Link className="foot-link" to="/">← Back to your profile</Link>
      </footer>
    </div>
  )
}
