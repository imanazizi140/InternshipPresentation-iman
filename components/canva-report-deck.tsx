"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Bot, Cloud, FileText, MessageCircle, Sparkles, Workflow } from "lucide-react"

import { CHATBOT_SLIDES } from "./chatbot-presentation-data"
import styles from "./canva-report-deck.module.css"

const PUBLIC_BASE_PATH = process.env.NODE_ENV === "production" ? "/InternshipPresentation-iman" : ""

export function CanvaReportDeck() {
  const [active, setActive] = useState(0)
  const deckRef = useRef<HTMLElement>(null)
  const current = CHATBOT_SLIDES[active]
  const isWhyDigitalBee = current.title === "Why\nDigital Bee?" && current.layout === "keywords"
  const isFinalSlide = current.layout === "finalQna"
  const coverPath = `${PUBLIC_BASE_PATH}/canva-template/internship-cover-decor.webp`

  const resetVideos = () => {
    deckRef.current?.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
      video.pause()
      video.currentTime = 0
    })
  }

  const moveSlide = (updater: (index: number) => number) => {
    resetVideos()
    setActive(updater)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement instanceof HTMLVideoElement) return
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault()
        resetVideos()
        setActive((index) => Math.min(index + 1, CHATBOT_SLIDES.length - 1))
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        resetVideos()
        setActive((index) => Math.max(index - 1, 0))
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const title = isWhyDigitalBee ? (
    <h1 className={styles.whyDigitalBeeTitle}><span>Why</span><strong>Digital Bee?</strong></h1>
  ) : (
    <h1 className={styles.title}>
      {current.title.split("\n").map((line, index) => <span key={`${line}-${index}`} className={index === 0 ? styles.orange : ""}>{line}</span>)}
    </h1>
  )

  const cardGrid = current.cards ? (
    <div className={[styles.chatbotCards, isWhyDigitalBee ? styles.whyDigitalBeeCards : ""].filter(Boolean).join(" ")}>
      {current.cards.map((card) => <article key={`${card.title}-${card.body}`}>
        {card.tag ? <span className={styles.cardTag}>{card.tag}</span> : null}
        <strong>{card.title}</strong><p>{card.body}</p>
      </article>)}
    </div>
  ) : null

  const body = (() => {
    if (current.layout === "finalQna") return <div className={styles.finalLayout}><div className={styles.finalCopy}><h1 className={styles.finalTitle}><em>Thank You</em><strong>&amp; Q&amp;A</strong></h1><p className={styles.finalQuestion}>{current.subtitle}</p><div className={styles.appreciation}><span>Special thanks to</span><p>LOCUS-T × Digital Bee<br />My supervisors<br />The team and fellow interns</p></div></div><div className={styles.memeStack}><article className={[styles.memePlaceholder, styles.qaMeme].join(" ")}><Image alt="Humorous question-and-answer meme suggesting ChatGPT." fill sizes="(max-width: 700px) 100vw, 23vw" src={`${PUBLIC_BASE_PATH}/images/qa-chatgpt-meme.png`} /></article><p className={styles.memeCaption}>ChatGPT later — <strong>ask me first.</strong></p></div><p className={styles.finalTakeaway}>This internship began with <strong>curiosity</strong> and gave me a clearer direction.</p></div>

    if (current.layout === "timeline") {
      const phases = [
        { title: "Prompt Experimentation", goal: "Explore how role, tone and structure shape chatbot behaviour.", role: "Tested prompts and compared responses.", deliverable: "MyGPT experiments", icon: Bot, label: "Prompt experimentation" },
        { title: "Content Assistant", goal: "Create concise product-script support.", role: "Built AllLove prompts, tone and boundaries.", deliverable: "AllLove assistant", icon: FileText, label: "Content assistant" },
        { title: "OpenAI Platform", goal: "Configure a business chatbot with useful knowledge and response rules.", role: "Set instructions and tested response behaviour.", deliverable: "WA-Ornis chatbot", icon: Sparkles, label: "OpenAI Platform" },
        { title: "WhatsApp & CRM Flow", goal: "Route customers into the correct business conversation.", role: "Tested reference IDs and the previous human handoff flow.", deliverable: "WhatsApp Demo Hub", icon: MessageCircle, label: "WhatsApp and CRM flow" },
        { title: "Deployment & Reusable System", goal: "Make the business flows publicly testable and reusable.", role: "Deployed interfaces and checked live flows.", deliverable: "SiteTarik, Ornis, Boon Chye, Rumah Mampu", icon: Cloud, label: "Deployment and reusable system", supportingIcon: Workflow },
      ]
      return <div className={styles.timelineLayout}>{title}<p className={styles.timelineSubtitle}>{current.subtitle}</p><div className={styles.timeline}>{phases.map((phase, index) => { const Icon = phase.icon; const SupportingIcon = phase.supportingIcon; return <article key={phase.title} className={index === 2 ? styles.timelineFocus : ""}><div className={styles.phaseHeader}><b>{String(index + 1).padStart(2, "0")}</b><span className={styles.phaseIcon} aria-label={phase.label}><Icon aria-hidden="true" size={18} />{SupportingIcon ? <SupportingIcon aria-hidden="true" size={13} /> : null}</span></div><strong>{phase.title}</strong><p><b>Goal</b> {phase.goal}</p><p><b>My role</b> {phase.role}</p><small><span>Deliverable</span> · {phase.deliverable}</small></article> })}</div></div>
    }

    if (current.layout === "preview") return <div className={styles.previewLayout}><div className={styles.previewCopy}><p className={styles.previewEyebrow}>{current.eyebrow}</p>{title}<p className={styles.previewRecorded}>{current.subtitle}</p></div><div className={styles.dualPreviewFrames}><article><p>AllLove GPT Project Review</p><div className={styles.previewFrame}><video aria-label="AllLove GPT Project Review recording" controls controlsList="nodownload" playsInline preload="metadata"><source src={`${PUBLIC_BASE_PATH}/media/alllove-preview.mp4`} type="video/mp4" />Your browser does not support the video tag.</video></div></article><article><p>OpenAI Business Chatbot Review</p><div className={styles.previewFrame}><video aria-label="OpenAI business chatbot recording" controls controlsList="nodownload" playsInline preload="metadata"><source src={`${PUBLIC_BASE_PATH}/media/openai-chatbot-preview.mp4`} type="video/mp4" />Your browser does not support the video tag.</video></div></article></div></div>

    if (current.layout === "alllove") return <div className={styles.allloveLayout}><header className={styles.allloveHeader}><p>{current.eyebrow}</p>{title}<span>{current.subtitle}</span></header><div className={styles.allloveBody}><section className={styles.allloveVideoSection}><p>AllLove project preview</p><div className={styles.allloveVideoFrame}><video aria-label="AllLove content assistant project review" controls controlsList="nodownload" playsInline preload="metadata"><source src={`${PUBLIC_BASE_PATH}/media/alllove-preview.mp4`} type="video/mp4" />Your browser does not support the video tag.</video></div></section><aside className={styles.allloveExample}><span>Example prompt</span><p>Create a natural, short-form product script for a social post.</p><span>Example output</span><p>A warm, clear script that explains the product without sounding overly sales-focused.</p></aside></div>{cardGrid}<p className={styles.allloveTakeaway}>{current.lead}</p></div>

    if (current.layout === "showcase") return <div className={styles.showcaseLayout}><header className={styles.showcaseHeader}><p>{current.eyebrow}</p>{title}<span>{current.subtitle}</span></header><section className={styles.showcaseVideoSection}><p>OpenAI Project Trailer</p><div className={styles.showcaseVideoFrame}><video aria-label="OpenAI business chatbot project trailer" controls controlsList="nodownload" playsInline preload="metadata"><source src={`${PUBLIC_BASE_PATH}/media/openai-chatbot-preview.mp4`} type="video/mp4" />Your browser does not support the video tag.</video></div><span>Prompt configuration, response testing and WhatsApp routing.</span></section><aside className={styles.showcaseDemo}><span>Public demo</span><h2>Try the live flow</h2><p>Select a business and continue through WhatsApp with a tracked reference ID.</p><a aria-label="Open the WhatsApp Demo Hub in a new tab" href="https://sitetarik-chatbot-v2.easondev.workers.dev/" rel="noopener noreferrer" target="_blank">Open WhatsApp Demo Hub ↗</a><div className={styles.showcaseQr}><Image alt="QR code for the WhatsApp Demo Hub" height={90} src={`${PUBLIC_BASE_PATH}/qr/sitetarik-v2.png`} width={90} /><ol><li><b>01</b>Select a business</li><li><b>02</b>Press Open WhatsApp</li><li><b>03</b>Check the tracked Ref ID</li></ol></div></aside><footer className={styles.showcaseWorkflow}><span>How it works</span><div><span>Customer enquiry</span><b>→</b><span>Chatbot identifies the goal</span><b>→</b><span>Suitable package suggested</span><b>→</b><span>Human follow-up</span></div><p>The chatbot guides customers toward the most suitable package based on their website goals.</p><em><b>Customer</b> I want better visibility on Google. <strong>Chatbot</strong> Based on your goal, the <mark>SEO Enhancement</mark> package may be more suitable.</em></footer></div>

    if (current.layout === "flow") return <div className={styles.flowLayout}><div>{title}{current.lead ? <p className={styles.lead}>{current.lead}</p> : null}{current.subtitle ? <p className={styles.flowNote}>{current.subtitle}</p> : null}</div><div className={styles.flow}>{current.flow?.map((step) => <span key={step}>{step}</span>)}</div></div>

    if (current.layout === "conversation") return <div className={styles.conversationLayout}><div>{title}<p className={styles.lead}>{current.lead}</p>{current.subtitle ? <p className={styles.flowNote}>{current.subtitle}</p> : null}<div className={styles.chatMock}><p><b>Customer</b> I need help improving my existing website.</p><p><b>Chatbot</b> Please share your current website and your main goal.</p><p><b>Customer</b> I want better visibility on Google.</p><p><b>Chatbot</b> SEO Enhancement may be more suitable for that goal.</p></div></div>{cardGrid}</div>

    if (current.layout === "deployment") return <div className={styles.deploymentLayout}><div>{title}<p className={styles.lead}>{current.lead}</p></div>{cardGrid}<div className={styles.deploymentFlow}>{current.flow?.map((step, index) => <span key={step}>{step}{index < (current.flow?.length ?? 0) - 1 ? <b>→</b> : null}</span>)}</div></div>

    if (current.layout === "dashboard") return <div className={styles.content}>{title}{current.subtitle ? <p className={styles.statusLabel}>{current.subtitle}</p> : null}{cardGrid}{current.closingStatement ? <p className={styles.cardsFooter}>{current.closingStatement}</p> : null}</div>

    if (current.layout === "breakthrough") return <div className={styles.breakthroughLayout}><div className={styles.breakthroughCopy}><p>{current.eyebrow}</p><h1><span>It finally spoke</span><strong>the way I imagined.</strong></h1><p className={styles.breakthroughLead}>{current.lead}</p><p className={styles.breakthroughMoment}>That “finally!” moment <b>✦</b></p><p className={styles.breakthroughReflection}>{current.subtitle}</p></div><div className={styles.breakthroughProcess} aria-label="Prompt refinement journey">{current.flow?.map((step, index) => <span className={index === (current.flow?.length ?? 0) - 1 ? styles.breakthroughSuccess : ""} key={step}>{step}{index < (current.flow?.length ?? 0) - 1 ? <b aria-hidden="true">→</b> : null}</span>)}</div></div>

    if (current.layout === "challengeEmotion" || current.layout === "overcome") return <div className={styles.challengeEmotionLayout}><div className={styles.challengeEmotionCopy}><p>{current.eyebrow}</p><h1><span>{current.title.split("\n")[0]}</span><strong>{current.title.split("\n")[1]}</strong></h1><p>{current.lead}</p></div><div className={styles.challengeEmotionCards}>{current.cards?.map((card, index) => <article key={card.title}><b>{String(index + 1).padStart(2, "0")}</b><div><strong>{card.title}</strong><p>{card.body}</p></div></article>)}</div><p className={styles.challengeEmotionStatement}>{current.closingStatement}</p></div>

    if (current.layout === "keywords") return <div className={[styles.content, isWhyDigitalBee ? styles.whyDigitalBeeContent : ""].filter(Boolean).join(" ")}>{title}<p className={styles.lead}>{current.lead}</p>{cardGrid}{current.items ? <div className={styles.expectations}><strong>Initial expectations</strong><ol>{current.items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol></div> : null}</div>

    if (current.layout === "closingVideo") return <div className={styles.closingVideoLayout}><div>{title}<p className={styles.subtitle}>{current.subtitle}</p></div><div className={styles.closingVideoFrame}><video aria-label="Internship ending reflection video" controls controlsList="nodownload" playsInline preload="metadata"><source src={`${PUBLIC_BASE_PATH}/media/internship-ending-video.mp4`} type="video/mp4" />Your browser does not support the video tag.</video></div><p className={styles.cardsFooter}>{current.closingStatement}</p></div>

    if (current.layout === "closing") return <div className={styles.content}>{title}<p className={styles.lead}>{current.lead}</p>{cardGrid}<p className={styles.cardsFooter}>{current.closingStatement}</p></div>

    return <div className={styles.content}>{title}<p className={styles.subtitle}>{current.subtitle}</p>{current.presenter ? <div className={styles.coverDetails}><p>{current.presenter.name}</p><span>{current.presenter.role}</span><span>{current.presenter.period}</span></div> : null}</div>
  })()

  return <main className={styles.deck} ref={deckRef} tabIndex={0}>
    <section key={active} className={[styles.slide, current.layout === "cover" ? styles.cover : "", isWhyDigitalBee ? styles.whyDigitalBeeSlide : "", isFinalSlide ? styles.finalSlide : ""].filter(Boolean).join(" ")}>
      <Image alt="" className={styles.decor} fill priority sizes="100vw" src={coverPath} />
      {body}
      {active === 0 ? <div className={styles.partners} aria-label="LOCUS-T and Digital Bee"><Image alt="LOCUS-T" className={styles.partnerLogo} height={79} src={`${PUBLIC_BASE_PATH}/canva-template/locus-t-logo.png`} width={222} /><span aria-hidden="true">×</span><Image alt="Digital Bee" className={styles.partnerLogo} height={75} src={`${PUBLIC_BASE_PATH}/canva-template/digitalbee-logo.png`} width={144} /></div> : null}
    </section>
    <nav className={styles.controls} aria-label="Presentation navigation"><button aria-label="Previous slide" disabled={active === 0} onClick={() => moveSlide((index) => Math.max(index - 1, 0))}>←</button><span>{String(active + 1).padStart(2, "0")} / {String(CHATBOT_SLIDES.length).padStart(2, "0")}</span><button aria-label="Next slide" disabled={active === CHATBOT_SLIDES.length - 1} onClick={() => moveSlide((index) => Math.min(index + 1, CHATBOT_SLIDES.length - 1))}>→</button></nav>
  </main>
}
