// script.js - validation + behavior for feedback form
(function () {
  const form = document.getElementById('feedbackForm');
  const yearFooter = document.getElementById('yearFooter');

  if (yearFooter) yearFooter.innerText = new Date().getFullYear();

  /* 
  /\S+@\S+\.\S+/ — this is a regular expression (regex).
  test(email) — this method checks whether the given string (email) matches the pattern.

  \S+ = one or more non-space characters
  */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener("submit", function (e) {
    /*Stop doing the default thing (like refreshing or navigating). Let me handle the form with my own JavaScript.*/
    e.preventDefault();// stop auto-refresh

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
    /* need to put all subjects selects*/
    const selects = [
      'Communication Skills_explain', 'Communication Skills_completions', 'Communication Skills_punctuality',
      'db_explain', 'db_completion', 'db_punctuality',
      'ai_explain', 'ai_completion', 'ai_punctuality',
      'ml_explain', 'ml_completion', 'ml_punctuality',
      'math_explain', 'math_completion', 'math_punctuality'
    ];

    for (let name of selects) {
      const el = form.querySelector(`[name = "${name}"]`);
      const val = el.value;
      if (!val) {
        alert('Please provide ratings for all subjects (1-5).');
        return;
      }
      const v = parseInt(val);
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

