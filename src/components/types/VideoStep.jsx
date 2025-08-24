import React from "react";
import ReactPlayer from "react-player";

export default function VideoStep({ step, onDone }) {
  return (
    <div className="step">
      <h3>{step.title}</h3>
      <p>{step.content}</p>
      {step.videoUrl ? (
        <div>
          <ReactPlayer url={step.videoUrl} controls width="100%" />
        </div>
      ) : (
        <div>Видео не задано</div>
      )}
      <div className="actions">
        <button onClick={onDone}>Завершить квест</button>
      </div>
    </div>
  );
}