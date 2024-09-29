// Smooth scroll function
function smoothScroll(target, duration) {
    var targetElement = document.querySelector(target);
    var headerOffset = 60; // Adjust this value based on your header height
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
  
  // Add event listeners to navigation items
  document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var target = this.getAttribute('href');
        smoothScroll(target, 1000); // 1000ms animation duration
      });
    });
  });