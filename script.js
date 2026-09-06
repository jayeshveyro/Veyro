const SUPABASE_URL = "https://ptpnuquothmusvoquhdg.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

const form = document.querySelector("#form");
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

        successMessage.hidden = false;
        successMessage.textContent =
            "You're on the list. We'll be in touch soon.";

    } catch (error) {
        console.error("Submission error:", error);

        successMessage.hidden = false;
        successMessage.textContent =
            "Something went wrong. Please try again.";
    }
});
