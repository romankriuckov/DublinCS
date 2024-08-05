document.addEventListener('DOMContentLoaded', function() {
    loadTransactions();  // Загрузка транзакций при загрузке страницы
    
    document.getElementById('addTransactionBtn').addEventListener('click', function() {
        const transactionList = document.getElementById('transactionList');  // Получение элемента списка транзакций
        const tr = document.createElement('tr');  // Создание новой строки таблицы
        tr.innerHTML = `
            <td contenteditable="true">New Company</td>
            <td>
                <select>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select>
            </td>
            <td contenteditable="true">0</td>
            <td contenteditable="true">0</td>
            <td>0</td>
            <td>
                <button class="save-btn">Save</button>
                <button class="delete-btn">Delete</button>
            </td>
        `;
        transactionList.appendChild(tr);  // Добавление новой строки в таблицу

        tr.querySelector('.save-btn').addEventListener('click', function() {
            saveNewTransaction(tr);  // Сохранение новой транзакции
        });

        tr.querySelector('.delete-btn').addEventListener('click', function() {
            transactionList.removeChild(tr); // Удалить недавно добавленную строку, если не сохранена
        });
    });
});

function loadTransactions() {
    fetch('/transactions')  // Запрос на получение всех транзакций
        .then(response => response.json())  // Преобразование ответа в формат JSON
        .then(data => {
            const transactionList = document.getElementById('transactionList');  // Получение элемента списка транзакций
            transactionList.innerHTML = '';  // Очистка существующего списка
            data.forEach(transaction => {  // Для каждой транзакции
                const tr = document.createElement('tr');  // Создание новой строки таблицы
                tr.innerHTML = `
                    <td contenteditable="true">${transaction[1]}</td>
                    <td>
                        <select>
                            <option value="Buy" ${transaction[2] === 'Buy' ? 'selected' : ''}>Buy</option>
                            <option value="Sell" ${transaction[2] === 'Sell' ? 'selected' : ''}>Sell</option>
                        </select>
                    </td>
                    <td contenteditable="true">${transaction[3]}</td>
                    <td contenteditable="true">${transaction[4]}</td>
                    <td>${transaction[3] * transaction[4]}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                        <button class="save-btn" style="display:none;">Save</button>
                    </td>
                `;
                transactionList.appendChild(tr);  // Добавление строки в таблицу

                tr.querySelector('.delete-btn').addEventListener('click', function() {
                    deleteTransaction(transaction[0]);  // Удаление транзакции по идентификатору
                });

                tr.querySelector('.edit-btn').addEventListener('click', function() {
                    editTransaction(transaction[0], tr);  // Режим редактирования транзакции
                });

                tr.querySelector('.save-btn').addEventListener('click', function() {
                    saveTransaction(transaction[0], tr);  // Сохранение изменений в транзакции
                });
            });
        });
}

function deleteTransaction(id) {
    fetch(`/transactions/${id}`, {  // Запрос на удаление транзакции по идентификатору
        method: 'DELETE'
    })
    .then(response => response.json())  // Преобразование ответа в формат JSON
    .then(data => {
        console.log(data);  // Вывод сообщения об успешном удалении в консоль
        loadTransactions();  // Перезагрузка списка транзакций
    });
}

function editTransaction(id, row) {
    row.querySelectorAll('td').forEach((cell, index) => {  // Проход по всем ячейкам строки
        if (index === 1) {
            cell.querySelector('select').disabled = false;  // Включение возможности выбора типа транзакции
        } else if (index < 4) {
            cell.contentEditable = "true";  // Установка возможности редактирования для ячеек
        }
    });
    row.querySelector('.edit-btn').style.display = "none";  // Скрытие кнопки редактирования
    row.querySelector('.save-btn').style.display = "inline";  // Показ кнопки сохранения
}

function saveTransaction(id, row) {
    const updatedTransaction = {  // Обновленные данные транзакции
        company: row.cells[0].textContent,
        type: row.cells[1].querySelector('select').value,
        quantity: row.cells[2].textContent,
        price: row.cells[3].textContent
    };

    fetch(`/transactions/${id}`, {  // Запрос на обновление транзакции по идентификатору
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'  // Установка типа содержимого как JSON
        },
        body: JSON.stringify(updatedTransaction)  // Отправка обновленных данных в формате JSON
    })
    .then(response => response.json())  // Преобразование ответа в формат JSON
    .then(data => {
        console.log(data);  // Вывод сообщения об успешном обновлении в консоль
        loadTransactions();  // Перезагрузка списка транзакций
    });
}

function saveNewTransaction(row) {
    const newTransaction = {  // Данные новой транзакции
        company: row.cells[0].textContent,
        type: row.cells[1].querySelector('select').value,
        quantity: row.cells[2].textContent,
        price: row.cells[3].textContent
    };

    fetch('/transactions', {  // Запрос на добавление новой транзакции
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Установка типа содержимого как JSON
        },
        body: JSON.stringify(newTransaction)  // Отправка данных новой транзакции в формате JSON
    })
    .then(response => response.json())  // Преобразование ответа в формат JSON
    .then(data => {
        console.log(data);  // Вывод сообщения об успешном добавлении в консоль
        loadTransactions();  // Перезагрузка списка транзакций
    });
}