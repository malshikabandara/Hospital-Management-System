// Load cart from localStorage (from the pay.js file)
window.onload = function() {
    loadCart();
};

// Function to load cart data from localStorage and populate the table
function loadCart() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartBody = document.getElementById('cart-body');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    // Clear the table before adding items
    cartBody.innerHTML = '';

    // Add cart items to the table
    cartItems.forEach(item => {
        const row = document.createElement('tr');
        const price = parseFloat(item.price.replace('$', ''));
        totalPrice += price;

        row.innerHTML = `
            <td>${item.medicine}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
        `;
        cartBody.appendChild(row);
    });

    // Update total price
    totalPriceElement.innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to proceed to payment
function proceedToPayment() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const postalCode = document.getElementById('postal-code').value;
    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    // Validate the form data
    if (!name || !email || !phone || !address || !city || !postalCode || !cardName || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all fields.');
        return;
    }

    // Calculate the estimated delivery date (add 5 days to current date)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5); // Add 5 days
    const formattedDeliveryDate = deliveryDate.toLocaleDateString();

    // Here you can process the payment (or integrate with a payment gateway)
    alert('Thank you! Your payment was successful. Your order will be delivered on ' + formattedDeliveryDate);

    // Optionally, save the personal, delivery, and payment details in localStorage for later use
    const personalDetails = {
        name, email, phone
    };
    const deliveryDetails = {
        address, city, postalCode, deliveryDate: formattedDeliveryDate
    };
    const paymentDetails = {
        cardName, cardNumber, expiryDate, cvv
    };

    localStorage.setItem('personalDetails', JSON.stringify(personalDetails));
    localStorage.setItem('deliveryDetails', JSON.stringify(deliveryDetails));
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails));

    // Redirect to payment confirmation page or handle payment processing here
    // window.location.href = "payment_confirmation.html"; // Example: redirect to a confirmation page
}
