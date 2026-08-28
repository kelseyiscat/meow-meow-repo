import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Panel, Section } from '../components/Section'
import { StatTile } from '../components/StatTile'
import { ModeStack } from '../components/ModeStack'
import { BarList } from '../components/BarList'
import { DataTable } from '../components/DataTable'
import { SessionDigest } from '../components/SessionDigest'
import { QuestionCloud } from '../components/QuestionCloud'
import { Archetype } from '../components/Archetype'
import { KPIS, MODELS } from '../data'

const fmt = (n) => n.toLocaleString('en-US')

export default function Wrapped({ tablesOpen }) {
  return (
    <div className="wrap">
      <Hero />

      <Section
        kicker="Your favorite field"
        title="You lived in Software & IT Services."
        sub="You routed 41% of your 3,412 prompts here. A cloud of what you actually asked — sized by how often you asked it."
      >
        <Panel>
          <QuestionCloud />
        </Panel>
      </Section>

      <Section
        kicker="The digest"
        title="Three sessions that defined the year."
        sub="The latest, the longest, and the one where you steered the most — three conversations pulled straight out of your year."
      >
        <SessionDigest />
      </Section>

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
        kicker="How you voted"
        title="Mostly, you let it drive."
        sub="Share of all 3,412 prompts by arena mode. In Battle you never pick the contenders — two anonymous models answer, you vote, and only then are the names revealed."
      >
        <Panel>
          <ModeStack tablesOpen={tablesOpen} />
        </Panel>
      </Section>

      <Section
        kicker="Who you voted for"
        title="You had a type."
        sub="Share of your 2,794 votes by the model that won the battle."
      >
        <Panel>
          {(shown) => (
            <>
              <BarList
                items={MODELS}
                active={shown}
                tooltip={(m) => (
                  <>
                    {m.name}&nbsp;<b>{m.pct}%</b> <span>· {fmt(m.votes)} votes</span>
                  </>
                )}
              />
              <DataTable
                open={tablesOpen}
                caption="Votes by winning model"
                head={['Model', 'Share', 'Votes', 'Notes']}
                rows={MODELS.map((m) => [m.name, `${m.pct}%`, fmt(m.votes), m.note])}
              />
            </>
          )}
        </Panel>
      </Section>

      <Archetype />

      <footer className="foot">
        <div>arena.ai · Wrapped 2026 · Numbers are illustrative</div>
        <Link className="foot-link" to="/">← Back to your profile</Link>
      </footer>
    </div>
  )
}
