import React, { useEffect, useMemo, useState } from "react";
import { FINAL_VIDEO_URL } from "./config";
import stepsData from "./data/steps";
import PasswordScreen from "./components/PasswordScreen";
import StepRenderer from "./components/StepRenderer";
import { loadProgress, saveProgress } from "./utils/storage";

export default function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [progress, setProgress] = useState(loadProgress());
  const [currentIndex, setCurrentIndex] = useState(0);
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
  }

  function markStepDone(id) {
    const p = { ...progress, [id]: true };
    setProgress(p);
    const next = Math.min(currentIndex + 1, steps.length - 1);
    setCurrentIndex(next);
  }

  if (!unlocked) {
    return <PasswordScreen onUnlock={onUnlock} />;
  }

  const step = steps[currentIndex];
  const canGoForward = !!progress[step.id];
  return (
    <div className="app">
      <header>
        <h1>Твой квест</h1>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")} title="Переключить тему" style={{ minHeight: 36 }}>
            Тема: {theme === "dark" ? "Тёмная" : "Светлая"}
          </button>
        </div>
      </header>
      <main>
        <StepRenderer step={step} onDone={() => markStepDone(step.id)} />
        <div className="progress">
          <small>Шаг {currentIndex + 1} из {steps.length}</small>
        </div>
        <div className="nav">
          <button onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}>Назад</button>
          <button onClick={() => setCurrentIndex(Math.min(steps.length - 1, currentIndex + 1))} disabled={!canGoForward} title={canGoForward?"":"Заверши текущий шаг"}>Вперёд</button>
        </div>
      </main>
    </div>
  );
}