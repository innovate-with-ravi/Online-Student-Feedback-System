// script.js - validation + behavior for feedback form
(function () {
  const form = document.getElementById('feedbackForm');
  const yearFooter = document.getElementById('yearFooter');

  if (yearFooter) yearFooter.innerText = new Date().getFullYear();

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // quick required checks for basic fields
    const studentName = form.querySelector('[name="studentName"]').value.trim();
    const enrollNo = form.querySelector('[name="enrollNo"]').value.trim();
    const year = form.querySelector('[name="year"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const course = form.querySelector('[name="course"]').value.trim();
    const comments = form.querySelector('[name="comments"]').value.trim();

    if (!studentName || !enrollNo || !year || !email || !course || !comments) {
      alert('Please fill all required fields.');
      return;
    }

    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // verify all subject-selects
    const selects = [
      'os_explain', 'os_completion', 'os_punctuality',
      'db_explain', 'db_completion', 'db_punctuality',
      'ai_explain', 'ai_completion', 'ai_punctuality',
      'ml_explain', 'ml_completion', 'ml_punctuality',
      'math_explain', 'math_completion', 'math_punctuality'
    ];

    for (let name of selects) {
      const el = form.querySelector([name = "${name}"]);
      if (!el) {
        alert('Form structure error: missing field ' + name);
        return;
      }
      const val = el.value;
      if (!val) {
        alert('Please provide ratings for all subjects (1-5).');
        return;
      }
      const v = Number(val);
      if (!(v >= 1 && v <= 5)) {
        alert('Ratings must be between 1 and 5.');
        return;
      }
    }

    // All validations passed — simulate submission
    alert('Feedback submitted successfully! Thank you.');
    form.reset();
  });
})();


(function theme() {
  const themeToggle = document.getElementById("theme-toggle");
  const icon = themeToggle.querySelector(".icon");
  const body = document.body;

  // Load saved mode
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    icon.textContent = "☀️";
  }

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      icon.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    } else {
      icon.textContent = "🌙";
      localStorage.setItem("theme", "light");
    }
  });
})()

