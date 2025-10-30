// Flip cards setup and success content sync

function updateSuccessCards() {
  try {
    var c1 = document.getElementById('success-case1');
    var c2 = document.getElementById('success-case2');
    if (c1) {
      var t1 = document.querySelectorAll('.success-content[data-key="success-case1"]');
      t1.forEach(function(n){ n.innerHTML = c1.innerHTML; });
    }
    if (c2) {
      var t2 = document.querySelectorAll('.success-content[data-key="success-case2"]');
      t2.forEach(function(n){ n.innerHTML = c2.innerHTML; });
    }
  } catch (e) {}
}

function getHint(lang) {
  var isTouch = (('ontouchstart' in window) || navigator.maxTouchPoints > 0);
  if (lang === 'en') return isTouch ? 'Tap to see details' : 'Click to see details';
  return isTouch ? 'Toca para ver detalles' : 'Click para ver detalles';
}

function applySuccessTranslations(lang) {
  try {
    if (typeof translations !== 'undefined' && translations[lang]) {
      var t = translations[lang];
      var st = document.getElementById('success-title');
      var si = document.getElementById('success-intro');
      var sc1 = document.getElementById('success-case1');
      var sc2 = document.getElementById('success-case2');
      if (st && t.successtitle) st.innerHTML = t.successtitle;
      if (si && t.successIntro) si.innerHTML = t.successIntro;
      if (sc1 && t.successCase1) sc1.innerHTML = t.successCase1;
      if (sc2 && t.successCase2) sc2.innerHTML = t.successCase2;
    } else {
      if (lang === 'en') {
        var stE = document.getElementById('success-title');
        var siE = document.getElementById('success-intro');
        if (stE) stE.textContent = 'Success Stories';
        if (siE) siE.textContent = 'Some of our success stories:';
      }
    }
  } catch (e) {}
  try { updateSuccessCards(); } catch (e) {}
  try {
    var hintText = getHint(lang);
    document.querySelectorAll('.flip-hint').forEach(function(el){ el.textContent = hintText; });
  } catch (e) {}
}

document.addEventListener('DOMContentLoaded', function(){
  // Flip interaction (click and keyboard)
  var cards = document.querySelectorAll('.flip-card');
  cards.forEach(function(card){
    var toggle = function(){ card.classList.toggle('is-flipped'); };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });

  // Inicializar contenido y hint (ES por defecto)
  applySuccessTranslations('es');
});

// Ensure language switching refreshes card content
(function(){
  if (typeof window.setLanguage === 'function') {
    var _orig = window.setLanguage;
    window.setLanguage = function(lang){
      _orig(lang);
      applySuccessTranslations(lang);
    };
  }
})();
