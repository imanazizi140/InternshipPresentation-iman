"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import styles from "./canva-report-deck.module.css"

const PUBLIC_BASE_PATH =
  process.env.GITHUB_ACTIONS === "true" ? "/InternshipPresentation-iman" : ""

const slides = [
  {
    eyebrow: "LOCUS-T × DigitalBee",
    kind: "cover",
    title: "Final\nPresentation",
    coverInfo: {
      name: "Nur Iman Binti Noor Azizi",
      position: "Intern Developer",
      date: "20th April 2026 - 7th August 2026",
    },
  },
  {
    eyebrow: "Contents",
    kind: "agenda",
    title: "Table of\ncontents",
    items: [
      "From chatbot ideas to real client websites",
      "CRM chatbot projects & preview trailer",
      "Live deployment & chatbot demo",
      "Happiest Moment",
      "Challenges and How I Overcame Them",
      "Conclusion and Reflection",
      "Closing Video",
      "Thank You & Q&A Session",
    ],
  },
  {
    eyebrow: "01 / Opening",
    kind: "split",
    title: "From ideas to\nreal conversations",
    lead: "My internship journey progressed from testing chatbot ideas to building AI-assisted customer-service systems for real client websites.",
    items: [
      "Start with chatbot testing and customer questions",
      "Learn how AI fits into real website journeys",
      "Move from prototype to a useful client-facing system",
    ],
  },
  {
    eyebrow: "02 / Projects",
    kind: "overview",
    title: "From chatbot ideas\nto live websites",
    lead: "I worked on four CRM chatbot projects: two deployed on real websites and two developed as demonstrations.",
    items: [
      "Two chatbot systems deployed on real client websites",
      "Two chatbot demonstrations developed for testing and learning",
      "AI-assisted customer service designed around real user questions",
    ],
  },
  {
    eyebrow: "02 / Preview trailer",
    kind: "trailer",
    title: "A quick look at\nmy chatbots",
    lead: "Preview trailer — a short introduction to the chatbot flows before the live deployment and demo.",
  },
  {
    eyebrow: "03 / Project showcase",
    kind: "projects",
    title: "Four chatbots,\nfour user journeys",
    projects: ["Live Chatbot — Client Website 01", "Live Chatbot — Client Website 02", "CRM Chatbot Demo 01", "CRM Chatbot Demo 02"],
  },
  {
    eyebrow: "04 / Most exciting moment",
    kind: "quote",
    title: "When the chatbot\nwent live",
    lead: "Seeing an AI-assisted customer-service flow operate on a real client website was the happiest moment of my internship.",
  },
  {
    eyebrow: "05 / Biggest challenge",
    kind: "split",
    title: "Making AI useful\nfor real customers",
    lead: "A chatbot needs more than an answer generator: it must understand the customer journey, use the right information and know when to guide users further.",
    items: [
      "Turning customer questions into clear chatbot flows",
      "Adapting the system to different client websites",
      "Checking AI answers carefully instead of trusting them blindly",
    ],
  },
  {
    eyebrow: "06 / Overcoming it",
    kind: "split",
    title: "Test. Refine.\nDeploy.",
    lead: "I used a repeatable process to turn early chatbot ideas into a clearer and more useful customer-service experience.",
    items: [
      "Study the business, website journey and common customer questions",
      "Plan chatbot prompts, information and hand-off points",
      "Test responses, refine the flow and deploy with care",
    ],
  },
  {
    eyebrow: "07 / Reflection",
    kind: "quote",
    title: "What makes a chatbot\ntruly helpful?",
    lead: "AI can generate replies quickly, but a useful system still needs human judgement: understanding customers, shaping the right flow and taking responsibility for the outcome.",
  },
  {
    eyebrow: "08 / My future",
    kind: "future",
    title: "Building better\nAI customer journeys",
    items: [
      "Keep growing in CRM, chatbot and web-development work",
      "Use AI as a partner while strengthening my own judgement",
      "Design customer journeys that are clear, useful and responsible",
    ],
  },
  {
    eyebrow: "09 / Q&A",
    kind: "cover",
    subtitle: "Thank you",
    title: "Questions\n& Answers",
  },
]

