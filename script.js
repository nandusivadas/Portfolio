/* 
  ========================================================================
  SCRIPT.JS - NANDU SIVADAS CLOUD & DEVOPS PORTFOLIO
  ========================================================================
  Author: Nandu Sivadas
  Description: Custom JavaScript providing dynamic typing animations,
               scroll reveal effects, navbar interaction, and form validation.
  ========================================================================
*/

// Wait for the DOM content to fully load before executing scripts
document.addEventListener('DOMContentLoaded', function () {

  // ========================================================================
  // STEP 1: TYPING TEXT CAROUSEL ANIMATION
  // ========================================================================
  /*
    Loops through an array of key technical roles, dynamically typing
    and backspacing each phrase inside the hero text element.
  */
  const typingElement = document.getElementById('typing-text');
  
  // Array of phrases to cycle through
  const roles = [
    "AWS Cloud Infrastructure",
    "Ansible Playbook Automation",
    "Linux Administration (RHEL)",
    "CI/CD & Docker Containers",
    "Infrastructure Troubleshooting"
  ];

  let roleIndex = 0;      // Index of current phrase in roles array
  let charIndex = 0;      // Index of current character being typed
  let isDeleting = false; // Flag to check if text is currently backspacing
  const typingSpeed = 100; // Speed of typing in ms
  const eraseSpeed = 50;   // Speed of erasing in ms
  const pauseTime = 1800;  // Pause time before backspacing in ms

  function typeEffect() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      // Remove one character
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add next character
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    // Determine timing for next frame
    let timeoutDelay = isDeleting ? eraseSpeed : typingSpeed;

    // If word is completely typed, pause then set deleting flag
    if (!isDeleting && charIndex === currentRole.length) {
      timeoutDelay = pauseTime;
      isDeleting = true;
    } 
    // If word is completely erased, switch to next role in array
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      timeoutDelay = 400; // Brief pause before typing next word
    }

    setTimeout(typeEffect, timeoutDelay);
  }

  // Start the typing animation loop if element exists
  if (typingElement) {
    typeEffect();
  }


  // ========================================================================
  // STEP 2: SCROLL REVEAL ANIMATION (Intersection Observer)
  // ========================================================================
  /*
    Monitors elements with class '.reveal' and adds class '.active'
    when they scroll into the viewport, triggering smooth fade-in transitions.
  */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, unobserve to optimize performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15 // Trigger when 15% of element is visible
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // ========================================================================
  // STEP 3: NAVBAR SCROLL SHADOW & GLASS EFFECT
  // ========================================================================
  /*
    Adds an extra subtle shadow and darker opacity to the fixed navbar when scrolled down.
  */
  const navbar = document.getElementById('mainNavbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-lg');
    } else {
      navbar.classList.remove('shadow-lg');
    }
  });


  // ========================================================================
  // STEP 4: CONTACT FORM VALIDATION & SUBMISSION
  // ========================================================================
  /*
    Handles client-side form validation using Bootstrap 5 custom validation styles,
    prevents default page reloads, and displays a confirmation success alert.
  */
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Stop default form submit behavior
      event.stopPropagation();

      // Check if all fields satisfy HTML5 validation rules
      if (contactForm.checkValidity()) {
        // Show success alert message
        if (formAlert) {
          formAlert.classList.remove('d-none');
          formAlert.classList.add('animate__animated', 'animate__fadeIn');
        }

        // Reset the form fields
        contactForm.reset();
        contactForm.classList.remove('was-validated');

        // Automatically hide alert message after 5 seconds
        setTimeout(() => {
          if (formAlert) {
            formAlert.classList.add('d-none');
          }
        }, 5000);

      } else {
        // Add Bootstrap validation styling class
        contactForm.classList.add('was-validated');
      }
    }, false);
  }

});
