import React, { Component } from 'react';
import { io } from "socket.io-client";


import AudioVisualizer from './AudioVisualizer';

import '../css/Record.css';
import micOn from '../assets/img/mic_on.png';
import micOff from '../assets/img/mic_off.png';

import { connect, sendMsg, getConnectionStatus } from "./websocket_api";

import '../css/ErrrorIndicator.css';

const ENDPOINT = "ws://localhost:8000";
connect();

class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            echoRecording: false,
            errorRecording: true,
            audioVisuals: 0
        };

        // this.socket = io(ENDPOINT);
        // this.socket.emit('echo', { text: 'Hello world.' }, function(response) {
        //     console.log(response);
        //   });

        // this.socket.on("connect_error", (err) => {
        //     this.setState({ errorRecording: true });
        //     console.log("error conneting to", err);
        // });
        // this.socket.on("connect", () => {
        //     console.log(this.socket.id);
        //     this.setState({ errorRecording: false });

        // });
    }

    componentDidMount() {
        setInterval(() => {
            this.setState(() => ({ errorRecording: getConnectionStatus() }))
        }, 2000)
    }


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

    // connetionCheck = setInterval(() => {
    //     console.log(getConnectionStatus())
    // }, 2000)
    // connetionCheck();



    getBufferCallback(buffers) {
        let audioData = buffers[0].length % 7
        this.setState({ audioVisuals: audioData })
        console.log(audioData)

    }


    startRecordingAudio = async () => {

        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        this.audioContext = new AudioContext();
        this.input = this.audioContext.createMediaStreamSource(this.stream);

        this.rec = new Recorder(this.input, { numChannels: 1 })
        this.rec.record();

        let audioVisualizerInterval = setInterval(() => {
            const { recording } = this.state;
            if (!recording) {
                clearInterval(audioVisualizerInterval);
                this.rec.clear();
            }
            this.rec.getBuffer(buffers => {
                let audioData = buffers[0].length % 7
                this.setState({ audioVisuals: audioData })
            })
        }, 300)



        let interval = setInterval(() => {
            const { recording } = this.state;
            if (!recording) {
                clearInterval(interval);
                this.rec.clear();
            }
            console.log("working after intrval")
            this.rec.exportWAV(blob => {
                this.rec.clear();
                console.log(blob);
                sendMsg(blob)

            })
        }, 5000)


    }
    stopRecordingAudio = async () => {
        this.rec.stop();
    }

    sendMessage = () => {
        this.socket.emit('text', { text: "sample message" })
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
        const { recording, audioVisuals, errorRecording } = this.state;
        return (
            <>
                <div className="record-wrap">
                    <img className='mic' src={recording ? micOn : micOff} alt="" id="imgplus" onClick={() => { this.recordAudio(!recording) }} />
                    <AudioVisualizer data={audioVisuals} />
                    <span className={errorRecording ? 'dot-red' : 'dot-green'}></span>
                </div>
                {/* <img className='mic' src={echoRecording ? echoMicOn : echoMicOff} alt="" id="imgplus" onClick={this.echo} /> */}
                {/* <button onClick={this.sendMessage}> Send Message</button> */}
            </>
        )
    }
}

export default Record;