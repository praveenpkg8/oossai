import React, { useState } from 'react';
import '../css/ErrrorIndicator.css';
import wifiOn from '../assets/img/wifiOn.png';
import wifiOff from '../assets/img/wifiOff.png';


const ErrrorIndicator = () => {
    const [internet, setInternet] = useState(window.navigator.onLine);

    const checkInternet = () => {
        setInternet(window.navigator.onLine);
    }

    setInterval(() => {
        checkInternet();
    }, 2000)


    return (
        <>
            <img className='wifi' src={internet ? wifiOn : wifiOff} alt="" />
        </>
    )
}

export default ErrrorIndicator;