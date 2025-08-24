// Пример шагов. Замени тексты и пути к изображениям под свой квест.
// Типы: 'mcq' | 'text' | 'puzzle' | 'photo_clue' | 'video'
import puzzlePhoto from "../content/puzzle/photo_2025-08-21_23-20-26.jpg";
import h1 from "../content/happy/photo_1_2025-08-22_15-29-43.jpg";
import h2 from "../content/happy/photo_2_2025-08-22_15-29-43.jpg";
import h3 from "../content/happy/photo_3_2025-08-22_15-29-43.jpg";
import h4 from "../content/happy/photo_4_2025-08-22_15-29-43.jpg";
import h5 from "../content/happy/photo_5_2025-08-22_15-29-43.jpg";
import h6 from "../content/happy/photo_6_2025-08-22_15-29-43.jpg";
import giftMain from "../content/one/11.jpg";
import giftHint from "../content/one/12.jpg";
import gift2Main from "../content/two/21.jpg";
import gift2Hint from "../content/two/22.jpg";
const steps = [
  {
    id: "1",
    type: "mcq",
  title: "Начало нашей истории",
  content: "Когда у тебя дата начала отношений со своим любимым мужем?",
    options: [
      "25.08.2000",
      "25.07.2021"
    ],
    answerIndex: 1,
    successMessage: "Ты помнишь, ути-пути какая умничка <3",
    wrongMessages: {
      0: "девочка моя, это же твоя дата, ты не перепутала?;)"
    },
  hint: "Подумай о лете 2021"
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
  title: "Как ты отвечаешь?",
  content: "Как ты чаще всего отвечаешь своему мужу?",
    answers: ["и я тебя", "и я тебя тоже", "я тоже", "и я тоже"],
    hint: "Отвечаешь на мои слова \"Люблю тебя\"."
  },
  {
    id: "6",
    type: "truth_or_lie",
    title: "Правда или ложь",
    content: "Выбери все правдивые факты о нас и проверь ответ.",
    autoAdvance: false,
    items: [
      "у тебя проколот пупок.",
      "первый подаренный тебе букет лежал у лавочки подъезда.",
      "мы спали ночь в лесу под звёздами.",
      "если бы не химия, мы бы так и не общались.",
      "вечно жалуешься, что моя голова скатывается на тебя.",
      "пьём с одной бутылки без брезгливости с радостью."
    ],
    // индексы правильных фактов по нулевой нумерации: 1, 3, 4
    correctIndexes: [1, 3, 4]
  },
  {
    id: "3a",
    type: "gift_clue",
    title: "Подарочек",
    content: "А теперь найди и забери свой подарочек, и продолжай дальше",
  imageMain: giftHint,
  imageHint: giftMain,
    question: "Сколько внутри твоего любимого счастья?",
    answers: ["25", "25к", "25000", "25 000", "25 тысяч", "25тыс", "25 тыс", "миллион"],
  },
  {
    id: "3a-info",
    type: "info",
    content: "Это тебе на фотосессию <3",
  },
  {
    id: "3",
    type: "puzzle",
  title: "Собери пазл",
  content: "Собери фото",
  image: puzzlePhoto,
    grid: 3,
    hint: "Тщательно собирай плитки"
  },
  {
    id: "after-puzzle-confirm",
    type: "confirm",
    title: "Ещё один подарочек",
    question: "Ты готова к еще одному подарочку?",
    // по «Да» — автопереход, по «Нет» — возврат к паролю
  },
  {
  id: "final-gift",
  type: "gift_clue",
  title: "Ещё один подарочек",
  content: "Нашла подарочек?",
  imageMain: gift2Hint,
  imageHint: gift2Main,
  question: "Что внутри?",
  answers: ["ничего"],
  hint: "введи уже \"ничего\", по факту же)))"
  },
  {
    id: "final-reply",
    type: "final_reply",
    title: "Финал",
    message: "С Днём Рождения, любимая жена! Люблю тебя!",
    // Используем те же ответы, что и в шаге «Как ты отвечаешь?»
    answers: ["и я тебя", "и я тебя тоже", "я тоже", "и я тоже"],
    wrongHint: "ты же уже отвечала правильно, ты же знаешь что писать"
  }
];

export default steps;