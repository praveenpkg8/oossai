import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Modal from '@material-ui/core/Modal';
import { io } from "socket.io-client";


import '../css/MouseControl.css';
import cursorPointer from '../assets/img/cursor.png';

const ENDPOINT = "http://127.0.0.1:5000";


const useStyles = makeStyles({
    root: {
        margin: 25,
        width: 200,
        background: "#424242",
        border: "1px solid  #fc5758",
    },
    thumb: {
        backgroundColor: 'white',
    },
});

const socket = io(ENDPOINT);


const SliderPop = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(30);

    socket.on("connect_error", (err) => {
        setState({ errorRecording: true });
        console.log("error conneting to");
    });
    socket.on("connect", () => {
        console.log(socket.id);
        setState({ errorRecording: false });
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
        socket.emit('mouse', { re: newValue })
    };


    return (
            <div className={classes.root} >
                <Slider defaultValue={30} value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
            </div>
    );
}


const MouseControl = () => {


    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <img className='pointer' src={cursorPointer} onClick={handleOpen} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <SliderPop />
            </Modal>
        </>
    );
}

export default MouseControl;