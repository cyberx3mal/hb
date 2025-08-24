const KEY = "birthday-quest-progress";
export function saveProgress(obj) {
  localStorage.setItem(KEY, JSON.stringify(obj));
}
export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}