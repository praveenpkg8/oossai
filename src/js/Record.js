import React, { Component } from 'react';
import { io } from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWifi } from '@fortawesome/free-solid-svg-icons'


import '../css/Record.css';
import micOn from '../assets/img/mic_on.png';
import micOff from '../assets/img/mic_off.png';
import echoMicOn from '../assets/img/mic_on1.png';
import echoMicOff from '../assets/img/mic_off1.png';
import wifiOn from '../assets/img/wifiOn.png';
import wifiOff from '../assets/img/wifiOff.png';





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
        this.rec.stop();
    }

    sendMessage = () => {
        this.socket.emit('text', {text: "sample message"})
        this.socket.on('re_text', (data) => {
            console.log(data)
        })
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


    render() {
        const { recording, echoRecording, errorRecording } = this.state;
        return (
            <>
                <span className={errorRecording ? 'dot-red' : 'dot-green'}></span>
                <img className='mic' src={recording ? micOn : micOff} alt="" id="imgplus" onClick={() => {this.recordAudio(!recording)}} />
                <img className='mic' src={echoRecording ? echoMicOn : echoMicOff} alt="" id="imgplus" onClick={this.echo} />
                <button onClick={this.sendMessage}> Send Message</button>
            </>
        )
    }
}

export default Record;