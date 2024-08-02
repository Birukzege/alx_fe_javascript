// Array to store quote objects (text and category)
let quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Be the change that you wish to see in the world.", category: "Change" },
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  // Display quote text
  quoteDisplay.innerHTML = `
    <p>"${randomQuote.text}"</p>
    <p>- Category: ${randomQuote.category}</p>
  `;
}

// Function to create the add quote form
function createAddQuoteForm() {
  const formDiv = document.createElement('div');
  formDiv.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button onclick="addQuote()">Add Quote</button>
  `;
  document.body.appendChild(formDiv);
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  // Add new quote object to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Update the quote display (you might want to call showRandomQuote here to display the new quote)
  showRandomQuote();
}

// Call the functions on page load
window.onload = () => {
  showRandomQuote();
  createAddQuoteForm();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
};