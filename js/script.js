// ===================================
// Navigation Functionality
// ===================================

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Add scrolled class to navbar on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// ===================================
// Active Navigation Link
// ===================================

const sections = document.querySelectorAll('.section');

function updateActiveLink() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// ===================================
// Smooth Scrolling
// ===================================

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// Typing Effect for Hero Subtitle
// ===================================

const typedTextElement = document.getElementById('typedText');
const textArray = [
  'Full Stack Developer',
  'Frontend Specialist',
  'Backend Engineer',
  'Problem Solver'
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 50;
let newTextDelay = 2000;

function type() {
  const currentText = textArray[textArrayIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = erasingDelay;
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    // Pause at end of text
    typingDelay = newTextDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    typingDelay = 500;
  }

  setTimeout(type, typingDelay);
}

// Start typing effect after page load
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000);
});

// ===================================
// Animated Background Particles
// ===================================

const heroBg = document.getElementById('heroBg');
const particleCount = 30;

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Random animation delay and duration
    particle.style.animationDelay = `${Math.random() * 20}s`;
    particle.style.animationDuration = `${15 + Math.random() * 10}s`;

    // Random size
    const size = 2 + Math.random() * 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random opacity
    particle.style.opacity = `${0.2 + Math.random() * 0.5}`;

    heroBg.appendChild(particle);
  }
}

createParticles();

// ===================================
// Scroll Animations
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(element => {
  observer.observe(element);
});

// Staggered animation for project cards
const staggerElements = document.querySelectorAll('.stagger-in');
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100); // Stagger delay
    }
  });
}, observerOptions);

staggerElements.forEach(element => {
  staggerObserver.observe(element);
});

// ===================================
// Animated Counter for Stats
// ===================================

function animateValue(element, start, end, duration, suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// Observe highlight cards for counter animation
const highlightCards = document.querySelectorAll('.highlight-number');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      entry.target.classList.add('counted');
      const text = entry.target.textContent;
      const hasPlusSign = text.includes('+');
      const number = parseInt(text.replace('+', ''));
      const suffix = hasPlusSign ? '+' : '';
      animateValue(entry.target, 0, number, 2000, suffix);
    }
  });
}, { threshold: 0.5 });

highlightCards.forEach(card => {
  counterObserver.observe(card);
});

// ===================================
// Add Hover Effect to Skills
// ===================================

const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.05) rotate(2deg)';
  });

  tag.addEventListener('mouseleave', function () {
    this.style.transform = 'scale(1) rotate(0deg)';
  });
});

// ===================================
// Project Card Interactions
// ===================================

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-12px) scale(1.02)';
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// ===================================
// Contact Card Animations
// ===================================

const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// ===================================
// Social Links Hover Effects
// ===================================

const socialLinks = document.querySelectorAll('.social-link');
// GitHub: #333, LinkedIn: #0077b5, Instagram: #E4405F, CodePen: #000000
const socialColors = ['#333333', '#0077b5', '#E4405F', '#000000'];

socialLinks.forEach((link, index) => {
  link.addEventListener('mouseenter', function () {
    this.style.background = socialColors[index % socialColors.length];
    this.style.borderColor = socialColors[index % socialColors.length];
    this.style.transform = 'translateY(-8px) scale(1.1) rotate(5deg)';
    this.style.color = 'white';

    // Also change SVG stroke color
    const svg = this.querySelector('svg');
    if (svg) {
      svg.style.stroke = 'white';
    }
  });

  link.addEventListener('mouseleave', function () {
    this.style.background = 'var(--glass-bg)';
    this.style.borderColor = 'var(--glass-border)';
    this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    this.style.color = 'var(--color-text-primary)';

    // Reset SVG stroke color
    const svg = this.querySelector('svg');
    if (svg) {
      svg.style.stroke = 'currentColor';
    }
  });
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(updateActiveLink, 50));

// ===================================
// Initialize on Page Load
// ===================================

window.addEventListener('load', () => {
  // Add loaded class to body for any CSS animations
  document.body.classList.add('loaded');

  // Update active navigation link
  updateActiveLink();

  // Log to console
  console.log('%c Portfolio Website Loaded! 🚀', 'color: #6366f1; font-size: 20px; font-weight: bold;');
  console.log('%c Built with ❤️ and JavaScript', 'color: #8b5cf6; font-size: 14px;');
});

// ===================================
// Samsung Number Button Sound Effect
// ===================================

const contactBtn = document.getElementById('contactBtn');
const samsungAudio = document.getElementById('samsungAudio');

contactBtn.addEventListener('click', function (e) {
  // Try to play the audio file first
  if (samsungAudio) {
    samsungAudio.currentTime = 0; // Reset to start
    samsungAudio.play().catch(() => {
      // If audio file doesn't exist or fails, use Web Speech API as fallback
      playTextToSpeech();
    });
  } else {
    // Fallback to Web Speech API
    playTextToSpeech();
  }
});

// Text-to-Speech fallback function
function playTextToSpeech() {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance('Yeh mera Samsung ka number hai');
    utterance.lang = 'hi-IN'; // Hindi
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to get a Hindi voice
    const voices = speechSynthesis.getVoices();
    const hindiVoice = voices.find(voice => voice.lang.includes('hi'));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }

    speechSynthesis.speak(utterance);
  }
}

// Easter egg for developers viewing the console
console.log(`
  ___          _    __      _ _       
 | _ \\___  _ _| |_ / _|___ | (_) ___  
 |  _/ _ \\| '_|  _|  _/ _ \\| | |/ _ \\ 
 |_| \\___/|_|  \\__|_| \\___/|_|_|\\___/ 
                                       
 Thanks for checking out my portfolio!
 Feel free to reach out if you'd like to collaborate.
`);
