/* Typewriter */
(function (global) {
  function defaults(o, d) {
    const r = {};
    for (const k in d) r[k] = (o && k in o) ? o[k] : d[k];
    return r;
  }

  function randJitter(base) {
    // rende la digitazione un po' "umana"
    const jitter = Math.round(base * 0.25);
    return base - jitter + Math.floor(Math.random() * (jitter * 2 + 1));
  }

  function resolveEl(elOrSelector) {
    if (!elOrSelector) return null;
    if (typeof elOrSelector === 'string') return document.querySelector(elOrSelector);
    if (elOrSelector instanceof Element) return elOrSelector;
    return null;
  }

  function Typewriter(opts) {
    this.opts = defaults(opts, {
      typeSpeed: 90,      // ms per carattere (scrittura)
      deleteSpeed: 40,    // ms per carattere (cancellazione)
      pauseAfter: 1500,   // ms di pausa dopo una frase completa
      loop: true,         // ripete le frasi
      cursor: true,       // mostra cursore
      cursorChar: '|',
      cursorClass: 'tw-cursor',
      textClass: 'tw-text',
      announceOnComplete: false, // accessibilità: annuncia la frase al termine
      humanize: true
    });
  }

  Typewriter.prototype.typeTo = function (target, phrases, options) {
    const el = resolveEl(target);
    if (!el) {
      console.warn('Typewriter: target non trovato:', target);
      return { stop: () => {}, promise: Promise.resolve() };
    }
    const opt = defaults(options, this.opts);

    // crea/usa uno span per il testo (non alteriamo il resto del contenuto)
    let textSpan = el.querySelector('.' + opt.textClass);
    if (!textSpan) {
      textSpan = document.createElement('span');
      textSpan.className = opt.textClass;
      // inseriamo come primo figlio (così non rompere markup esistente)
      el.insertBefore(textSpan, el.firstChild);
    }

    // cursore
    let cursorSpan = el.querySelector('.' + opt.cursorClass);
    if (opt.cursor && !cursorSpan) {
      cursorSpan = document.createElement('span');
      cursorSpan.className = opt.cursorClass;
      cursorSpan.setAttribute('aria-hidden', 'true');
      cursorSpan.textContent = opt.cursorChar;
      el.appendChild(cursorSpan);
    }

    // sr-only element per annunci (opzionale)
    let sr = el.querySelector('.tw-sr-live');
    if (!sr) {
      sr = document.createElement('span');
      sr.className = 'tw-sr-live';
      sr.style.position = 'absolute';
      sr.style.width = '1px';
      sr.style.height = '1px';
      sr.style.margin = '-1px';
      sr.style.border = 0;
      sr.style.padding = 0;
      sr.style.clip = 'rect(0 0 0 0)';
      sr.style.overflow = 'hidden';
      sr.setAttribute('aria-live', 'polite');
      el.appendChild(sr);
    }

    let stopFlag = { stopped: false };
    const controller = {
      stop() { stopFlag.stopped = true; },
      promise: null
    };

    controller.promise = new Promise((resolve) => {
      let i = 0;      // index frase
      let pos = 0;    // posizione carattere
      let deleting = false;

      const step = () => {
        if (stopFlag.stopped) {
          // pulizia opzionale
          if (cursorSpan) cursorSpan.remove();
          resolve();
          return;
        }

        const phrase = phrases[i] || '';
        // Aggiorna testo visibile
        if (!deleting) {
          pos = Math.min(pos + 1, phrase.length);
        } else {
          pos = Math.max(pos - 1, 0);
        }
        textSpan.textContent = phrase.slice(0, pos);

        // Messaggi di accessibilità solo al completamento frase (opzionale)
        if (!deleting && pos === phrase.length && opt.announceOnComplete) {
          sr.textContent = phrase;
        }

        if (!deleting && pos < phrase.length) {
          // continua a scrivere
          const delay = opt.humanize ? randJitter(opt.typeSpeed) : opt.typeSpeed;
          setTimeout(step, delay);
          return;
        }

        if (!deleting && pos === phrase.length) {
          // pausa alla fine della frase, poi inizia cancellazione
          setTimeout(() => {
            deleting = true;
            setTimeout(step, opt.humanize ? randJitter(opt.deleteSpeed) : opt.deleteSpeed);
          }, opt.pauseAfter);
          return;
        }

        if (deleting && pos > 0) {
          const delay = opt.humanize ? randJitter(opt.deleteSpeed) : opt.deleteSpeed;
          setTimeout(step, delay);
          return;
        }

        if (deleting && pos === 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
          if (i === 0 && !opt.loop) {
            // fine
            if (cursorSpan) cursorSpan.remove();
            resolve();
            return;
          }
          // piccola pausa prima della prossima frase
          setTimeout(step, Math.max(80, Math.floor(opt.pauseAfter / 3)));
          return;
        }
      };

      // avvia
      step();
    });

    return controller;
  };

  // export
  global.Typewriter = Typewriter;
  global.typewriter = function (target, phrases, options) {
    return new Typewriter(options).typeTo(target, phrases, options);
  };
})(window);
