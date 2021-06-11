import React, { Component } from 'react';
import { io } from "socket.io-client";

import '../css/ErrrorIndicator.css';

const ENDPOINT = "http://0.0.0.0:5000";

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            echoRecording: false,
            errorRecording: false
        }

        this.socket = io(ENDPOINT);
        this.socket.on("connect_error", (err) => {
            this.setState({ errorRecording: true });
            console.log("error conneting to");
        });
        this.socket.on("connect", () => {
            console.log(this.socket.id);
            this.setState({ errorRecording: false });

        });
        console.log("second")


    }

    componentDidMount() { }


    recordAudio = async (recording) => {

        if (recording) {
            console.log("recording Started");
            this.setState({ recording: true });
            this.startRecordingAudio();
        } else {
            console.log("Recording stoped");
            this.setState({ recording: false });
            this.stopRecordingAudio();
        }



    }
    startRecordingAudio = async () => {

        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        this.audioContext = new AudioContext();
        this.input = this.audioContext.createMediaStreamSource(this.stream);

        this.rec = new Recorder(this.input, { numChannels: 1 })
        this.rec.record();

        let interval = setInterval(() => {
            const { recording } = this.state;
            if(!recording) {
                clearInterval(interval);
                this.rec.clear();
            }
            console.log("working after intrval")
            this.rec.exportWAV(blob => {
                this.rec.clear();
                console.log(blob);
                this.socket.emit('message', { audio: blob, type: 'audio/wav' })
            })
        }, 5000)
        

    }
    stopRecordingAudio = async () => {
        // this.rec.stop();
    }

    sendDownloadFile = (blob) => {
    }

    echo = async () => {
        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        this.audioContext = new AudioContext();
        this.input = this.audioContext.createMediaStreamSource(this.stream);

        this.rec = new Recorder(this.input, { numChannels: 1 })
        this.rec.record();

        this.setState({ echoRecording: true });

        setTimeout(() => {
            this.rec.exportWAV(blob => {
                this.rec.clear();
                console.log(blob);
                this.url = window.URL.createObjectURL(blob);
                window.audio = new Audio();
                window.audio.src = this.url;
                window.audio.play();
                this.setState({ echoRecording: false });
            })
        }, 5000)

    }
    myNotification = new Notification('Foo', {
        body: 'Lorem Ipsum Dolor Sit Amet'
      })


    render() {
        const { recording, echoRecording, errorRecording } = this.state;
        return (
            <>
                <button disabled={echoRecording} onClick={(e) => this.recordAudio(!recording)}>Record</button>
                <button disabled={recording} onClick={this.echo}>Echo</button>
                <p className={errorRecording ? 'red' : 'green'}>Socket</p>
                <button onClick={this.myNotification}>Notify</button>

            </>
        )
    }
}

export default Record;