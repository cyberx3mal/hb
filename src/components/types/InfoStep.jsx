import React, { useEffect } from "react";

export default function InfoStep({ step, onDone }) {
  useEffect(() => {
    // сразу разрешаем переход дальше, но не переключаем экран
    onDone({ stay: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="step">
      {step.title && <h3>{step.title}</h3>}
      {step.content && (
        <div className="info-banner">
          <span className="info-emoji" aria-hidden>📸</span>
          <span className="info-text">{step.content}</span>
        </div>
      )}
  <small className="hint">это просто текст, можешь нажимать вперед</small>
    </div>
  );
}
