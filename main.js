// Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        nav.classList.toggle("active");
        
        // Optional: Add animation to hamburger icon
        const bars = menuToggle.getElementsByTagName("div");
        for (let bar of bars) {
            bar.classList.toggle("active");
        }
    }
    
    // Toggle menu when hamburger icon is clicked
    menuToggle.addEventListener("click", toggleMenu);
    
    // Add keyboard support
    menuToggle.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener("click", function(event) {
        const isClickInsideMenu = nav.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains("active")) {
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove("active");
            
            // Optional: Reset hamburger icon
            const bars = menuToggle.getElementsByTagName("div");
            for (let bar of bars) {
                bar.classList.remove("active");
            }
        }
    });
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener("resize", function() {
        if (window.innerWidth > 768 && nav.classList.contains("active")) {
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove("active");
            
            // Optional: Reset hamburger icon
            const bars = menuToggle.getElementsByTagName("div");
            for (let bar of bars) {
                bar.classList.remove("active");
            }
        }
    });
});

// Cookie Consent Functionality
document.addEventListener("DOMContentLoaded", function () {
    // Define allowed origin
    const ALLOWED_ORIGIN = window.location.origin;
    
    // Add time tracking variables
    const startTime = Date.now();
    let firstClickTime = null;
    
    const cookieConsentBanner = document.getElementById("cookie-consent-banner");
    const acceptCookiesButton = document.getElementById("accept-cookies");
    const rejectCookiesButton = document.getElementById("reject-cookies");
    const managePreferencesButton = document.getElementById("manage-preferences");
    const savePreferencesButton = document.getElementById("save-preferences");
    const cookieOptionsText = document.getElementById("cookie-options-text");
    const cookieButtons = document.getElementById("cookie-buttons");
    const preferenceOptions = document.getElementById("preference-options");

    // Function to record first click time
    function recordFirstClick() {
        if (!firstClickTime) {
            firstClickTime = Date.now();
            const timeToFirstClick = firstClickTime - startTime;
            
            // Only use postMessage method
            window.parent.postMessage({
                action: 'setTimeToFirstClick',
                time: timeToFirstClick
            }, ALLOWED_ORIGIN);
            console.log('recordFirstClick - time:', timeToFirstClick);
        }
    }
    
    // Function to send data to Qualtrics using multiple methods
    function sendToQualtrics(choice) {
        // Method 1: Direct parent window communication with origin check
        if (window.parent) {
            try {
                window.parent.postMessage({
                    action: 'setCookieChoice',
                    choice: choice
                }, ALLOWED_ORIGIN);
                console.log('Sent choice via postMessage:', choice);
            } catch (error) {
                console.error('Error sending via postMessage:', error);
            }
        }

        // Method 2: URL Parameter Update
        try {
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('cookieChoice', choice);
            window.history.replaceState({}, '', currentUrl);
            console.log('Updated URL with choice:', choice);
        } catch (error) {
            console.error('Error updating URL:', error);
        }

        // Method 3: Local Storage (as backup)
        try {
            localStorage.setItem('cookieChoice', choice);
            console.log('Saved choice to localStorage:', choice);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    }

    // Function to hide the banner
    function hideBanner() {
        cookieConsentBanner.classList.add('fade-out');
        setTimeout(() => {
            cookieConsentBanner.style.display = 'none';
        }, 1000);
    }

    // Event Listeners for the buttons
    acceptCookiesButton.addEventListener('click', () => {
        recordFirstClick();
        sendToQualtrics('Accept');
        hideBanner();
    });

    rejectCookiesButton.addEventListener('click', () => {
        recordFirstClick();
        sendToQualtrics('Reject');
        hideBanner();
    });

    managePreferencesButton.addEventListener('click', () => {
        recordFirstClick();
        cookieOptionsText.style.display = "none";
        cookieButtons.style.display = "none";
        preferenceOptions.style.display = "block";
    });

    // Handle saving preferences
    savePreferencesButton.addEventListener('click', () => {
        // Get the state of preference checkboxes
        const performanceCookies = document.getElementById('performance-cookies').checked;
        const targetingCookies = document.getElementById('targeting-cookies').checked;
        
        // Create a detailed preferences string
        let preferences = [];
        if (performanceCookies) preferences.push("Performance");
        // Always include Strictly as it's mandatory
        preferences.push("Strictly");
        if (targetingCookies) preferences.push("Targeting");
        
        // Send the preferences to Qualtrics
        const choiceString = preferences.length > 0 ? preferences.join(", ") : "None";
        sendToQualtrics(choiceString);
        
        // Hide the banner
        hideBanner();
    });
}); 