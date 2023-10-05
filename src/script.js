const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

// Constant Strings
const localStorageTransactionKey = "transactions"

const localStorageTransactions = JSON.parse(localStorage.getItem(localStorageTransactionKey))

let transactions = localStorage.getItem(localStorageTransactionKey) !== null ? localStorageTransactions : [];

function init() {
  list.innerHTML = "";

  // DEBUG LOGS
  console.log("Local Storage")
  console.log(localStorageTransactions);
  console.log("Actual Transactions Array")
  console.log(transactions);

  transactions.forEach(addTransactionDOM);
  updateValues();

  console.log("After Update Values")
  console.log(transactions);
}

// Add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (description.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      description: description.value,
      amount: +amount.value,
      category: category.value,
    };

    console.log(transactions);

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    description.value = "";
    amount.value = "";
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM List
function addTransactionDOM(transaction) {
  // Get Sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.category} <span> ${transaction.description}</span>
  <span>${sign}${Math.abs(
      transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

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

function removeTransaction(id) {
  transactions = transactions.filter( (transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

function updateLocalStorage() {
  localStorage.setItem(localStorageTransactionKey, JSON.stringify(transactions));
}

function openCategoryModal() {
  const modal = document.getElementById("categoryModal");
  modal.style.display = "block"
}

function closeCategoryModal() {
  const modal = document.getElementById("categoryModal");
  modal.style.display = "none"
}



init();
form.addEventListener("submit", addTransaction);






















