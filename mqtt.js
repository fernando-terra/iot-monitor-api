var helpers   = require('./helpers/utils')
const paho    = require('paho-mqtt');

const broker = {
    host: "192.168.100.12",
    port: 9001,
    client: "api-" + helpers.uuidv4()
}

var ConnectionStatus = false;
var reconnect = false;

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

function onConnect() {
  client.subscribe("raspberrypi/monitor/sensors");
  client.subscribe("raspberrypi/monitor/components");

  ConnectionStatus = true;
  var data = {
    status: ConnectionStatus,
    message: "Conexão estabelecida",
    data: null
  }
  reconnect = false;
}

function doFail(e){
  var data = {
    status: ConnectionStatus,
    message: "Estabelecendo conexão...",
    data: null
  }
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {   
    ConnectionStatus = false;
    var data = {
        status: ConnectionStatus,
        message: "Conexão perdida. Erro: " + responseObject.errorMessage
    }          
    reconnect = true;   
  }
}

function onMessageArrived(message) {
    var data = {
        status: ConnectionStatus,
        message: "Conexão estabelecida",
        data: JSON.parse(message.payloadString)
    }

    console.log(JSON.stringify(data.data), message.destinationName);
}

module.exports = {
    listen: () => {
        console.log(broker.client);
        connectBroker();
    }
};