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

  try {
    const response = await fetch("https://portfolio-backend-4hpl.onrender.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    alert(result.message);

    // Clear the form fields after successful submission
    nameInput.value = "";
    emailInput.value = "";
    subjectInput.value = "";
    messageInput.value = "";
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message!");
  }
});
