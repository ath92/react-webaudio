import React, { FC, useState, useEffect, useContext } from 'react';
import AudioContextContext from '../context/AudioContextContext';
import DestionationContext from '../context/DestinationContext';

interface Props {
    frequency: number,
    type: OscillatorType,
};

const OscillatorComponent : FC<Props> = props => {
    const audioCtx = useContext(AudioContextContext);
    const destination = useContext(DestionationContext);
    const [oscillator, setOscillator] = useState(audioCtx.createOscillator());

    useEffect(() => {
        const node = audioCtx.createOscillator();
        node.connect(destination);
        node.start();
        setOscillator(node);
        return () => {
            node.stop();
            node.disconnect(destination);
        }
    }, [destination, audioCtx]);

    useEffect(() => {
        oscillator.type = props.type;
    }, [props.type, oscillator]);

    useEffect(() => {
        if (!oscillator) return;
        oscillator.frequency.setValueAtTime(props.frequency, audioCtx.currentTime);
    }, [props.frequency, oscillator, audioCtx]);
    
    return (
        <React.Fragment>
            { props.children }
        </React.Fragment>
    );
}

export default OscillatorComponent;