// Array to store quote objects
let quotes = [];

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes if none found in local storage
    quotes = [
      { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
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
  const newQuoteText = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  // Add new quote object to the quotes array
  quotes.push({ text: newQuoteText, category: newQuoteCategory });

  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';

  // Update the quote display
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

// Call the functions on page load
window.onload = () => {
  loadQuotes();
  showRandomQuote();
  createAddQuoteForm();
  createImportExportButtons();
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);
};












// Function to populate categories dynamically
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  const uniqueCategories = new Set(quotes.map(quote => quote.category));

  // Add "All Categories" option
  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All Categories'; // Use textContent here
  categoryFilter.appendChild(allOption);

  // Add unique categories to the dropdown
  uniqueCategories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category; // Use textContent here
    categoryFilter.appendChild(option);
  });
}

// Function to filter quotes based on selected category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  const filteredQuotes = selectedCategory === 'all' ? 
    quotes : 
    quotes.filter(quote => quote.category === selectedCategory);

  // Update the quote display with filtered quotes
  updateQuoteDisplay(filteredQuotes);
}

// Function to remember the last selected filter
function rememberFilter() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastFilter', selectedCategory);
}

// Function to restore the last selected filter on page load
function restoreFilter() {
  const lastFilter = localStorage.getItem('lastFilter');
  if (lastFilter) {
    document.getElementById('categoryFilter').value = lastFilter;
  }
}






// Mock API using JSONPlaceholder
const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

// Fetch quotes from the API (fetchQuotesFromServer)
async function fetchQuotesFromServer() { 
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching quotes from server:", error);
    // Handle error gracefully (e.g., display a message to the user)
  }
}

// Example of posting a new quote to the mock API
async function postQuoteToServer(newQuote) { 
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuote), 
    });

    // Handle the response (e.g., check if the quote was successfully created)
  } catch (error) {
    console.error("Error posting quote to server:", error);
  }
}

// Function to sync quotes from the server (syncQuotes)
async function syncQuotes() {
  let localQuotes = JSON.parse(localStorage.getItem('quotes')) || []; 
  const serverQuotes = await fetchQuotesFromServer();

  // Compare and update local quotes based on server data
  serverQuotes.forEach(serverQuote => {
    const matchingLocalQuote = localQuotes.find(localQuote => localQuote.id === serverQuote.id);
    if (matchingLocalQuote) {
      // Update the local quote if the server version is newer
      if (serverQuote.updatedAt > matchingLocalQuote.updatedAt) {
        matchingLocalQuote.text = serverQuote.text;
        matchingLocalQuote.category = serverQuote.category; 
        console.log("Updated quote:", serverQuote.text); // Example notification 
      }
    } else {
      // Add the new quote from the server
      localQuotes.push(serverQuote);
      console.log("Added new quote:", serverQuote.text); // Example notification
    }
  });

  localStorage.setItem('quotes', JSON.stringify(localQuotes)); // Save the updated local data
}

// Periodically checking for new quotes (every 5 seconds)
setInterval(syncQuotes, 5000); 

// Example of adding a new quote
const newQuote = {
  id: 101, // Assign a unique ID for a new quote
  text: "This is a new quote",
  category: "Inspiration",
  updatedAt: new Date().getTime(), // Use a timestamp to track updates
};
postQuoteToServer(newQuote);

// Example of retrieving and displaying local quotes
function displayQuotes() {
  let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  // ... (Logic to display the quotes in your UI)
}

// Function to sync quotes from the server (syncQuotes)
async function syncQuotes() {
  let localQuotes = JSON.parse(localStorage.getItem('quotes')) || []; 
  const serverQuotes = await fetchQuotesFromServer();

  // ... (logic for updating local quotes)

  localStorage.setItem('quotes', JSON.stringify(localQuotes)); // Save the updated local data

  // Display a message to the user that the quotes are synced
  console.log("Quotes synced with server!"); 
}


displayQuotes(); // Call to display initially loaded quotes