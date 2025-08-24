import React, { useEffect, useState } from "react";

export default function ConfirmStep({ step, onDone, onResetToPassword }) {
  const question = step.question || "Ты готова к еще одному подарочку?";
  const [showModal, setShowModal] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);

  const handleNo = () => {
    // показать модалку и запустить обратный отсчёт
    setSecondsLeft(5);
    setShowModal(true);
  };

  useEffect(() => {
    if (!showModal) return;
    // тикаем раз в секунду; при 0 — уходим на ввод пароля
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onResetToPassword && onResetToPassword();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showModal, onResetToPassword]);

  const secWord = (n) => {
    const n10 = n % 10;
    const n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return "секунду";
    if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return "секунды";
    return "секунд";
  };
  return (
    <div className="step">
      {step.title && <h3>{step.title}</h3>}
      <p style={{ marginBottom: 10 }}>{question}</p>
      <div className="actions" style={{ gap: 8 }}>
        <button onClick={() => onDone && onDone()} disabled={showModal}>Да</button>
        <button onClick={handleNo} className="btn-back" disabled={showModal}>Нет</button>
      </div>
      {showModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-window">
            <p style={{ margin: 0, fontWeight: 700 }}>Сама нажала нет.</p>
            <p style={{ marginTop: 8 }}>Возврат к вводу пароля через {secondsLeft} {secWord(secondsLeft)}…</p>
          </div>
        </div>
      )}
    </div>
  );
}
