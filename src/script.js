// first_list_item = document.querySelector("li");
// first_list_item.style.backgroundColor = "gray";

// const listItemArray = document.querySelectorAll("li");

// listItemArray[0].style.backgroundColor = "purple";

// listItemArray.forEach((listItem) => {
//   if (listItem.style.backgroundColor === "purple") {
//     listItem.style.backgroundColor = "gray";
//   } else {
//     listItem.style.backgroundColor = "orange";
//   }
// });

const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 },
];

// TODO: Add dom items
function init() {
  list.innerHTML = "";
  console.log(dummyTransactions);

  dummyTransactions.forEach(addTransactionDOM);
  updateValues();
}

// Add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount.");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: amount.value,
    };

    console.log(dummyTransactions);

    dummyTransactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

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

  /*

  <li class="minus"> Flower <span> -20 </span> </li>
  <li class="minus"> Check <span> -400 </span> <button class="delete-btn"> X</button> </li>

  */

  // TODO: Add on click for delete-btn
  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
   ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
   <button class="delete-btn"> X</button>
  `;

  list.appendChild(item);
}

function updateValues() {
  const calculateTotal = (acc, item) => {
    return acc + item;
  };

  const amounts = dummyTransactions.map((transaction) => transaction.amount);

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

init();
form.addEventListener("submit", addTransaction);
