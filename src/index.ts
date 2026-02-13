import './styles/theme.css';
import './app.ts';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
