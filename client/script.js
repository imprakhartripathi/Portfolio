// Mobile menu toggle
document
  .querySelector(".menu-toggle")
  .addEventListener("click", function () {
    document.querySelector(".nav-links").classList.toggle("active");
  });

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelector(".nav-links").classList.remove("active");
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Add scrolled class to header on scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Animate elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.section-title, .experience-card, .project-card, .skill, .about-text');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial styles for animation
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.section-title, .experience-card, .project-card, .skill, .about-text');
  
  elements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease-out';
  });
  
  // Trigger initial animation
  setTimeout(animateOnScroll, 300);
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);


document.querySelector(".contact-form form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");

  const formData = {
    name: nameInput.value,
    email: emailInput.value,
    subject: subjectInput.value,
    message: messageInput.value,
  };

  // Switch between dev and prod
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
  const BASE_URL = isLocalhost
    ? "http://localhost:5000"
    : "https://portfolio-backend-4hpl.onrender.com";

  try {
    const response = await fetch(`${BASE_URL}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // Handle non-JSON or empty response safely
    let result;
    try {
      result = await response.json();
    } catch {
      result = { message: "Server responded but no JSON body." };
    }

    alert(result.message || "Message sent!");

    // Clear form
    nameInput.value = "";
    emailInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message!");
  }
});

