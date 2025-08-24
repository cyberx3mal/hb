import React, { useMemo, useState } from "react";
import { getSuccessMessage } from "../../utils/messages";

export default function TruthOrLie({ step, onDone }) {
  const items = step.items || [];
  const correct = useMemo(() => new Set((step.correctIndexes || [])), [step.correctIndexes]);
  const [checked, setChecked] = useState(() => new Set());
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("error");
  const [solved, setSolved] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [successText, setSuccessText] = useState("Правильно!");

  function toggle(i) {
    if (showFeedback) return; // блокируем изменения после проверки
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  }

  function verify() {
    const chosen = Array.from(checked).sort();
    const expected = Array.from(correct).sort();
    const ok = chosen.length === expected.length && chosen.every((v, idx) => v === expected[idx]);
    setShowFeedback(true);
    if (ok) {
      setSolved(true);
  setSuccessText(prev => getSuccessMessage(prev));
      onDone({ stay: true }); // засчитываем, но не автопереходим
    } else {
      setToastType("error");
      setToast("Есть ошибки. Проверь выбранные пункты.");
      setTimeout(() => setToast(""), 1500);
    }
  }

  function retry() {
    setShowFeedback(false);
    setToast("");
    setToastType("error");
  setChecked(new Set());
  }

  return (
    <div className="step">
      <h3>{step.title}</h3>
      <p>{step.content}</p>
      <ul className="check-list">
        {items.map((text, i) => {
          let stateClass = "";
          if (showFeedback) {
            const isChecked = checked.has(i);
            if (isChecked) {
              stateClass = correct.has(i) ? " ok" : " wrong";
            }
          }
          return (
            <li key={i}>
              <label className={"check-item" + stateClass}>
                <input type="checkbox" checked={checked.has(i)} onChange={() => toggle(i)} disabled={showFeedback} />
                <span>{text}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="actions">
        <button type="button" onClick={verify}>Проверить</button>
        {showFeedback && !solved && (
          <button type="button" onClick={retry}>Повторить попытку</button>
        )}
      </div>
  {toast && <div className={`toast ${toastType}`}>{toast}</div>}
  {solved && <div className="success">{successText}</div>}
      {step.hint && <small className="hint">{step.hint}</small>}
    </div>
  );
}
