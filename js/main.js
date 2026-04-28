/**
 * Atlas — main.js
 *
 * Minimal interaktivitet för prototypen:
 *   1. Hamburger-meny  (mobil)
 *   2. Flikbyte        (sekundära nyheter på startsidan)
 *   3. Feedback-rad    ("Var den här sidan till hjälp?")
 *
 * Alla widgets är progressiva: HTML/CSS visar startläget korrekt även
 * om denna fil aldrig laddas. JS lägger till interaktivitet ovanpå.
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. HAMBURGER-MENY
     ========================================================================== */

  function initMenuToggle() {
    var toggle = document.querySelector('.topbar__menu-toggle');
    var nav = document.getElementById('mainnav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      if (open) {
        nav.setAttribute('data-open', 'true');
      } else {
        nav.removeAttribute('data-open');
      }
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Stäng meny' : 'Öppna meny');
    }

    toggle.addEventListener('click', function () {
      var nowOpen = toggle.getAttribute('aria-expanded') !== 'true';
      setOpen(nowOpen);
    });

    // ESC stänger menyn och fokus tillbaka till knappen
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });

    // Stäng vid klick på en länk i menyn (användaren navigerar vidare)
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Stäng om viewport växer förbi mobil-brytpunkten
    var mql = window.matchMedia('(min-width: 769px)');
    var handleResize = function (e) { if (e.matches) setOpen(false); };
    if (mql.addEventListener) {
      mql.addEventListener('change', handleResize);
    } else if (mql.addListener) {
      mql.addListener(handleResize); // Safari < 14
    }
  }


  /* ==========================================================================
     2. FLIKBYTE
     Följer ARIA Authoring Practices Pattern för "Tabs with Manual Activation":
       - Pil-höger / pil-vänster flyttar fokus och aktiverar
       - Home / End hoppar till första / sista
       - Klick aktiverar omedelbart
     ========================================================================== */

  function initTabs() {
    var tablists = document.querySelectorAll('[role="tablist"]');
    Array.prototype.forEach.call(tablists, function (tablist) {
      var tabs = Array.prototype.slice.call(tablist.querySelectorAll('[role="tab"]'));
      if (!tabs.length) return;

      function selectTab(tab, focus) {
        tabs.forEach(function (t) {
          var selected = (t === tab);
          t.setAttribute('aria-selected', String(selected));
          t.setAttribute('tabindex', selected ? '0' : '-1');

          var panelId = t.getAttribute('aria-controls');
          var panel = panelId ? document.getElementById(panelId) : null;
          if (!panel) return;

          panel.setAttribute('data-active', selected ? 'true' : 'false');
          if (selected) {
            panel.removeAttribute('hidden');
          } else {
            panel.setAttribute('hidden', '');
          }
        });

        if (focus && tab) tab.focus();
      }

      tablist.addEventListener('click', function (e) {
        var t = e.target.closest('[role="tab"]');
        if (t && tabs.indexOf(t) !== -1) selectTab(t, false);
      });

      tablist.addEventListener('keydown', function (e) {
        var current = document.activeElement;
        var i = tabs.indexOf(current);
        if (i < 0) return;

        var next = null;
        switch (e.key) {
          case 'ArrowRight': next = (i + 1) % tabs.length; break;
          case 'ArrowLeft':  next = (i - 1 + tabs.length) % tabs.length; break;
          case 'Home':       next = 0; break;
          case 'End':        next = tabs.length - 1; break;
          default: return;
        }
        e.preventDefault();
        selectTab(tabs[next], true);
      });
    });
  }


  /* ==========================================================================
     3. FEEDBACK-RAD
     States på .page-feedback:
       data-state="initial"  → visa Ja/Nej-knappar
       data-state="form"     → visa textareal (efter Nej)
       data-state="thanked"  → visa tack-meddelande
     ========================================================================== */

  function initFeedback() {
    var box = document.querySelector('.page-feedback');
    if (!box) return;

    var yesBtn = box.querySelector('[data-feedback="yes"]');
    var noBtn  = box.querySelector('[data-feedback="no"]');
    var form   = box.querySelector('.feedback-form');
    var ta     = form ? form.querySelector('textarea') : null;
    var thanks = box.querySelector('.feedback-thanks');

    function setState(state) {
      box.setAttribute('data-state', state);
      if (state === 'thanked' && thanks) {
        // Skärmläsare uppmärksammas via role="status" i markup
        thanks.focus && thanks.focus();
      }
    }

    if (yesBtn) yesBtn.addEventListener('click', function () { setState('thanked'); });

    if (noBtn) noBtn.addEventListener('click', function () {
      setState('form');
      if (ta) {
        // Vänta en frame så elementet hunnit bli synligt innan focus()
        requestAnimationFrame(function () { ta.focus(); });
      }
    });

    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      setState('thanked');
    });
  }


  /* ==========================================================================
     INIT
     ========================================================================== */

  function init() {
    initMenuToggle();
    initTabs();
    initFeedback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
