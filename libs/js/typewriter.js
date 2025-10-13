/* Typewriter */
(function (global) {
  function defaults(o, d) {
    const r = {};
    for (const k in d) r[k] = (o && k in o) ? o[k] : d[k];
    return r;
  }

  function randJitter(base) {
    // make typing a bit more "human"
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
      typeSpeed: 90,      // ms per character (typing)
      deleteSpeed: 40,    // ms per character (deleting)
      pauseAfter: 1500,   // ms pause after a complete sentence
      loop: true,         // repeat phrases
      cursor: true,       // show cursor
      cursorChar: '|',
      cursorClass: 'tw-cursor',
      textClass: 'tw-text',
      announceOnComplete: false, // accessibility: announce the phrase when complete
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

    // create/use a span for the text (don't alter the rest of the content)
    let textSpan = el.querySelector('.' + opt.textClass);
    if (!textSpan) {
      textSpan = document.createElement('span');
      textSpan.className = opt.textClass;
      // insert as first child (so we don't break existing markup)
      el.insertBefore(textSpan, el.firstChild);
    }

    // cursor
    let cursorSpan = el.querySelector('.' + opt.cursorClass);
    if (opt.cursor && !cursorSpan) {
      cursorSpan = document.createElement('span');
      cursorSpan.className = opt.cursorClass;
      cursorSpan.setAttribute('aria-hidden', 'true');
      cursorSpan.textContent = opt.cursorChar;
      el.appendChild(cursorSpan);
    }

    // sr-only element for announcements (optional)
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
      let i = 0;      // index phrase
      let pos = 0;    // position character
      let deleting = false;

      const step = () => {
        if (stopFlag.stopped) {
          // cleanup optional
          if (cursorSpan) cursorSpan.remove();
          resolve();
          return;
        }

        const phrase = phrases[i] || '';
        // Update visible text
        if (!deleting) {
          pos = Math.min(pos + 1, phrase.length);
        } else {
          pos = Math.max(pos - 1, 0);
        }
        textSpan.textContent = phrase.slice(0, pos);

        // Message accessibility only at the end of the phrase (optional)
        if (!deleting && pos === phrase.length && opt.announceOnComplete) {
          sr.textContent = phrase;
        }

        if (!deleting && pos < phrase.length) {
          // continue typing
          const delay = opt.humanize ? randJitter(opt.typeSpeed) : opt.typeSpeed;
          setTimeout(step, delay);
          return;
        }

        if (!deleting && pos === phrase.length) {
          // pause at the end of the phrase, then start deleting
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
            // end
            if (cursorSpan) cursorSpan.remove();
            resolve();
            return;
          }
          // small pause before the next phrase
          setTimeout(step, Math.max(80, Math.floor(opt.pauseAfter / 3)));
          return;
        }
      };

      // start
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
