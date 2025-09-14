// Theme Toggle Functionality
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

// Update theme toggle icon
function updateThemeIcon() {
  const icon = themeToggle.querySelector("i");
  if (body.getAttribute("data-theme") === "dark") {
    icon.className = "fas fa-sun"; // Sun icon for dark theme
  } else {
    icon.className = "fas fa-moon"; // Moon icon for light theme
  }
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon();
});

// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Smooth Scrolling for Navigation Links
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100; // Offset for fixed navbar
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") && link.getAttribute("href").includes(current)) { // Check for hash in href
      link.classList.add("active");
    }
  });
}

// Navbar scroll effect
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)"; // Added shadow on scroll
    if (body.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(17, 24, 39, 0.98)";
      navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    }
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "none"; // Remove shadow when at top
    if (body.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(17, 24, 39, 0.95)";
      navbar.style.boxShadow = "none";
    }
  }
}

// Service Card Toggle Functionality
function toggleService(button) {
  const serviceCard = button.closest(".service-card");
  const content = serviceCard.querySelector(".service-content");
  const icon = button.querySelector("i");

  // Close all other service cards
  document.querySelectorAll(".service-content").forEach((otherContent) => {
    if (otherContent !== content) {
      otherContent.classList.remove("expanded");
      const otherIcon = otherContent.parentElement.querySelector(".expand-btn i");
      if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
    }
  });

  // Toggle current service card
  content.classList.toggle("expanded");

  if (content.classList.contains("expanded")) {
    icon.style.transform = "rotate(180deg)";
  } else {
    icon.style.transform = "rotate(0deg)";
  }
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => { // Changed to async to handle fetch
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simple form validation - relying more on enhanceFormValidation
        if (!data.name || !data.email || !data.service || !data.message) {
            alert("Please fill in all required fields.");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert("Please enter a valid email address.");
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonContent = submitButton.innerHTML; // Store original content
        const spinnerIcon = '<i class="fas fa-spinner fa-spin"></i>'; // Font Awesome spinner

        submitButton.innerHTML = `${spinnerIcon} Sending...`;
        submitButton.disabled = true;

        try {
            const response = await fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert("Thank you for your message! We will get back to you soon.");
                contactForm.reset();
            } else {
                const responseData = await response.json();
                if (responseData.errors) {
                    alert(responseData.errors.map(error => error.message).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form.");
                }
            }
        } catch (error) {
            alert("Network error: " + error.message);
        } finally {
            submitButton.innerHTML = originalButtonContent; // Restore original content
            submitButton.disabled = false;
        }
    });
}

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Show/hide back to top button based on scroll position
function toggleBackToTopButton() {
  if (window.scrollY > 300) {
    backToTopButton.style.opacity = "1";
    backToTopButton.style.visibility = "visible";
  } else {
    backToTopButton.style.opacity = "0";
    backToTopButton.style.visibility = "hidden";
  }
}

// Scroll event listeners
window.addEventListener("scroll", () => {
  updateActiveNavLink();
  handleNavbarScroll();
  toggleBackToTopButton();
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateActiveNavLink();
  handleNavbarScroll(); // Call once on load to set initial state
  toggleBackToTopButton();

  // Add smooth scroll to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Initialize new enhancements
  initScrollReveal();
  initParallax();
  // initTypingEffect(); // Uncomment if you want typing effect
  enhanceFormValidation();
  initFloatingAnimation();
  enhanceServiceCards();
  animateCounters();
  initMobileGestures();

  // Add a general class to indicate everything is loaded, mainly for fade-in effect on body
  document.body.classList.add("loaded");
});

// Enhanced scroll reveal animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".feature-card, .service-card, .testimonial-card, .section-header, .hero-content"); // Added hero-content

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a small delay for staggered effect
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, index * 100);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });
}

// Parallax effect for hero section
function initParallax() {
  const heroBackground = document.querySelector(".hero-background");
  const heroImage = document.querySelector(".hero-image"); // New: for hero image parallax

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    const imgRate = scrolled * 0.2; // Opposite direction for hero image for a layered effect

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
    if (heroImage) {
        heroImage.style.transform = `translateY(${imgRate}px)`;
    }
  });
}

