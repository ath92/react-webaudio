import React, { FC, useContext, useEffect, useState } from 'react';
import DestinationContext from '../context/DestinationContext';
import AudioContextContext from '../context/AudioContextContext';

const gainRange = 100;

interface Props {
    frequency?: number,
    detune?: number,
    Q?: number,
    gain?: number,
    type?: string,
}

const BiQuadFilterNode: FC<Props> = props => {
    const audioCtx = useContext(AudioContextContext);
    const destination = useContext(DestinationContext);
    const [frequency, setFrequency] = useState(props.frequency || 100);
    const [gain, setGain] = useState(props.gain || 1);
    const [filterNode] = useState<BiquadFilterNode>(audioCtx.createBiquadFilter());

    // connect node
    useEffect(() => {
        filterNode.connect(destination);
        return () => filterNode.disconnect(destination);
    }, [audioCtx]);

    // handle updates to gain
    useEffect(() => {
        filterNode.gain.setValueAtTime(gain, audioCtx.currentTime);
    }, [gain]);

    // handle updates to frequency
    useEffect(() => {
        filterNode.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    }, [frequency]);

    const onGainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) / gainRange;
        setGain(value);
    }

    const onFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        setFrequency(value);
    }

    const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        filterNode.type = e.target.value as BiquadFilterType;
    }

    return (
        <div>
            <label>
                Type:
                <select onChange={onTypeChange}>
                    <option>lowpass</option>
                    <option>highpass</option>
                    <option>bandpass</option>
                    <option>lowshelf</option>
                    <option>highshelf</option>
                    <option>notch</option>
                    <option>allpass</option>
                </select>
            </label>

            <label>
                Frequency:
                <input type="range" value={frequency} min="0" max="20000" onChange={onFrequencyChange} />
            </label>

            <label>
                Gain:
                <input type="range" value={gain * gainRange} min="0" max={gainRange} onChange={onGainChange} />
            </label>

            <DestinationContext.Provider value={filterNode}>
                { props.children }
            </DestinationContext.Provider>
        </div>
    );
}

export default BiQuadFilterNode;