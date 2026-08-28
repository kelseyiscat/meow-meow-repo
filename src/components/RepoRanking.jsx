import { DataTable } from './DataTable'
import { REPOS } from '../data'

const fmt = (n) => n.toLocaleString('en-US')

export function RepoRanking({ active, tablesOpen }) {
  const max = Math.max(...REPOS.map((r) => r.sessions))

  return (
    <>
      <div className="rank">
        {REPOS.map((repo, i) => (
          <div className="rank-row" key={repo.name}>
            <div className="rank-n">{String(i + 1).padStart(2, '0')}</div>
            <div>
              <div className="rank-name">{repo.name}</div>
              <div className="rank-meta">
                {fmt(repo.sessions)} sessions · {repo.agentPct}% agent mode
              </div>
              <div className="rank-meter">
                <i
                  style={{
                    width: active ? `${(repo.sessions / max) * 100}%` : 0,
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
              </div>
            </div>
            <div className="rank-val">
              {fmt(repo.sessions)}
              <small>sessions</small>
            </div>
          </div>
        ))}
      </div>

      <DataTable
        open={tablesOpen}
        caption="Sessions by repository"
        head={['#', 'Repository', 'Sessions', 'Agent mode']}
        rows={REPOS.map((r, i) => [i + 1, r.name, fmt(r.sessions), `${r.agentPct}%`])}
      />
    </>
  )
}
