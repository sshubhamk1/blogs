function updateReadingProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight;

    const windowHeight =
        window.innerHeight;

    const scrollable =
        documentHeight - windowHeight;

    const percent =
        scrollable > 0
            ? (scrollTop / scrollable) * 100
            : 0;

    document
        .getElementById("reading-progress")
        .style.width = percent + "%";
}

window.addEventListener(
    "scroll",
    updateReadingProgress,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateReadingProgress
);

updateReadingProgress();