export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}
export function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function formatTime(ms) {
  return String(Number.parseFloat(ms / 1000).toFixed(1)).slice(-3);
}

export function closeModule(selector, time = 3000, type = 'toast-close', delta = 600) {
  setTimeout(() => {
    selector.classList.toggle(type);
  }, time);
  
  setTimeout(() => {
    selector.remove();
  }, time + delta);
}