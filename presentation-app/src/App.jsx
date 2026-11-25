import React, { useEffect, useState } from "react";
import { PROMPTS, slides } from "./slides.js";

const BG = {
  hero: "assets/hero-workshop-teams.jpg",
  flow: "assets/flow-agentic-org.jpg",
  station: "assets/bg-station-dusk.jpg",
};

export default function App() {
  const [i, setI] = useState(0);
  const [copied, setCopied] = useState(false);
  const slide = slides[i];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setI((x) => Math.min(slides.length - 1, x + 1));
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setI((x) => Math.max(0, x - 1));
      }
      if (e.key === "Home") setI(0);
      if (e.key === "End") setI(slides.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setCopied(false);
  }, [i]);

  async function copyPrompt(key) {
    const text = PROMPTS[key];
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const bg = slide.bg ? BG[slide.bg] : null;
  const isDivider = slide.kind === "divider";
  const headers = slide.tableHeaders || ["Item", "Keterangan", "Catatan"];

  return (
    <div
      className={`deck ${bg ? "has-bg" : ""} ${isDivider ? "divider-deck" : ""}`}
    >
      {bg && <div className="bg" style={{ backgroundImage: `url(${bg})` }} />}
      <header className="top">
        <img
          className="logo"
          src="assets/pertamina-patra-niaga.png"
          alt="Pertamina Patra Niaga"
        />
        <div className="meta">
          <span>{slide.section}</span>
          <span>
            {i + 1} / {slides.length}
          </span>
        </div>
      </header>

      <main className={`stage ${isDivider ? "stage-divider" : ""}`}>
        {slide.kicker && <p className="kicker">{slide.kicker}</p>}
        <h1>{slide.title}</h1>
        {slide.body && <p className="body">{slide.body}</p>}
        {slide.bullets && (
          <ul>
            {slide.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        {slide.steps && (
          <ol className="steps">
            {slide.steps.map((s, idx) => (
              <li key={s}>
                <span className="step-num">{idx + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        )}
        {slide.table && (
          <table>
            <thead>
              <tr>
                {headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.table.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((c) => (
                    <td key={c}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {slide.note && <p className="note">{slide.note}</p>}
        {slide.promptKey && (
          <div className="prompt-box">
            <div className="prompt-head">
              <strong>Kartu tempel siap salin</strong>
              <button type="button" onClick={() => copyPrompt(slide.promptKey)}>
                {copied ? "Tersalin" : "Salin prompt"}
              </button>
            </div>
            <pre>{PROMPTS[slide.promptKey]}</pre>
          </div>
        )}
      </main>

      <footer className="nav">
        <button type="button" disabled={i === 0} onClick={() => setI(i - 1)}>
          Sebelumnya
        </button>
        <div className="dots" role="tablist" aria-label="Daftar slide">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`dot ${idx === i ? "on" : ""} ${
                s.kind === "divider" ? "section" : ""
              }`}
              aria-label={s.title}
              aria-current={idx === i ? "true" : undefined}
              onClick={() => setI(idx)}
            />
          ))}
        </div>
        <button
          type="button"
          disabled={i === slides.length - 1}
          onClick={() => setI(i + 1)}
        >
          Berikutnya
        </button>
      </footer>
    </div>
  );
}
