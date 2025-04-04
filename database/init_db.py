import sqlite3

def init_database():
    conn = sqlite3.connect("/data/transactions.db")
    c = conn.cursor()
    c.execute("""CREATE TABLE IF NOT EXISTS transactions
                 (PK TEXT, SK TEXT, GSI1_PK TEXT, GSI1_SK TEXT,
                  amount REAL, type TEXT, category TEXT,
                  description TEXT, date TEXT, payment_method TEXT)""")
    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_database() 