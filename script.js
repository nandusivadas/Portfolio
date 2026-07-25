/* 
  ========================================================================
  SCRIPT.JS (OPTION 2) - NANDU SIVADAS CLOUD & DEVOPS PORTFOLIO
  ========================================================================
  Author: Nandu Sivadas
  Description: Custom JavaScript logic for typing animation, form validation,
               and smooth navigation.
  ========================================================================
*/

document.addEventListener('DOMContentLoaded', function () {

  // ========================================================================
  // STEP 1: TYPING CAROUSEL ANIMATION
  // ========================================================================
  /*
    Types out technical specializations character by character in the Hero section.
  */
  const typingElement = document.getElementById('typing-text');
  
  const roles = [
    "AWS Cloud Infrastructure",
    "Ansible Automation",
    "Linux Administration (RHEL)",
    "CI/CD & Docker Containers"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const eraseSpeed = 45;
  const pauseTime = 1600;

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
      delay = 300;
    }

    setTimeout(typeEffect, delay);
  }

  if (typingElement) {
    typeEffect();
  }


  // ========================================================================
  // STEP 2: CONTACT FORM VALIDATION & SUBMISSION
  // ========================================================================
  /*
    Validates user input fields, prevents default submit, and displays confirmation.
  */
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
