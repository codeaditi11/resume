// DOM Elements
const themeButton = document.getElementById('theme-button');
const printButton = document.getElementById('print-button');
const body = document.body;

// Theme toggle functionality
function initThemeToggle() {
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    enableDarkMode();
  }
  
  // Theme toggle event listener
  themeButton.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  if (body.classList.contains('dark-theme')) {
    enableLightMode();
  } else {
    enableDarkMode();
  }
}

function enableDarkMode() {
  body.classList.add('dark-theme');
  themeButton.innerHTML = '<i class="fas fa-sun"></i>';
  localStorage.setItem('theme', 'dark');
}

function enableLightMode() {
  body.classList.remove('dark-theme');
  themeButton.innerHTML = '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', 'light');
}

// Print functionality
function initPrintButton() {
  printButton.addEventListener('click', () => {
    window.print();
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initPrintButton();
  initResponsiveLayout();
});

// Handle responsive layout
function initResponsiveLayout() {
  const sections = document.querySelectorAll('.section');
  const container = document.querySelector('.container');
  
  // Only apply grid layout if screen is large enough
  function adjustLayout() {
    if (window.innerWidth >= 1200) {
      container.classList.add('grid-layout');
      
      // Ensure content is fully loaded before applying grid
      setTimeout(() => {
        container.style.opacity = '1';
      }, 100);
    } else {
      container.classList.remove('grid-layout');
      container.style.opacity = '1';
    }
  }
  
  adjustLayout();
  window.addEventListener('resize', adjustLayout);
  
  // Add intersection observer for scroll animations
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
      section.classList.add('hidden-section');
      observer.observe(section);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    sections.forEach(section => {
      section.classList.add('visible');
    });
  }
}

// Enhance links with target="_blank" and rel="noopener noreferrer"
function enhanceLinks() {
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach(link => {
    // Only add attributes if they don't already exist
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
    }
    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// Call enhanceLinks after DOM is loaded
document.addEventListener('DOMContentLoaded', enhanceLinks);

// Handle visibility changes
document.addEventListener('visibilitychange', function() {
  if (document.visibilityState === 'visible') {
    document.title = 'Yajat Krishnan - Resume';
  } else {
    document.title = 'Come back to resume! 📝';
  }
});