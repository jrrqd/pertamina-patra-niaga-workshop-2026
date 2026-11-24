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

  async function copyPrompt(key) {
    const text = PROMPTS[key];
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  const bg = slide.bg ? BG[slide.bg] : null;

  return (
    <div className={`deck ${bg ? "has-bg" : ""}`}>
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

      <main className="stage">
        <h1>{slide.title}</h1>
        {slide.body && <p className="body">{slide.body}</p>}
        {slide.bullets && (
          <ul>
            {slide.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        )}
        {slide.table && (
          <table>
            <thead>
              <tr>
                <th>Paket</th>
                <th>Harga</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              {slide.table.map((row) => (
                <tr key={row[0]}>
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
              <strong>Custom prompt siap tempel</strong>
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
        <div className="dots">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={idx === i ? "dot on" : "dot"}
              aria-label={s.title}
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
