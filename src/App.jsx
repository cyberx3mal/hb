import React, { useEffect, useMemo, useState } from "react";
import { FINAL_VIDEO_URL } from "./config";
import stepsData from "./data/steps";
import PasswordScreen from "./components/PasswordScreen";
import IntroScreen from "./components/IntroScreen";
import StepRenderer from "./components/StepRenderer";
import { loadProgress, saveProgress } from "./utils/storage";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [sawIntro, setSawIntro] = useState(false);
  const [progress, setProgress] = useState(loadProgress());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionProgress, setSessionProgress] = useState({});
  const [theme, setTheme] = useState(() => localStorage.getItem("hb-theme") || "dark");
  const steps = stepsData.map(s => {
    if (s.type === "video") return { ...s, videoUrl: FINAL_VIDEO_URL };
    return s;
  });

  useEffect(() => saveProgress(progress), [progress]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("hb-theme", theme);
  }, [theme]);

  function onUnlock() {
    setUnlocked(true);
  // Новая сессия — не разрешаем переход вперёд на основе старого сохранения
  setSessionProgress({});
  }

  function markStepDone(stepArg, opts) {
    const id = typeof stepArg === 'string' ? stepArg : stepArg.id;
    const p = { ...progress, [id]: true };
    setProgress(p);
  setSessionProgress(sp => ({ ...sp, [id]: true }));
    const noAuto = (typeof stepArg === 'object' && stepArg && stepArg.autoAdvance === false) || (opts && opts.stay);
    if (!noAuto) {
      const next = Math.min(currentIndex + 1, steps.length - 1);
      setCurrentIndex(next);
    }
  }

  function resetProgress() {
  const empty = {};
  setProgress(empty);
  setSessionProgress(empty);
  saveProgress(empty);
    setCurrentIndex(0);
  }

  function resetToPassword() {
    // Полный сброс до экрана пароля
    const empty = {};
    setProgress(empty);
    setSessionProgress(empty);
    saveProgress(empty);
    setCurrentIndex(0);
    setUnlocked(false);
  // интро уже было показано — остаёмся на логине
  setSawIntro(true);
  }

  if (!unlocked) {
    if (!sawIntro) {
      return <IntroScreen onStart={() => setSawIntro(true)} />;
    }
    return <PasswordScreen onUnlock={onUnlock} />;
  }

  const step = steps[currentIndex];
  // Кнопка "Вперёд" активна только если шаг выполнен в текущей сессии
  const canGoForward = !!sessionProgress[step.id];
  return (
    <div className="app">
      <header>
        <h1>Петрова всё может</h1>
        <div className="header-center">
          <button onClick={resetProgress} title="Очистить прогресс и начать сначала" style={{ minHeight: 36 }}>
            Сбросить прогресс
          </button>
        </div>
        <div className="header-right">
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} title="Переключить тему" style={{ minHeight: 36 }}>
            Тема: {theme === "dark" ? "Тёмная" : "Светлая"}
          </button>
        </div>
      </header>
      <main>
  <StepRenderer step={step} onDone={(opts) => markStepDone(step, opts)} onResetToPassword={resetToPassword} />
        <div className="progress">
          <small>Шаг {currentIndex + 1} из {steps.length}</small>
        </div>
        <div className="nav">
          <button className="btn-back" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}>Назад</button>
          <button
            className="btn-next"
            onClick={() => {
              if (!canGoForward) return;
              setCurrentIndex(Math.min(steps.length - 1, currentIndex + 1));
            }}
            disabled={!canGoForward}
            aria-disabled={!canGoForward}
            title={canGoForward?"":"Заверши текущий шаг"}
          >
            Вперёд
          </button>
        </div>
      </main>
    </div>
  );
}