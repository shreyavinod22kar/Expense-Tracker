from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row  # lets us access columns by name
    return conn

@app.route('/expenses', methods=['GET'])
def get_expenses():
    conn = get_db_connection()
    expenses = conn.execute('SELECT * FROM expenses').fetchall()
    conn.close()
    return jsonify([dict(row) for row in expenses])

@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO expenses (name, amount, category) VALUES (?, ?, ?)',
        (data['name'], data['amount'], data['category'])
    )
    conn.commit()
    conn.close()
    return jsonify({'message': 'Expense added'}), 201

@app.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM expenses WHERE id = ?', (expense_id,))
    conn.commit()
    conn.close()
    return '', 204

import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)