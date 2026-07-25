/* 
  ========================================================================
  SCRIPT.JS - NANDU SIVADAS CLOUD & DEVOPS PORTFOLIO
  ========================================================================
  Features:
  - Typing Animation Carousel (Focus Line: Cloud Infrastructure | Linux | DevOps Automation)
  - Ambient Cloud Network Node Canvas Background Animation
  - Ultra-Smooth 3D GPU-Accelerated Scroll Reveal Observer (reveal-fade-up, reveal-slide-left, reveal-slide-right, reveal-scale-up)
  - Client-side Form Validation & Interactive Alert
  - Step-by-step educational comments throughout JavaScript code
  ========================================================================
*/

document.addEventListener('DOMContentLoaded', function () {

  // ========================================================================
  // STEP 1: TYPING ANIMATION CAROUSEL
  // ========================================================================
  const typingElement = document.getElementById('typing-text');
  
  const roles = [
    "Cloud Infrastructure",
    "Linux Administration",
    "DevOps Automation"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const eraseSpeed = 50;
  const pauseTime = 1800;

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? eraseSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(typeEffect, delay);
  }

  if (typingElement) {
    typeEffect();
  }


  // ========================================================================
  // STEP 2: AMBIENT CLOUD NETWORK NODE CANVAS ANIMATION
  // ========================================================================
  const canvas = document.getElementById('cloudBgCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 45);

    class NodeParticle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00f2fe';
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new NodeParticle());
    }

    function animateNetwork() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - distance / 140)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateNetwork);
    }

    animateNetwork();

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }


  // ========================================================================
  // STEP 3: ULTRA-SMOOTH 3D SCROLL REVEAL OBSERVER
  // ========================================================================
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale-up');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ========================================================================
  // STEP 4: CONTACT FORM VALIDATION
  // ========================================================================
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (contactForm.checkValidity()) {
        if (formAlert) {
          formAlert.classList.remove('d-none');
        }

        contactForm.reset();
        contactForm.classList.remove('was-validated');

        setTimeout(() => {
          if (formAlert) {
            formAlert.classList.add('d-none');
          }
        }, 5000);

      } else {
        contactForm.classList.add('was-validated');
      }
    });
  }

});
