let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Science is a way of thinking much more than it is a body of knowledge.", category: "Science" }
];

const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts';

// --- Step 1 & 2: Simulate Server Interaction and Syncing Logic ---

// Function to fetch quotes from the server (Mock API)
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(SERVER_URL);
        const serverData = await response.json();
        
        // JSONPlaceholder returns 'posts'. We'll map them to our 'quote' format
        const serverQuotes = serverData.slice(0, 5).map(post => ({
            text: post.title,
            category: "Server"
        }));

        syncQuotes(serverQuotes);
    } catch (error) {
        console.error("Error fetching from server:", error);
    }
}

// Function to post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        });
        const result = await response.json();
        console.log("Quote synced with server:", result);
    } catch (error) {
        console.error("Error posting to server:", error);
    }
}

// --- Step 3: Conflict Resolution and Syncing ---

function syncQuotes(serverQuotes) {
    // Conflict Resolution: Server data takes precedence.
    // We check if server quotes exist in our local array by text comparison
    let localUpdated = false;

    serverQuotes.forEach(serverQuote => {
        const exists = quotes.some(localQuote => localQuote.text === serverQuote.text);
        if (!exists) {
            quotes.push(serverQuote);
            localUpdated = true;
        }
    });

    if (localUpdated) {
        saveQuotes();
        showNotification("Quotes synced with server!");
    }
}

// UI notification system
function showNotification(message) {
    const notify = document.createElement('div');
    notify.textContent = message;
    notify.style.cssText = "position:fixed; bottom:20px; right:20px; background:#28a745; color:white; padding:10px; border-radius:5px; z-index:1000;";
    document.body.appendChild(notify);
    setTimeout(() => notify.remove(), 3000);
}

// --- Existing Functionalities (Modified for Sync) ---

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories();
}

function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        const newQuote = { text, category };
        quotes.push(newQuote);
        saveQuotes();
        
        // Sync the new quote to the server
        postQuoteToServer(newQuote);
        
        textInput.value = '';
        categoryInput.value = '';
        alert("Quote added and syncing with server...");
    }
}

// --- Initialization ---

function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = opt.textContent = cat;
        categoryFilter.appendChild(opt);
    });
    categoryFilter.value = localStorage.getItem('lastSelectedCategory') || 'all';
}

function filterQuotes() {
    const selected = document.getElementById('categoryFilter').value;
    localStorage.setItem('lastSelectedCategory', selected);
    const display = document.getElementById('quoteDisplay');
    const filtered = selected === 'all' ? quotes : quotes.filter(q => q.category === selected);
    
    display.innerHTML = '';
    if (filtered.length > 0) {
        const quote = filtered[Math.floor(Math.random() * filtered.length)];
        display.innerHTML = `<p>${quote.text}</p><small> - Category: ${quote.category}</small>`;
    }
}

function createAddQuoteForm() {
    const div = document.createElement('div');
    div.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(div);
}

document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    filterQuotes();
    createAddQuoteForm();
    document.getElementById('newQuote').addEventListener('click', filterQuotes);

    // Periodic Data Fetching: Sync with server every 30 seconds
    setInterval(fetchQuotesFromServer, 30000);
    
    // Initial sync
    fetchQuotesFromServer();
});
