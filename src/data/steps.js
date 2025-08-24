// Пример шагов. Замени тексты и пути к изображениям под свой квест.
// Типы: 'mcq' | 'text' | 'puzzle' | 'photo_clue' | 'video'
import puzzlePhoto from "../content/puzzle/photo_2025-08-21_23-20-26.jpg";
import h1 from "../content/happy/photo_1_2025-08-22_15-29-43.jpg";
import h2 from "../content/happy/photo_2_2025-08-22_15-29-43.jpg";
import h3 from "../content/happy/photo_3_2025-08-22_15-29-43.jpg";
import h4 from "../content/happy/photo_4_2025-08-22_15-29-43.jpg";
import h5 from "../content/happy/photo_5_2025-08-22_15-29-43.jpg";
import h6 from "../content/happy/photo_6_2025-08-22_15-29-43.jpg";
const steps = [
  {
    id: "1",
    type: "mcq",
  title: "Тёплая загадка",
  content: "Где мы впервые встретились?",
    options: ["Кафе 'Луна'", "Парк 'Солнечный'", "Университет", "Кинотеатр"],
    answerIndex: 0,
    hint: "Посмотри на фото первого свидания"
  },
  {
    id: "3b",
    type: "image_choice",
  title: "Найди счастливую Настю",
  content: "Выбери тот снимок, где счастье видно лучше всего.",
    images: [h1, h2, h3, h4, h5, h6],
    correctSrc: h5,
    hint: "Улыбка скажет больше слов"
  },
  {
    id: "2",
    type: "text",
  title: "Секретное слово",
  content: "Введи слово, которое часто говорим друг другу.",
    answers: ["любовь"],
    hint: "Короткое тёплое слово"
  },
  {
    id: "3",
    type: "puzzle",
  title: "Собери пазл",
  content: "Собери фото, чтобы увидеть подсказку.",
  image: puzzlePhoto,
    grid: 3,
    hint: "Тщательно собирай плитки"
  },
  {
    id: "4",
    type: "photo_clue",
  title: "Офлайн‑подсказка",
    content: "На этом фото спрятан тайник. Найди место и забери конверт (без навигации).",
    image: "/media/clue.jpg",
    hint: "Ориентируйся по деталям на фото"
  },
  {
    id: "5",
    type: "video",
  title: "Финал — Подарок",
    content: "Поздравляю! Нажми «Подарок», чтобы открыть видео‑поздравление.",
    videoUrl: "" // подставляется из config FINAL_VIDEO_URL при запуске
  }
];

export default steps;