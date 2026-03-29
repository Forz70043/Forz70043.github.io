const userLang = navigator.language || navigator.userLanguage;
const lang = userLang.startsWith('it') ? 'it' : 'en';

/**
 * Typewriter effect
 * @param {HTMLElement} element - elemento DOM su cui scrivere
 * @param {string|string[]} text - testo o array di frasi
 * @param {number} speed - velocità digitazione
 */
function typeWriterEffect(element, text, speed = 80) {
  // Original styles and classes
  const originalStyles = window.getComputedStyle(element);
  const originalClasses = Array.from(element.classList);
  // Remove original content and set up container
  element.textContent = "";
  element.classList.add("typewriter-container");

  // Create text and cursor elements
  const textSpan = document.createElement("span");
  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  cursor.textContent = "|";
  element.appendChild(textSpan);
  element.appendChild(cursor);

  // Single phrase or multiple phrases
  const phrases = Array.isArray(text) ? text : [text];
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    if (!deleting) {
      textSpan.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        deleting = true;
        setTimeout(type, 1500); // Pause after full phrase
        return;
      }
    } else {
      textSpan.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    const delay = deleting ? speed / 2 : speed;
    setTimeout(type, delay);
  }

  type();
}

/**
 * Set text content based on selected language
 */
function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      const text = translations[lang][key];
      // Use typewriter effect for specific keys
      if (el.id === "hero-subtitle" || key === "hero-subtitle") {
        typeWriterEffect(el, text, 70);
        
      } else {
        el.textContent = text;
      }
    }
  });
}

applyTranslations();
