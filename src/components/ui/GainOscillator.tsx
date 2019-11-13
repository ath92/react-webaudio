import React, { FC, useState } from "react";
import Gain from "../web-audio/Gain";
import Oscillator from "../web-audio/Oscillator";
import AudioParamProp from "../../types/AudioParamProp";

const gainRange = 100;

interface Props {
  frequency?: AudioParamProp;
}

const GainOscillator: FC<Props> = props => {
  const [frequency, setFrequency] = useState(
    typeof props.frequency === "number" ? props.frequency : 440
  );
  const [type, setType] = useState<OscillatorType>("sine");
  const [gain, setGain] = useState(1);

  return (
    <Gain gain={gain}>
      <Oscillator type={type} frequency={frequency}>
        <div>
          <label>
            Gain
            <input
              type="range"
              onChange={e => setGain(parseInt(e.target.value, 10))}
              value={gain}
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
              onChange={e => setFrequency(parseInt(e.target.value, 10))}
              min="1"
              max="200"
            />
          </label>
        </div>
        {props.children}
      </Oscillator>
    </Gain>
  );
};

export default GainOscillator;
