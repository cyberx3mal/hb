import React, { useEffect, useState } from "react";

export default function FinalReply({ step, onResetToPassword }) {
  const [showInput, setShowInput] = useState(false);
  const [val, setVal] = useState("");
  const [wrongHit, setWrongHit] = useState(false);
  const [toast, setToast] = useState("");
  const [showModal, setShowModal] = useState(false);

  const answers = (step.answers || []).map(a => a.toLowerCase().trim());

  function verify(v) {
    const ok = answers.includes((v || "").toLowerCase().trim());
    if (ok) {
      setShowModal(true);
      // через 5 секунд сброс и возврат к паролю
      setTimeout(() => {
        onResetToPassword && onResetToPassword();
      }, 5000);
    } else {
      setWrongHit(true);
      setToast(step.wrongHint || "ты же уже отвечала правильно, ты же знаешь что писать");
      setTimeout(() => setWrongHit(false), 600);
      setTimeout(() => setToast(""), 2000);
    }
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      verify(val);
    }
  }

  return (
    <div className="step">
      {step.title && <h3>{step.title}</h3>}
      <p style={{ fontWeight: 700 }}>{step.message || "С Днём Рождения, любимая жена! Люблю тебя!"}</p>
      {!showInput ? (
        <div className="actions">
          <button type="button" onClick={() => setShowInput(true)}>ответить</button>
        </div>
      ) : (
        <div>
          <label className="visually-hidden" htmlFor="final-reply">Ответ</label>
          <input
            id="final-reply"
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="введите ответ"
            className={wrongHit ? "wrong shake" : ""}
          />
          <div className="actions" style={{ marginTop: 8 }}>
            <button type="button" onClick={() => verify(val)} disabled={!val.trim()}>Проверить</button>
          </div>
          {toast && <div className="toast error" role="status">{toast}</div>}
        </div>
      )}

      {showModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-window">
            <p style={{ margin: 0, fontWeight: 700 }}>Ты уже собралась? Поехали кататься {"<3"}</p>
            <small className="hint">через 5 секунд вернёмся на экран пароля</small>
          </div>
        </div>
      )}
    </div>
  );
}
