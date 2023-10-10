const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const categorySelect = document.getElementById("category");
const closeButton = document.querySelector(".close");
const addCategoryButton = document.getElementById("addCategory");


// Constant Strings
const localStorageTransactionKey = "transactions";
const localStorageCategoriesKey = "categories";

const localStorageTransactions = JSON.parse(localStorage.getItem(localStorageTransactionKey))

let transactions = localStorage.getItem(localStorageTransactionKey) !== null ? localStorageTransactions : [];

// Init app
function init() {
    // Clean transaction list
    list.innerHTML = "";

    // Add transactions to the history list
    transactions.forEach(addTransactionDOM);
    updateValues();
}

// Add Transaction
function addTransaction(e) {
    e.preventDefault();

    if (description.value.trim() === "" || amount.value.trim() === "" || category.value.trim() === "") {
        alert("Please add a text and amount, and select a category");
    } else {
        const transaction = {
            id: generateID(),
            description: description.value,
            amount: +amount.value,
            category: category.options[category.selectedIndex].text,
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        description.value = "";
        amount.value = "";
        category.selectedIndex = 0; //Reset category selection to the first option
    }
}

// Generate random ID
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM List
function addTransactionDOM(transaction) {
    const item = createTransactionItemElement(transaction);
    list.appendChild(item);
}

// Function to create and append elements
function createAndAppendElements(transaction, item) {
    const sign = transaction.amount < 0 ? "-" : "+";

    // Create category span
    const categorySpan = document.createElement("span");
    categorySpan.textContent = transaction.category;

    // Create description span
    const descriptionSpan = document.createElement("span");
    descriptionSpan.textContent = transaction.description;

    // Create amount span
    const amountSpan = document.createElement("span");
    amountSpan.textContent = `${sign}${Math.abs(transaction.amount)}`;

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "x";
    deleteButton.setAttribute("data-transaction-id", transaction.id);

    // Append elements to the item
    item.appendChild(categorySpan);
    item.appendChild(descriptionSpan);
    item.appendChild(amountSpan);
    item.appendChild(deleteButton);
}

// Function to create a transaction item element
function createTransactionItemElement(transaction) {
    const item = document.createElement("li");
    const className = transaction.amount < 0 ? "minus" : "plus";
    item.classList.add(className);

    // Create and append elements
    createAndAppendElements(transaction, item);

    return item;
}

// Update the balance, income and expense
function updateValues() {
    const calculateTotal = (acc, item) => {
        return acc + item;
    };

    const amounts = transactions.map((transaction) => transaction.amount);

    const total = amounts.reduce(calculateTotal, 0).toFixed(2);

    const income = amounts
        .filter((item) => item > 0)
        .reduce(calculateTotal, 0)
        .toFixed(2);

    const expense = (
        amounts.filter((item) => item < 0).reduce(calculateTotal, 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);

    updateLocalStorage();
    init();
}

// Update local storage transactions
function updateLocalStorage() {
    localStorage.setItem(localStorageTransactionKey, JSON.stringify(transactions));
}

/**
 * Modal
 */
// Function to open the modal
function openCategoryModal() {
    const modal = document.getElementById("categoryModal");
    modal.style.display = "block";
}

// Function to close the modal
function closeCategoryModal() {
    const modal = document.getElementById("categoryModal");
    modal.style.display = "none"
}


/**
 * Category Main Functions
 */
function getCategories() {
    // Prefill the categories with default values
    const predefinedCategories = getPredefinedCategories();

    // Import local storage data
    const storedCategories = getStoredCategories();

    // Merge default and local storage categories and remove if there is duplicate. Also sort alphabetically
    const sortedUniqueCategories = mergeAndSortCategories(predefinedCategories, storedCategories);

    // Format Category Texts to Title Capitalize
    return capitalizePropertyInObjects(sortedUniqueCategories);
}

// Function to save categories to local storage
function saveCategories(categories) {
    localStorage.setItem(localStorageCategoriesKey, JSON.stringify(categories));
}

// Function to add a new category
function addNewCategory() {
    const newCategoryInput = document.getElementById("newCategory");
    const newCategoryText = newCategoryInput.value.trim();

    if (newCategoryText !== "") {
        const categories = getCategories();

        if (categoryExists(categories, newCategoryText)) {
            alert("Category already exists!");
        } else {
            const newCategory = {
                id: generateID(),
                categoryText: capitalizeWords(newCategoryText),
                categoryValue: formatCategoryNameToValue(newCategoryText),
            };

            categories.push(newCategory);
            saveCategories(categories);
            updateCategorySelect();
            newCategoryInput.value = "";
        }
    }
}

// Function to update the category select element
function updateCategorySelect() {
    const categorySelect = document.getElementById("category");
    categorySelect.innerHTML = ""; // Clear the select element

    const defaultOptions = [
        {id: 0, categoryText: 'Select Category', categoryValue: ''},
        {
            id: 1,
            categoryText: '+ Add New Category',
            categoryValue: 'new-category'
        }
    ]

    // Define an array of default options
    addOptionsToSelect(categorySelect, defaultOptions);

    const categories = getCategories();
    addOptionsToSelect(categorySelect, categories);
}

/**
 * Category Helper Functions
 */
function getPredefinedCategories() {
    const predefinedCategoryTexts = [
        "Housing",
        "Utilities",
        "Transportation",
        "Groceries",
        "Dining Out",
        "Healthcare",
        "Entertainment",
        "Clothing",
        "Education",
        "Savings",
        "Insurance",
        "Debt Payments",
        "Childcare/Child Expenses",
        "home maintenance",
        "Gifts and Donations",
        "Taxes",
        "Travel",
        "Subscriptions",
        "Personal Care",
        "Pet Expenses",
    ];

    return predefinedCategoryTexts.map((categoryText) => ({
        id: generateID(),
        categoryText: categoryText,
        categoryValue: formatCategoryNameToValue(categoryText),
    }))
}

// Function to format a category name to lowercase with hyphens
function formatCategoryNameToValue(category) {
    return category.replace(/ /g, "-").toLowerCase();
}

function getStoredCategories() {
    return JSON.parse(localStorage.getItem(localStorageCategoriesKey)) || [];
}

function mergeAndSortCategories(predefinedCategories, storedCategories) {
    const combinedCategories = [...predefinedCategories, ...storedCategories];
    const uniqueCategories = deduplicateArrayByKey(combinedCategories, 'categoryText');
    return uniqueCategories.sort((a, b) => a.categoryText.localeCompare(b.categoryText));
}

function deduplicateArrayByKey(array, key) {
    return array.filter((item, index, self) => {
        const itemValue = item[key].toLowerCase(); // Convert to lowercase (or use toUpperCase() for uppercase)
        return index === self.findIndex((obj) => obj[key].toLowerCase() === itemValue);
    });
}

function capitalizeWords(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}

// Reformat Category Texts
function capitalizePropertyInObjects(array, property = "categoryText", capitalizeFn = capitalizeWords) {
    return array.map((item) => ({
        ...item,
        [property]: capitalizeFn(item[property]),
    }));
}

// Function to create a new category option element
function createCategoryOption(categoryText, categoryValue) {
    const option = document.createElement("option")
    option.value = categoryValue;
    option.textContent = categoryText;

    if (option.textContent === "Select Category") {
        option.selected = true;
        option.disabled = true;
    }
    return option;
}

// Add default options to a select element.
function addOptionsToSelect(selectElement,options) {
    options.forEach((option) => {
        const optionElement = createCategoryOption(option.categoryText, option.categoryValue);
        selectElement.appendChild(optionElement)
    })
}

function categoryExists(categories, newCategoryText) {
    return categories.some((category) => category.categoryText.toLowerCase() === newCategoryText.toLowerCase());
}


/**
 * Initialization
 */
// Initialize the application
init();

// Initialize the category select element
updateCategorySelect();


/**
 * Event Listeners
 */
// Add an event listener for form submission when clicked add transaction
form.addEventListener("submit", addTransaction);

// Add an event listener for opening the modal when selecting "+ Add New Category"
categorySelect.addEventListener("change", (e) => {
    if (e.target.value === "new-category") {
        e.target.value = "";
        openCategoryModal();
    }
})

// Add an event listener for closing the modal when clicking the close button
closeButton.addEventListener("click", closeCategoryModal);

// Add an event listener for adding a new category
addCategoryButton.addEventListener("click", (e) => {
    e.preventDefault();
    addNewCategory();
    closeCategoryModal();
})