document.getElementById('expense-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('expense-name').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;
    const date = document.getElementById('expense-date').value;

    const nameRegex = /^[a-zA-Z0-9\s]*$/;

    if (!name || !amount || !category || !date) {
        alert("Please fill out all fields.");
        return;
    } else if (!nameRegex.test(name)) {
        alert("Expense name cannot contain special characters.");
        return;
    } else if (amount <= 0 || isNaN(amount)) {
        alert("Amount must be a valid number greater than zero.");
        return;
    }

    const expense = { name, amount, category, date };

    const res = await fetch('http://localhost:3000/add-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense)
    });

    if (res.ok) {
        alert("Expense added!");
        document.getElementById('expense-form').reset(); // Clear form
        loadExpenses(getSelectedCategory()); // Refresh list
    }
});

document.getElementById('filter-category').addEventListener('change', function () {
    const category = this.value;
    loadExpenses(category);
});

function getSelectedCategory() {
    const select = document.getElementById('filter-category');
    return select.value || 'All';
}

async function loadExpenses(category = 'All') {
    const res = await fetch(`http://localhost:3000/expenses?category=${category}`);
    const expenses = await res.json();

    const list = document.getElementById('expense-list');
    list.innerHTML = '';
    let total = 0;

    expenses.forEach(exp => {
        total += exp.amount;
        const row = `<tr>
            <td>${exp.name}</td>
            <td>$${exp.amount.toFixed(2)}</td>
            <td>${exp.category}</td>
            <td>${exp.date}</td>
            <td><button onclick="deleteExpense(${exp.id})">Delete</button></td>
        </tr>`;
        list.innerHTML += row;
    });

    document.getElementById('total-amount').textContent = total.toFixed(2);
}

async function deleteExpense(id) {
    const res = await fetch(`http://localhost:3000/delete-expense/${id}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        alert("Expense deleted!");
        loadExpenses(getSelectedCategory()); // Refresh after deletion with current filter
    } else {
        alert("Failed to delete expense.");
    }
}

window.onload = () => {
    loadExpenses(); // Load all by default
};

