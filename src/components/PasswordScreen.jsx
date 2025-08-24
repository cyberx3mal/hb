import React, { useState } from "react";
import { PASSWORD_QUESTION, compareAnswer, HINT_TEXT, MAX_ATTEMPTS_BEFORE_HINT } from "../config";

export default function PasswordScreen({ onUnlock }) {
  const [val, setVal] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  function submit(e) {
    e?.preventDefault();
    if (compareAnswer(val)) {
      onUnlock();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setError("Подумай еще, возможно ошиблась");
    }
  }

  return (
    <div className="password-screen">
      <h2 className="login-title">Для входа на сайт введи пароль</h2>
      <div className="login-question">{PASSWORD_QUESTION}</div>
      <form onSubmit={submit}>
        <label htmlFor="password-input" className="visually-hidden">Пароль</label>
        <input id="password-input" type="password" autoComplete="off" value={val} onChange={e => { setVal(e.target.value); setError(""); }} placeholder="введите пароль" />
        <div className="actions">
          <button type="submit">Войти</button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      {attempts >= MAX_ATTEMPTS_BEFORE_HINT && (
        <div className="hint">Подсказка: {HINT_TEXT}</div>
      )}
    </div>
  );
}