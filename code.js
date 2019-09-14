var db = require('./database/connection')

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

    buscarSensores : (res, param) => {
                
        var sql = "SELECT * FROM iot.sensores";
        
        if(param != null && parseInt(param) > 0){
            sql += " WHERE id = " + parseInt(param);
        }

        db.executeSqlQuery(sql, (data) => {             
            res(data);
        });        
    }
}

