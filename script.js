// ===== 1. MENÚ MÓVIL =====
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== 2. MODO CLARO / OSCURO =====
const themeBtn = document.getElementById('theme-btn');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeBtn.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===== 3. EFECTO TYPING =====
const words = ['Desarrollador Frontend 💻', 'Diseñador CSS 🎨', 'Programador JS ⚡', 'Freelancer 🚀'];
const typedEl = document.getElementById('typed-text');
let wordIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  const word = words[wordIndex];
  typedEl.textContent = word.substring(0, charIndex);

  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeEffect, 80);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 40);
  } else {
    deleting = !deleting;
    if (!deleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, deleting ? 1000 : 400);
  }
}
typeEffect();

// ===== 4. ANIMACIÓN SCROLL (IntersectionObserver) =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animar barras de habilidades
      const fills = entry.target.querySelectorAll('.skill-fill');
      fills.forEach(fill => {
        fill.style.width = fill.dataset.level + '%';
      });
      if (entry.target.classList.contains('skill-card')) {
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) fill.style.width = fill.dataset.level + '%';
      }
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== 5. CONTADORES ANIMADOS =====
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.counter;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { el.textContent = target + '+'; clearInterval(timer); }
        else el.textContent = current;
      }, 50);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

// ===== 6. NAV ACTIVO POR SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });

  // Botón volver arriba
  document.getElementById('back-top').classList.toggle('show', scrollY > 500);
});

// ===== 7. FILTRO DE PROYECTOS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hide', !match);
      if (match) {
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = 'fadeIn 0.4s ease';
      }
    });
  });
});

// Animación fadeIn para filtros
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity:0; transform:scale(.95);} to { opacity:1; transform:scale(1);} }';
document.head.appendChild(style);

// ===== 8. VALIDACIÓN FORMULARIO =====
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

function setError(input, message) {
  const group = input.parentElement;
  const small = group.querySelector('.error-msg');
  if (message) {
    group.classList.add('error');
    small.textContent = message;
  } else {
    group.classList.remove('error');
    small.textContent = '';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const nombre = document.getElementById('nombre');
  const email = document.getElementById('email');
  const asunto = document.getElementById('asunto');
  const mensaje = document.getElementById('mensaje');

  if (nombre.value.trim().length < 3) { setError(nombre, 'El nombre debe tener al menos 3 caracteres'); valid = false; }
  else setError(nombre, '');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) { setError(email, 'Ingresa un email válido'); valid = false; }
  else setError(email, '');

  if (asunto.value.trim().length < 3) { setError(asunto, 'El asunto es requerido'); valid = false; }
  else setError(asunto, '');

  if (mensaje.value.trim().length < 10) { setError(mensaje, 'El mensaje debe tener al menos 10 caracteres'); valid = false; }
  else setError(mensaje, '');

  if (valid) {
    successMsg.classList.add('show');
    form.reset();
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }
});

// Validación en tiempo real
['nombre', 'email', 'asunto', 'mensaje'].forEach(id => {
  document.getElementById(id).addEventListener('input', (e) => setError(e.target, ''));
});

// ===== 9. AÑO DINÁMICO + BOTÓN CV =====
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('btn-cv').addEventListener('click', (e) => {
  e.preventDefault();
  alert('📄 Aquí puedes enlazar tu CV en PDF. Ej: href="mi-cv.pdf"');
});

// ===== 10. HEADER CON SOMBRA AL SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,0.3)' : 'none';
});

console.log('%c👋 ¡Hola! ¿Revisando mi código? ¡Hablemos! 📧 hola@email.com', 'font-size:14px; color:#22d3ee;');
