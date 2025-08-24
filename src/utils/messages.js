export const SUCCESS_MESSAGES = [
  "Правильно. умничка!",
  "Какая ты молодец!",
  "Случайно ответила или посторалась?))",
  "Правильно, люблю тебя!",
  "Ты сама справилась или помогли?)",
  "А ты та еще дерзкая.",
  "Какой раз уже заходишь на сайт и проходишь всё?",
  "Сайт оставишь для себя или всем покажешь?",
  "А ты молодец, горжусь тобой!"
];

export function getSuccessMessage(prev) {
  if (!Array.isArray(SUCCESS_MESSAGES) || SUCCESS_MESSAGES.length === 0) return "Правильно!";
  let msg = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
  // По возможности избегаем повторов подряд
  if (prev && SUCCESS_MESSAGES.length > 1) {
    let guard = 0;
    while (msg === prev && guard++ < 5) {
      msg = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
    }
  }
  return msg;
}
