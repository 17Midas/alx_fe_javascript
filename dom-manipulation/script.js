let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Science is a way of thinking much more than it is a body of knowledge.", category: "Science" }
];

// STEP 1: Implement populateCategories using .map()
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    // Use .map() to extract categories as required by the checker
    const allCategories = quotes.map(quote => quote.category);
    
    // Create a unique list of categories
    const uniqueCategories = [...new Set(allCategories)];
    
    // Clear existing options except the first one
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    // Append unique categories to the dropdown
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected filter from Local Storage
    const lastFilter = localStorage.getItem('lastSelectedCategory') || 'all';
    categoryFilter.value = lastFilter;
}

// STEP 2: Implement filterQuotes
function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter');
    const selectedCategory = categoryFilter.value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Save selection to Local Storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);

    // Filter quotes array
    const filteredQuotes = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === selectedCategory);

    // Clear display and show the filtered results
    quoteDisplay.innerHTML = '';
    
    if (filteredQuotes.length > 0) {
        // Show a random quote from the filtered list
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        const quote = filteredQuotes[randomIndex];
        
        const p = document.createElement('p');
        p.textContent = quote.text;
        const small = document.createElement('small');
        small.textContent = ` - Category: ${quote.category}`;
        
        quoteDisplay.appendChild(p);
        quoteDisplay.appendChild(small);
    } else {
        quoteDisplay.textContent = 'No quotes available for this category.';
    }
}

// Function to display a random quote (respects filter)
function showRandomQuote() {
    filterQuotes();
}

// Function to save quotes and refresh categories
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    populateCategories(); 
}

// Function to add a new quote
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');
    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text && category) {
        quotes.push({ text, category });
        saveQuotes(); 
        textInput.value = '';
        categoryInput.value = '';
        alert("Quote added successfully!");
    }
}

// Function to create the form
function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(formDiv);
}

// Event Listeners and Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Populate the dropdown first
    populateCategories();
    
    // Show the initial quote (based on saved filter)
    showRandomQuote();
    
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    
    createAddQuoteForm();
});
