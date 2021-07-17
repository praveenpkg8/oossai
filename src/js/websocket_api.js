const socket = new WebSocket("ws://localhost:8080/ws");
socket.binaryType = "arraybuffer";
let errorConnection = true;

let connect = () => {
  console.log("Attempting Connection...");

  socket.onopen = () => {
    console.log("Successfully Connected");
    errorConnection = false;
  };

  socket.onmessage = msg => {
    console.log(msg);
    console.log(typeof(msg))
  };

  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    errorConnection = true;
  };

  socket.onerror = error => {
    console.log("Socket Error: ", error);
    errorConnection = true;
  };
  return errorConnection
};

let getConnectionStatus = () => {
  return errorConnection
}

let sendMsg = data => {
  console.log("sending msg type: ", typeof(data));
  console.log("sending msg: ", data);
  socket.send(data);
};

export { connect, sendMsg, getConnectionStatus };
