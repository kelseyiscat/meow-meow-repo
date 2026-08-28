import { useState } from 'react'
import { Rail, TopBar } from './components/Chrome'
import { Hero } from './components/Hero'
import { Panel, Section } from './components/Section'
import { StatTile } from './components/StatTile'
import { ModeStack } from './components/ModeStack'
import { BarList } from './components/BarList'
import { DataTable } from './components/DataTable'
import { ActivityHeatmap } from './components/ActivityHeatmap'
import { SessionDigest } from './components/SessionDigest'
import { QuestionCloud } from './components/QuestionCloud'
import { Archetype } from './components/Archetype'
import { TooltipProvider } from './components/Tooltip'
import { KPIS, LANGUAGES, MODELS } from './data'

const fmt = (n) => n.toLocaleString('en-US')

export default function App() {
  const [tablesOpen, setTablesOpen] = useState(false)

  return (
    <TooltipProvider>
      <Rail />
      <TopBar tablesOpen={tablesOpen} onToggleTables={() => setTablesOpen((v) => !v)} />

      <main>
        <div className="wrap">
          <Hero />

          <Section kicker="The headline" title="A year in four numbers.">
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
            kicker="The digest"
            title="The sessions that stuck."
            sub="The latest, the longest, and the one where you steered the most — three conversations pulled straight out of your year."
          >
            <SessionDigest />
          </Section>

          <Section
            kicker="Your favorite field"
            title="Software & IT services, naturally."
            sub="You routed 41% of your 3,412 prompts here. A cloud of what you actually asked — sized by how often you asked it."
          >
            <Panel>
              <QuestionCloud />
            </Panel>
          </Section>

          <Archetype />

          <footer className="foot">
            <div>arena.ai · Wrapped 2026 · Numbers are illustrative</div>
            <div>Built at the hackathon, at approximately 11pm</div>
          </footer>
        </div>
      </main>
    </TooltipProvider>
  )
}
