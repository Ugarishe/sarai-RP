//init Commands file
require('./commands.js')

//init Events file
require('./events.js')

require('./Respawn');

require('./LogRegMenu');

var mysql = require('mysql'); // подключаем библиотеку к скрипту

var connection = mysql.createConnection({ // настройки подключения к базе данных
    host     : 'mysql96.1gb.ru',
    user     : 'gb_sarairp',
    password : 'Kz37JwK-ejwY',
    database : 'gb_sarairp'
});

connection.connect(function(err) { // подключаемся
    if (err) { // в случае ошибки в err будет объект ошибки
        console.error('Ошибка подключения: ' + err.stack);
        return;
    }

    console.log('Успешное подключение к базе данных ');
});