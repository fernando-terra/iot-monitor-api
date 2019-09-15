global.WebSocket = require('ws');
const express    = require('express');
const code       = require('./code');
const mqtt       = require('./mqtt')
const bodyParser = require('body-parser');

//#region SETUP
const app = express();         
const api = express.Router();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//#endregion

//#region ATUADOR 
api.get('/atuador', (req, res) => { 
    var id = req.query.id;
    code.buscarAtuadores((result) => {        
        res.json(result);
    }, id);
});

api.put('/atuador', (req, res) => {
    var obj = { 
        id: req.body.id,
        nome: req.body.nome,
        porta: req.body.porta
    };

    code.atualizarAtuador((result)=>{       
        res.json(result);
    }, obj);
});

api.post('/atuador', (req, res) => {
    var obj = { 
        id: req.body.id,
        nome: req.body.nome,
        porta: req.body.porta
    };

    code.cadastrarAtuador((result)=>{       
        res.json(result);
    }, obj);
});

api.delete('/atuador', (req, res) => {
    var obj = { 
        id: req.body.id
    };

    code.deletarAtuador((result)=>{       
        res.json(result);
    }, obj);
});

//#endregion

//#region SENSOR
api.get('/sensor', (req, res) => { 
    var id = req.query.id;
    code.buscarSensores((result) => {          
        res.json(result);
    }, id);
});

//#endregion

//#region LOG
api.get('/log', (req, res) => { 
    var id = req.query.id;
    code.buscarLog((result) => {          
        res.json(result);
    }, id);
});
//#endregion

//#region STARTUP
app.use((req, res, next)=>{
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();

}, (api));

app.listen(port);
mqtt.listen();
//#endregion