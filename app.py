from flask import Flask, request, jsonify, render_template
import sqlite3
import os

app = Flask(__name__)

# Инициализация базы данных
def init_db():
    if not os.path.exists('finance.db'):  # Проверка существования файла базы данных
        conn = sqlite3.connect('finance.db')  # Подключение к базе данных
        c = conn.cursor()  # Создание курсора для выполнения SQL-запросов
        c.execute('''
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,  # Уникальный идентификатор транзакции
                company TEXT NOT NULL,  # Название компании
                type TEXT NOT NULL,  # Тип транзакции (покупка/продажа)
                quantity INTEGER NOT NULL,  # Количество
                price REAL NOT NULL  # Цена
            )
        ''')
        conn.commit()  # Сохранение изменений
        conn.close()  # Закрытие соединения с базой данных

# Запуск функции инициализации базы данных
init_db()

@app.route('/')
def index():
    return render_template('index.html')  # Отображение главной страницы

@app.route('/transactions', methods=['GET', 'POST'])
def manage_transactions():
    conn = sqlite3.connect('finance.db')  # Подключение к базе данных
    c = conn.cursor()  # Создание курсора для выполнения SQL-запросов

    if request.method == 'POST':  # Если запрос типа POST
        data = request.get_json()  # Получение данных из запроса в формате JSON
        c.execute('INSERT INTO transactions (company, type, quantity, price) VALUES (?, ?, ?, ?)',
                  (data['company'], data['type'], data['quantity'], data['price']))  # Вставка новой транзакции в базу данных
        conn.commit()  # Сохранение изменений
        conn.close()  # Закрытие соединения с базой данных
        return jsonify({'message': 'Transaction added successfully'}), 201  # Возврат сообщения об успешном добавлении

    if request.method == 'GET':  # Если запрос типа GET
        c.execute('SELECT * FROM transactions')  # Получение всех транзакций из базы данных
        transactions = c.fetchall()  # Извлечение всех транзакций
        conn.close()  # Закрытие соединения с базой данных
        return jsonify(transactions)  # Возврат транзакций в формате JSON

@app.route('/transactions/<int:transaction_id>', methods=['PUT', 'DELETE'])
def modify_transaction(transaction_id):
    conn = sqlite3.connect('finance.db')  # Подключение к базе данных
    c = conn.cursor()  # Создание курсора для выполнения SQL-запросов

    if request.method == 'PUT':  # Если запрос типа PUT
        data = request.get_json()  # Получение данных из запроса в формате JSON
        c.execute('''
            UPDATE transactions
            SET company = ?, type = ?, quantity = ?, price = ?
            WHERE id = ?
        ''', (data['company'], data['type'], data['quantity'], data['price'], transaction_id))  # Обновление транзакции по указанному идентификатору
        conn.commit()  # Сохранение изменений
        conn.close()  # Закрытие соединения с базой данных
        return jsonify({'message': 'Transaction updated successfully'})  # Возврат сообщения об успешном обновлении

    if request.method == 'DELETE':  # Если запрос типа DELETE
        c.execute('DELETE FROM transactions WHERE id = ?', (transaction_id,))  # Удаление транзакции по указанному идентификатору
        conn.commit()  # Сохранение изменений
        conn.close()  # Закрытие соединения с базой данных
        return jsonify({'message': 'Transaction deleted successfully'})  # Возврат сообщения об успешном удалении

if __name__ == '__main__':
    app.run(debug=True)  # Запуск приложения Flask в режиме отладки