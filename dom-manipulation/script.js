// Array to store quote objects
let quotes = [];

// Load quotes from local storage on page load
window.onload = () => {
  loadQuotes(); 
  showRandomQuote();
  createAddQuoteForm();
  createImportExportButtons();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
};

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes if none found in local storage
    quotes = [
      { text: "The onlyway to do great work is to love what you do.", category: "Inspiration" },
      { text: "Life is what happens when you're busy making other plans.", category: "Life" },
      { text: "Be the change that you wish to see in the world.", category: "Change" },
    ];
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = '<p>No quotes available! Add some quotes using the form below.</p>';
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Save the last viewed quote to session storage
  sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));

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
  const newQuoteText =document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  // Add new quote object to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Update the quote display (you might want to call showRandomQuote here to display the new quote)
  saveQuotes(); // Save to local storage
  showRandomQuote();
}

// Function to create import/export buttons
function createImportExportButtons() {
  const buttonsDiv = document.createElement('div');
  buttonsDiv.innerHTML = `
    <button id="exportQuotes">Export Quotes</button>
    <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)" />
  `;
  document.body.appendChild(buttonsDiv);

  document.getElementById('exportQuotes').addEventListener('click', exportQuotes);
  document.getElementById('importFile').addEventListener('change', importFromJsonFile);
}

// Function to export quotes to JSON file
function exportQuotes() {
  const quotesData = JSON.stringify(quotes, null, 2); // Format JSON for readability
  const blob = new Blob([quotesData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'quotes.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      quotes = [...quotes, ...importedQuotes]; // Merge imported quotes with existing ones
      saveQuotes();
      alert('Quotes imported successfully!');
      showRandomQuote(); // Show a random quote after import
    } catch (error) {
      alert('Invalid JSON file format.');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}