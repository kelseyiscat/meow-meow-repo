import { useEffect, useState } from 'react'

const Arrow = () => <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" /></svg>
const Leaf = () => <svg className="leaf" viewBox="0 0 32 32" aria-hidden="true"><path d="M26 5C14 5 7 11 7 20c0 3 2 6 5 7 9-1 14-9 14-22Z"/><path d="M7 27c4-7 9-11 16-16"/></svg>

function Dashboard() {
  return <div className="dashboard" aria-label="Arena Farm dashboard preview">
    <div className="dash-top"><span className="dash-brand"><i /> Good morning, Mia</span><span className="avatar">MF</span></div>
    <div className="dash-body">
      <aside><b>Overview</b><span>Plan</span><span>Fields</span><span>Team</span><span>Insights</span></aside>
      <div className="dash-main">
        <div className="dash-title"><div><small>Monday, May 18</small><strong>Farm overview</strong></div><button>+ Add task</button></div>
        <div className="weather"><div><small>Today at Arena Farm</small><b>Clear skies, ideal field conditions</b></div><strong>72°</strong></div>
        <div className="metric-row"><div><small>Active fields</small><b>12</b><em>+2 this season</em></div><div><small>Tasks today</small><b>8</b><em>5 completed</em></div><div><small>Team on site</small><b>6</b><em>All checked in</em></div></div>
        <div className="lower"><div className="fields"><div className="panel-head"><b>Field status</b><span>View all</span></div>{[['North pasture','Corn','78%'],['River bend','Tomatoes','52%'],['Hill block','Wheat','91%']].map(x=><div className="field-row" key={x[0]}><i/><span><b>{x[0]}</b><small>{x[1]}</small></span><em>{x[2]}</em></div>)}</div><div className="harvest"><div className="panel-head"><b>Harvest outlook</b><span>Jun</span></div><div className="bars"><i/><i/><i/><i/><i/><i/><i/><i/></div><strong>24.8t</strong><small>Projected yield</small></div></div>
      </div>
    </div>
  </div>
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [signup, setSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  useEffect(() => { if (signup) document.querySelector('#signup-email')?.focus() }, [signup])
  const submit = (e) => { e.preventDefault(); if (email) setSent(true) }
  return <>
    <div className="announcement">Built for growing teams. Arena Farm is now in early access. <button onClick={()=>setSignup(true)}>Join us <Arrow/></button></div>
    <header>
      <a className="logo" href="#top" aria-label="Arena Farm home"><span><Leaf/></span>Arena Farm</a>
      <button className="menu" aria-expanded={menu} aria-label="Toggle navigation" onClick={()=>setMenu(!menu)}><i/><i/></button>
      <nav className={menu ? 'open' : ''} onClick={()=>setMenu(false)}><a href="#features">Product</a><a href="#workflow">How it works</a><a href="#results">Why Arena</a></nav>
      <button className="nav-cta" onClick={()=>setSignup(true)}>Get started <Arrow/></button>
    </header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy">
          <div className="pill"><span/> Farm management, simplified</div>
          <h1>Grow smarter.<br/><em>Farm together.</em></h1>
          <p>Arena Farm brings your fields, team, and daily work into one clear view—so every decision moves your farm forward.</p>
          <div className="hero-actions"><button className="primary" onClick={()=>setSignup(true)}>Start growing <Arrow/></button><a className="secondary" href="#features">See how it works</a></div>
          <div className="micro"><span>✓ No credit card</span><span>✓ Set up in minutes</span></div>
        </div>
        <div className="hero-visual"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><Dashboard/><div className="float-card float-one"><span>✓</span><div><b>Irrigation complete</b><small>North pasture · just now</small></div></div><div className="float-card float-two"><small>Season yield</small><b>+18.4%</b></div></div>
      </section>

      <section className="proof" id="results"><p>Helping modern farms do more with every acre</p><div><span><b>18%</b> higher yield</span><span><b>9 hrs</b> saved weekly</span><span><b>32%</b> less admin</span><span><b>4.9/5</b> grower rating</span></div></section>

      <section className="features section" id="features"><div className="section-head"><div><span className="kicker">One farm. One view.</span><h2>Everything you need<br/>to keep growing.</h2></div><p>Less time chasing updates. More time making the decisions that matter.</p></div><div className="feature-grid">
        <article className="feature feature-large"><div className="icon">◎</div><h3>Plan with confidence</h3><p>Map your season, assign work, and keep every field on schedule from planting to harvest.</p><div className="mini-calendar"><div className="cal-head"><b>May 2026</b><span>‹ &nbsp; ›</span></div><div className="week">{['M','T','W','T','F','S','S'].map((x,i)=><i key={i}>{x}</i>)}</div><div className="days">{[11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(x=><i className={x===18?'today':x===20?'task':''} key={x}>{x}</i>)}</div><div className="cal-task"><span/> Scout river bend <b>8:30 AM</b></div></div></article>
        <article className="feature"><div className="icon">↗</div><h3>Run the day, together</h3><p>Give crews clear priorities and see progress as it happens—wherever you are.</p><div className="team-stack"><span>EK</span><span>JM</span><span>AL</span><i>+3</i></div><div className="progress"><span><i/></span><b>5 of 8 done</b></div></article>
        <article className="feature dark"><div className="icon">⌁</div><h3>Learn from every season</h3><p>Turn daily records into simple, useful insights for a stronger season ahead.</p><div className="chart"><div className="chart-line"><svg viewBox="0 0 320 110" preserveAspectRatio="none"><path d="M0 91 C42 84 50 55 84 64 S135 88 164 46 S218 65 247 30 S285 35 320 11"/><path className="fill" d="M0 91 C42 84 50 55 84 64 S135 88 164 46 S218 65 247 30 S285 35 320 11 V110 H0Z"/></svg></div><div><b>24.8t</b><span>+18.4%</span></div><small>Projected season yield</small></div></article>
      </div></section>

      <section className="workflow section" id="workflow"><div className="workflow-copy"><span className="kicker">From soil to sale</span><h2>Your whole season,<br/>in step.</h2><p>Arena keeps plans, people, and progress connected—without adding more work to your day.</p><button className="text-link" onClick={()=>setSignup(true)}>Explore Arena Farm <Arrow/></button></div><ol><li><span>01</span><div><h3>Set your season</h3><p>Add fields, crops, and milestones. Arena turns your plan into a clear daily rhythm.</p></div></li><li><span>02</span><div><h3>Move work forward</h3><p>Assign tasks, capture field notes, and keep the whole crew aligned in real time.</p></div></li><li><span>03</span><div><h3>Grow with the data</h3><p>Spot trends, compare outcomes, and make next season your strongest yet.</p></div></li></ol></section>

      <section className="final-cta"><div className="seed seed-a">✦</div><div className="seed seed-b">✦</div><Leaf/><span className="kicker">Ready when you are</span><h2>Make room for<br/><em>better growing.</em></h2><p>Join forward-thinking farms building simpler, stronger operations with Arena.</p><button className="primary light" onClick={()=>setSignup(true)}>Get started free <Arrow/></button></section>
    </main>
    <footer><a className="logo" href="#top"><span><Leaf/></span>Arena Farm</a><p>Farm management for people who grow.</p><div><a href="#features">Product</a><a href="#workflow">How it works</a><button onClick={()=>setSignup(true)}>Contact</button></div><small>© 2026 Arena Farm</small></footer>

    {signup && <div className="modal-backdrop" role="presentation" onMouseDown={(e)=>e.target===e.currentTarget&&setSignup(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="close" aria-label="Close" onClick={()=>setSignup(false)}>×</button>{sent ? <div className="success"><span>✓</span><h2 id="modal-title">You're on the list.</h2><p>Thanks for growing with us. We’ll send early-access details to <b>{email}</b>.</p><button className="primary" onClick={()=>setSignup(false)}>Done</button></div> : <><span className="kicker">Early access</span><h2 id="modal-title">Let’s grow something better.</h2><p>Tell us where to send your Arena Farm invitation.</p><form onSubmit={submit}><label htmlFor="signup-email">Work email</label><input id="signup-email" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@yourfarm.com" required/><button className="primary" type="submit">Request access <Arrow/></button></form><small>No spam. Just product news and your early-access invite.</small></>}</div></div>}
  </>
}
