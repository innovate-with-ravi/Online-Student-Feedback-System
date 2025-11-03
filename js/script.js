/*
================================================
Main JavaScript File for Student Feedback Portal
================================================
This one file handles all logic for the site.
We use 'if (elementExists)' blocks to make sure
code only runs on the page it belongs to.
*/

document.addEventListener("DOMContentLoaded", () => {

    // --- 🌍 0. Global Scripts ---
    // This code runs on EVERY page.

    const footerYear = document.getElementById("yearFooter");
    if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
    }

    // Global utility function
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


    // --- 🌙 1. Global Theme Toggler Logic ---
    const themeToggleButton = document.getElementById("theme-toggle");

    if (themeToggleButton) {
        const body = document.body;
        const currentTheme = localStorage.getItem("theme");

        // Set the correct state on page load
        if (currentTheme === "dark") {
            body.classList.add("dark-mode");
            themeToggleButton.textContent = "☀️";
        } else {
            body.classList.remove("dark-mode");
            themeToggleButton.textContent = "🌙";
        }

        // Add the click listener
        themeToggleButton.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) {
                themeToggleButton.textContent = "☀️";
                localStorage.setItem("theme", "dark");
            } else {
                themeToggleButton.textContent = "🌙";
                localStorage.setItem("theme", "light");
            }
        });
    }


    // --- 🏠 2. Home Page (index.html) Logic ---
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            fakeLogin();
        });

        function fakeLogin() {
            const fakeEmailDB = {
                "raviggbhawsar9090@gmail.com": true,
                "ravi.kumar@imperial.com": true,
                "meera.joshi@imperial.com": true,
                "student@imperial.com": true,
                "test.user@imperial.com": true
            };

            const username = document.getElementById("username").value.trim();
            const email = document.getElementById("email").value.trim();
            const sem = document.getElementById("sem").value;

            if (username === "" || email === "" || sem === "") {
                alert("Please fill out all fields.");
                return;
            }
            if (!fakeEmailDB[email]) {
                alert("Email not found. Please use your registered college email.\n\n(Hint: Try 'student@imperial.com')");
                return;
            }

            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("semester", sem);
            window.location.href = "02_feedbackForm.html";
        }
    }


    // --- 📝 3. Feedback Page (02_feedbackForm.html) Logic ---
    const feedbackForm = document.getElementById("feedbackForm");
    const subjectsContainer = document.getElementById("subjects-container");

    if (feedbackForm && subjectsContainer) {

        // --- 3a. Define Data and Functions FIRST ---
        const semSubData = {
            Sem1: [
                { subject: "Communication Skills", faculty: "Mrs. Grishma Ptel" },
                { subject: "MathI", faculty: "Mrs. Bharti Patidar" },
                { subject: "Digital Electronics", faculty: "Mr. Xyz" },
                { subject: "Fundamentals of Computer", faculty: "Mr. Pradeep Jatav" },
                { subject: "C Programming", faculty: "Mr. Rajesh Verma" }
            ],
            Sem2: [
                { subject: "MathII", faculty: "Mr. Dembla" },
                { subject: "DCO", faculty: "Mr. Jayesh Yadav" },
                { subject: "Digital Electronics", faculty: "Mr. Xyz" },
                { subject: "Fundamentals of Computer", faculty: "Mr. Pradeep Jatav" },
                { subject: "C Programming", faculty: "Mr. Rajesh Verma" }
            ]
        };

        function createSubCards(sub) {
            let subCard = document.createElement("div");
            subCard.className = "subject-card";

            // Using single-quotes for the string to avoid escaping inner double-quotes
            subCard.innerHTML = `<h3>${sub.subject} <span class="faculty">- ${sub.faculty}</span></h3>
                <div class="grid three-col params">
                    <label>Ability to explain
                        <select name="${sub.subject}_explain" required>
                            <option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>
                        </select>
                    </label>
                    <label>Timely completion
                        <select name="${sub.subject}_completion" required>
                            <option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>
                        </select>
                    </label>
                    <label>Punctuality
                        <select name="${sub.subject}_punctuality" required>
                            <option value="">Select</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option>
                        </select>
                    </label>
                </div>`;
            return subCard;
        }

        // --- 3b. Setup Page (Load Subjects & Fill Fields) ---
        const sem = localStorage.getItem("semester");
        let currentSubjects = []; // Store the subjects for the current semester

        if (sem && semSubData[sem]) {
            currentSubjects = semSubData[sem]; // Save this for validation
            for (const sub of currentSubjects) {
                let subCard = createSubCards(sub);
                subjectsContainer.append(subCard);
            }
        } else {
            // This is a security/flow check.
            alert("Please log in from the home page first.");
            window.location.href = "index.html";
        }

        // Auto-fill user data
        const loggedInUser = localStorage.getItem("username");
        const loggedInEmail = localStorage.getItem("email");
        if (loggedInUser) {
            document.getElementById("studentName").value = loggedInUser;
        }
        if (loggedInEmail) {
            document.getElementById("email").value = loggedInEmail;
        }

        // --- 3c. Form Submission Logic (REFACTORED) ---
        // Load existing data first
        let feedbackData = JSON.parse(localStorage.getItem("feedbackData")) || [];

        feedbackForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Get student info
            const studentName = feedbackForm.querySelector('[name="studentName"]').value.trim();
            const enrollNo = feedbackForm.querySelector('[name="enrollNo"]').value.trim();
            const year = feedbackForm.querySelector('[name="year"]').value.trim();
            const email = feedbackForm.querySelector('[name="email"]').value.trim();
            const course = feedbackForm.querySelector('[name="course"]').value.trim();
            const comments = feedbackForm.querySelector('[name="comments"]').value.trim();

            if (!studentName || !enrollNo || !year || !email || !course || !comments) {
                alert('Please fill all required fields.');
                return;
            }
            if (!isValidEmail(email)) { // Use global function
                alert('Please enter a valid email address.');
                return;
            }

            // REFACTOR: Validate dynamically using 'currentSubjects'
            let subjectRatings = [];
            for (const sub of currentSubjects) {
                const s_explain = feedbackForm.querySelector(`[name="${sub.subject}_explain"]`).value;
                const s_complete = feedbackForm.querySelector(`[name="${sub.subject}_completion"]`).value;
                const s_punctual = feedbackForm.querySelector(`[name="${sub.subject}_punctuality"]`).value;

                if (!s_explain || !s_complete || !s_punctual) {
                    alert(`Please provide all ratings for ${sub.subject}.`);
                    return;
                }

                // Save ratings as an object
                subjectRatings.push({
                    name: sub.subject,
                    faculty: sub.faculty,
                    scores: `${s_explain} / ${s_complete} / ${s_punctual}`
                });
            }

            // Get the next ID
            let newId = (feedbackData.length > 0) ? Math.max(...feedbackData.map(item => item.id)) + 1 : 1;

            // REFACTOR: Save as a structured object
            const newFeedback = {
                id: newId,
                studentName: studentName,
                enrollNo: enrollNo,
                course: course,
                semester: sem,
                subjects: subjectRatings, // This is the new, structured data
                comments: comments
            };

            feedbackData.push(newFeedback);
            localStorage.setItem("feedbackData", JSON.stringify(feedbackData));

            window.location.href = '05_thankyou.html'
            feedbackForm.reset();
        });
    }


    // --- 📊 4. Admin Login (03_admin.html) Logic ---
    const adminLoginForm = document.getElementById("adminLogin");

    if (adminLoginForm) {

        adminLoginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = adminLoginForm.querySelector('#username').value.trim();
            const password = adminLoginForm.querySelector('#password').value.trim();

            if (!username || !password) {
                alert('Please fill in both username and password.');
                return;
            }
            if (!isValidEmail(username)) { // Use global function
                alert('Please enter a valid email address for the username.');
                return;
            }

            const MOCK_ADMIN_EMAIL = 'raviggbhawsar9090@gmail.com';
            const MOCK_ADMIN_PASS = 'admin123';

            if (username === MOCK_ADMIN_EMAIL && password === MOCK_ADMIN_PASS) {
                localStorage.setItem("adminLoggedIn", "true");
                window.location.href = '04_feedbackData.html';
            } else {
                alert('Invalid credentials. Please try again.');
            }
        });
    }


    // --- 📈 5. Admin Dashboard (04_feedbackData.html) Logic (NEW) ---
    const dataTableBody = document.getElementById("data-table-body");
    const adminLogoutButton = document.getElementById("admin-logout");

    if (dataTableBody) { // This ID only exists on the admin dashboard

        // 5a. Security Check
        if (localStorage.getItem("adminLoggedIn") !== "true") {
            alert("Access Denied. Please log in as admin.");
            window.location.href = "03_admin.html";
            return; // Stop running code
        }

        // 5b. Logout Button
        if (adminLogoutButton) {
            adminLogoutButton.addEventListener("click", () => {
                localStorage.removeItem("adminLoggedIn");
                alert("You have been logged out.");
                window.location.href = "index.html";
            });
        }

        // 5c. Load Data and Build Table
        const allFeedback = JSON.parse(localStorage.getItem("feedbackData")) || [];

        if (allFeedback.length === 0) {
            // Show a message if no feedback exists
            const noDataRow = `<tr><td colspan="6" style="text-align: center;">No feedback submissions found.</td></tr>`;
            dataTableBody.innerHTML = noDataRow;
        } else {
            // Loop through each feedback OBJECT and build a table row
            allFeedback.forEach(fb => {
                const row = document.createElement("tr");

                // 1. Create the details list for subjects
                let subjectHtml = '<ul style="margin: 0; padding-left: 18px; text-align: left;">';
                fb.subjects.forEach(sub => {
                    subjectHtml += `<li><strong>${sub.name}:</strong> ${sub.scores}</li>`;
                });
                subjectHtml += '</ul>';

                // 2. Build the full row HTML
                row.innerHTML = `
                    <td>${fb.id}</td>
                    <td>${fb.studentName}</td>
                    <td>${fb.enrollNo}</td>
                    <td>${fb.course} (${fb.semester})</td>
                    <td>${subjectHtml}</td>
                    <td>${fb.comments}</td>
                `;

                // 3. Add the new row to the table
                dataTableBody.appendChild(row);
            });
        }
    }

    // --- 🎉 6. Thank You Page (05_thankyou.html) Logic (NEW) ---

    const thankYouMessage = document.getElementById("thank-you-message");

    if (thankYouMessage) {
        const semester = localStorage.getItem("semester");

        if (semester) {
            thankYouMessage.textContent = `Your feedback for ${semester} has been submitted successfully.`;
        }

        // Clear the student login data after submission
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("semester");
    }

}); // End of DOMContentLoaded wrapper

