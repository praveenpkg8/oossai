import React, { useState } from 'react';
import '../css/AudioVisualizer.css'

const AudioVisualizer = (props) => {
    let visualizer = []
    // let visual = Math.floor((Math.random() * 10) % 7)
    const {data} = props
    console.log(data)
    let visual = data
    for (let i = 0; i < 7; i++) {
        visualizer.push(i > visual ? "visualizer" : "visualizer-trans")
    }
    const visualItem = visualizer.map((object, index) => (
        <span className={`${object} visualizer-${index}`}></span>
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