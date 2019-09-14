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
                
        /*var sql = "INSERT INTO iot.log VALUES (" + param.id +"," + param.data + "," + ")";

        db.executeSqlQuery(sql, (data) => {             
            res(data);
        });*/

        console.log("Gravando log...");
    }
}