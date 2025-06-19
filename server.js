
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


const db = new sqlite3.Database('./expenses.db', (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to SQLite DB.");
});


db.run(`CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    amount REAL,
    category TEXT,
    date TEXT
)`);


app.post('/add-expense', (req, res) => {
    const { name, amount, category, date } = req.body;
    db.run(`INSERT INTO expenses (name, amount, category, date) VALUES (?, ?, ?, ?)`,
        [name, amount, category, date],
        function(err) {
            if (err) return res.status(500).send(err.message);
            res.send({ id: this.lastID });
        });
});



app.get('/expenses', (req, res) => {
    const category = req.query.category;

    let query = `SELECT * FROM expenses`;
    let params = [];

    if (category && category !== 'All') {
        query += ` WHERE category = ?`;
        params.push(category);
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


app.delete('/delete-expense/:id', (req, res) => {
    const id = req.params.id;

    db.run('DELETE FROM expenses WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (this.changes === 0) {
            return res.status(404).send('Expense not found');
        }
        res.send({ message: 'Expense deleted' });
    });
});



