const mysql   = require('mysql');
module.exports = {          
    connect: function(callback) {
        var sucesso = false;
        var mensagem = "";    
        const connection = mysql.createConnection({
            host     : '127.0.0.1',
            port     : 3306,
            user     : 'iot',
            password : 'masterkey',
            database : 'mysql'
        });   

        connection.connect(function(err){
            if(err) {
                sucesso = false;
                mensagem = err;
            }
            else{
                sucesso = true;
                mensagem = 'Connected..';
            }
        
            callback({
                'sucesso':sucesso,
                'mensagem':mensagem
            });
        });
    }
}