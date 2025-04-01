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

// Add fixed header on scroll
window.addEventListener("scroll", function () {
 const header = document.querySelector("header");
 if (window.scrollY > 100) {
   header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
 } else {
   header.style.boxShadow = "none";
 }
});