export function CanvaReportDeck() {
  const [active, setActive] = useState(0)
  const current = slides[active]
  const coverPath = `${PUBLIC_BASE_PATH}/canva-template/internship-cover-decor.webp`

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        setActive((index) => Math.min(index + 1, slides.length - 1))
      }
      if (event.key === "ArrowLeft") {
        setActive((index) => Math.max(index - 1, 0))
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <main className={styles.deck} tabIndex={0}>
      <section key={active} className={[styles.slide, current.kind === "cover" ? styles.cover : "", current.kind === "agenda" ? styles.contentsSlide : ""].filter(Boolean).join(" ")}>
        <Image
          alt=""
          className={styles.decor}
          fill
          priority
          sizes="100vw"
          src={coverPath}
        />

        {current.kind === "agenda" ? (
          <div className={styles.contentsLayout}>
            <div className={styles.contentsHeading}>
              <h1 className={styles.contentsTitle}>
                {current.title.split("\n").map((line, index) => (
                  <span key={line} className={index === 0 ? styles.orange : ""}>{line}</span>
                ))}
              </h1>
            </div>
            <ol className={styles.contentsList}>
              {current.items?.map((item, index) => (
                <li key={item}>
                  <strong>{String(index + 1).padStart(2, "0")}</strong>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className={styles.content}>
            <p className={styles.eyebrow}>{current.eyebrow}</p>
            <h1 className={styles.title}>
              {current.title.split("\n").map((line, index) => (
                <span key={line} className={index === 0 ? styles.orange : ""}>{line}</span>
              ))}
            </h1>
            {current.subtitle ? <p className={styles.subtitle}>{current.subtitle}</p> : null}
            {current.coverInfo ? (
              <div className={styles.coverInfo}>
                <p className={styles.presenterName}>{current.coverInfo.name}</p>
                <p>{current.coverInfo.position}</p>
                <p>{current.coverInfo.date}</p>
              </div>
            ) : null}
            {current.lead ? <p className={styles.lead}>{current.lead}</p> : null}

            {current.items ? (
              <ol className={styles.list}>
                {current.items.map((item, index) => (
                  <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>
                ))}
              </ol>
            ) : null}

            {current.projects ? (
              <div className={styles.projects}>
                {current.projects.map((project, index) => (
                  <article key={project}><span>0{index + 1}</span><strong>{project}</strong></article>
                ))}
              </div>
            ) : null}

            {current.kind === "trailer" ? <div className={styles.trailer}>Preview trailer <span>10 seconds</span></div> : null}
          </div>
        )}

        {active === 0 ? (
          <div className={styles.partners} aria-label="LOCUS-T and DigitalBee">
            <Image
              alt="LOCUS-T"
              className={styles.partnerLogo}
              height={79}
              src={`${PUBLIC_BASE_PATH}/canva-template/locus-t-logo.png`}
              width={222}
            />
            <span aria-hidden="true">×</span>
            <Image
              alt="DigitalBee"
              className={styles.partnerLogo}
              height={75}
              src={`${PUBLIC_BASE_PATH}/canva-template/digitalbee-logo.png`}
              width={144}
            />
          </div>
        ) : null}
      </section>

      <nav className={styles.controls} aria-label="Presentation navigation">
        <button aria-label="Previous slide" disabled={active === 0} onClick={() => setActive((index) => Math.max(index - 1, 0))}>←</button>
        <span>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
        <button aria-label="Next slide" disabled={active === slides.length - 1} onClick={() => setActive((index) => Math.min(index + 1, slides.length - 1))}>→</button>
      </nav>
    </main>
  )
}
