// Mobile menu toggle
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    navLinks.classList.remove("active");

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form submission using Formspree
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const formMessage = document.getElementById("form-message");
    const loading = document.querySelector(".loading");
    const form = e.target;

    // Show loading indicator
    loading.style.display = "block";
    formMessage.style.display = "none";

    // Get form data
    const formData = new FormData(form);

    // Formspree endpoint provided by user
    const formspreeEndpoint = "https://formspree.io/f/xblaqqvw";

    // Submit form using fetch API
    fetch(formspreeEndpoint, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        // Hide loading indicator
        loading.style.display = "none";

        // Show success message
        formMessage.textContent =
          "Thank you for your message! I will get back to you soon.";
        formMessage.className = "form-message success";
        formMessage.style.display = "block";

        // Reset form
        form.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      })
      .catch((error) => {
        // Hide loading indicator
        loading.style.display = "none";

        // Show error message
        formMessage.textContent =
          "Oops! There was a problem submitting your form. Please try again or email me directly at nikhilk1042003@gmail.com";
        formMessage.className = "form-message error";
        formMessage.style.display = "block";

        console.error("Form submission error:", error);
      });
  });
