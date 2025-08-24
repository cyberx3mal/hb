import React from "react";
import MultiChoice from "./types/MultiChoice";
import TextAnswer from "./types/TextAnswer";
import ImagePuzzle from "./types/ImagePuzzle";
import PhotoClue from "./types/PhotoClue";
import VideoStep from "./types/VideoStep";
import ImageChoice from "./types/ImageChoice";
import GiftClue from "./types/GiftClue";
import TruthOrLie from "./types/TruthOrLie";
import InfoStep from "./types/InfoStep";
import ConfirmStep from "./types/ConfirmStep";
import FinalReply from "./types/FinalReply";

export default function StepRenderer({ step, onDone, onResetToPassword }) {
  switch (step.type) {
    case "mcq": return <MultiChoice step={step} onDone={onDone} />;
    case "text": return <TextAnswer step={step} onDone={onDone} />;
    case "puzzle": return <ImagePuzzle step={step} onDone={onDone} />;
  case "image_choice": return <ImageChoice step={step} onDone={onDone} />;
  case "gift_clue": return <GiftClue step={step} onDone={onDone} />;
  case "truth_or_lie": return <TruthOrLie step={step} onDone={onDone} />;
  case "info": return <InfoStep step={step} onDone={onDone} />;
  case "confirm": return <ConfirmStep step={step} onDone={onDone} onResetToPassword={onResetToPassword} />;
    case "photo_clue": return <PhotoClue step={step} onDone={onDone} />;
    case "video": return <VideoStep step={step} onDone={onDone} />;
  case "final_reply": return <FinalReply step={step} onResetToPassword={onResetToPassword} />;
    default: return <div>Неизвестный шаг</div>;
  }
}