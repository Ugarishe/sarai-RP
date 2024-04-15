//init Commands file
require('./commands.js')

//init Events file
require('./events.js')

require('./Respawn');

require('./LogRegMenu');

var mysql = require('mysql'); // подключаем библиотеку к скрипту

var connection = mysql.createConnection({ // настройки подключения к базе данных
    host     : 'mysql104.1gb.ru',
    user     : 'gb_sarairp2',
    password : 'N8-S3CjZVAwS',
    database : 'gb_sarairp2'
});

connection.connect(function(err) { // подключаемся
    if (err) { // в случае ошибки в err будет объект ошибки
        console.error('Ошибка подключения: ' + err.stack);
        return;
    }

    console.log('Успешное подключение к базе данных ');
});

// connection.query('SELECT * FROM userData', function (error, results) {
//     console.log(results);
// });

// connection.query('INSERT INTO userData SET username = ?, passHash = ?, email = ?, social = ?, hwid = ?, ip = ?, dataCreate = ?, donateCount = ?', ['username', 'passHash', 'email', 'social', 'hwid', 'ip', Date.now(), 10], function(error, results, fields) {
//     if (error) {
//         console.error('Ошибка при выполнении запроса:', error);
//         throw error; // Либо обработайте ошибку по вашему усмотрению
//     }
//     console.log('Данные успешно вставлены:', results);
// });
