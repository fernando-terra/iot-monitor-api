const express = require('express');
var db        = require('./database/connection')

//SETUP
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//ROUTES
const router = express.Router();
router.get('/', (req, res) => { 
    db.connect(function(result){
        console.log(result);
        res.send(result);
    });
});

//STARTUP
app.use('/', router);
app.listen(port);