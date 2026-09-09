const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const categoryInput = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = [];
let total = 0;

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = nameInput.value;
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  const newExpense = {
    id: Date.now(),
    name: name,
    amount: amount,
    category: category
  };

  expenses.push(newExpense);
  updateTotal();
  renderExpenses();

  form.reset();
});

function updateTotal() {
  total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmount.textContent = total.toFixed(2);
}

function renderExpenses() {
  expenseList.innerHTML = '';

  expenses.forEach(function(expense) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name} (${expense.category}) - ₹${expense.amount}</span>
      <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
    `;
    expenseList.appendChild(li);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  updateTotal();
  renderExpenses();
}