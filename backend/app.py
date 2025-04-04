from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# Get database path from environment variable
DATABASE_PATH = os.getenv('DATABASE_PATH', 'transactions.db')

# Database setup
def init_db():
    conn = sqlite3.connect(DATABASE_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS transactions
                 (PK TEXT, SK TEXT, GSI1_PK TEXT, GSI1_SK TEXT,
                  amount REAL, type TEXT, category TEXT,
                  description TEXT, date TEXT, payment_method TEXT)''')
    conn.commit()
    conn.close()

def get_db():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    conn = get_db()
    c = conn.cursor()
    c.execute('SELECT * FROM transactions')
    transactions = [dict(row) for row in c.fetchall()]
    conn.close()
    return jsonify(transactions)

@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    data = request.json
    current_time = datetime.utcnow()
    
    # Generate unique identifiers
    pk = f"USER#{uuid.uuid4()}"
    sk = f"{current_time.strftime('%Y-%m')}#TXN#{int(current_time.timestamp())}"
    gsi1_pk = f"USER#{uuid.uuid4()}#TYPE#{data['type']}"
    gsi1_sk = current_time.strftime('%Y-%m')
    
    transaction = {
        'PK': pk,
        'SK': sk,
        'GSI1_PK': gsi1_pk,
        'GSI1_SK': gsi1_sk,
        'amount': data['amount'],
        'type': data['type'],
        'category': data['category'],
        'description': data['description'],
        'date': current_time.isoformat() + 'Z',
        'payment_method': data['payment_method']
    }
    
    conn = get_db()
    c = conn.cursor()
    c.execute('''INSERT INTO transactions
                 (PK, SK, GSI1_PK, GSI1_SK, amount, type, category,
                  description, date, payment_method)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                 (transaction['PK'], transaction['SK'], transaction['GSI1_PK'],
                  transaction['GSI1_SK'], transaction['amount'], transaction['type'],
                  transaction['category'], transaction['description'],
                  transaction['date'], transaction['payment_method']))
    conn.commit()
    conn.close()
    
    return jsonify(transaction), 201

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', debug=True) 