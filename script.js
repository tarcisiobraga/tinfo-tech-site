/* ==========================================================
   MENU MOBILE
========================================================== */
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");

  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.querySelector("i").classList.remove("fa-times");
    menuToggle.querySelector("i").classList.add("fa-bars");
  });
});

/* ==========================================================
   ROLAGEM SUAVE ENTRE SEÇÕES
========================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const destino = document.querySelector(this.getAttribute("href"));
    if (destino) destino.scrollIntoView({ behavior: "smooth" });
  });
});

/* ==========================================================
   TEMA CLARO/ESCURO
========================================================== */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Carrega o tema salvo
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  const isLight = body.classList.contains("light-theme");

  // Atualiza ícone
  themeToggle.innerHTML = isLight
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';

  // Salva preferência
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

/* ==========================================================
   FUNDO DE PARTÍCULAS (Canvas Animado)
========================================================== */
const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

let particles = [];
const numParticles = 100; // número de partículas
let w, h;

// Redimensiona o canvas ao tamanho da janela
function resizeCanvas() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Criação das partículas
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.8;
    this.speedY = (Math.random() - 0.5) * 0.8;
    this.color = "rgba(0, 200, 150, 0.6)";
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Mantém dentro da tela
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

// Inicializa as partículas
for (let i = 0; i < numParticles; i++) {
  particles.push(new Particle());
}

// Ligações entre partículas próximas
function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = `rgba(0, 200, 150, ${1 - dist / 120})`;
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

// Animação principal
function animate() {
  ctx.clearRect(0, 0, w, h);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  connectParticles();
  requestAnimationFrame(animate);
}

animate();
