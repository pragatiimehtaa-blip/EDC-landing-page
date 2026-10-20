// === Grab elements for manipulation ===
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const navToggleBtn = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
const exploreBtn = document.getElementById('explore-btn');
const scheduleBtn = document.getElementById('schedule-btn');
const countdownEl = document.querySelector('.countdown');
const form = document.getElementById('registration-form');
const formMessage = document.getElementById('form-message');
const faqQuestions = document.querySelectorAll('.faq-question');

// Event date for countdown
const eventDate = new Date('November 12, 2026 10:00:00');

// === THEME TOGGLE ===
function updateThemeButton(isDark) {
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  themeToggleBtn.setAttribute('aria-pressed', isDark);
}

function toggleTheme() {
  const isDark = body.classList.toggle('dark-theme');
  updateThemeButton(isDark);
  // Optional: Save to localStorage (simplified for beginner)
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch {}
}

// Initialize theme
(function initTheme() {
  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem('theme');
  } catch {}
  if (storedTheme === 'dark') {
    body.classList.add('dark-theme');
    updateThemeButton(true);
  } else {
    updateThemeButton(false);
  }
})();

themeToggleBtn.addEventListener('click', toggleTheme);

// === MOBILE NAVIGATION ===
navToggleBtn.addEventListener('click', () => {
  const expanded = navToggleBtn.getAttribute('aria-expanded') === 'true';
  navToggleBtn.setAttribute('aria-expanded', !expanded);
  navList.classList.toggle('open');
});

// Close mobile menu when a nav link is clicked
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navList.classList.contains('open')) {
      navList.classList.remove('open');
      navToggleBtn.setAttribute('aria-expanded', false);
    }
  });
});

// === BUTTONS SCROLLING TO SECTIONS ===
exploreBtn.addEventListener('click', () => {
  document.getElementById('about').scrollIntoView({behavior: 'smooth'});
});

scheduleBtn.addEventListener('click', () => {
  document.getElementById('schedule').scrollIntoView({behavior: 'smooth'});
});

// === COUNTDOWN TIMER ===
function updateCountdown() {
  const now = new Date();
  let diff = eventDate - now;

  if (diff <= 0) {
    countdownEl.textContent = '🎉 VentureVerse 2026 has started!';
    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);

  countdownEl.textContent = `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s until event`;
}

updateCountdown();
const countdownInterval = setInterval(updateCountdown, 1000);

// === FORM VALIDATION ===
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const fullName = form['full-name'].value.trim();
  const email = form.email.value.trim();
  const status = form['student-status'].value.trim();

  // Simple email regex for basic validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fullName || !email || !status) {
    formMessage.textContent = 'Please fill out all required fields.';
    formMessage.style.color = 'var(--color-dark-navy)';
    if (body.classList.contains('dark-theme')) {
      formMessage.style.color = 'var(--color-lime-green)';
    }
    return;
  }

  if (!emailPattern.test(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.style.color = 'var(--color-dark-navy)';
    if (body.classList.contains('dark-theme')) {
      formMessage.style.color = 'var(--color-lime-green)';
    }
    return;
  }

  // On success
  formMessage.textContent = `Thank you for registering, ${fullName}!`;
  formMessage.style.color = 'var(--color-dark-navy)';
  if (body.classList.contains('dark-theme')) {
    formMessage.style.color = 'var(--color-lime-green)';
  }
  form.reset();
});

// === FAQ ACCORDION ===
faqQuestions.forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);
    const answer = button.nextElementSibling;
    if (answer) {
      if (expanded) {
        answer.hidden = true;
      } else {
        answer.hidden = false;
      }
    }
  });

  // Keyboard users can toggle FAQ with keyboard (space/enter handled by button)
});
