var helpers   = require('./helpers/utils');
const paho    = require('paho-mqtt');
const code    = require('./code');

const broker = {
    host: "192.168.100.12",
    port: 9001,
    client: "api-" + helpers.uuidv4()
}

var ConnectionStatus = false;
var reconnect = false;
var tentativas = 0;

function connectBroker() {
  if(!ConnectionStatus){      
    client = new paho.Client(broker.host, broker.port, broker.client);
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    var options = {
      useSSL: false,
    //  userName: "username",
    //  password: "password",
      timeout: 10,
      onSuccess:onConnect,
      onFailure:doFail
    }

    client.connect(options);
  }
}

function onReconnect(){
  if(reconnect){      
    setTimeout(() => { 
      console.log("(" + (++tentativas).toString() + ")Estabelecendo conexão...");
      connectBroker(); 
    }, 5000); 
  } 
}

function onConnect() {
  client.subscribe("raspberrypi/monitor/sensors");
  client.subscribe("raspberrypi/monitor/components");

  ConnectionStatus = true;
  reconnect = false;
  
  console.log("Conexão estabelecida");
  tentativas = 0;
}

function doFail(e){
  onReconnect();
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {   
    ConnectionStatus = false;        
    reconnect = true;   

    console.log("Conexão perdida");
    onReconnect();
  }
}

function onMessageArrived(message) {
    var data = {
        source: broker.client,
        topic: message.destinationName,
        status: ConnectionStatus,
        message: "Conexão estabelecida",
        data: JSON.parse(message.payloadString)
    }

    code.gravarLog(() => {}, data);
}

module.exports = {
    listen: () => {
        console.log(broker.client);
        connectBroker();
    }
};