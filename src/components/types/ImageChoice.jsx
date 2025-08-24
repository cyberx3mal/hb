import React, { useState } from "react";

export default function ImageChoice({ step, onDone }) {
  const [picked, setPicked] = useState(null);
  const [solved, setSolved] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");
  const [lastWrong, setLastWrong] = useState(null);

  function onPick(i) {
    if (solved) return;
    setPicked(i);
    const src = step.images[i];
    const ok = src === step.correctSrc;
    if (ok) {
      setSolved(true);
      setToastType("success");
      setToast("Правильно!");
      setTimeout(() => setToast(""), 900);
      setTimeout(() => onDone(), 900);
    } else {
      setLastWrong(i);
      setToastType("error");
      setToast("Неверно, попробуй ещё");
      setTimeout(() => setToast(""), 1200);
      setTimeout(() => setLastWrong(null), 900);
    }
  }

  return (
    <div className="step">
      <h3>{step.title}</h3>
      {step.content && <p>{step.content}</p>}
    <div className={"image-grid" + (solved ? " solved" : "") }>
        {step.images.map((src, i) => {
      const isPicked = picked === i;
      const isCorrectPick = solved && src === step.correctSrc;
      const isWrong = lastWrong === i;
          const stateClass = isCorrectPick ? " ok" : isWrong ? " wrong shake" : (isPicked && !solved ? " sel" : "");
          return (
            <button key={i} type="button" className={"image-tile" + stateClass} onClick={() => onPick(i)} aria-label={`Фото ${i+1}`}>
              <img src={src} alt={`Вариант ${i+1}`} />
            </button>
          );
        })}
      </div>
    {toast && <div className={`toast ${toastType}`}>{toast}</div>}
      {step.hint && !solved && <small>{step.hint}</small>}
    </div>
  );
}
