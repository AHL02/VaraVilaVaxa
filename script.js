// Load initial page from URL or default to "hem"
window.addEventListener("DOMContentLoaded", () => {
  let path = location.pathname.toLowerCase().replace("/", "").replace(".html", "");

  const validPages = ["hem", "tjänster", "medarbetare"];
  const page = validPages.includes(path) ? path : "hem";

  loadPage(page, true);
});

// Handle navigation link clicks
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = e.target.getAttribute("data-page");

    // Update URL without reloading the page
    history.pushState({ page }, "", `/${page}`);
    loadPage(page);
  });
});

// Handle browser back/forward buttons
window.addEventListener("popstate", (e) => {
  const page = (e.state && e.state.page) || "hem";
  loadPage(page, true);
});

// Function to load content dynamically
function loadPage(page, replace = false) {
  fetch(`pages/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(html => {
      document.getElementById("content").innerHTML = html;

      // Update history state if needed
      if (!replace) {
        history.replaceState({ page }, "", `/${page}`);
      }

      // Highlight active link
      document.querySelectorAll("nav a").forEach(link => {
        link.classList.toggle("active", link.getAttribute("data-page") === page);
      });
    })
    .catch(err => {
      document.getElementById("content").innerHTML = `<p>Sidan "${page}" kunde inte laddas.</p>`;
      console.error(err);
    });
}