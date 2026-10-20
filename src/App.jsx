import { useEffect, useRef, useState } from 'react'

const Icon = ({ name, size = 20, strokeWidth = 1.8, className = '' }) => {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m14 7 5 5-5 5"/></>,
    sprout: <><path d="M12 21v-9"/><path d="M12 15c-4.4 0-7-2.5-7-7 4.4 0 7 2.5 7 7Z"/><path d="M12 12c0-4.4 2.5-7 7-7 0 4.4-2.5 7-7 7Z"/></>,
    play: <path d="m9 7 8 5-8 5Z"/>,
    check: <path d="m5 12 4.2 4.2L19 6.5"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/></>,
    tool: <><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 8.4 7.2 6.1 4.9a4 4 0 0 0 5 5L4 17l3 3 7.7-7.7a4 4 0 0 0 5-5L17.4 9.6l-3.6-3.6 2.3-2.3"/></>,
    basket: <><path d="M4 9h16l-1.5 11h-13Z"/><path d="m8 9 4-6 4 6M8 13v3M12 13v3M16 13v3"/></>,
    field: <><path d="M4 20c2.5-5 5.2-7.5 8-7.5s5.5 2.5 8 7.5"/><path d="M7 20c1.5-3.2 3.2-4.8 5-4.8s3.5 1.6 5 4.8M12 12.5V4"/><path d="M12 8c-3 0-4.5-1.4-4.5-4 3 0 4.5 1.4 4.5 4ZM12 6.5c0-2.5 1.4-4 4.5-4 0 2.6-1.5 4-4.5 4Z"/></>,
    people: <><circle cx="9" cy="8" r="3"/><path d="M3.5 20c.3-4 2-6 5.5-6s5.2 2 5.5 6"/><circle cx="17" cy="9" r="2.2"/><path d="M15.5 15c3.3-.6 5.1 1 5.3 4"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    history: <><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5M12 7v5l4 2"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4 4"/></>,
    headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h3v6H5a1 1 0 0 1-1-1ZM20 14h-3v6h2a1 1 0 0 0 1-1Z"/></>,
    pen: <><path d="m14 5 5 5L8 21H3v-5Z"/><path d="m12 7 5 5"/></>,
    gear: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
    quote: <><path d="M5 11h5v8H4v-5c0-5 2-8 6-9"/><path d="M15 11h5v8h-6v-5c0-5 2-8 6-9"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    leaf: <><path d="M19 3C10 3 5 7.5 5 14c0 3 2 5 5 5 6.5 0 9-7 9-16Z"/><path d="M5 21c2.5-6 5.5-9 10-12"/></>,
    chevron: <path d="m8 10 4 4 4-4"/>,
  }
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const Logo = () => (
  <a className="logo" href="#top" aria-label="Arena Farm home">
    <span className="logo-mark"><span/><span/><span/></span>
    <span>Arena <b>Farm</b></span>
  </a>
)

const AgentFace = ({ color = 'green', mood = 'happy' }) => (
  <span className={`agent-face ${color}`} aria-hidden="true">
    <i/><i/>
    <em className={mood}/>
  </span>
)

const GrowingPlot = ({ className, label, progress, color, children }) => (
  <div className={`growing-plot ${className || ''}`}>
    <div className="plot-top">
      <span>{label}</span>
      <b>{progress}%</b>
    </div>
    <div className="mini-track"><i style={{ width: `${progress}%`, background: color }}/></div>
    <div className="plot-crops" aria-hidden="true">{children}</div>
  </div>
)

