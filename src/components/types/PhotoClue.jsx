import React from "react";

export default function PhotoClue({ step, onDone }) {
  return (
    <div className="step">
      <h3>{step.title}</h3>
      <p>{step.content}</p>
      {step.image && (
        <div style={{ margin: "12px 0" }}>
          <img src={step.image} alt="clue" style={{ maxWidth: "100%", borderRadius: 8 }} />
        </div>
      )}
      <div className="actions" style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => {
            // пользователь нажал, что нашёл предмет офлайн
            alert("Если ты нашла офлайн‑предмет — нажми 'Я забрал'.");
          }}
        >
          Я забрал
        </button>
        <button onClick={onDone}>Я забрал (онлайн)</button>
      </div>
      {step.hint && <small className="hint">{step.hint}</small>}
    </div>
  );
}