import React, { useEffect, useRef, useState } from "react";

export default function ImagePuzzle({ step, onDone }) {
  const grid = step.grid || 3;
  const total = grid * grid;
  const [tiles, setTiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState(false);
  const gridRef = useRef(null);
  const doneRef = useRef(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");
  const [shake, setShake] = useState(false);

  const triggerDone = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };
  useEffect(() => {
    const arr = Array.from({ length: total }, (_, i) => i);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    setTiles(arr);
  setSolved(false);
  doneRef.current = false;
  }, [step.image]);

  // Safety: if tiles become ordered for any reason, mark solved
  useEffect(() => {
    if (!solved && tiles.length === total && tiles.every((v, i) => v === i)) {
      setSolved(true);
      const id = setTimeout(() => triggerDone(), 1200);
      return () => clearTimeout(id);
    }
  }, [tiles, total, solved, onDone]);

  // Safety interval: in rare cases immediate checks can be missed
  useEffect(() => {
    if (solved) return;
  const id = setInterval(() => {
      if (tiles.length === total && tiles.every((v,i)=>v===i)) {
    setSolved(true);
    triggerDone();
      }
    }, 500);
    return () => clearInterval(id);
  }, [tiles, total, solved, onDone]);

  function clickTile(index) {
    if (solved) return; // disable interactions when solved
    if (selected === null) {
      setSelected(index);
      return;
    }
    if (selected === index) {
      setSelected(null);
      return;
    }
    const t = tiles.slice();
    [t[selected], t[index]] = [t[index], t[selected]];
    setTiles(t);
    setSelected(null);
  if (t.every((val, idx) => val === idx)) {
      setSolved(true);
      setTimeout(() => triggerDone(), 1200); // небольшая пауза, чтобы показать успех
    }
  }

  function manualCheck() {
    const ok = tiles.length === total && tiles.every((v,i)=>v===i);
    if (ok) {
      setSolved(true);
      setToastType("success");
      setToast("Собрано!");
      setTimeout(() => setToast(""), 900);
      setTimeout(() => triggerDone(), 800);
    } else {
      setToastType("error");
      setToast("Ещё не собрано");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setToast(""), 1200);
    }
  }

  const sizePct = 100 / grid;
  return (
    <div className="step puzzle">
      <h3>{step.title}</h3>
      <p>{step.content}</p>
  <div className={"puzzle-grid" + (solved ? " solved" : "") + (shake?" shake":"")} ref={gridRef}>
        {tiles.map((tileVal, i) => {
          const row = Math.floor(tileVal / grid);
          const col = tileVal % grid;
          const r = Math.floor(i / grid);
          const c = i % grid;
          const denom = grid - 1;
          return (
            <div
              key={i}
              onClick={() => clickTile(i)}
              className={"puzzle-tile" + (selected===i?" sel":"")}
              style={{
                width: `${sizePct}%`,
                height: `${sizePct}%`,
                position: "absolute",
                left: `${c * sizePct}%`,
                top: `${r * sizePct}%`,
                backgroundImage: `url(${step.image})`,
                backgroundSize: `${grid * 100}% ${grid * 100}%`,
                // Each tile shows its source patch at (row,col): 0%..100% without negatives
                backgroundPosition: denom === 0 ? "0% 0%" : `${(col * 100) / denom}% ${(row * 100) / denom}%`,
                backgroundRepeat: "no-repeat",
                boxSizing: "border-box",
                border: "1px solid #fff",
                cursor: "pointer"
              }}
            />
          );
        })}
        {solved && <ConfettiBurst targetRef={gridRef} />}
        {solved && <div className="puzzle-banner">Собрано!</div>}
        {solved && (
          <button type="button" className="complete-btn" onClick={triggerDone}>
            Завершить
          </button>
        )}
      </div>
      <div className="actions" style={{justifyContent:'flex-end'}}>
        <button type="button" onClick={manualCheck}>Проверить</button>
      </div>
      {toast && <div className={`toast ${toastType}`}>{toast}</div>}
      {solved && <div className="success" aria-live="polite">Задание выполнено!</div>}
      <small>{step.hint}</small>
    </div>
  );
}

function ConfettiBurst({ targetRef }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const el = targetRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const rect = el.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    const colors = ["#ffb6c9", "#ffd9e8", "#e5b8ff", "#ffffff"];
    const N = 80;
    const parts = Array.from({ length: N }, () => ({
      x: rect.width / 2,
      y: rect.height / 2,
      vx: (Math.random() - 0.5) * 6,
      vy: -Math.random() * 5 - 1,
      size: Math.random() * 4 + 2,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.2,
      color: colors[(Math.random() * colors.length) | 0],
      life: 1000 + Math.random() * 400
    }));
    let start;
    const gravity = 0.12;
    const animate = (ts) => {
      if (start == null) start = ts;
      const elapsed = ts - start;
      ctx.clearRect(0, 0, rect.width, rect.height);
      parts.forEach(p => {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.restore();
      });
      if (elapsed < 1000) requestAnimationFrame(animate);
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [targetRef]);
  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />;
}