import React, { useState } from 'react';
import '../css/ErrrorIndicator.css';


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
            <p className={internet ? 'green' : 'red'}> Internet</p>
        </>
    )
}

export default ErrrorIndicator;