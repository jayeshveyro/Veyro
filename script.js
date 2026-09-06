V// ========================================
// SUPABASE CONFIGURATION
// ========================================

const SUPABASE_URL = "https://ptpnuquothmusvoquhdg.supabase.co";

// Use the Publishable key from Supabase → Settings → API Keys
const SUPABASE_KEY = "sb_publishable__OCrly2Tq5dKZji3bLtvSw_w0dU2SUq";


// ========================================
// FORM SUBMISSION
// ========================================

const form = document.querySelector("form");
const successMessage = document.querySelector("#success");

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
                    "Content-Type": "application/json",
                    "Prefer": "return=minimal"
                },

                body: JSON.stringify(data)
            }
        );

        if (!response.ok) {
            const errorText = await response.text();

            console.error(
                "Supabase error:",
                response.status,
                errorText
            );

            throw new Error(
                `Supabase error ${response.status}: ${errorText}`
            );
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
