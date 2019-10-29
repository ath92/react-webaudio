import React, { FC, useState } from 'react';
import GainNode from '../web-audio/GainNode';
import OscillatorNode from '../web-audio/OscillatorNode';

const gainRange = 100;

const GainOscillator: FC = props => {
    const [frequency, setFrequency] = useState(100);
    const [type, setType] = useState<OscillatorType>('sine');
    const [gain, setGain] = useState(1);

    return (
        <GainNode gain={gain}>
            <OscillatorNode type={type} frequency={frequency}>
                {/* UI part */}
                <div>
                    <label>
                        Gain
                        <input 
                            type="range"
                            onChange={e => setGain(parseInt(e.target.value) / gainRange)}
                            min="1"
                            max={gainRange}
                        />
                    </label>
                    <label>
                        Oscillator type
                        <select onChange={e => setType(e.target.value as OscillatorType)}>
                            <option>sine</option>
                            <option>square</option>
                            <option>sawtooth</option>
                            <option>triangle</option>
                        </select>
                    </label>
                    <label>
                        Frequency
                        <input
                            type="range"
                            onChange={e => setFrequency(parseInt(e.target.value))}
                            min="1"
                            max="20000"
                        />
                    </label>
                </div>
                { props.children }
            </OscillatorNode>
        </GainNode>
    );
};

export default GainOscillator;