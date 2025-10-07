const userLang = navigator.language || navigator.userLanguage;
const lang = 'en';//userLang.startsWith('it') ? 'it' : 'en';

/**
 * Effetto di scrittura con cursore lampeggiante
 * @param {HTMLElement} element - elemento DOM su cui scrivere
 * @param {string|string[]} text - testo o array di frasi
 * @param {number} speed - velocità digitazione
 */
function typeWriterEffect(element, text, speed = 80) {
  // Stile originale
  const originalStyles = window.getComputedStyle(element);
  const originalClasses = Array.from(element.classList);
  // Rimuove testo e cursore precedenti
  element.textContent = "";
  element.classList.add("typewriter-container");

  // Crea elemento testo e cursore
  const textSpan = document.createElement("span");
  const cursor = document.createElement("span");
  cursor.className = "typewriter-cursor";
  cursor.textContent = "|";
  element.appendChild(textSpan);
  element.appendChild(cursor);

  // Gestione di singola frase o più frasi
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
        setTimeout(type, 1500); // pausa dopo frase completa
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
 * Applica le traduzioni agli elementi con data-i18n
 */
function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      const text = translations[lang][key];
      // Se è l'elemento hero, applica l'effetto scrittura
      if (el.id === "hero-subtitle" || key === "hero-subtitle") {
        typeWriterEffect(el, text, 70);
        //el.textContent = text;
      } else {
        el.textContent = text;
      }
    }
  });
}

applyTranslations();
