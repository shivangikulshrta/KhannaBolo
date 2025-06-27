// Check if browser supports SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
} else {
  alert('Sorry! Your browser does not support Speech Recognition.');
}

// Start Listening
function startListening() {
  document.getElementById('spoken').textContent = '🎧 Listening...';
  recognition.start();
}

// On Result
recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript;
  document.getElementById('spoken').textContent = `🍽️ You said: "${transcript}"`;
  fetchIngredients(transcript);
};

// Error Handling
recognition.onerror = function (event) {
  document.getElementById('spoken').textContent = '❌ Error: ' + event.error;
};

// Fetch ingredients from server
function fetchIngredients(dishName) {
  fetch('/get-ingredients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ dish: dishName })
  })
  .then(res => res.json())
  .then(data => {
    displayIngredients(data.ingredients);
  })
  .catch(err => {
    document.getElementById('spoken').textContent = '❌ Server error. Please try again.';
    console.error(err);
  });
}

// Display ingredients
function displayIngredients(ingredients) {
  const list = document.getElementById('ingredient-list');
  list.innerHTML = '';

  if (!ingredients || ingredients.length === 0) {
    list.innerHTML = '<li>No ingredients found for this dish.</li>';
    return;
  }

  ingredients.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price}`;
    list.appendChild(li);
  });
}
