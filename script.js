const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const categoryInput = document.getElementById('expense-category');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

const ctx = document.getElementById('expense-chart').getContext('2d');
let expenseChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#1d4ed8', '#2563eb']
    }]
  }
});

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
  updateChart();

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

function updateChart() {
  const categoryTotals = {};

  expenses.forEach(function(expense) {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount;
    } else {
      categoryTotals[expense.category] = expense.amount;
    }
  });

  expenseChart.data.labels = Object.keys(categoryTotals);
  expenseChart.data.datasets[0].data = Object.values(categoryTotals);
  expenseChart.update();
}

function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  updateTotal();
  renderExpenses();
  updateChart();
}