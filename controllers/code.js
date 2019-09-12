var db = require('../database/connection')

module.exports = {
    atuadores : function(callback) {
        db.connect(function(result){
            callback(result);
        });
    }
}