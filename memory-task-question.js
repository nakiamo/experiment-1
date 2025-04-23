Qualtrics.SurveyEngine.addOnload(function() {
    // Create the container for the coffee orders
    const orderContainer = document.createElement("div");
    orderContainer.id = "orderDetails";
    orderContainer.style.display = "none";
    orderContainer.innerHTML = `
        <p id="order1" style="display: none; opacity: 0; transition: opacity 0.5s; font-size: 24px; margin: 20px 0;"><strong>Sezgin:</strong> Grande Karamelli Macchiato</p>
        <p id="order2" style="display: none; opacity: 0; transition: opacity 0.5s; font-size: 24px; margin: 20px 0;"><strong>Haluk:</strong> Venti Pumpkin Spice Latte</p>
        <p id="order3" style="display: none; opacity: 0; transition: opacity 0.5s; font-size: 24px; margin: 20px 0;"><strong>Emrah:</strong> Tall Mocha Frappuccino</p>
    `;

    // Create the "Show Orders" button
    const showButton = document.createElement("button");
    showButton.innerText = "Siparişleri Göster";
    showButton.style.padding = "10px 15px";
    showButton.style.fontSize = "16px";
    showButton.style.cursor = "pointer";
    showButton.style.marginTop = "10px";

    // Append elements to the question container
    const container = this.getQuestionContainer();
    container.appendChild(showButton);
    container.appendChild(orderContainer);

    // Function to smoothly show an order
    function showOrder(orderId) {
        const order = document.getElementById(orderId);
        order.style.display = "block";
        setTimeout(() => order.style.opacity = "1", 50); // Fade in
    }

    // Function to smoothly hide an order
    function hideOrder(orderId) {
        const order = document.getElementById(orderId);
        order.style.opacity = "0"; // Fade out
        setTimeout(() => order.style.display = "none", 500);
    }

    // Function to play the sequence
    function playSequence() {
        showButton.style.display = "none"; // Hide the button
        orderContainer.style.display = "block"; // Show container

        // Order sequence with fade effect (5 seconds per order)
        setTimeout(() => showOrder("order1"), 0);     // Show first order
        setTimeout(() => hideOrder("order1"), 5000);  // Hide after 5 sec

        setTimeout(() => showOrder("order2"), 5000);  // Show second order
        setTimeout(() => hideOrder("order2"), 10000); // Hide after 5 sec

        setTimeout(() => showOrder("order3"), 10000); // Show third order
        setTimeout(() => hideOrder("order3"), 15000); // Hide after 5 sec

        // Hide the entire container and reactivate the button
        setTimeout(() => {
            orderContainer.style.display = "none"; 
            showButton.style.display = "block"; // Make button visible again
            showButton.innerText = "Siparişleri Tekrar Göster";
        }, 15200);
    }

    // Initial button click event
    showButton.addEventListener("click", playSequence);

    // Enable the Next button from the start
    Qualtrics.SurveyEngine.enableNextButton();
});