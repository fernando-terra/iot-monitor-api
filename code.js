var db = require('./database/connection');

module.exports = {
    buscarAtuadores : (res, param) => {
                
        var sql = "SELECT * FROM iot.atuadores";
        
        if(param != null && parseInt(param) > 0){
            sql += " WHERE id = " + parseInt(param);
        }

        db.executeSqlQuery(sql, (data) => {             
            res(data);
        });        
    },

    cadastrarAtuador: (res, param) => {
        var sql = "";

        sql += "INSERT INTO iot.atuadores (nome, porta) VALUES ('";
        sql += param.nome + "',";
        sql += param.porta;
        sql += ")";

        db.executeSqlQuery(sql, (data) => {             
            res(data.affectedRows > 0);
        });
    },

    atualizarAtuador : (res, param) => {
        var sql = "";

        sql += "UPDATE iot.atuadores SET";
        sql += " nome = '" + param.nome + "'";
        sql += ", porta = " + param.porta;
        sql += " WHERE id = " + parseInt(param.id);

        db.executeSqlQuery(sql, (data) => {             
            res(data.affectedRows > 0);
        });  
    },

    deletarAtuador: (res, param) => {
        var sql = "DELETE FROM iot.atuadores WHERE id = " + param.id;

        db.executeSqlQuery(sql, (data) => {     
            res(data.affectedRows > 0);
        });
    },

    buscarSensores : (res, param) => {
                
        var sql = "SELECT * FROM iot.sensores";
        
        if(param != null && parseInt(param) > 0){
            sql += " WHERE id = " + parseInt(param);
        }

        db.executeSqlQuery(sql, (data) => {             
            res(data);
        });        
    },

    buscarLog : (res, param) => {
                
        var sql = "SELECT * FROM iot.log";
        
        if(param != null && parseInt(param) > 0){
            sql += " WHERE id = " + parseInt(param);
        }

        db.executeSqlQuery(sql, (data) => {             
            res(data);
        });        
    },

    gravarLog : (res, param) => {
                
        var sql = "INSERT INTO iot.log"
                + "(data, origem, topico, mensagem)"
                + "VALUES"
                + "(SYSDATE(),'" + param.source + "', '" + param.topic + "', '" + JSON.stringify(param.data) +"')"

        db.executeSqlQuery(sql, (data) => {             
            res(data);
        });
    }
}