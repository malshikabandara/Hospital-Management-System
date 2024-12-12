// Define an object to hold the medicine prices
const medicinePrices = {
    'Aspirin': 500,
    'Ibuprofen': 800,
    'Paracetamol': 100,
    'Cataflam': 300,
    'Acetaminophen': 300,
    'Codeine': 300,
    'Amoxicillin': 150,
    'Ciprofloxacin': 200,
    'peniciliine': 200,
    'Amikacin': 200,
    'Cephalexin': 200,
    'Tetracycline': 200,
    'Sertraline': 250,
    'Fluoxetine': 220,
    'Citalopram': 220,
    'Escitalopram': 220,
    'Paroxetin': 220,
    'Mirtazapine': 220,
    'Loratadine': 100,
    'Cetirizine': 120,
    'Xyzal': 120,
    'Claritin': 120,
    'Allegra': 120,
    'Zyrtec': 120,
    'Amlodipine': 180,
    'Losartan': 150,
    'Candesartan': 150,
    'Eprosartan': 150,
    'Irbesartan': 150,
    'Ramipril': 150
    // Add more medicines here
};

// Function to add selected medicines to the cart
function addToCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = ''; // Clear existing cart

    let totalPrice = 0;

    // Loop through all the medicine input fields
    for (let medicine in medicinePrices) {
        const quantity = document.getElementById(medicine).value;
        if (quantity > 0) {
            const price = medicinePrices[medicine] * quantity;
            totalPrice += price;

            // Add selected medicine to the cart table
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${medicine}</td>
                <td>${quantity}</td>
                <td>$${price.toFixed(2)}</td>
            `;
            cartBody.appendChild(row);
        }
    }

    // Update the total price in the cart
    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
}

// Function to save the current cart to localStorage when the "Buy Now" button is clicked
function proceedToCheckout() {
    const cartBody = document.getElementById('cart-body');
    const rows = cartBody.getElementsByTagName('tr');
    const cartItems = [];

    // Loop through the cart rows and save the cart data
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const item = {
            medicine: cells[0].innerText, // Medicine name
            quantity: cells[1].innerText, // Quantity
            price: cells[2].innerText // Price
        };
        cartItems.push(item);
    }

    // Save cart data and total price in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    const totalPrice = document.getElementById('total-price').innerText;
    localStorage.setItem('totalPrice', totalPrice);

    // Redirect to Buy Now page
    window.location.href = "pay_form.html";
}

// Function to save current cart as favorite
function saveAsFavorite() {
    const cartBody = document.getElementById('cart-body');
    const rows = cartBody.getElementsByTagName('tr');
    const favoriteItems = [];

    // Loop through the cart rows and save the cart data
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        const item = {
            medicine: cells[0].innerText, // Medicine name
            quantity: cells[1].innerText, // Quantity
            price: cells[2].innerText // Price
        };
        favoriteItems.push(item);
    }

    // Save favorite items to localStorage
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
    alert('Favorites saved successfully!');
}

// Function to apply favorite items to the cart
function applyFavorite() {
    const favoriteItems = JSON.parse(localStorage.getItem('favoriteItems'));

    if (!favoriteItems) {
        alert('No favorites found. Please add items to favorites first.');
        return;
    }

    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = ''; // Clear existing cart

    let totalPrice = 0;

    // Loop through the favorite items and add them to the cart
    favoriteItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.medicine}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
        `;
        cartBody.appendChild(row);

        // Calculate the total price based on favorite items
        const price = parseFloat(item.price.replace('$', ''));
        totalPrice += price;
    });

    // Update the total price in the cart
    document.getElementById('total-price').innerText = `$${totalPrice.toFixed(2)}`;
    alert('Favorites applied successfully!');
}
