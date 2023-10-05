const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Constant Strings
const localStorageTransactionKey = "transactions"

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];

const localStorageTransactions = JSON.parse(localStorage.getItem(localStorageTransactionKey))

let transactions = localStorage.getItem(localStorageTransactionKey) !== null ? localStorageTransactions : [];

function init() {
  list.innerHTML = "";

  // DEBUG LOGS
  console.log("Dummy Transactions");
  console.log(dummyTransactions);
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

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value, // ! BUG WAS HERE
    };

    console.log(transactions);

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
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
   ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
   <button class="delete-btn" onclick="removeTransaction(${transaction.id})"> X</button>
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

init();
form.addEventListener("submit", addTransaction);
