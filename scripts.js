<script>
        document.addEventListener("DOMContentLoaded", function () {
            const managePreferencesButton = document.getElementById("manage-preferences");
            const savePreferencesButton = document.getElementById("save-preferences");
            const cookieOptionsText = document.getElementById("cookie-options-text");
            const cookieButtons = document.getElementById("cookie-buttons");
            const preferenceOptions = document.getElementById("preference-options");
            const cookieConsentBanner = document.getElementById("cookie-consent-banner");
            const acceptCookiesButton = document.getElementById("accept-cookies");
            const rejectCookiesButton = document.getElementById("reject-cookies");
    
            // Show preference options and hide initial buttons
            managePreferencesButton.addEventListener("click", function () {
                cookieOptionsText.style.display = "none";
                cookieButtons.style.display = "none";
                preferenceOptions.style.display = "block";
            });
    
            // Save preferences and hide the banner
            savePreferencesButton.addEventListener("click", function () {
                alert("Your preferences have been saved.");
                cookieConsentBanner.classList.add("fade-out");
            });
    
            // Accept cookies and hide the banner
            acceptCookiesButton.addEventListener("click", function () {
                cookieConsentBanner.classList.add("fade-out");
            });
    
            // Reject cookies and hide the banner
            rejectCookiesButton.addEventListener("click", function () {
                cookieConsentBanner.classList.add("fade-out");
            });
        });
    </script>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const cookieConsentBanner = document.getElementById("cookie-consent-banner");
        const acceptCookiesButton = document.getElementById("accept-cookies");
        const rejectCookiesButton = document.getElementById("reject-cookies");
        const managePreferencesButton = document.getElementById("manage-preferences");

        // Function to send data to Qualtrics
        function sendToQualtrics(choice) {
            const maxAttempts = 10;
            let attempts = 0;
            const retryInterval = 500; // Retry every 500ms

            function trySendingData() {
                // Check if Qualtrics SurveyEngine is available
                if (
                    window.parent &&
                    window.parent.Qualtrics &&
                    window.parent.Qualtrics.SurveyEngine
                ) {
                    try {
                        window.parent.Qualtrics.SurveyEngine.setEmbeddedData(
                            "CookieConsentChoice",
                            choice
                        );
                        console.log(`Choice '${choice}' successfully sent to Qualtrics.`);
                        fadeOutBanner();
                        return;
                    } catch (error) {
                        console.error(
                            `Error while sending data to Qualtrics: ${error.message}`
                        );
                    }
                }

                // Retry logic
                if (attempts < maxAttempts) {
                    attempts++;
                    console.log(`Retry ${attempts}/${maxAttempts} to send data to Qualtrics.`);
                    setTimeout(trySendingData, retryInterval);
                } else {
                    console.error(
                        `Failed to send data to Qualtrics after ${maxAttempts} attempts.`
                    );
                    fallbackIframeSubmission(choice);
                }
            }

            trySendingData();
        }

        // Fallback: Send data via iframe
        function fallbackIframeSubmission(choice) {
            const encodedChoice = encodeURIComponent(choice);
            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = `https://pitt.co1.qualtrics.com/jfe/form/SV_82qEVmKh9UVcJIG?CookieConsentChoice=${encodedChoice}`;
            document.body.appendChild(iframe);
            console.log(`Fallback mechanism used: Data sent via iframe as '${choice}'.`);
            fadeOutBanner();
        }

        // Helper function to fade out the cookie consent banner
        function fadeOutBanner() {
            cookieConsentBanner.classList.add("fade-out");
        }

        // Event listeners for buttons
        acceptCookiesButton.addEventListener("click", function () {
            console.log("Accept button clicked");
            sendToQualtrics("Accept");
        });

        rejectCookiesButton.addEventListener("click", function () {
            console.log("Reject button clicked");
            sendToQualtrics("Reject");
        });

        managePreferencesButton.addEventListener("click", function () {
            console.log("Manage Preferences button clicked");
            sendToQualtrics("Manage Preferences");
        });
    });
</script>