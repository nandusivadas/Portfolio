/* 
  ========================================================================
  SCRIPT.JS - NANDU SIVADAS CLOUD & DEVOPS PORTFOLIO
  ========================================================================
  Features:
  - Typing Animation Carousels (Hero Role and Focus Line)
  - Ambient Cloud Network Node Canvas Background Animation
  - Ultra-Smooth 3D GPU-Accelerated Scroll Reveal Observer (reveal-fade-up, reveal-slide-left, reveal-slide-right, reveal-scale-up)
  - Client-side Form Validation & Interactive Alert
  - Step-by-step educational comments throughout JavaScript code
  ========================================================================
*/

document.addEventListener('DOMContentLoaded', function () {

  // ========================================================================
  // STEP 1: TYPING ANIMATION CAROUSELS
  // ========================================================================
  function startTypingAnimation(element, roles) {
    if (!element) return;

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const eraseSpeed = 50;
    const pauseTime = 1800;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        element.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        element.textContent = currentRole.substring(0, charIndex + 1);
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

    typeEffect();
  }

  const heroRoleElement = document.getElementById('hero-role-text');
  if (heroRoleElement) {
    startTypingAnimation(heroRoleElement, heroRoleElement.dataset.roles.split('|'));
  }
  startTypingAnimation(document.getElementById('typing-text'), [
    'Cloud Infrastructure',
    'Linux Administration',
    'DevOps Automation'
  ]);


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
  // STEP 4: EXPANDABLE PROJECT SHOWCASE
  // ========================================================================
  const projectToggles = document.querySelectorAll('#projects .project-toggle');

  projectToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
      const showcase = toggle.closest('.project-showcase');
      const details = document.getElementById(toggle.getAttribute('aria-controls'));
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';

      projectToggles.forEach(otherToggle => {
        const otherShowcase = otherToggle.closest('.project-showcase');
        const otherDetails = document.getElementById(otherToggle.getAttribute('aria-controls'));
        otherToggle.setAttribute('aria-expanded', 'false');
        otherShowcase.classList.remove('is-open');
        if (otherDetails) otherDetails.hidden = true;
      });

      if (!isOpen) {
        toggle.setAttribute('aria-expanded', 'true');
        showcase.classList.add('is-open');
        if (details) details.hidden = false;
      }
    });
  });

  // ========================================================================
  // STEP 5: SAFE PORTFOLIO TERMINAL
  // ========================================================================
  const terminalForm = document.getElementById('terminal-form');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-command');

  if (terminalForm && terminalOutput && terminalInput) {
    const commandHistory = [];
    let historyIndex = 0;
    const terminalProjects = [
      '1. RHCE Capstone         -> Enterprise Linux + Ansible + AWS',
      '2. WordPress Deployment  -> Ansible + Nginx + PHP + MariaDB',
      '3. Multi-Region AWS      -> Ansible automation + disaster recovery',
      '4. Astra Linux Recovery -> GRUB + initramfs troubleshooting'
    ];

    function addTerminalLine(text, className) {
      const line = document.createElement('p');
      if (className) line.className = className;
      line.textContent = text;
      terminalOutput.appendChild(line);
    }

    function runTerminalCommand(rawCommand) {
      const command = rawCommand.trim().toLowerCase().replace(/\s+/g, ' ');
      if (!command) return;

      addTerminalLine(`nandu@cloud:~$ ${rawCommand.trim()}`, 'terminal-command-line');

      switch (command) {
        case 'help':
          addTerminalLine('Available commands:');
          addTerminalLine('  about         — About Nandu');
          addTerminalLine('  skills        — Linux, AWS, Ansible, containers, and monitoring');
          addTerminalLine('  projects      — View featured projects');
          addTerminalLine('  aws           — AWS services and infrastructure experience');
          addTerminalLine('  sudo hire-me  — Get in touch');
          addTerminalLine('  clear         — Clear the terminal');
          break;
        case 'about':
          addTerminalLine('Nandu Sivadas — Cloud & DevOps professional.');
          addTerminalLine('RHCSA-certified, with hands-on experience in Linux administration, AWS, and infrastructure automation.');
          break;
        case 'skills':
          addTerminalLine('Linux: RHEL, system administration, SELinux, systemd');
          addTerminalLine('Cloud & IaC: AWS (EC2, VPC, IAM, Route 53), Ansible, Terraform');
          addTerminalLine('Containers & reliability: Docker, Prometheus, Grafana');
          addTerminalLine('Scripting & DevOps: Python, Bash, Git, CI/CD fundamentals');
          break;
        case 'projects':
          terminalProjects.forEach(project => addTerminalLine(project));
          break;
        case 'aws':
          addTerminalLine('AWS experience: EC2, VPC, IAM, ALB, Route 53, and multi-region infrastructure.');
          addTerminalLine('Automation with Ansible; project work includes repeatable deployments and disaster recovery.');
          break;
        case 'sudo hire-me': {
          addTerminalLine('Access granted (simulated). Let’s talk:');
          const contactLink = document.createElement('a');
          contactLink.href = 'mailto:nandusivadas98@gmail.com?subject=Portfolio%20inquiry';
          contactLink.className = 'terminal-email-link';
          contactLink.textContent = 'Email Nandu';
          terminalOutput.appendChild(contactLink);
          break;
        }
        case 'clear':
          terminalOutput.replaceChildren();
          break;
        default:
          addTerminalLine(`command not found: ${command}. Type "help" to see available commands.`, 'terminal-error');
      }

      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    terminalForm.addEventListener('submit', event => {
      event.preventDefault();
      const command = terminalInput.value;
      if (!command.trim()) return;

      if (command.trim().toLowerCase() !== 'clear') {
        commandHistory.push(command);
      }
      historyIndex = commandHistory.length;
      runTerminalCommand(command);
      terminalInput.value = '';
      terminalInput.focus();
    });

    terminalInput.addEventListener('keydown', event => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (historyIndex > 0) historyIndex--;
        terminalInput.value = commandHistory[historyIndex] || '';
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (historyIndex < commandHistory.length) historyIndex++;
        terminalInput.value = commandHistory[historyIndex] || '';
      }
    });

    document.querySelectorAll('[data-terminal-command]').forEach(button => {
      button.addEventListener('click', () => {
        const command = button.getAttribute('data-terminal-command');
        terminalInput.value = command;
        terminalForm.requestSubmit();
        terminalInput.focus();
      });
    });
  }


  // ========================================================================
  // STEP 6: CONTACT FORM VALIDATION
  // ========================================================================
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (contactForm.checkValidity()) {
        const formData = new FormData(contactForm);
        const senderName = formData.get('name');
        const senderEmail = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        const body = `Name: ${senderName}\nEmail: ${senderEmail}\n\n${message}`;
        const emailUrl = `mailto:nandusivadas98@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        const emailDraftLink = document.getElementById('emailDraftLink');

        if (emailDraftLink) {
          emailDraftLink.href = emailUrl;
        }
        if (formAlert) {
          formAlert.classList.remove('d-none');
        }

        window.location.href = emailUrl;

      } else {
        contactForm.classList.add('was-validated');
      }
    });
  }

});
