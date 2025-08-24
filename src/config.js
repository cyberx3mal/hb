// Конфигурация проекта

// Вопрос/пароль: вопрос отображается на экране входа.
// После 2 неправильных попыток показывается подсказка hintText.
// Правильный ответ — compareAnswer (сравнение игнорирует регистр и пробелы).
export const PASSWORD_QUESTION = "Как первый раз ты была подписана у меня в телефоне?";
export const compareAnswer = (input) => {
  if (!input) return false;
  return input.toLowerCase().trim() === "макарошка";
};
export const HINT_TEXT = "Я был у тебя Дон Помидоро";
export const MAX_ATTEMPTS_BEFORE_HINT = 2;

// Финальное видео/подарок — укажи ссылку на Google Drive или Yandex.Disk.
// Примеры:
// Google Drive preview: https://drive.google.com/file/d/FILE_ID/preview
// Yandex: публичная ссылка (вставить сюда).
export const FINAL_VIDEO_URL = ""; // <-- вставь сюда временную ссылку, когда будет