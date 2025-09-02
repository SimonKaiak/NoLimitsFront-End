// Carrusel mínimo y estable: SIN swipe, SIN autoplay. Solo flechas + dots.
// Formularios en modo demo.

// IIFE: aísla el scope y ejecuta el script de inmediato
(function () {
  const track   = document.querySelector('.carousel-track'); // Selecciona el contenedor que desplaza las slides
  if (!track) return;                                        // Si no existe el carrusel, termina para evitar errores

  const slides  = Array.from(track.children);                // Convierte los hijos (slides) en array
  const prevBtn = document.querySelector('.nav.prev');       // Botón flecha izquierda
  const nextBtn = document.querySelector('.nav.next');       // Botón flecha derecha
  const dots    = Array.from(document.querySelectorAll('.dot')); // Lista de indicadores (puntos)

  let index = 0; // 0=login, 1=registro, 2=soporte                        // Índice de la slide actual

  // Repinta el estado visual (posición del track + clases activas)
  function paint() {
    track.style.transform = `translateX(-${index * 100}%)`;  // Mueve el track en múltiplos de 100% según el índice
    slides.forEach((s, k) => s.classList.toggle('is-active', k === index)); // Marca slide activa
    dots.forEach((d, k)   => d.classList.toggle('is-active',   k === index)); // Marca dot activo
  }

  // Cambia a una slide específica (con wrap-around)
  function goTo(i) {
    index = (i + slides.length) % slides.length;             // Normaliza el índice (soporta negativos/overflow)
    paint();                                                 // Actualiza la UI
  }
  function next() { goTo(index + 1); }                       // Avanza a la siguiente slide
  function prev() { goTo(index - 1); }                       // Retrocede a la slide anterior

  // Botones
  nextBtn?.addEventListener('click', next);                  // Click en flecha derecha -> siguiente
  prevBtn?.addEventListener('click', prev);                  // Click en flecha izquierda -> anterior

  // Dots
  dots.forEach(d => d.addEventListener('click', e => {       // Click en un dot...
    const i = Number(e.currentTarget.dataset.index || 0);    // Lee el índice desde data-index (fallback 0)
    goTo(i);                                                 // Navega a esa slide
  }));

  // Teclado (opcional)
  window.addEventListener('keydown', e => {                  // Escucha teclas globalmente
    if (e.key === 'ArrowRight') next();                      // Flecha derecha -> siguiente
    if (e.key === 'ArrowLeft')  prev();                      // Flecha izquierda -> anterior
  });

  // ===== Formularios (demo) =====
  const formLogin = document.getElementById('formLogin');    // Form de login
  const msgLogin  = document.getElementById('msgLogin');     // Contenedor de mensajes de login

  formLogin?.addEventListener('submit', (e) => {             // Maneja submit del login
    e.preventDefault();                                      // Evita recarga de la página
    if (!formLogin.checkValidity()) {                        // Valida HTML5 (required, minlength, type, etc.)
      if (msgLogin) {                                        // Si hay área de mensaje...
        msgLogin.textContent = 'Completa correo y contraseña.'; // Mensaje de error
        msgLogin.className = 'msg err';                      // Aplica estilos de error
      }
      return;                                                // No continúa si es inválido
    }
    const data = Object.fromEntries(new FormData(formLogin).entries()); // Serializa datos del form a objeto
    console.log('Login:', data);                             // (Demo) Muestra datos en consola
    if (msgLogin) {                                          // Feedback de éxito
      msgLogin.textContent = '✅ Sesión iniciada (demo).';
      msgLogin.className = 'msg ok';
    }
    formLogin.reset();                                       // Limpia el formulario
  });

  const formReg = document.getElementById('formRegistro');   // Form de registro
  const msgReg  = document.getElementById('msgRegistro');    // Contenedor de mensajes de registro

  formReg?.addEventListener('submit', (e) => {               // Maneja submit del registro
    e.preventDefault();                                      // Evita recarga
    if (!formReg.checkValidity()) {                          // Valida HTML5
      if (msgReg) {                                          // Muestra error si falta algo
        msgReg.textContent = 'Completa los campos requeridos.';
        msgReg.className = 'msg err';
      }
      return;                                                // No continúa si es inválido
    }
    const data = Object.fromEntries(new FormData(formReg).entries()); // Serializa datos
    console.log('Registro:', data);                          // (Demo) Loggea datos
    if (msgReg) {                                            // Feedback de éxito
      msgReg.textContent = '✅ Usuario registrado (demo).';
      msgReg.className = 'msg ok';
    }
    formReg.reset();                                         // Limpia el formulario
  });

  // Inicio en slide 0 (login)
  goTo(0);                                                   // Posiciona el carrusel en la primera slide y pinta
})();