function FarmDashboard() {
  return (
    <div className="farm-visual" aria-label="Illustration of an Arena Farm agent workspace">
      <div className="farm-window-top">
        <div className="window-dots"><i/><i/><i/></div>
        <span className="live-pill"><i/> Farm is thriving</span>
        <button type="button" aria-label="Dashboard options">•••</button>
      </div>
      <div className="farm-canvas">
        <div className="sun-orb"><Icon name="sun" size={19}/></div>
        <div className="cloud cloud-one"/><div className="cloud cloud-two"/>
        <svg className="hills" viewBox="0 0 800 350" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 175C120 100 225 132 310 178C410 230 490 101 610 125C704 144 743 111 800 75V350H0Z" fill="#b8dd8f"/>
          <path d="M0 226C105 160 199 170 290 218C393 272 480 185 585 194C679 202 727 165 800 139V350H0Z" fill="#89bf67"/>
          <path d="M0 275C155 217 248 264 351 252C485 237 584 277 800 207V350H0Z" fill="#5b9651"/>
        </svg>
        <div className="barn" aria-hidden="true">
          <span className="barn-roof"/><span className="barn-body"><i/><i/></span><span className="barn-silo"/>
        </div>
        <div className="windmill" aria-hidden="true"><span/><i/><i/><i/><i/></div>
        <GrowingPlot className="plot-one" label="Research plot" progress={76} color="#5fa757">
          <span className="crop carrot">●</span><span className="crop carrot">●</span><span className="crop carrot">●</span><span className="crop carrot">●</span>
        </GrowingPlot>
        <GrowingPlot className="plot-two" label="Inbox plot" progress={48} color="#f2a23a">
          <span className="crop flower">✦</span><span className="crop flower">✦</span><span className="crop flower">✦</span>
        </GrowingPlot>
        <div className="farm-agent agent-a"><AgentFace color="yellow"/><span><b>Pip</b><small>Gathering sources</small></span><i className="agent-status"/></div>
        <div className="farm-agent agent-b"><AgentFace color="blue"/><span><b>Bluebell</b><small>3 tasks ready</small></span><i className="agent-status"/></div>
        <div className="harvest-toast"><span><Icon name="basket" size={17}/></span><div><b>Fresh harvest!</b><small>Market report is ready</small></div><Icon name="check" size={17}/></div>
      </div>
      <div className="farm-bottom-bar">
        <span><i className="status-dot"/> 4 agents growing</span>
        <span>Last harvest <b>2 min ago</b></span>
      </div>
    </div>
  )
}

const StepCard = ({ number, icon, title, copy, accent }) => (
  <article className={`step-card reveal ${accent}`}>
    <div className="step-number">{number}</div>
    <div className="step-icon"><Icon name={icon} size={27}/></div>
    <h3>{title}</h3>
    <p>{copy}</p>
    <div className="step-art" aria-hidden="true">
      {number === '01' && <><span className="seed seed-a"/><span className="seed seed-b"/><span className="seed seed-c"/><i className="soil-line"/></>}
      {number === '02' && <><span className="watering">⌁</span><span className="tiny-sprout one">♣</span><span className="tiny-sprout two">♣</span><span className="tiny-sprout three">♣</span></>}
      {number === '03' && <><span className="basket-art">▰</span><span className="fruit f1">●</span><span className="fruit f2">●</span><span className="fruit f3">●</span><span className="fruit f4">●</span></>}
    </div>
  </article>
)

const features = [
  { icon: 'field', title: 'Agent plots', copy: 'Give every agent a tidy plot with its own goal, memory, and growing instructions.', color: 'sage', meta: '12 plots active' },
  { icon: 'tool', title: 'Shared tool shed', copy: 'Connect the tools your team already uses. Agents pick the right one for each job.', color: 'sun', meta: '40+ integrations' },
  { icon: 'clock', title: 'Smart schedules', copy: 'Set a rhythm once and let recurring research, reports, and follow-ups grow on time.', color: 'sky', meta: 'Always on time' },
  { icon: 'history', title: 'Harvest history', copy: 'See what was made, how it was made, and share every useful output with your team.', color: 'tomato', meta: 'Full traceability' },
]

const agents = [
  { id: 'scout', icon: 'search', name: 'Research Scout', type: 'Research', color: 'green', copy: 'Scans the open web, finds trustworthy sources, and returns a neat brief.', task: 'Competitor landscape', time: '8 min', yield: '14 sources' },
  { id: 'clover', icon: 'headphones', name: 'Support Clover', type: 'Customer care', color: 'yellow', copy: 'Sorts questions, drafts helpful answers, and flags conversations that need a human.', task: 'Morning inbox', time: '4 min', yield: '31 replies' },
  { id: 'poppy', icon: 'pen', name: 'Content Poppy', type: 'Creative', color: 'red', copy: 'Turns rough ideas and product notes into sharp, on-brand first drafts.', task: 'Launch campaign', time: '12 min', yield: '6 drafts' },
  { id: 'moss', icon: 'gear', name: 'Ops Moss', type: 'Operations', color: 'blue', copy: 'Keeps projects moving with clean handoffs, status updates, and tidy records.', task: 'Weekly pulse', time: '6 min', yield: '9 updates' },
]

