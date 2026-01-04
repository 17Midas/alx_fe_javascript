// Step 1: Initialize quotes with Local Storage or defaults
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Science is a way of thinking much more than it is a body of knowledge.", category: "Science" }
];

// Helper function to save quotes to Local Storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    quoteDisplay.innerHTML = ''; 
    const quoteText = document.createElement('p');
    quoteText.textContent = quote.text;
    const quoteCategory = document.createElement('small');
    quoteCategory.textContent = ` - Category: ${quote.category}`;

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);

    // Session Storage: Store the last viewed quote
    sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Step 2: JSON Export Functionality
function exportToJson() {
    const dataStr = JSON.stringify(quotes);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const exportFileDefaultName = 'quotes.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Step 3: JSON Import Functionality
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            // Spread operator adds all imported quotes to the existing array
            quotes.push(...importedQuotes);
            saveQuotes();
            alert('Quotes imported successfully!');
            showRandomQuote(); // Refresh display
        } catch (e) {
            alert('Error parsing JSON file.');
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        quotes.push({ text, category });
        saveQuotes(); // Persistence: Save to Local Storage
        textInput.value = '';
        categoryInput.value = '';
        alert("Quote added!");
    }
}

// Form Creation
function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(formDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    document.getElementById('exportQuotes').addEventListener('click', exportToJson);
    
    // Check Session Storage for last viewed quote
    const lastQuote = sessionStorage.getItem('lastQuote');
    if (lastQuote) {
        const quote = JSON.parse(lastQuote);
        const quoteDisplay = document.getElementById('quoteDisplay');
        quoteDisplay.innerHTML = `<p>${quote.text}</p><small> - Category: ${quote.category}</small>`;
    } else {
        showRandomQuote();
    }
    
    createAddQuoteForm();
});
