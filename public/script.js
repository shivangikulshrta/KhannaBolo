// Check if browser supports SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

let dishNames = [];

// 🔄 Fetch dish list from backend
fetch('/api/dishes')
  .then(res => res.json())
  .then(data => {
    dishNames = data;
    console.log("✅ Dishes loaded:", dishNames);
  })
  .catch(err => {
    console.error("❌ Failed to load dishes:", err);
  });

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
} else {
  alert('Speech Recognition not supported in this browser.');
}

function startListening() {
  if (!recognition) return;
  document.getElementById('spoken').textContent = '🎙️ Listening...';
  recognition.start();
}

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript.toLowerCase();
  console.log("🎤 Speech result:", transcript);
  document.getElementById('spoken').textContent = `🍽️ You said: "${transcript}"`;

  if (transcript.includes("clear") || transcript.includes("reset")) {
    clearIngredients();
    return;
  }

  fetchIngredients(transcript);
};

recognition.onerror = function (event) {
  document.getElementById('spoken').textContent = '❌ Error: ' + event.error;
};

recognition.onend = () => console.log("🔕 Recognition ended");

document.getElementById('search-btn').addEventListener('click', handleManualInput);
document.getElementById('clear-btn').addEventListener('click', clearIngredients);
document.getElementById('download-btn').addEventListener('click', downloadCart);
document.getElementById('dish-input').addEventListener('input', showDropdown);
document.getElementById('dish-input').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    handleManualInput();
  }
});

function handleManualInput() {
  const dish = document.getElementById('dish-input').value.trim().toLowerCase();
  if (!dish) return;
  fetchIngredients(dish);
}

function fetchIngredients(dishName) {
  console.log("🗣️ Looking for:", dishName);
  const found = dishNames.find(d => dishName.includes(d.name.toLowerCase()));

  const list = document.getElementById('ingredients-list');
  const cartList = document.getElementById('cart-list');
  list.innerHTML = '';

  if (!found) {
    list.innerHTML = '<li>Dish not found.</li>';
    return;
  }

  found.ingredients.forEach(ing => {
    const li = document.createElement('li');
    li.textContent = ing;
    list.appendChild(li);
  });

  const cartItem = document.createElement('li');
  cartItem.textContent = `${found.name} – ₹${found.cost}`;
  cartList.appendChild(cartItem);

  updateCartTotal();
}

function clearIngredients() {
  document.getElementById('ingredients-list').innerHTML = '';
  document.getElementById('cart-list').innerHTML = '';
  document.getElementById('cart-total').textContent = '🧾 Total in Cart: ₹0';
  document.getElementById('spoken').textContent = '';
  document.getElementById('dish-input').value = '';
  document.getElementById('suggestions').innerHTML = '';
}

function updateCartTotal() {
  const items = document.getElementById('cart-list').children;
  let total = 0;
  for (let item of items) {
    const price = parseInt(item.textContent.split('₹')[1]);
    total += price;
  }
  document.getElementById('cart-total').textContent = `🧾 Total in Cart: ₹${total}`;
}

function downloadCart() {
  const items = document.getElementById('cart-list').children;
  let content = "Your Cart:\n\n";
  for (let item of items) {
    content += "- " + item.textContent + "\n";
  }
  content += "\n" + document.getElementById('cart-total').textContent;

  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "cart.txt";
  a.click();
}

function showDropdown() {
  const input = document.getElementById('dish-input').value.toLowerCase();
  const suggestionBox = document.getElementById('suggestions');
  suggestionBox.innerHTML = '';
  if (input.length === 0) return;

  const matches = dishNames.filter(d => d.name.includes(input));
  matches.forEach(match => {
    const li = document.createElement('li');
    li.textContent = match.name;
    li.onclick = () => {
      document.getElementById('dish-input').value = match.name;
      suggestionBox.innerHTML = '';
      fetchIngredients(match.name);
    };
    suggestionBox.appendChild(li);
  });
}
document.getElementById('buy-btn').addEventListener('click', () => {
  const items = document.getElementById('cart-list').children;
  if (items.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }

  // Simulate a simple order confirmation (you can redirect to another app later)
  const itemList = Array.from(items).map(item => `- ${item.textContent}`).join('\n');
  const total = document.getElementById('cart-total').textContent;

  alert(`🎉 Order Placed!\n\nItems:\n${itemList}\n\n${total}\n\nThank you for shopping with us! 🧡`);
  
  // Optional: clear cart after buying
  clearIngredients();
});
