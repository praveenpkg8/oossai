import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Modal from '@material-ui/core/Modal';

import '../css/MouseControl.css';
import cursorPointer from '../assets/img/cursor.png';



const rand = () => {
    return Math.round(Math.random() * 20) - 10;
}

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

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}



const SliderPop = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
            <div className={classes.root} >
                <Slider defaultValue={30} value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
            </div>
    );
}


const MouseControl = () => {



    const [modalStyle] = React.useState(getModalStyle);
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