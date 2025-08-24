import React from "react";
import MultiChoice from "./types/MultiChoice";
import TextAnswer from "./types/TextAnswer";
import ImagePuzzle from "./types/ImagePuzzle";
import PhotoClue from "./types/PhotoClue";
import VideoStep from "./types/VideoStep";
import ImageChoice from "./types/ImageChoice";

export default function StepRenderer({ step, onDone }) {
  switch (step.type) {
    case "mcq": return <MultiChoice step={step} onDone={onDone} />;
    case "text": return <TextAnswer step={step} onDone={onDone} />;
    case "puzzle": return <ImagePuzzle step={step} onDone={onDone} />;
  case "image_choice": return <ImageChoice step={step} onDone={onDone} />;
    case "photo_clue": return <PhotoClue step={step} onDone={onDone} />;
    case "video": return <VideoStep step={step} onDone={onDone} />;
    default: return <div>Неизвестный шаг</div>;
  }
}