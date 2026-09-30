let expenses = [];

const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
const totalExpense = document.getElementById("totalExpense");
const expenseCount = document.getElementById("expenseCount");

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;

    const expense = {
        id: Date.now(),
        description: description,
        amount: amount,
        category: category,
        date: date
    };

    expenses.push(expense);

    displayExpenses();
    updateSummary();

    expenseForm.reset();
});

function displayExpenses() {

    expenseList.innerHTML = "";

    if (expenses.length === 0) {
        expenseList.innerHTML =
            '<p class="empty-message">No expenses added yet.</p>';
        return;
    }

    expenses.forEach(function(expense) {

        const expenseItem = document.createElement("div");

        expenseItem.className = "expense-item";

        expenseItem.innerHTML = `
            <div class="expense-info">
                <h3>${expense.description}</h3>
                <p>${expense.category} | ${expense.date}</p>
            </div>

            <div>
                <span class="expense-amount">
                    ₹${expense.amount}
                </span>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </div>
        `;

        expenseList.appendChild(expenseItem);
    });
}

function updateSummary() {

    let total = 0;

    expenses.forEach(function(expense) {
        total += expense.amount;
    });

    totalExpense.textContent = `₹${total}`;
    expenseCount.textContent = expenses.length;
}

function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    displayExpenses();
    updateSummary();
}