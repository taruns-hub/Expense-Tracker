•	Project Overview
            The Expense Tracker is a full-stack web application that enables users to log, manage, and view their personal expenses. It supports CRUD operations, category filtering, and dynamically updates total expenditure. The application integrates a Node.js backend with Express and SQLite and a HTML/CSS/JavaScript frontend.

•	Objectives
          Allow users to input expenses with details like name, amount, category, and date.
Store expense data persistently using SQLite.
Enable users to view, filter, and delete their expenses.
Provide an aggregated view of total expenses.

•	System Architecture
       Frontend: HTML, CSS, JavaScript
       Backend: Node.js with Express.js
       Database: SQLite
       Runtime: Node.js environment

•	Features
    1. Add Expense
               Form includes fields for name, amount, category (from a dropdown), and date.
               Validations ensure all fields are filled, names are clean, and amounts are positive.

2. Display & Filter Expenses
             Expenses are listed in a table with columns: Name, Amount, Category, Date, Action.
             A category filter allows dynamic filtering.
             Total expense is calculated and displayed.
3. Delete Expense
             Each expense row has a delete button.
              Deletion is handled with a confirmation and backend request.

•	Input Validation (Client Side)
       Name must contain only alphanumeric characters and spaces.
       Amount must be a number greater than 0.
       All fields are mandatory.

•	Backend Functionality
       /add-expense (POST): Adds new expense to the SQLite database.
      /expenses (GET): Retrieves all expenses, optionally filtered by category.
    /delete-expense/:id (DELETE): Deletes an expense by its ID.
    SQLite database: expenses.db with fields: id, name, amount, category, date.

•	Dependencies
    express: Web server framework.
    cors: Enables cross-origin requests.
    sqlite3: Lightweight embedded SQL database.
