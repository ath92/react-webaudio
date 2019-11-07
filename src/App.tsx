import React, { useState } from "react";
import OscillatorNode from "./components/web-audio/OscillatorNode";
import AudioContextNode from "./components/web-audio/AudioContextNode";
import GainNode from "./components/web-audio/GainNode";
import BiQuadFilterNode from './components/web-audio/BiQuadFilterNode';
import StepSequencer from './components/ui/StepSequencer';
import ADSREnvelope from './types/ADSREnvelope';

import GainOscillator from "./components/ui/GainOscillator";

const App: React.FC = () => {
  const [makeNoise, setMakeNoise] = useState(false);
  const [baseFrequency, setBaseFrequency] = useState(50);

  const envelope: ADSREnvelope = {
    attack: 0.01,
    decay: 0.1,
    sustain: 0.5,
    release: 0.2
  };

  const renderSynth = () => {
    if (!makeNoise) return;
    return (
      <AudioContextNode>
        {/* <BiQuadFilterNode type="lowpass" frequency={
            <GainNode gain={20}>
              <GainOscillator>filter gain</GainOscillator>
            </GainNode>
          }>
          <OscillatorNode type="sine" frequency={
            <GainNode gain={100}>
            </GainNode>
          } />
        </BiQuadFilterNode> */}

        <StepSequencer envelope={envelope} sourceNode={
          <OscillatorNode frequency={
              <GainOscillator />
            } detune={
              <GainOscillator>oscillator frequency</GainOscillator>
            } type="square" />
          } />
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
