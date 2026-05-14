'use strict';

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Passion & Purpose" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", category: "Resilience" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "Perseverance" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", category: "Life & Living" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Dreams & Vision" },
  { text: "Darkness cannot drive out darkness; only light can do that.", author: "Martin Luther King Jr.", category: "Hope & Light" },
  { text: "Spread love everywhere you go. Let no one ever come to you without leaving happier.", author: "Mother Teresa", category: "Kindness" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt", category: "Resilience" },
  { text: "Do not go where the path may lead; go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", category: "Courage" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", category: "Perseverance" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", category: "Life & Living" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth", category: "Courage" },
  { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt", category: "Life & Living" },
  { text: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey", category: "Gratitude" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "Life & Living" },
  { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison", category: "Persistence" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "Action" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Belief" },
  { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs", category: "Authenticity" },
  { text: "Not everything that is faced can be changed, but nothing can be changed until it is faced.", author: "James Baldwin", category: "Truth" },
  { text: "To live is the rarest thing in the world. Most people just exist.", author: "Oscar Wilde", category: "Life & Living" },
  { text: "An unexamined life is not worth living.", author: "Socrates", category: "Philosophy" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci", category: "Wisdom" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson", category: "Inner Strength" },
  { text: "You have to be odd to be number one.", author: "Dr. Seuss", category: "Individuality" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "Hope" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt", category: "Courage" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin", category: "Action" },
  { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi", category: "Change" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein", category: "Growth" },
];

let currentIndex = 0;
let quoteCount   = 1;
let lastIndex    = -1;

const card        = document.getElementById('quoteWrapper');
const quoteText   = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
const quoteCat    = document.getElementById('quoteCategory');
const quoteNumber = document.getElementById('quoteNumber');
const toast       = document.getElementById('toast');

function randomIndex() {
  if (quotes.length === 1) return 0;
  let idx;
  do { idx = Math.floor(Math.random() * quotes.length); }
  while (idx === lastIndex);
  return idx;
}

function pad(n) { return String(n).padStart(2, '0'); }

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function generateQuote() {
  card.classList.add('transitioning');
  setTimeout(() => {
    const idx = randomIndex();
    lastIndex = idx;
    currentIndex = idx;
    quoteCount++;
    const q = quotes[idx];
    quoteText.textContent   = q.text;
    quoteAuthor.textContent = q.author;
    quoteCat.textContent    = q.category;
    quoteNumber.textContent = pad(quoteCount);
    card.classList.remove('transitioning');
  }, 420);
}

function copyQuote() {
  const q = quotes[currentIndex];
  const text = '"' + q.text + '" \u2014 ' + q.author;
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => showToast('\u2713  Copied to clipboard')).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); showToast('\u2713  Copied to clipboard'); }
  catch { showToast('Could not copy'); }
  document.body.removeChild(ta);
}

function shareQuote() {
  const q    = quotes[currentIndex];
  const text = '"' + q.text + '" \u2014 ' + q.author;
  if (navigator.share) {
    navigator.share({ title: 'A Quote from Luminary', text }).catch(() => {});
  } else {
    copyQuote();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); generateQuote(); }
});

(function init() {
  const idx = randomIndex();
  lastIndex = idx; currentIndex = idx;
  const q = quotes[idx];
  quoteText.textContent   = q.text;
  quoteAuthor.textContent = q.author;
  quoteCat.textContent    = q.category;
  quoteNumber.textContent = pad(quoteCount);
})();