const mysql   = require('mysql');
module.exports = {          
    executeSqlQuery: (sql, res) => {
        const connection = mysql.createConnection({
            host     : '127.0.0.1',
            port     : 3306,
            user     : 'iot',
            password : 'masterkey',
            database : 'mysql'
        });   

        connection.query(sql, (error, results, fields) => {
            error ? res(error) : res(results);        
            connection.end();
        });
    }
}