import React, { useState } from "react";
import { getSuccessMessage } from "../../utils/messages";

export default function ImageChoice({ step, onDone }) {
  const [picked, setPicked] = useState(null);
  const [solved, setSolved] = useState(false);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");
  const [lastWrong, setLastWrong] = useState(null);
  const [successText, setSuccessText] = useState("Правильно!");

  function onPick(i) {
    if (solved) return;
    setPicked(i);
  }

  function verify() {
    if (picked == null) {
      setToastType("error");
      setToast("Выбери фото");
      setTimeout(() => setToast(""), 1000);
      return;
    }
    const src = step.images[picked];
    const ok = src === step.correctSrc;
    if (ok) {
      setSolved(true);
      setSuccessText(prev => getSuccessMessage(prev));
      onDone({ stay: true });
    } else {
      setLastWrong(picked);
      setToastType("error");
      setToast("Неверно, попробуй ещё");
      setTimeout(() => setToast(""), 1400);
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
      <div className="actions">
        <button type="button" onClick={verify}>Проверить</button>
      </div>
    {toast && <div className={`toast ${toastType}`}>{toast}</div>}
  {solved && <div className="success">{successText}</div>}
      {step.hint && !solved && <small>{step.hint}</small>}
    </div>
  );
}
