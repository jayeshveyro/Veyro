const nav = document.querySelector('.nav');
const menu = document.querySelector('#menu');

// Mobile menu toggle
menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.textContent = open ? '×' : '☰';
});

// Close menu when a navigation link is clicked
document.querySelectorAll('.nav nav a').forEach((a) => {
    a.addEventListener('click', () => {
        nav.classList.remove('open');
    });
});

// Form submission
const SUPABASE_URL =https://ptpnuquothmusvoquhdg.supabase.co/;
const SUPABASE_KEY =eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cG51cXVvdGhtdXN2b3F1aGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgzNjExNzYsImV4cCI6MjEwMzkzNzE3Nn0.FosTex7ZwEKAxargTx64HVy8KfJftnFhjDX5Yi8ANW4;

const form = document.querySelector("#waitlist-form");
const successMessage = document.querySelector("#form-success");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        institution: formData.get("institution"),
        role: formData.get("role")
    };

    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/waitlist`,
            {
                method: "POST",
                headers: {
                    "apikey": SUPABASE_KEY,
                    "Authorization": `Bearer ${SUPABASE_KEY}`,
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                },
                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            throw new Error("Submission failed");
        }

        form.reset();

        successMessage.textContent =
            "You're on the list. We'll be in touch soon.";

        successMessage.style.display = "block";

    } catch (error) {
        console.error(error);

        successMessage.textContent =
            "Something went wrong. Please try again.";

        successMessage.style.display = "block";
    }
});

    // Show success message
    document.querySelector('#success').hidden = false;

    // Update and disable submit button
    const button = e.target.querySelector('button');
    button.textContent = 'Request received ✓';
    button.disabled = true;

    // Disable form fields
    e.target.querySelectorAll('input, select').forEach((field) => {
        field.disabled = true;
    });
});
