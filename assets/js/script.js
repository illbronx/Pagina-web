'use strict';


const inputNombre = document.getElementById('nombre');
const btnSaludar = document.getElementById('btnSaludar');
const pMensaje = document.getElementById('mensaje');


const switchTema = document.getElementById('switchTema');
const palette = document.getElementById('palette');

function saludar(nombre) {
  const limpio = String(nombre ?? '').trim();
  if (limpio.length === 0) {
    pMensaje.textContent = 'Por favor, ingresa tu nombre 🙏';
    pMensaje.setAttribute('data-state', 'warning');
    return;
  }
  pMensaje.textContent = `¡Hola, ${limpio}! Bienvenida/o a mi pagina web 🌎`;
  pMensaje.setAttribute('data-state', 'ok');
}


btnSaludar?.addEventListener('click', () => saludar(inputNombre?.value));
inputNombre?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') saludar(inputNombre.value);
});


function aplicarTemaOscuro(activo) {
  document.body.classList.toggle('oscuro', !!activo);
  document.documentElement.setAttribute('data-bs-theme', activo ? 'dark' : 'light');
  if (switchTema) switchTema.checked = !!activo;
}


(function initTema() {
  const guardado = localStorage.getItem('tema-oscuro');
  if (guardado === 'true') aplicarTemaOscuro(true);
})();

switchTema?.addEventListener('change', (e) => {
  const oscuro = e.target.checked;
  aplicarTemaOscuro(oscuro);
  localStorage.setItem('tema-oscuro', oscuro ? 'true' : 'false');
});


function setBrandOverride(hex) {
  document.documentElement.style.setProperty('--brand-override', hex);
  localStorage.setItem('brand-override', hex);
}
function clearBrandOverride() {
  document.documentElement.style.removeProperty('--brand-override');
  localStorage.removeItem('brand-override');
}


(function migrateOldKey() {
  const legacy = localStorage.getItem('brand-color');
  if (legacy) {
    localStorage.removeItem('brand-color');
    setBrandOverride(legacy);
  }
})();


(function initBrand() {
  const saved = localStorage.getItem('brand-override');
  if (saved) document.documentElement.style.setProperty('--brand-override', saved);
})();


palette?.addEventListener('click', (e) => {
  const btn = e.target.closest('.swatch');
  if (!btn) return;
  const color = btn.getAttribute('data-color');

  if (!color) return;

  if (color === 'reset') {

    clearBrandOverride();
  } else {

    setBrandOverride(color);
  }
});



