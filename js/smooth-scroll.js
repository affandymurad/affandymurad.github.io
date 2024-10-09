// Smooth scroll function
function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var headerOffset = 160; // Adjust this value based on your header height
  var elementPosition = targetElement.getBoundingClientRect().top;
  var offsetPosition = elementPosition + window.scrollY - headerOffset;
  var startPosition = window.scrollY;
  var distance = offsetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Function to toggle mobile menu
function toggleMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('nav ul');
  menuToggle.classList.toggle('active');
  nav.classList.toggle('show');
}

// Function to close mobile menu
function closeMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('nav ul');
  menuToggle.classList.remove('active');
  nav.classList.remove('show');
}

document.addEventListener('DOMContentLoaded', function () {
  var navLinks = document.querySelectorAll('nav a');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('nav ul');

  // Mobile menu toggle
  menuToggle.addEventListener('click', toggleMobileMenu);

  // Handle nav link clicks
  navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
          e.preventDefault();
          var target = this.getAttribute('href');
          
          // Close mobile menu
          closeMobileMenu();
          
          // Smooth scroll to target
          smoothScroll(target, 1000); // 1000ms animation duration
      });
  });

  // Collapse menu when resizing to desktop view
  window.addEventListener('resize', function() {
      if (window.innerWidth > 768) { // Adjust 768 to match your mobile breakpoint
          closeMobileMenu();
      }
  });
});