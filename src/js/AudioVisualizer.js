import React, { useState } from 'react';
import '../css/AudioVisualizer.css';


const makeid = (length) => {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


const AudioVisualizer = (props) => {

    let visualizer = [];
    const { data } = props;
    let visual = data;

    for (let i = 0; i < 7; i++) {
        visualizer.push(i > visual ? "visualizer" : "visualizer-trans");
    };

    const visualItem = visualizer.map((object, index) => (
        <span key={makeid(16)} className={`${object} visualizer-${index}`}></span>
    ));

    return (
        <>
            <div>
                {visualItem}
            </div>
        </>
    )
}

export default AudioVisualizer;