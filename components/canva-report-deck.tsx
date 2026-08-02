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
      "Why DigitalBee & my initial expectations",
      "Project overview & preview trailer",
      "Project showcase & live demo",
      "Growth, challenges & reflection",
      "My internship & my future",
    ],
  },
  {
    eyebrow: "01 / Opening",
    kind: "split",
    title: "Why I chose\nDigitalBee",
    lead: "I wanted a hands-on environment where I could learn by building real products.",
    items: [
      "Real website projects with real users",
      "Practical exposure to AI-assisted development",
      "Space to learn beyond one narrow role",
    ],
  },
  {
    eyebrow: "02 / Projects",
    kind: "overview",
    title: "From ideas to\nworking websites",
    lead: "My work covered the website workflow from structure and design to testing and delivery.",
    items: [
      "Five website projects across different industries",
      "Frontend, content structure and CMS integration",
      "Responsive testing, refinement and deployment",
    ],
  },
  {
    eyebrow: "02 / Preview trailer",
    kind: "trailer",
    title: "A quick look at\nwhat I built",
    lead: "Preview trailer — a fast introduction to the projects before the deep dive.",
  },
  {
    eyebrow: "03 / Project showcase",
    kind: "projects",
    title: "Five projects,\nfive user journeys",
    projects: ["Centrix", "Metro Pinjaman Berlesen", "Boon Chye", "HealthStrat", "Ruang Bestari"],
  },
  {
    eyebrow: "04 / Most exciting moment",
    kind: "quote",
    title: "When Payload CMS\nfinally connected",
    lead: "Seeing the frontend and CMS work together made the project feel complete — and gave me confidence with unfamiliar technology.",
  },
  {
    eyebrow: "05 / Biggest challenge",
    kind: "split",
    title: "Finding a visual\ndirection without a map",
    lead: "Many projects started without a detailed redesign guide, so I had to turn business needs into a clear user journey and interface.",
    items: [
      "Limited design references",
      "Different industries, audiences and goals",
      "Using AI critically instead of blindly",
    ],
  },
  {
    eyebrow: "06 / Overcoming it",
    kind: "split",
    title: "Research. Plan.\nTest. Improve.",
    lead: "I built a repeatable process to move from uncertainty to useful, tested work.",
    items: [
      "Research the business and target user first",
      "Plan the information flow before designing",
      "Test, refine and learn from feedback",
    ],
  },
  {
    eyebrow: "07 / Reflection",
    kind: "quote",
    title: "What makes me\ndifferent from AI?",
    lead: "AI can generate options quickly. My value is in judgement: understanding people, asking the right questions and taking responsibility for the final outcome.",
  },
  {
    eyebrow: "08 / My future",
    kind: "future",
    title: "My internship &\nmy future",
    items: [
      "Keep growing in web development and CMS work",
      "Use AI as a partner while strengthening my own judgement",
      "Stay curious when learning unfamiliar tools",
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
  const coverPath = `${PUBLIC_BASE_PATH}/canva-template/internship-cover-decor.png`

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
      <section className={[styles.slide, current.kind === "cover" ? styles.cover : "", current.kind === "agenda" ? styles.contentsSlide : ""].filter(Boolean).join(" ")}>
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
              <p className={styles.eyebrow}>{current.eyebrow}</p>
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
