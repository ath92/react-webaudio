import React, { FC, useState, useEffect, useContext } from 'react';
import AudioContextContext from '../context/AudioContextContext';
import DestionationContext from '../context/DestinationContext';

interface Props {
    isOn?: boolean,
    frequency?: number,
    // TODO: type of wave as prop
};

const OscillatorComponent : FC<Props> = props => {
    const audioCtx = useContext(AudioContextContext);
    const destination = useContext(DestionationContext);
    const [oscillator, setOscillator] = useState(audioCtx.createOscillator());
    const [makeNoise, setMakeNoise] = useState(props.isOn || false);
    const [frequency, setFrequency] = useState(props.frequency || 50); // value in hertz

    useEffect(() => {
        if (makeNoise) {
            const node = audioCtx.createOscillator();
            node.type = 'square';
            node.connect(destination);
            node.start();
            setOscillator(node);
            return () => node.stop();
        }
    }, [makeNoise, audioCtx, destination]);

    useEffect(() => {
        if (!oscillator) return;
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    }, [frequency, oscillator, audioCtx.currentTime])

    const toggleNoise = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMakeNoise(e.target.checked);
    }

    const onRange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fq = parseInt(e.target.value);
        if (fq) setFrequency(fq);
    }
    
    return (
        <React.Fragment>
            Make some noise
            <input type="checkbox" onChange={toggleNoise} checked={makeNoise} />
            <input onChange={e => onRange(e)} type="range" min="1" max="200 0" />
        </React.Fragment>
    );
}

export default OscillatorComponent;