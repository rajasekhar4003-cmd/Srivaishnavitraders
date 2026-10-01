const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const messageForm = document.querySelector("#message-form");
const enquiryForm = document.querySelector("#enquiry-form");

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

enquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const status = document.querySelector("#enquiry-status");
    const successPanel = document.querySelector("#enquiry-success");
    const submitButton = enquiryForm.querySelector("button[type=\"submit\"]");

    if (!enquiryForm.reportValidity()) {
        return;
    }

    if (enquiryForm.action.endsWith("/YOUR_FORM_ID")) {
        status.textContent = "Online enquiries are not available yet. Please call or WhatsApp our team.";
        status.classList.add("is-error");
        return;
    }

    status.textContent = "";
    status.classList.remove("is-error");
    submitButton.disabled = true;
    submitButton.firstChild.textContent = "Submitting... ";

    try {
        const response = await fetch(enquiryForm.action, {
            method: "POST",
            body: new FormData(enquiryForm),
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            throw new Error("The enquiry could not be submitted.");
        }

        enquiryForm.reset();
        enquiryForm.hidden = true;
        successPanel.hidden = false;
        requestAnimationFrame(() => {
            successPanel.classList.add("is-visible");
            successPanel.focus({ preventScroll: true });
        });
    } catch {
        status.textContent = "We couldn’t submit your enquiry. Please try again or contact us by phone or WhatsApp.";
        status.classList.add("is-error");
    } finally {
        submitButton.disabled = false;
        submitButton.firstChild.textContent = "Submit ";
    }
});

document.querySelector("#year").textContent = new Date().getFullYear();