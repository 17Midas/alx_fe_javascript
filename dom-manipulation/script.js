// Step 1: Manage an array of quote objects
let quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Science is a way of thinking much more than it is a body of knowledge.", category: "Science" },
    { text: "The past cannot be changed. The future is yet in your power.", category: "Motivation" }
];

// Step 2: Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    // Select a random index from the quotes array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // Clear existing content and display the new quote
    quoteDisplay.innerHTML = ''; // Clear previous quote
    
    const quoteText = document.createElement('p');
    quoteText.textContent = quote.text;
    
    const quoteCategory = document.createElement('small');
    quoteCategory.textContent = ` - Category: ${quote.category}`;
    quoteCategory.style.fontStyle = 'italic';

    quoteDisplay.appendChild(quoteText);
    quoteDisplay.appendChild(quoteCategory);
}

// Step 3: Function to create the Add Quote Form dynamically
function createAddQuoteForm() {
    // Create container for the form
    const formContainer = document.createElement('div');
    formContainer.id = 'addQuoteForm';

    // Create Quote Text Input
    const inputQuote = document.createElement('input');
    inputQuote.id = 'newQuoteText';
    inputQuote.type = 'text';
    inputQuote.placeholder = 'Enter a new quote';

    // Create Quote Category Input
    const inputCategory = document.createElement('input');
    inputCategory.id = 'newQuoteCategory';
    inputCategory.type = 'text';
    inputCategory.placeholder = 'Enter quote category';

    // Create Add Button
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    
    // Attach event listener to the add button
    addButton.onclick = function() {
        addQuote();
    };

    // Append elements to the container
    formContainer.appendChild(inputQuote);
    formContainer.appendChild(inputCategory);
    formContainer.appendChild(addButton);

    // Append the form container to the body
    document.body.appendChild(formContainer);
}

// Step 4: Function to add a new quote to the array and DOM
function addQuote() {
    const textInput = document.getElementById('newQuoteText');
    const categoryInput = document.getElementById('newQuoteCategory');

    const text = textInput.value.trim();
    const category = categoryInput.value.trim();

    if (text === "" || category === "") {
        alert("Please fill in both fields.");
        return;
    }

    // Add the new quote to the array
    quotes.push({ text: text, category: category });

    // Clear the inputs
    textInput.value = '';
    categoryInput.value = '';

    alert("Quote added successfully!");
}

// Initializing the application
document.addEventListener('DOMContentLoaded', () => {
    // Show a random quote initially
    showRandomQuote();
    
    // Attach event listener to the "Show New Quote" button
    document.getElementById('newQuote').addEventListener('click', showRandomQuote);
    
    // Generate the Add Quote form
    createAddQuoteForm();
});
