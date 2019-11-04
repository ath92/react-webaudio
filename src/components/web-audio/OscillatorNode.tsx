import React, { FC, useState, useEffect, useContext } from 'react';
import AudioContextContext from '../../context/AudioContextContext';
import DestionationContext from '../../context/DestinationContext';
import { useAudioParam } from '../../hooks/useAudioParam';

interface Props {
    frequency?: number | JSX.Element,
    type: OscillatorType,
    detune?: number | JSX.Element,
};

const OscillatorComponent : FC<Props> = props => {
    const audioCtx = useContext(AudioContextContext);
    const destination = useContext(DestionationContext);
    const [oscillator, setOscillator] = useState(audioCtx.createOscillator());
    const frequencyParam = useAudioParam(oscillator, 'frequency', audioCtx, props.frequency);
    const detuneParam = useAudioParam(oscillator, 'detune', audioCtx, props.detune);

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

    return (
        <React.Fragment>
            { props.children }
            { frequencyParam }
            { detuneParam }
        </React.Fragment>
    );
}

export default OscillatorComponent;