// Enhanced typing effect for hero title
function initTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return; // Exit if element not found

  const text = heroTitle.textContent;
  heroTitle.textContent = "";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // Start typing effect after page load
  setTimeout(typeWriter, 1000);
}

// Enhanced form validation with real-time feedback
function enhanceFormValidation() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    input.addEventListener("blur", validateField);
    input.addEventListener("input", clearErrors);
  });

  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();

    field.classList.remove("error"); // Always remove error class first

    // Remove existing error message div if any
    const existingErrorDiv = field.parentNode.querySelector(".error-message");
    if (existingErrorDiv) {
      existingErrorDiv.remove();
    }

    // Validate based on field type
    if (field.hasAttribute("required") && !value) {
      showFieldError(field, "This field is required.");
    } else if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        showFieldError(field, "Please enter a valid email address.");
      }
    } else if (field.type === "tel" && value) {
      // Basic phone number validation (can be more robust)
      const phoneRegex = /^[+]?[\d\s()-]{7,20}$/; // Allows for common phone characters
      if (!phoneRegex.test(value)) {
        showFieldError(field, "Please enter a valid phone number.");
      }
    }
    // No specific validation for 'select' beyond 'required' (which is handled)
  }

  function showFieldError(field, message) {
    field.classList.add("error");
    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
  }

  function clearErrors(e) {
    const field = e.target;
    field.classList.remove("error");
    const errorMessage = field.parentNode.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }
}

// Add floating animation to hero image (if desired)
function initFloatingAnimation() {
  const heroImg = document.querySelector(".hero-img");
  if (heroImg) {
    let mouseX = 0;
    let mouseY = 0;

    // Apply a subtle float animation if not using mousemove parallax
    if (!document.querySelector(".hero-image")) { // If no outer container for parallax
        heroImg.style.animation = 'float 3s ease-in-out infinite';
    } else {
        // Combined with existing mousemove for more subtle effect
        document.addEventListener("mousemove", (e) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1 range
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1 range

            heroImg.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`; // Subtle movement
        });
    }
  }
}

// Enhanced service card interactions
function enhanceServiceCards() {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 15px 30px rgba(37, 99, 235, 0.2)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "0 5px 15px var(--shadow)";
    });
  });
}

// Add smooth counter animation for statistics (if any)
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(counter);
  });
}

// Enhanced mobile menu with swipe gestures
function initMobileGestures() {
  let startX = 0;
  let startY = 0;
  const navbarHeight = document.getElementById("navbar").offsetHeight;

  document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  document.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = startX - endX;
    const diffY = startY - endY;

    // Only consider horizontal swipes that start near the top (e.g., within navbar height)
    if (Math.abs(diffY) < 50 && startY < (navbarHeight + 50)) { // swipe near top
      // Swipe right to open menu
      if (diffX < -50) {
        if (window.innerWidth <= 768 && !navMenu.classList.contains("active")) {
          navMenu.classList.add("active");
          hamburger.classList.add("active");
        }
      }

      // Swipe left to close menu
      if (diffX > 50) {
        if (window.innerWidth <= 768 && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          hamburger.classList.remove("active");
        }
      }
    }
  });
}

// Duplicate marquee content for seamless loop
document.addEventListener("DOMContentLoaded", () => {
  const marqueeContent = document.querySelector(".marquee-content");
  if (marqueeContent) {
    const marqueeItems = marqueeContent.innerHTML;
    // Duplicate content twice to ensure continuous loop without gaps
    marqueeContent.innerHTML = marqueeItems + marqueeItems + marqueeItems;
  }
});


// Remove image loading animation (FIX for flashing images)
// The original code was:
/*
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.style.opacity = "1";
    });
    img.style.opacity = "0"; // THIS WAS THE CULPRIT!
    img.style.transition = "opacity 0.3s ease";
  });
});
*/
// This block is now removed from `DOMContentLoaded` event listener.
// Images will load naturally without this JS intervention.


// Add CSS for ripple effect and enhanced form validation (already in your original script)
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }

    .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: fadeInUp 0.3s ease;
    }

    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }

    body.loaded {
        opacity: 1;
    }

    /* .reveal styles are moved to styles.css for better organization */
`;
document.head.appendChild(style);