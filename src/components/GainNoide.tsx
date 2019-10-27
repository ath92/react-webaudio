import React, { FC, useContext, useEffect, useState } from 'react';
import DestinationContext from '../context/DestinationContext';
import AudioContextContext from '../context/AudioContextContext';

const range = 100; // range input uses integers, but gain is a float from 0 to 1, so we need a range of ints to convert

interface Props {
    gain?: number
}

const GainNode: FC<Props> = props => {
    const audioCtx = useContext(AudioContextContext);
    const destination = useContext(DestinationContext);
    const [gain, setGain] = useState(props.gain || 1);
    const [gainNode] = useState<GainNode>(audioCtx.createGain());

    // connect node
    useEffect(() => {
        gainNode.connect(destination);
        return () => gainNode.disconnect(destination);
    }, [audioCtx]);

    // handle updates to gain
    useEffect(() => {
        gainNode.gain.value = gain;
    }, [gain]);

    const onGainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) / range;
        setGain(value);
    }

    return (
        <div>
            <label>
                Gain:
                <input type="range" value={gain * range} min="0" max={range} onChange={onGainChange} />
            </label>
            <DestinationContext.Provider value={gainNode}>
                { props.children }
            </DestinationContext.Provider>
        </div>
    );
}

export default GainNode;