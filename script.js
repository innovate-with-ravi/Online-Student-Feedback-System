// script.js - validation + behavior for feedback form
let feedbackData = [];
let idx = 3;

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

    // verify all subject-semSelects
    /* need to put all subjects semSelects*/
    const semSelects = {
      Sem1: [['Communication Skills_explain', 'Communication Skills_completion', 'Communication Skills_punctuality',],

      ['MathI_explain', 'MathI_completion', 'MathI_punctuality',],

      ['Digital Electronics_explain', 'Digital Electronics_completion', 'Digital Electronics_punctuality',],

      ['Fundamentals of Computer_explain', 'Fundamentals of Computer_completion', 'Fundamentals of Computer_punctuality',],

      ['C Programming_explain', 'C Programming_completion', 'C Programming_punctuality']]
    }

    let selectVals = [];
    let selects = semSelects[localStorage.getItem("semester")];
    for (let sub of selects) {
      let valStr = "";
      for (const select of sub) {
        const el = form.querySelector(`[name = "${select}"]`);
        const val = el.value;

        if (!el) {
          console.error(`Could not find element with name: ${elName}`);
          continue; // Skip this one if it's missing
        }

        if (!val) {
          alert('Please provide ratings for all subjects (1-5).');
          return;
        }
        const v = parseInt(val);
        if (!(v >= 1 && v <= 5)) {
          alert('Ratings must be between 1 and 5.');
          return;
        }
        valStr += `${val} /`;
      }
      selectVals.push(valStr.slice(0, -1));
    }

    // All validations passed — simulate submission and store in localStorage to mock backend
    // alert('Feedback submitted successfully! Thank you.');
    idx++;
    feedbackData.push([idx, studentName, enrollNo, course, selectVals, comments]);

    localStorage.setItem("feedbackData", JSON.stringify(feedbackData));

    window.location.href = '05_thankyou.html'
    form.reset();
  });
})();

