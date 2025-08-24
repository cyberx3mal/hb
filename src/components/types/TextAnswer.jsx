import React, { useState } from "react";

export default function TextAnswer({ step, onDone }) {
  const [val, setVal] = useState("");
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");
  const [wrongHit, setWrongHit] = useState(false);

  function check(value) {
    const ok = step.answers ? step.answers.some(a => a.toLowerCase().trim() === value.toLowerCase().trim()) : false;
    if (ok) {
      setToastType("success");
      setToast("Правильно!");
      setTimeout(() => setToast(""), 800);
      setTimeout(() => onDone(), 600);
    } else {
      setToastType("error");
      setToast("Неверно, попробуй ещё");
  setWrongHit(true);
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
      <div className="actions" style={{display:'none'}} />
      {toast && <div className={`toast ${toastType}`}>{toast}</div>}
      <small>{step.hint}</small>
    </div>
  );
}