function AgentCard({ agent, harvested, onHarvest }) {
  return (
    <article className={`agent-card reveal ${harvested ? 'harvested' : ''}`}>
      <div className="agent-card-top">
        <span className={`agent-icon ${agent.color}`}><Icon name={agent.icon} size={22}/></span>
        <span className="agent-type">{agent.type}</span>
      </div>
      <h3>{agent.name}</h3>
      <p>{agent.copy}</p>
      <div className="agent-task">
        <div><span className="pulse"/><b>{harvested ? 'Harvest complete' : agent.task}</b></div>
        <small>{harvested ? 'Just now' : 'Growing now'}</small>
      </div>
      <div className="agent-metrics"><span><small>Time</small><b>{agent.time}</b></span><span><small>Yield</small><b>{agent.yield}</b></span></div>
      <button className="harvest-button" type="button" onClick={() => onHarvest(agent.id)}>
        <Icon name={harvested ? 'check' : 'basket'} size={17}/>{harvested ? 'Harvested' : 'Harvest now'}
      </button>
    </article>
  )
}

function SignupModal({ mode, onClose }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [onClose])

  const submit = (event) => {
    event.preventDefault()
    setDone(true)
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close dialog"><Icon name="close"/></button>
        {done ? (
          <div className="success-state">
            <span className="success-icon"><Icon name="sprout" size={35}/></span>
            <p className="eyebrow">Your seed is planted</p>
            <h2 id="signup-title">Welcome to the farm!</h2>
            <p>We sent a magic growing link to <b>{email}</b>. Your first agent plot is waiting.</p>
            <button className="button primary full" type="button" onClick={onClose}>Back to the farm <Icon name="arrow" size={18}/></button>
          </div>
        ) : (
          <>
            <div className="modal-seal"><Icon name="sprout" size={27}/></div>
            <p className="eyebrow">{mode === 'signin' ? 'Welcome back' : 'Free to plant'}</p>
            <h2 id="signup-title">{mode === 'signin' ? 'Return to your farm' : 'Grow your first agent'}</h2>
            <p>{mode === 'signin' ? 'Enter your email and we’ll send you a secure sign-in link.' : 'No credit card. Start with one agent plot and a handful of tools.'}</p>
            <form onSubmit={submit}>
              <label htmlFor="signup-email">Work email</label>
              <div className="email-input"><Icon name="mail" size={19}/><input ref={inputRef} id="signup-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
              <button className="button primary full" type="submit">{mode === 'signin' ? 'Send sign-in link' : 'Start growing'} <Icon name="arrow" size={18}/></button>
            </form>
            <small className="modal-note">By continuing, you agree to our Terms and Privacy Policy.</small>
          </>
        )}
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [modal, setModal] = useState(null)
  const [harvested, setHarvested] = useState([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible'))
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const openModal = (mode = 'signup') => {
    setMenuOpen(false)
    setModal(mode)
  }

  const toggleHarvest = (id) => setHarvested((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])

  return (
    <div id="top" className="site-shell">
      <header className="nav-wrap">
        <nav className="nav container" aria-label="Main navigation">
          <Logo />
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#how" onClick={() => setMenuOpen(false)}>How it grows</a>
            <a href="#farm" onClick={() => setMenuOpen(false)}>The farm</a>
            <a href="#agents" onClick={() => setMenuOpen(false)}>Agent crops</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
            <div className="mobile-actions">
              <button className="text-button" type="button" onClick={() => openModal('signin')}>Sign in</button>
              <button className="button nav-cta" type="button" onClick={() => openModal('signup')}>Start growing <Icon name="arrow" size={17}/></button>
            </div>
          </div>
          <div className="nav-actions">
            <button className="text-button" type="button" onClick={() => openModal('signin')}>Sign in</button>
            <button className="button nav-cta" type="button" onClick={() => openModal('signup')}>Start growing <Icon name="arrow" size={17}/></button>
          </div>
          <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><Icon name={menuOpen ? 'close' : 'menu'} /></button>
        </nav>
      </header>

      <main>
        <section className="hero container">
          <div className="hero-copy reveal visible">
            <div className="hero-pill"><span>✦</span> AI agents, naturally productive</div>
            <h1>Plant an idea.<br/><em>Grow an agent.</em></h1>
            <p className="hero-lede">Arena Farm is the cheerful workspace where your team raises reliable AI agents—from first seed to useful harvest.</p>
            <div className="hero-actions">
              <button className="button primary" type="button" onClick={() => openModal('signup')}>Start growing — it’s free <Icon name="arrow" size={19}/></button>
              <a className="button secondary" href="#how"><span className="play-dot"><Icon name="play" size={15}/></span> See how it works</a>
            </div>
            <div className="tiny-proof">
              <div className="face-stack"><AgentFace color="green"/><AgentFace color="yellow"/><AgentFace color="blue"/><AgentFace color="red"/></div>
              <p><b>Loved by 2,400+ growing teams</b><span>Set up your first agent in under 5 minutes</span></p>
            </div>
          </div>
          <div className="hero-art reveal visible"><FarmDashboard/><span className="doodle doodle-arrow">↝</span><span className="doodle-note">watch work grow</span></div>
        </section>

        <section className="proof-band" aria-label="Arena Farm highlights">
          <div className="container proof-grid">
            <div><b>10k+</b><span>agent crops harvested</span></div>
            <div><b>6.2h</b><span>saved per teammate weekly</span></div>
            <div><b>40+</b><span>tools in the shed</span></div>
            <div><b>99.9%</b><span>farm uptime</span></div>
          </div>
        </section>

        <section id="how" className="section how-section">
          <div className="container">
            <div className="section-heading centered reveal">
              <p className="eyebrow"><span>01</span> How it grows</p>
              <h2>Good work starts<br/>with a tiny seed.</h2>
              <p>No prompt-wrangling degree required. Give Arena Farm a goal, connect your tools, and watch useful work take root.</p>
            </div>
            <div className="steps-grid">
              <StepCard number="01" icon="sprout" title="Plant a goal" copy="Describe the outcome you want in plain language. Pick a starter or begin from an empty plot." accent="mint" />
              <StepCard number="02" icon="tool" title="Tend with tools" copy="Connect the apps and context your agent needs. You stay in control of every permission." accent="yellow" />
              <StepCard number="03" icon="basket" title="Harvest results" copy="Run it once or put it on a schedule. Review, refine, and share the useful work it grows." accent="coral" />
            </div>
          </div>
        </section>

        <section id="farm" className="section feature-section">
          <div className="container feature-layout">
            <div className="feature-intro reveal">
              <p className="eyebrow"><span>02</span> Your agent acreage</p>
              <h2>Everything your farm needs to flourish.</h2>
              <p>One calm place to create agents, give them the right tools, and see exactly what they’re growing.</p>
              <button className="button secondary dark-outline" type="button" onClick={() => openModal('signup')}>Explore the farm <Icon name="arrow" size={18}/></button>
              <div className="feature-stamp" aria-hidden="true"><Icon name="leaf" size={25}/><span>Grown with<br/><b>care + clarity</b></span></div>
            </div>
            <div className="feature-grid">
              {features.map((feature) => (
                <article key={feature.title} className={`feature-card reveal ${feature.color}`}>
                  <div className="feature-card-head"><span><Icon name={feature.icon} size={24}/></span><i>↗</i></div>
                  <h3>{feature.title}</h3><p>{feature.copy}</p><small>{feature.meta}</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="agents" className="section agents-section">
          <div className="container">
            <div className="section-heading split reveal">
              <div><p className="eyebrow"><span>03</span> Ready-to-grow agents</p><h2>Meet this season’s<br/>favorite crops.</h2></div>
              <p>Start from a field-tested template, then shape it around the way your team really works.</p>
            </div>
            <div className="agent-grid">
              {agents.map((agent) => <AgentCard key={agent.id} agent={agent} harvested={harvested.includes(agent.id)} onHarvest={toggleHarvest}/>) }
            </div>
            <p className="harvest-hint reveal"><Icon name="basket" size={17}/> Try harvesting an agent above — don’t worry, they grow back.</p>
          </div>
        </section>

        <section className="quote-section">
          <div className="container quote-card reveal">
            <Icon className="quote-mark" name="quote" size={43} strokeWidth={1.4}/>
            <blockquote>“Arena Farm made agents feel less like a science project and more like a team we could actually grow with.”</blockquote>
            <div className="quote-person"><AgentFace color="red"/><span><b>Marisol Chen</b><small>Head of Operations at Juniper</small></span></div>
            <div className="quote-leaves" aria-hidden="true">❧</div>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="container faq-layout">
            <div className="faq-intro reveal"><p className="eyebrow"><span>04</span> The field guide</p><h2>A few things people ask before planting.</h2><p>Still curious? Our friendly farmhands are at <a href="mailto:hello@arenafarm.ai">hello@arenafarm.ai</a>.</p></div>
            <div className="faq-list reveal">
              <details open><summary>What exactly is an agent farm?<span><Icon name="chevron"/></span></summary><p>It’s one workspace for creating and managing helpful AI agents. Each “plot” keeps an agent’s goal, instructions, tools, schedule, and results together so it stays understandable.</p></details>
              <details><summary>Do I need to know how to code?<span><Icon name="chevron"/></span></summary><p>Nope. You can start from a template and describe what you need in plain language. Technical teams can still customize instructions and tool connections in detail.</p></details>
              <details><summary>Can agents use my existing tools?<span><Icon name="chevron"/></span></summary><p>Yes. Connect popular work apps from the shared tool shed and choose exactly which tools each agent may use. You can change or revoke access whenever you like.</p></details>
              <details><summary>How do I stay in control?<span><Icon name="chevron"/></span></summary><p>You decide whether an agent drafts, asks for approval, or takes action. Every harvest includes a clear activity history, so your team can review how the work was produced.</p></details>
              <details><summary>Is there a free plan?<span><Icon name="chevron"/></span></summary><p>Yes. The free plan includes one agent plot, core tools, and enough harvests to learn what works for your team. Upgrade only when you need more acreage.</p></details>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <div className="container closing-card reveal">
            <div className="closing-copy"><p className="eyebrow light"><span>✦</span> Your plot is waiting</p><h2>Ready to grow some<br/><em>seriously good work?</em></h2><p>Start free. Plant your first agent in minutes. Harvest something useful today.</p><button className="button light-button" type="button" onClick={() => openModal('signup')}>Start your farm <Icon name="arrow" size={19}/></button><small>No credit card • One free agent plot • Cancel anytime</small></div>
            <div className="closing-art" aria-hidden="true">
              <span className="big-sun"/><span className="closing-hill hill-back"/><span className="closing-hill hill-front"/>
              <div className="closing-barn"><i/><span/></div>
              <div className="closing-crops">♣ ♣ ♣ ♣ ♣</div>
              <div className="closing-agent"><AgentFace color="yellow"/><i>Hi!</i></div>
              <span className="bird b1">⌁</span><span className="bird b2">⌁</span>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-main">
          <div className="footer-brand"><Logo/><p>Grow a helpful little workforce,<br/>one thoughtful agent at a time.</p><span className="made-note"><Icon name="leaf" size={15}/> Made with sunshine in San Francisco</span></div>
          <div className="footer-links"><div><b>Product</b><a href="#how">How it grows</a><a href="#agents">Agent crops</a><a href="#farm">Integrations</a><a href="#top">Pricing</a></div><div><b>Company</b><a href="#top">About</a><a href="#top">Journal</a><a href="#top">Careers</a><a href="mailto:hello@arenafarm.ai">Contact</a></div><div><b>Follow the farm</b><a href="#top">Instagram</a><a href="#top">LinkedIn</a><a href="#top">X / Twitter</a><a href="#top">YouTube</a></div></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Arena Farm, Inc.</span><div><a href="#top">Privacy</a><a href="#top">Terms</a><a href="#top">Cookies</a></div><a className="back-top" href="#top">Back to top ↑</a></div>
      </footer>
      {modal && <SignupModal mode={modal} onClose={() => setModal(null)} />}
    </div>
  )
}

export default App
