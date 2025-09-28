// RILEVA LINGUA BROWSER (es. "it", "en")
const userLang = navigator.language || navigator.userLanguage;
const lang = userLang.startsWith('it') ? 'it' : 'en';

function applyTranslations() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

applyTranslations();
