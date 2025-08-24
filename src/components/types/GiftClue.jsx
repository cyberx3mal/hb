import React, { useState } from "react";
import { getSuccessMessage } from "../../utils/messages";

export default function GiftClue({ step, onDone }) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [val, setVal] = useState("");
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");
  const [wrongHit, setWrongHit] = useState(false);
  const [solved, setSolved] = useState(false);
  const [successText, setSuccessText] = useState("Правильно!");
  const [wrongCount, setWrongCount] = useState(0);

  function check(value) {
    const answers = (step.answers || []).map(a => a.toLowerCase().trim());
    const v = (value || "").toLowerCase().trim();
    const ok = answers.includes(v);
    if (ok) {
  setSolved(true);
      setSuccessText(prev => getSuccessMessage(prev));
      onDone({ stay: true });
    } else {
      setToastType("error");
      setToast("Неверно, попробуй ещё");
      setWrongHit(true);
  setWrongCount(c => c + 1);
  if (!showHint) setShowHint(true);
      setTimeout(() => setWrongHit(false), 600);
      setTimeout(() => setToast(""), 1400);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      check(val);
    }
  }

  return (
    <div className="step">
      <h3>{step.title || "Подарочек"}</h3>
      <p>{step.content}</p>
      {step.imageMain && (
        <div style={{ margin: "12px 0" }}>
          <img src={step.imageMain} alt="gift" />
        </div>
      )}

      {showHint && step.imageHint && (
        <div style={{ margin: "12px 0" }}>
          <img src={step.imageHint} alt="hint" />
        </div>
      )}

      <div className="actions" style={{ gap: 8 }}>
        <button onClick={() => setShowQuestion(true)}>Я нашла</button>
        <button onClick={() => setShowHint(true)}>Не могу найти</button>
      </div>

      {showQuestion && (
        <div style={{ marginTop: 10 }}>
          <label className="visually-hidden" htmlFor="gift-answer">{step.question || "Сколько внутри?"}</label>
          <p style={{ margin: "8px 0 6px" }}>{step.question || "Сколько внутри?"}</p>
          <input
            id="gift-answer"
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="введите ответ"
            className={wrongHit ? "wrong shake" : ""}
          />
          <div className="actions" style={{ marginTop: 10 }}>
            <button onClick={() => check(val)} disabled={!val.trim()}>
              Проверить
            </button>
          </div>
        </div>
      )}

      {toast && <div className={`toast ${toastType}`}>{toast}</div>}
  {solved && <div className="success">{successText}</div>}
      {step.hint && wrongCount >= 2 && (
        <small className="hint">Подсказка: {step.hint}</small>
      )}
    </div>
  );
}
