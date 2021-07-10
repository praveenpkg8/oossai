// App.js
import React, { Component } from "react";
// import "./App.css";
import { connect, sendMsg } from "./websocket_api";

class ErrorIndicator extends Component {
  constructor(props) {
    super(props);
    connect();
  }

  send() {
    const _message = JSON.stringify({hello: "world"})
    let encoder = new TextEncoder()
    let view = encoder.encode(_message)
    console.log(JSON.stringify({hello: "world"}));
    console.log(view)
    sendMsg(_message);
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.send}>Hit</button>
      </div>
    );
  }
}

export default ErrorIndicator;