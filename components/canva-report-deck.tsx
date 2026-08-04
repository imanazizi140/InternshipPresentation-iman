"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { CHATBOT_SLIDES } from "./chatbot-presentation-data"
import styles from "./canva-report-deck.module.css"

const PUBLIC_BASE_PATH = process.env.NODE_ENV === "production" ? "/InternshipPresentation-iman" : ""

export function CanvaReportDeck() {
  const [active, setActive] = useState(0)
  const current = CHATBOT_SLIDES[active]
  const isWhyDigitalBee = current.title === "Why\nDigitalBee?" && current.layout === "keywords"
  const isHappiestMoment = current.layout === "happiest"
  const isChallengeSlide = current.layout === "challenge"
  const overviewSections = [
    { title: "Why DigitalBee?", description: "My motivation and initial expectations", startTitle: "Why\nDigitalBee?" },
    { title: "My Chatbot Journey", description: "From MyGPT experiments to working AI systems", startTitle: "My chatbot\njourney" },
    { title: "Project Showcase & Live Demo", description: "Chatbots, CRM dashboards and website integration", startTitle: "Teaching AI how\nto communicate" },
    { title: "Challenges & Solutions", description: "The problems I faced and how I overcame them", startTitle: "My Biggest\nChallenge" },
    { title: "Reflection & Future", description: "What I learned and advice for future interns", startTitle: "What makes me\ndifferent from AI?" },
  ].map((section) => ({ ...section, number: CHATBOT_SLIDES.findIndex((slide) => slide.title === section.startTitle) + 1 }))
  const coverPath = `${PUBLIC_BASE_PATH}/canva-template/internship-cover-decor.webp`

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") setActive((index) => Math.min(index + 1, CHATBOT_SLIDES.length - 1))
      if (event.key === "ArrowLeft") setActive((index) => Math.max(index - 1, 0))
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const title = isWhyDigitalBee ? (
    <h1 className={styles.whyDigitalBeeTitle}><span>Why</span><strong>DigitalBee?</strong></h1>
  ) : (
    <h1 className={styles.title}>
      {current.title.split("\n").map((line, index) => <span key={line} className={index === 0 ? styles.orange : ""}>{line}</span>)}
    </h1>
  )

  const cardGrid = current.cards ? (
    <div className={[styles.chatbotCards, isWhyDigitalBee ? styles.whyDigitalBeeCards : ""].filter(Boolean).join(" ")}>
      {current.cards.map((card) => <article key={`${card.title}-${card.body}`}>
        {card.icon ? <span aria-hidden="true" className={styles.cardIcon}>{card.icon}</span> : null}
        {card.tag ? <span className={styles.cardTag}>{card.tag}</span> : null}
        <strong>{card.title}</strong><p>{card.body}</p>
      </article>)}
    </div>
  ) : null

  const body = (() => {
    if (current.layout === "happiest") return <div className={styles.happiestLayout}><div className={styles.happiestLeft}><h1 className={styles.happiestTitle}><span>My Most</span><em>Exciting</em><strong>Moment</strong></h1><p className={styles.happiestLead}>{current.lead}</p><p className={styles.happiestSupporting}>{current.subtitle}</p></div><div className={styles.happiestRight}><div className={styles.happiestFlow}>{["Write Prompt", "Test Response", "Identify Problems", "Refine Instructions", "Desired AI Response", "Chatwoot"].map((stage) => <span key={stage}>{stage}</span>)}</div><div className={styles.happiestEvidence}><article aria-label="Prompt or instruction screenshot placeholder" role="img"><b>Prompt Refinement</b><span>Prompt or instruction screenshot required</span></article><article aria-label="Final Chatwoot conversation screenshot placeholder" role="img"><b>Final Chatwoot Conversation</b><span>Final Chatwoot conversation screenshot required</span></article></div><div className={styles.happiestResults}>{[{ title: "Correct Communication Style", body: "Natural tone and intended responses" }, { title: "Controlled Conversation Flow", body: "Relevant questions and business rules" }, { title: "Smooth Chatwoot Integration", body: "Conversation ready for review and handoff" }].map((item, index) => <article key={item.title}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{item.title}</strong><span>{item.body}</span></div></article>)}</div></div><p className={styles.happiestTakeaway}>My prompt became the <strong>chatbot behaviour</strong> I had imagined.</p></div>
    if (current.layout === "challenge") return <div className={styles.challengeLayout}><div className={styles.challengeLeft}><h1 className={styles.challengeTitle}><span>My</span><em>Biggest</em><strong>Challenge</strong></h1><p className={styles.challengeQuestion}>{current.lead}</p><div className={styles.challengeTension}><span>Flexible AI<small>Different questions and businesses</small></span><b>↔</b><span>Controlled system<small>Rules, restrictions and human handoff</small></span></div></div><div className={styles.challengeRows}>{[{ title: "Different Business Requirements", body: "Different services, customers and conversation goals" }, { title: "Controlling AI Responses", body: "Prevent inaccurate information and unsupported promises" }, { title: "Connecting the Complete Workflow", body: "Link the chatbot, customer data, CRM and human follow-up" }].map((item, index) => <article key={item.title}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{item.title}</strong><p>{item.body}</p></div></article>)}</div><p className={styles.challengeTakeaway}>{current.subtitle}</p></div>
    if (current.layout === "timeline") return <div className={styles.timelineLayout}>{title}<div className={styles.timeline}>{current.flow?.map((stage, index) => <div key={stage}><b>{String(index + 1).padStart(2, "0")}</b><span>{stage}</span></div>)}</div><p className={styles.trailer}>Preview trailer <span>30–45 seconds</span></p></div>
    if (current.layout === "overview") return <div className={styles.overviewLayout}><div className={styles.overviewMeta}><span>{current.eyebrow}</span><span>LOCUS-T × DIGITALBEE</span></div><div className={styles.overviewTitle}><span>Presentation</span><strong>Overview</strong></div><div className={styles.overviewRows}>{overviewSections.map((section) => <article key={section.title}><div><strong>{section.title}</strong><p>{section.description}</p></div><b>{String(section.number).padStart(2, "0")}</b></article>)}</div></div>
    if (current.layout === "flow") return <div className={styles.flowLayout}><div>{title}{current.lead ? <p className={styles.lead}>{current.lead}</p> : null}</div><div className={styles.flow}>{current.flow?.map((step) => <span key={step}>{step}</span>)}</div></div>
    if (current.layout === "conversation") return <div className={styles.conversationLayout}><div>{title}<p className={styles.lead}>{current.lead}</p><div className={styles.chatMock}><p><b>Customer</b> I need a better website.</p><p><b>Chatbot</b> What is your current website and main goal?</p><p><b>Customer</b> Better visibility on Google.</p><p><b>Chatbot</b> SEO Enhancement may suit your goal.</p></div></div>{cardGrid}</div>
    if (current.layout === "dashboard") return <div className={styles.content}>{title}{cardGrid}</div>
    if (current.layout === "links") return <div className={styles.content}>{title}<p className={styles.lead}>{current.lead}</p><div className={styles.linkGrid}>{current.links?.map((link) => <a href={link.href} key={link.href} rel="noreferrer" target="_blank"><Image alt={`QR code for ${link.label}`} height={46} src={`${PUBLIC_BASE_PATH}/qr/${link.qr}`} width={46} /><span>Open public project</span><strong>{link.label}</strong><em>↗</em></a>)}</div></div>
    if (current.layout === "checklist") return <div className={styles.content}>{title}{current.lead ? <p className={styles.lead}>{current.lead}</p> : null}<ol className={styles.list}>{current.items?.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></div>
    if (current.layout === "keywords") return <div className={[styles.content, isWhyDigitalBee ? styles.whyDigitalBeeContent : ""].filter(Boolean).join(" ")}>{title}<p className={styles.lead}>{current.lead}</p>{cardGrid}{current.closingStatement ? isWhyDigitalBee ? <p className={styles.closingStatement}>I wanted to <strong>build and experiment</strong>—not only follow instructions.</p> : <p className={styles.closingStatement}>{current.closingStatement}</p> : null}{current.items ? <ol className={styles.list}>{current.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol> : null}</div>
    if (current.layout === "cards" || current.layout === "closing") return <div className={styles.content}>{title}{current.subtitle ? <p className={styles.subtitle}>{current.subtitle}</p> : null}{current.lead ? <p className={styles.lead}>{current.lead}</p> : null}{cardGrid}</div>
    return <div className={styles.content}>{title}<p className={styles.subtitle}>{current.subtitle}</p>{current.presenter ? <div className={styles.coverDetails}><p>{current.presenter.name}</p><span>{current.presenter.role}</span><span>{current.presenter.period}</span></div> : null}</div>
  })()

  return <main className={styles.deck} tabIndex={0}>
    <section key={active} className={[styles.slide, current.layout === "cover" ? styles.cover : "", current.layout === "overview" ? styles.overviewSlide : "", isWhyDigitalBee ? styles.whyDigitalBeeSlide : "", isHappiestMoment ? styles.happiestSlide : "", isChallengeSlide ? styles.challengeSlide : ""].filter(Boolean).join(" ")}>
      <Image alt="" className={styles.decor} fill priority sizes="100vw" src={coverPath} />
      {body}
      {active === 0 ? <div className={styles.partners} aria-label="LOCUS-T and DigitalBee"><Image alt="LOCUS-T" className={styles.partnerLogo} height={79} src={`${PUBLIC_BASE_PATH}/canva-template/locus-t-logo.png`} width={222} /><span aria-hidden="true">×</span><Image alt="DigitalBee" className={styles.partnerLogo} height={75} src={`${PUBLIC_BASE_PATH}/canva-template/digitalbee-logo.png`} width={144} /></div> : null}
    </section>
    <nav className={styles.controls} aria-label="Presentation navigation"><button aria-label="Previous slide" disabled={active === 0} onClick={() => setActive((index) => Math.max(index - 1, 0))}>←</button><span>{String(active + 1).padStart(2, "0")} / {String(CHATBOT_SLIDES.length).padStart(2, "0")}</span><button aria-label="Next slide" disabled={active === CHATBOT_SLIDES.length - 1} onClick={() => setActive((index) => Math.min(index + 1, CHATBOT_SLIDES.length - 1))}>→</button></nav>
  </main>
}
