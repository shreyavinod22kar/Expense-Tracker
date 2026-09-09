from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allows your frontend to talk to this backend

expenses = []  # temporary storage (like your JS array, but on the server)

@app.route('/expenses', methods=['GET'])
def get_expenses():
    return jsonify(expenses)

@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    new_expense = {
        'id': len(expenses) + 1,
        'name': data['name'],
        'amount': data['amount'],
        'category': data['category']
    }
    expenses.append(new_expense)
    return jsonify(new_expense), 201

@app.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    global expenses
    expenses = [e for e in expenses if e['id'] != expense_id]
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)