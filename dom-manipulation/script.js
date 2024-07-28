// Mock API using JSONPlaceholder
const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

// Fetch quotes from the API
async function fetchQuotes() {
  try {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    return data; 
  } catch (error) {
    console.error("Error fetching quotes:", error);
    // Handle error gracefully (e.g., display a message to the user)
  }
}

// Example of posting a new quote (simulated)
async function postQuote(newQuote) {
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
    console.error("Error posting quote:", error);
  }
} 

// Function to sync data with the server
async function syncData() {
  let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  const serverQuotes = await fetchQuotes();

  // Compare and update local quotes based on server data
  serverQuotes.forEach(serverQuote => {
    const matchingLocalQuote = localQuotes.find(localQuote => localQuote.id === serverQuote.id);
    if (matchingLocalQuote) {
      // Update the local quote if the server version is newer
      if (serverQuote.updatedAt > matchingLocalQuote.updatedAt) {
        matchingLocalQuote.text = serverQuote.text;
        matchingLocalQuote.category =serverQuote.category; 
      }
    } else {
      // Add the new quote from the server
      localQuotes.push(serverQuote);
    }
  });

  localStorage.setItem('quotes', JSON.stringify(localQuotes)); // Save the updated local data
}

// Periodic data fetching (every 5 seconds)
setInterval(syncData, 5000); 

// Example of adding a new quote
const newQuote = {
  id: 101, // Assign a unique ID for a new quote
  text: "This is a new quote",
  category: "Inspiration",
  updatedAt: new Date().getTime(), // Use a timestamp to track updates
};
postQuote(newQuote);

// Example of retrieving and displaying local quotes
function displayQuotes() {
  let localQuotes = JSON.parse(localStorage.getItem('quotes')) || [];
  // ... (Logic to display the quotes in your UI)
}

displayQuotes(); // Call to display initially loaded quotes