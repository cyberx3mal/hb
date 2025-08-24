import React, { useState } from "react";
import { getSuccessMessage } from "../../utils/messages";

export default function TextAnswer({ step, onDone }) {
  const [val, setVal] = useState("");
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");
  const [wrongHit, setWrongHit] = useState(false);
  const [everWrong, setEverWrong] = useState(false);
  const [solved, setSolved] = useState(false);
  const [successText, setSuccessText] = useState("Правильно!");

  function check(value) {
    const ok = step.answers ? step.answers.some(a => a.toLowerCase().trim() === value.toLowerCase().trim()) : false;
    if (ok) {
  setSolved(true);
  setSuccessText(prev => getSuccessMessage(prev));
  onDone({ stay: true });
    } else {
      setToastType("error");
      setToast("Неверно, попробуй ещё");
  setWrongHit(true);
  setEverWrong(true);
  setTimeout(() => setWrongHit(false), 600);
      setTimeout(() => setToast(""), 1400);
    }
  }

  function onKey(e){
    if (e.key === 'Enter') {
      e.preventDefault();
      check(val);
    }
  }

  return (
    <div className="step">
      <h3>{step.title}</h3>
      <p>{step.content}</p>
  <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={onKey} placeholder="введите ответ" className={wrongHit?"wrong shake":""} />
      <div className="actions">
        <button type="button" onClick={() => check(val)}>Проверить</button>
      </div>
  {toast && <div className={`toast ${toastType}`}>{toast}</div>}
  {solved && <div className="success">{successText}</div>}
      {everWrong && step.hint && (
        <small className="hint">Подсказка: {step.hint}</small>
      )}
    </div>
  );
}