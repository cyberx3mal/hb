import React, { useState } from "react";
import { getSuccessMessage } from "../../utils/messages";

export default function MultiChoice({ step, onDone }) {
  const [selected, setSelected] = useState(null);
  const [lastWrong, setLastWrong] = useState(null);
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");
  const [solved, setSolved] = useState(false);
  const [successText, setSuccessText] = useState("Правильно!");

  function onPick(i) {
    setSelected(i);
  }

  function verify() {
    if (selected == null) {
      setToastType("error");
      setToast("Выбери вариант");
      setTimeout(() => setToast(""), 1000);
      return;
    }
    const ok = selected === step.answerIndex;
    if (ok) {
  setSolved(true);
  setSuccessText(prev => getSuccessMessage(prev));
      onDone({ stay: true });
    } else {
      setLastWrong(selected);
      const wrongText = (step.wrongMessages && step.wrongMessages[selected]) || step.wrongMessage || "Неверно, попробуй ещё";
      setToast(wrongText);
      setToastType("error");
      setTimeout(() => setToast(""), 1400);
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
      <div className="actions">
        <button type="button" onClick={verify}>Проверить</button>
      </div>
  {toast && <div className={`toast ${toastType}`}>{toast}</div>}
  {solved && <div className="success">{successText}</div>}
      {lastWrong != null && step.hint && (
        <small className="hint">Подсказка: {step.hint}</small>
      )}
    </div>
  );
}