import React, { useState } from "react";
import OscillatorNode from "./components/web-audio/OscillatorNode";
import AudioContextNode from "./components/web-audio/AudioContextNode";
import GainNode from "./components/web-audio/GainNode";
import BiQuadFilterNode from './components/web-audio/BiQuadFilterNode';

import GainOscillator from "./components/ui/GainOscillator";

const App: React.FC = () => {
  const [makeNoise, setMakeNoise] = useState(false);
  const [baseFrequency, setBaseFrequency] = useState(50);

  const renderSynth = () => {
    if (!makeNoise) return;
    return (
      <AudioContextNode>
        <BiQuadFilterNode type="lowpass" frequency={
            <GainNode gain={200}>
              <GainOscillator>filter gain</GainOscillator>
            </GainNode>
          }>
          <OscillatorNode type="sine" frequency={
            <GainNode gain={200}>
              <OscillatorNode frequency={baseFrequency} detune={
                <GainOscillator>oscillator frequency</GainOscillator>
              } type="square" />
            </GainNode>
          } />
        </BiQuadFilterNode>
      </AudioContextNode>
    );
  };

  return (
    <React.Fragment>
      <button onClick={() => setMakeNoise(!makeNoise)}>Make some noise!</button>
      <button onClick={() => setBaseFrequency(baseFrequency * 2)}>
        Higher
      </button>
      {renderSynth()}
    </React.Fragment>
  );
};

export default App;
