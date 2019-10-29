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
    const [oscillator] = useState(audioCtx.createOscillator());

    useEffect(() => {
        oscillator.connect(destination);
        oscillator.start();
        return () => {
            oscillator.stop();
            oscillator.disconnect(destination);
        }
    }, []);

    useEffect(() => {
        oscillator.type = props.type;
    }, [props.type]);

    useEffect(() => {
        if (!oscillator) return;
        oscillator.frequency.setValueAtTime(props.frequency, audioCtx.currentTime);
    }, [props.frequency, oscillator]);
    
    return (
        <React.Fragment>
            { props.children }
        </React.Fragment>
    );
}

export default OscillatorComponent;