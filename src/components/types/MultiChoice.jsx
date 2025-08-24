import React, { useState } from "react";

export default function MultiChoice({ step, onDone }) {
  const [selected, setSelected] = useState(null);
  const [lastWrong, setLastWrong] = useState(null);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");

  function onPick(i) {
    setSelected(i);
    const ok = i === step.answerIndex;
    if (ok) {
      setToast("Правильно!");
      setToastType("success");
      setTimeout(() => setToast(""), 800);
      setTimeout(() => onDone(), 700);
    } else {
      setLastWrong(i);
      setToast("Неверно, попробуй ещё");
      setToastType("error");
      setTimeout(() => setToast(""), 1200);
      setTimeout(() => setLastWrong(null), 900);
    }
  }

  return (
    <div className="step">
      <h3>{step.title}</h3>
      <p>{step.content}</p>
      <div className="options">
        {step.options.map((o,i) => {
          const classes = [selected===i?"sel":""]; 
          if (selected===i && i===step.answerIndex) classes.push("ok");
          if (lastWrong===i) classes.push("wrong","shake");
          return (
            <button key={i} className={classes.filter(Boolean).join(" ")} onClick={() => onPick(i)}>
              {o}
            </button>
          );
        })}
      </div>
      {toast && <div className={`toast ${toastType}`}>{toast}</div>}
      <small>{step.hint}</small>
    </div>
  );
}