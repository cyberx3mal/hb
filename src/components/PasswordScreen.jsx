import React, { useEffect, useState } from "react";
import { PASSWORD_QUESTION, compareAnswer, HINT_TEXT, MAX_ATTEMPTS_BEFORE_HINT } from "../config";

export default function PasswordScreen({ onUnlock }) {
  const [val, setVal] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [wrongHit, setWrongHit] = useState(false);
  const [lockedUntil, setLockedUntil] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [showHintNow, setShowHintNow] = useState(false);

  const isLocked = lockedUntil > Date.now();
  useEffect(() => {
    if (!isLocked) { setRemaining(0); return; }
    const tick = () => {
      const secs = Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000));
      setRemaining(secs);
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [lockedUntil]);

  function submit(e) {
    e?.preventDefault();
    if (isLocked) return;
    if (compareAnswer(val)) {
      onUnlock();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setError("Подумай еще, возможно ошиблась");
      setWrongHit(true);
      setTimeout(() => setWrongHit(false), 600);
      // блокировка после 5 попыток на 10 секунд
      if (next >= 5) {
        const until = Date.now() + 10000;
        setLockedUntil(until);
      }
    }
  }

  return (
    <div className="password-screen">
      <h2 className="login-title">Для входа на сайт введи пароль</h2>
      <div className="login-question">{PASSWORD_QUESTION}</div>
      <form onSubmit={submit}>
        <label htmlFor="password-input" className="visually-hidden">Пароль</label>
        <div className={(wrongHit ? "shake " : "") + "input-wrap"}>
          <input
            id="password-input"
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            autoFocus
            value={val}
            onChange={e => { setVal(e.target.value); setError(""); }}
            placeholder={isLocked ? `Подождите ${remaining} сек...` : "введите пароль"}
            disabled={isLocked}
            className={wrongHit ? "wrong" : ""}
          />
          <button
            type="button"
            className="icon-btn"
            onClick={() => setShowPassword(s => !s)}
            title={showPassword ? "Скрыть пароль" : "Показать пароль"}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? (
              // eye-off icon
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M10.58 10.58C10.21 11 10 11.48 10 12C10 13.1 10.9 14 12 14C12.52 14 13 13.79 13.42 13.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M9.89 4.24C10.57 4.09 11.27 4 12 4C16.5 4 20.27 6.61 22 11C21.45 12.42 20.66 13.66 19.71 14.68M4.29 9.32C5.93 7.55 7.92 6.39 10.11 5.76" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 20C7.5 20 3.73 17.39 2 13C2.62 11.41 3.53 10.01 4.66 8.86" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              // eye icon
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M2 12C3.73 7.61 7.5 5 12 5C16.5 5 20.27 7.61 22 12C20.27 16.39 16.5 19 12 19C7.5 19 3.73 16.39 2 12Z" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
              </svg>
            )}
          </button>
        </div>
        <div className="actions">
          <button type="submit" disabled={isLocked || !val.trim()}>{isLocked ? `Ждём ${remaining}s` : "Войти"}</button>
        </div>
      </form>
      {error && <div className="error" role="alert" aria-live="polite">{error}</div>}
      {!showHintNow && attempts < MAX_ATTEMPTS_BEFORE_HINT && (
        <div className="actions" style={{ marginTop: 8 }}>
          <button type="button" onClick={() => setShowHintNow(true)}>Нужна подсказка?</button>
        </div>
      )}
      {(showHintNow || attempts >= MAX_ATTEMPTS_BEFORE_HINT) && (
        <div className="hint" aria-live="polite">Подсказка: {HINT_TEXT}</div>
      )}
    </div>
  );
}