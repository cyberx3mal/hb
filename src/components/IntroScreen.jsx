import React from "react";

export default function IntroScreen({ onStart }) {
  return (
    <div className="step">
      <div className="info-banner">
        <span className="info-text">При первом заходе на сайт снимай весь процесс до конца. Люблю ❤️</span>
      </div>
      <div className="actions">
        <button type="button" onClick={onStart}>Начать</button>
      </div>
    </div>
  );
}
