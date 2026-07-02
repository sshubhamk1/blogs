const html = document.documentElement;
const button = document.getElementById("theme-toggle");

function updateIcon() {
    if (html.dataset.theme === "dark") {
        button.textContent = "☀️";
    } else {
        button.textContent = "🌙";
    }
}

button.addEventListener("click", () => {

    const next =
        html.dataset.theme === "dark"
            ? "light"
            : "dark";

    html.dataset.theme = next;

    localStorage.setItem("theme", next);

    updateIcon();
});

updateIcon();