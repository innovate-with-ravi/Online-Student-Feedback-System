(function theme() {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // 1️⃣ Load saved theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️"; // icon for light mode
    }

    // 2️⃣ Toggle theme on click
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Update icon
        if (body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            themeToggle.textContent = "🌙";
            localStorage.setItem("theme", "light");
        }
    });
})()