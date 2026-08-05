"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Bot, Cloud, FileText, MessageCircle, Sparkles, Workflow } from "lucide-react"

import { CHATBOT_SLIDES } from "./chatbot-presentation-data"
import styles from "./canva-report-deck.module.css"

const PUBLIC_BASE_PATH = process.env.NODE_ENV === "production" ? "/InternshipPresentation-iman" : ""

export function CanvaReportDeck() {
  const [active, setActive] = useState(0)
  const showcaseVideoRef = useRef<HTMLVideoElement>(null)
  const current = CHATBOT_SLIDES[active]
  const isWhyDigitalBee = current.title === "Why\nDigitalBee?" && current.layout === "keywords"
  const isHappiestMoment = current.layout === "happiest"
  const isChallengeSlide = current.layout === "challenge"
  const isFinalSlide = current.layout === "finalQna"
  const overviewSections = [
    { title: "Why DigitalBee?", description: "My motivation and initial expectations", startTitle: "Why\nDigitalBee?" },
    { title: "My Chatbot Journey", description: "From prompt experiments to OpenAI and WhatsApp business flows", startTitle: "Project\nOverview" },
    { title: "Project Showcase & Live Demo", description: "OpenAI prompt development, WhatsApp routing and previous CRM integration", startTitle: "OpenAI Business\nChatbot" },
    { title: "Challenges & Solutions", description: "The problems I faced and how I overcame them", startTitle: "My Biggest\nChallenge" },
    { title: "Reflection & Future", description: "What I learned and advice for future interns", startTitle: "What makes me\ndifferent from AI?" },
  ].map((section) => ({ ...section, number: CHATBOT_SLIDES.findIndex((slide) => slide.title === section.startTitle) + 1 }))
  const coverPath = `${PUBLIC_BASE_PATH}/canva-template/internship-cover-decor.webp`

  const moveSlide = (updater: (index: number) => number) => {
    const video = showcaseVideoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setActive(updater)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === showcaseVideoRef.current) return
      const video = showcaseVideoRef.current
      if (video) {
        video.pause()
        video.currentTime = 0
      }
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
    if (current.layout === "finalQna") return <div className={styles.finalLayout}><div className={styles.finalCopy}><h1 className={styles.finalTitle}><em>Thank You</em><strong>&amp; Q&amp;A</strong></h1><p className={styles.finalQuestion}>{current.subtitle}</p><div className={styles.appreciation}><span>Special thanks to</span><p>LOCUS-T × Digital Bee<br />My supervisors<br />The team and fellow interns</p></div></div><div className={styles.memeStack}><article className={[styles.memePlaceholder, styles.qaMeme].join(" ")}><Image alt="Humorous question-and-answer meme suggesting ChatGPT." fill sizes="(max-width: 700px) 100vw, 23vw" src={`${PUBLIC_BASE_PATH}/images/qa-chatgpt-meme.png`} /></article><p className={styles.memeCaption}>ChatGPT later — <strong>ask me first.</strong></p></div><p className={styles.finalTakeaway}>This internship began with <strong>curiosity</strong> and gave me a clearer direction.</p></div>
    if (current.layout === "happiest") return <div className={styles.happiestLayout}><div className={styles.happiestLeft}><h1 className={styles.happiestTitle}><span>My Most</span><em>Exciting</em><strong>Moment</strong></h1><p className={styles.happiestLead}>{current.lead}</p><p className={styles.happiestSupporting}>{current.subtitle}</p></div><div className={styles.happiestRight}><div className={styles.happiestFlow}>{["Write Instructions", "Add Brand Knowledge", "Test Questions", "Identify Weaknesses", "Refine Prompt", "Desired AI Behaviour"].map((stage) => <span key={stage}>{stage}</span>)}</div><div className={styles.happiestEvidence}><article aria-label="OpenAI instructions and business knowledge"><b>Prompt Configuration</b><span>OpenAI instructions and business knowledge</span></article><article aria-label="Final tested chatbot response"><b>Tested Response</b><span>Final response with the intended tone and flow</span></article></div><div className={styles.happiestResults}>{[{ title: "Correct Communication Style", body: "Natural tone and suitable responses" }, { title: "Controlled Conversation Flow", body: "Relevant questions and clear business rules" }, { title: "Consistent Brand Knowledge", body: "Responses remained aligned with confirmed information" }].map((item, index) => <article key={item.title}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{item.title}</strong><span>{item.body}</span></div></article>)}</div></div><p className={styles.happiestTakeaway}>My prompt became the <strong>chatbot behaviour</strong> I had imagined.</p></div>
    if (current.layout === "challenge") return <div className={styles.challengeLayout}><div className={styles.challengeLeft}><h1 className={styles.challengeTitle}><span>My</span><em>Biggest</em><strong>Challenge</strong></h1><p className={styles.challengeQuestion}>{current.lead}</p><div className={styles.challengeTension}><span>Flexible AI<small>Different questions and businesses</small></span><b>↔</b><span>Controlled system<small>Rules, restrictions and human handoff</small></span></div></div><div className={styles.challengeRows}>{[{ title: "Different Business Requirements", body: "Different services, customers and conversation goals" }, { title: "Controlling AI Responses", body: "Prevent inaccurate information and unsupported promises" }, { title: "Connecting the Business Flow", body: "Link the selected business, reference ID, correct instructions and human follow-up" }].map((item, index) => <article key={item.title}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{item.title}</strong><p>{item.body}</p></div></article>)}</div><p className={styles.challengeTakeaway}>{current.subtitle}</p></div>
    if (current.layout === "timeline") {
      const phases = [
        { title: "Prompt Experimentation", description: "Tested roles, tone, structure and chatbot behaviour.", output: "MyGPT experiments", icon: Bot, label: "MyGPT experimentation" },
        { title: "Content Assistant", description: "Created AllLove for short-form product scripts.", output: "Product content assistant", icon: FileText, label: "Content assistant" },
        { title: "OpenAI Platform", description: "Configured business knowledge, instructions and response behaviour.", output: "WA-Ornis chatbot", icon: Sparkles, label: "OpenAI Platform" },
        { title: "WhatsApp & CRM Flow", description: "Tested reference-ID routing and human conversation handoff.", output: "WhatsApp Demo Hub", icon: MessageCircle, label: "WhatsApp and Chatwoot flow", note: "Chatwoot integration completed during internship" },
        { title: "Deployment & Reusable System", description: "Deployed reusable business flows for online testing.", output: "SiteTarik, Ornis, Boon Chye and Rumah Mampu", icon: Cloud, label: "Deployment and reusable workflows", supportingIcon: Workflow },
      ]
      return <div className={styles.timelineLayout}>{title}<p className={styles.timelineSubtitle}>{current.subtitle}</p><div className={styles.timeline}>{phases.map((phase, index) => { const Icon = phase.icon; const SupportingIcon = phase.supportingIcon; return <article key={phase.title} className={index === 2 ? styles.timelineFocus : ""}><div className={styles.phaseHeader}><b>{String(index + 1).padStart(2, "0")}</b><span className={styles.phaseIcon} aria-label={phase.label}><Icon aria-hidden="true" size={18} />{SupportingIcon ? <SupportingIcon aria-hidden="true" size={13} /> : null}</span></div><strong>{phase.title}</strong><p>{phase.description}</p><small><span>Output</span> · {phase.output}</small>{phase.note ? <em>{phase.note}</em> : null}</article> })}</div></div>
    }
    if (current.layout === "preview") return <div className={styles.previewLayout}><div className={styles.previewCopy}><p className={styles.previewEyebrow}>Project Preview · 01</p><h1 className={styles.previewTitle}>Preview Trailer</h1><p className={styles.previewProject}>AllLove GPT Project Review</p><p className={styles.previewRecorded}>Recorded by Recordly</p></div><div className={styles.previewFrame}><video aria-label="AllLove GPT Project Review recording" controls playsInline preload="metadata"><source src={`${PUBLIC_BASE_PATH}/media/alllove-preview.mp4`} type="video/mp4" />Your browser does not support the video tag.</video></div></div>
    if (current.layout === "showcase") return <div className={styles.showcaseLayout}><header className={styles.showcaseHeader}><p>{current.eyebrow}</p>{title}<span>{current.subtitle}</span></header><section className={styles.showcaseVideoSection}><p>OpenAI Project Trailer</p><div className={styles.showcaseVideoFrame}><video ref={showcaseVideoRef} aria-label="OpenAI business chatbot project trailer" controls controlsList="nodownload" playsInline preload="metadata"><source src={`${PUBLIC_BASE_PATH}/media/openai-chatbot-preview.mp4`} type="video/mp4" />Your browser does not support the video tag.</video></div><span>Prompt configuration, response testing and WhatsApp routing.</span></section><aside className={styles.showcaseDemo}><span>Public demo</span><h2>Try the live flow</h2><p>Select a business and continue through WhatsApp with a tracked reference ID.</p><a aria-label="Open the WhatsApp Demo Hub in a new tab" href="https://sitetarik-chatbot-v2.easondev.workers.dev/" rel="noopener noreferrer" target="_blank">Open WhatsApp Demo Hub ↗</a><div className={styles.showcaseQr}><Image alt="QR code for the WhatsApp Demo Hub" height={90} src={`${PUBLIC_BASE_PATH}/qr/sitetarik-v2.png`} width={90} /><ol><li><b>01</b>Select a business</li><li><b>02</b>Press Open WhatsApp</li><li><b>03</b>Check the tracked Ref ID</li></ol></div></aside><footer className={styles.showcaseWorkflow}><div><span>OpenAI Platform</span><b>→</b><span>Business Flow</span><b>→</b><span>WhatsApp</span><b>→</b><span>Tracked Ref ID</span></div><p>The reference ID identifies which business flow the customer selected.</p></footer></div>
    if (current.layout === "breakthrough") return <div className={styles.breakthroughLayout}><div className={styles.breakthroughCopy}><p>{current.eyebrow}</p><h1><span>It finally spoke</span><strong>the way I imagined.</strong></h1><p className={styles.breakthroughLead}>{current.lead}</p><p className={styles.breakthroughMoment}>That “finally!” moment <b>✦</b></p><p className={styles.breakthroughReflection}>{current.subtitle}</p></div><div className={styles.breakthroughProcess} aria-label="Prompt refinement journey">{current.flow?.map((step, index) => <span className={index === (current.flow?.length ?? 0) - 1 ? styles.breakthroughSuccess : ""} key={step}>{step}{index < (current.flow?.length ?? 0) - 1 ? <b aria-hidden="true">→</b> : null}</span>)}</div></div>
    if (current.layout === "challengeEmotion") return <div className={styles.challengeEmotionLayout}><div className={styles.challengeEmotionCopy}><p>{current.eyebrow}</p><h1><span>What if it wasn’t</span><strong>good enough?</strong></h1><p>{current.lead}</p></div><div className={styles.challengeEmotionCards}>{current.cards?.map((card, index) => <article key={card.title}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{card.title}</strong><p>{card.body}</p></div></article>)}</div><p className={styles.challengeEmotionStatement}>{current.closingStatement}</p></div>
    if (current.layout === "overcome") return <div className={styles.challengeEmotionLayout}><div className={styles.challengeEmotionCopy}><p>{current.eyebrow}</p><h1><span>I kept improving,</span><strong>one test at a time.</strong></h1><p>{current.lead}</p></div><div className={styles.challengeEmotionCards}>{current.cards?.map((card, index) => <article key={card.title}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{card.title}</strong><p>{card.body}</p></div></article>)}</div><p className={styles.challengeEmotionStatement}>{current.closingStatement}</p></div>
    if (current.layout === "overview") return <div className={styles.overviewLayout}><div className={styles.overviewMeta}><span>{current.eyebrow}</span><span>LOCUS-T × DIGITAL BEE</span></div><div className={styles.overviewTitle}><span>Presentation</span><strong>Overview</strong></div><div className={styles.overviewRows}>{overviewSections.map((section) => <article key={section.title}><div><strong>{section.title}</strong><p>{section.description}</p></div><b>{String(section.number).padStart(2, "0")}</b></article>)}</div></div>
    if (current.layout === "openai") return <div className={styles.openaiLayout}><div className={styles.openaiCopy}><p className={styles.openaiEyebrow}>{current.eyebrow}</p>{title}<p className={styles.lead}>{current.lead}</p><p className={styles.openaiReflection}>{current.subtitle}</p><div className={styles.openaiFlow}>{current.flow?.map((step) => <span key={step}>{step}</span>)}</div></div><div className={styles.openaiFrame}><Image alt="WA-Ornis chatbot prompt configuration in the OpenAI Platform" fill sizes="(max-width: 700px) 100vw, 54vw" src={`${PUBLIC_BASE_PATH}/images/openai-wa-ornis-platform.png`} /></div></div>
    if (current.layout === "flow") return <div className={styles.flowLayout}><div>{title}{current.lead ? <p className={styles.lead}>{current.lead}</p> : null}{current.subtitle ? <p className={styles.flowNote}>{current.subtitle}</p> : null}</div><div className={styles.flow}>{current.flow?.map((step) => <span key={step}>{step}</span>)}</div></div>
    if (current.layout === "conversation") return <div className={styles.conversationLayout}><div>{title}<p className={styles.lead}>{current.lead}</p>{current.subtitle ? <p className={styles.flowNote}>{current.subtitle}</p> : null}<div className={styles.chatMock}><p><b>Customer</b> I need help improving my existing website.</p><p><b>Chatbot</b> Please share your current website and your main goal.</p><p><b>Customer</b> I want better visibility on Google.</p><p><b>Chatbot</b> SEO Enhancement may be more suitable for that goal.</p></div></div>{cardGrid}</div>
    if (current.layout === "dashboard") return <div className={styles.content}>{title}{current.subtitle ? <p className={styles.statusLabel}>{current.subtitle}</p> : null}{cardGrid}{current.closingStatement ? <p className={styles.cardsFooter}>{current.closingStatement}</p> : null}</div>
    if (current.layout === "links") return <div className={styles.content}>{title}<p className={styles.lead}>{current.lead}</p><div className={styles.linkGrid}>{current.links?.map((link) => <a href={link.href} key={link.href} rel="noreferrer" target="_blank"><Image alt={`QR code for ${link.label}`} height={46} src={`${PUBLIC_BASE_PATH}/qr/${link.qr}`} width={46} /><span>{link.actionLabel ?? "Open public project"}</span><strong>{link.label}</strong><em>↗</em></a>)}</div></div>
    if (current.layout === "checklist") return <div className={styles.content}>{title}{current.lead ? <p className={styles.lead}>{current.lead}</p> : null}<ol className={styles.list}>{current.items?.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>{current.closingStatement ? <p className={styles.cardsFooter}>{current.closingStatement}</p> : null}</div>
    if (current.layout === "keywords") return <div className={[styles.content, isWhyDigitalBee ? styles.whyDigitalBeeContent : ""].filter(Boolean).join(" ")}>{title}<p className={styles.lead}>{current.lead}</p>{cardGrid}{current.closingStatement ? isWhyDigitalBee ? <p className={styles.closingStatement}>I wanted to <strong>build and experiment</strong>—not only follow instructions.</p> : <p className={styles.closingStatement}>{current.closingStatement}</p> : null}{current.items ? <ol className={styles.list}>{current.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol> : null}</div>
    if (current.layout === "cards" || current.layout === "closing") return <div className={styles.content}>{title}{current.subtitle ? <p className={styles.subtitle}>{current.subtitle}</p> : null}{current.lead ? <p className={styles.lead}>{current.lead}</p> : null}{cardGrid}{current.closingStatement ? <p className={styles.cardsFooter}>{current.closingStatement}</p> : null}</div>
    return <div className={styles.content}>{title}<p className={styles.subtitle}>{current.subtitle}</p>{current.presenter ? <div className={styles.coverDetails}><p>{current.presenter.name}</p><span>{current.presenter.role}</span><span>{current.presenter.period}</span></div> : null}</div>
  })()

  return <main className={styles.deck} tabIndex={0}>
    <section key={active} className={[styles.slide, current.layout === "cover" ? styles.cover : "", current.layout === "overview" ? styles.overviewSlide : "", isWhyDigitalBee ? styles.whyDigitalBeeSlide : "", isHappiestMoment ? styles.happiestSlide : "", isChallengeSlide ? styles.challengeSlide : "", isFinalSlide ? styles.finalSlide : ""].filter(Boolean).join(" ")}>
      <Image alt="" className={styles.decor} fill priority sizes="100vw" src={coverPath} />
      {body}
      {active === 0 ? <div className={styles.partners} aria-label="LOCUS-T and DigitalBee"><Image alt="LOCUS-T" className={styles.partnerLogo} height={79} src={`${PUBLIC_BASE_PATH}/canva-template/locus-t-logo.png`} width={222} /><span aria-hidden="true">×</span><Image alt="DigitalBee" className={styles.partnerLogo} height={75} src={`${PUBLIC_BASE_PATH}/canva-template/digitalbee-logo.png`} width={144} /></div> : null}
    </section>
    <nav className={styles.controls} aria-label="Presentation navigation"><button aria-label="Previous slide" disabled={active === 0} onClick={() => moveSlide((index) => Math.max(index - 1, 0))}>←</button><span>{String(active + 1).padStart(2, "0")} / {String(CHATBOT_SLIDES.length).padStart(2, "0")}</span><button aria-label="Next slide" disabled={active === CHATBOT_SLIDES.length - 1} onClick={() => moveSlide((index) => Math.min(index + 1, CHATBOT_SLIDES.length - 1))}>→</button></nav>
  </main>
}
