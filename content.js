(function () {
  // Function to detect if the site has its own dark mode
  function hasDarkMode() {
    // Check for common dark mode classes
    const darkModeClasses = ["dark", "dark-mode", "dark-theme"];
    for (const cls of darkModeClasses) {
      if (document.body.classList.contains(cls)) return true;
    }

    // Check for CSS media query indicating dark mode
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    if (darkModeMediaQuery.matches) return true;

    // Check for specific meta tags or attributes
    const metaTags = document.querySelectorAll("meta");
    for (const tag of metaTags) {
      if (
        tag.getAttribute("name") === "theme-color" &&
        tag.getAttribute("content") === "dark"
      ) {
        return true;
      }
    }

    // Check for dark background color in body
    const bodyStyle = getComputedStyle(document.body);
    const bgColor = bodyStyle.backgroundColor;
    const content = bodyStyle.content;
    if (
      (bgColor &&
        (bgColor.includes("0, 0, 0") || bgColor.includes("rgb(0, 0, 0)"))) ||
      (content && content.includes("dark"))
    ) {
      return true;
    }

    // No dark mode detected
    return false;
  }

  // Apply custom dark mode if the site doesn't have its own
  if (!hasDarkMode()) {
    if (!document.body.classList.contains("custom-dark-mode")) {
      document.body.classList.add("custom-dark-mode");

      // Add dark mode styles dynamically
      const style = document.createElement("style");
      style.textContent = `
              body {
                  background-color: #121212 !important;
                  color: #ffffff !important;
              }
              a {
                  color: #bb86fc !important;
              }
              img, video {
                  filter: brightness(0.8) !important;
              }
              * {
                  background-color: inherit !important;
                  color: inherit !important;
              }
          `;
      document.head.appendChild(style);
    }
  }
})();
