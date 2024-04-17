var mysql = require('mysql'); // подключаем библиотеку к скрипту

var connection = mysql.createConnection({ // настройки подключения к базе данных
    host     : '94.249.192.57',
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

mp.events.add('server::db:adduserInDB', function (player, userLogin, passHash, email) {
    // Проверка существования пользователя с указанным логином, почтой, социальным идентификатором, HWID и IP
        connection.query('SELECT COUNT(*) AS userCount FROM userData WHERE username = ? OR email = ? OR social = ? OR hwid = ? OR ip = ?', 
        [userLogin, email, player.socialClub, player.serial, player.ip], function(error, results, fields) {
        if (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        }

        // Получаем количество записей с существующими данными
        var userCount = results[0].userCount;

        // Если найден хотя бы один существующий пользователь, выдаем ошибку
        if (userCount > 0) {
            player.call('client::LogReg:sendError', ["Указанные данные уже существуют."]);
        } else {
            // Если существующих пользователей не найдено, выполняем запрос на вставку данных
            connection.query('INSERT INTO userData SET username = ?, passHash = ?, email = ?, social = ?, hwid = ?, ip = ?, dataCreate = ?', 
                [userLogin, passHash, email, player.socialClub, player.serial, player.ip, new Date()], function(error, results, fields) {
                if (error) {
                    console.error('Ошибка при выполнении запроса:', error);
                    throw error;
                }
                player.call('client:LogReg:complete');
                player.call('client:LogReg:Close');
            });
        }
        });
});

mp.events.add('server::db:LogRegStartController', function (player) {
    
    ifUserInDb(player)
        .then(results => {
            if (results.length > 0 && results[0].ifSaveUs && String(player.ip) == String(results[0].ip) &&
             String(player.socialClub) == String(results[0].social) && String(player.serial) == String(results[0].hwid)) 
             {
                player.call('client:GMenu:startInterfase');
                player.call('client:LogReg:complete');
            } else {
                player.call('client:showLogRegMenu');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

mp.events.add('server::db:LogReg:LogIn', function (player, userLogin, passHash, userIfSaveUs) {
    ifUserInDb(player, userLogin)
        .then(results => {
            if (results[0].username === userLogin && results[0].passHash === passHash) {
                if (String(player.ip) !== String(results[0].ip) || String(player.socialClub) !== String(results[0].social) || String(player.serial) !== String(results[0].hwid)) {
                    console.error('Подозрение в покупке:\n', results[0], "\nДанные входа\n", player.ip, player.socialClub, player.serial);
                }else{
                    if(userIfSaveUs === "on"){
                        connection.query('UPDATE userData SET ifSaveUs = ? WHERE userid = ?;', 
                        [1, results[0].userid], function(error, results, fields) {
                        if (error) {
                            console.error('Ошибка при выполнении запроса:', error);
                            throw error;
                        }
                    });
                    }   
                }
                player.call('client:GMenu:startInterfase');
                player.call('client:LogReg:complete');
                player.call('client:LogReg:Close');
            } else {
                player.call('client::LogReg:sendError', ["Указанные данные не верны."]);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function ifUserInDb(player, userName){
    
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM userData WHERE username = ? OR social = ? AND hwid = ? OR ip = ?', 
            [userName, player.socialClub, player.serial, player.ip], function(error, results, fields) {
            if (error) {
                console.error('Error executing query:', error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}