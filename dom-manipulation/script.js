// Array to store quotes
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivational" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Inspirational" }
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p><strong>${randomQuote.text}</strong> - ${randomQuote.category}</p>`;
}

// Function to add a new quote
function addQuote() {
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;
  
  if (newQuoteText && newQuoteCategory) {
    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    
    showRandomQuote(); // Display the newly added quote
  }
}

// Event listener for the "Show New Quote" button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
