import React, { FC } from 'react';
import AudioContextContext from '../context/AudioContextContext';
import DestionationContext from '../context/DestinationContext';

const AudioContextNode: FC = props => {
    const audioContext = new AudioContext();
    return (
        <AudioContextContext.Provider value={audioContext}>
            <DestionationContext.Provider value={audioContext.destination}>
                { props.children }
            </DestionationContext.Provider>
        </AudioContextContext.Provider>
    );
}

export default AudioContextNode;