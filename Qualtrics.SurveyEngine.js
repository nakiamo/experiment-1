Qualtrics.SurveyEngine.addOnload(function() {
    /*Place your JavaScript here to run when the page loads*/
    
    // Store the interval ID so we can clear it later
    var intervalId;
    
    // Listen for messages from the iframe
    window.addEventListener('message', function(event) {
        console.log('Received message:', event.data); // Debug log
        
        // Handle cookie choice messages
        if (event.data && event.data.action === 'setCookieChoice') {
            // Set the embedded data
            Qualtrics.SurveyEngine.setEmbeddedData('CookieChoice', event.data.choice);
            console.log('Cookie choice recorded:', event.data.choice);
        }
        
        // Handle time to first click messages
        if (event.data && event.data.action === 'setTimeToFirstClick') {
            Qualtrics.SurveyEngine.setEmbeddedData('TimeToFirstClick', event.data.time);
            console.log('Time to first click recorded:', event.data.time);
        }
    });

    // Check URL parameters periodically
    intervalId = setInterval(function() {
        const iframe = document.querySelector('iframe');
        if (iframe && iframe.contentWindow) {
            try {
                const urlParams = new URLSearchParams(iframe.contentWindow.location.search);
                const cookieChoice = urlParams.get('cookieChoice');
                if (cookieChoice) {
                    Qualtrics.SurveyEngine.setEmbeddedData('CookieChoice', cookieChoice);
                    console.log('Cookie choice recorded from URL:', cookieChoice);
                }
            } catch (e) {
                console.log('Unable to access iframe content:', e);
            }
        }
    }, 1000);
    
    // Store the intervalId in the question so we can access it in onunload
    this.intervalId = intervalId;
});

Qualtrics.SurveyEngine.addOnUnload(function() {
    /*Place your JavaScript here to run when the page is unloaded*/
    
    // Clear the interval when the question is unloaded
    if (this.intervalId) {
        clearInterval(this.intervalId);
        console.log('Interval cleared');
    }
});