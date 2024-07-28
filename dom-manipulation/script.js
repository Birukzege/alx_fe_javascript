let quotes = []; // Array to store quotes

// Simulated server interaction with mock data
const mockServerData = [
  { text: "Mock quote 1 from server", category: "Mock Category 1" },
  { text: "Mock quote 2 from server", category: "Mock Category 2" }
];

// Function to fetch quotes from the server using a mock API
function fetchQuotesFromServer() {
  quotes = mockServerData.slice(); // Update local data with server data
  console.log("Data fetched from server:", quotes);
  showRandomQuote();
}

// Function to post data to the server using a mock API
function postToServer(data) {
  // Simulate posting data to the server
  console.log("Data posted to server:", data);
}

// Function to sync data with the server
function syncQuotes() {
  fetchQuotesFromServer(); // Fetch new quotes from the server
  
  // Check for conflicts and resolve them
  // For simplicity, we will assume server data takes precedence
  resolveConflicts();
}

// Periodically check for new quotes from the server (every 15 seconds)
setInterval(syncQuotes, 15000);

// Function to resolve conflicts by updating local storage with server data
function resolveConflicts() {
  // Simple conflict resolution: Server data takes precedence
  quotes = mockServerData.slice(); // Update local data with server data
  console.log("Conflicts resolved with server data.");
  showRandomQuote();
}

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById('quoteDisplay').innerText = "No quotes available.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p><strong>${randomQuote.text}</strong> - ${randomQuote.category}</p>`;
}

// UI elements or notifications for data updates or conflicts can be added based on project requirements

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);
