const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const messageForm = document.querySelector("#message-form");

menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        siteNav.classList.remove("is-open");
    }
});

messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!messageForm.reportValidity()) {
        return;
    }

    const formData = new FormData(messageForm);
    const name = formData.get("name").toString().trim();
    const phone = formData.get("phone").toString().trim();
    const message = `Hello, my name is ${name}. I would like a call back at ${phone}.`;
    const whatsappUrl = `https://wa.me/917780705611?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();