import React, { useState } from 'react';
import OscillatorNode from './components/web-audio/OscillatorNode';
import AudioContextNode from './components/web-audio/AudioContextNode';
import GainNode from './components/web-audio/GainNode';
import BiQuadFilterNode from './components/web-audio/BiQuadFilterNode';

import GainOscillator from './components/ui/GainOscillator';

const App: React.FC = () => {
  const [makeNoise, setMakeNoise] = useState(false);
  const [baseFrequency, setBaseFrequency] = useState(50);

  const renderSynth = () => {
    if (!makeNoise) return;
    return (
      <AudioContextNode>
        <GainNode gain={0.1}>
          <BiQuadFilterNode type="lowpass">
            <OscillatorNode type="square" frequency={baseFrequency} />
          </BiQuadFilterNode>
          <GainNode gain={0.5} gainDestination={ <OscillatorNode type="sine" frequency={5} /> }>
            <OscillatorNode type="sawtooth" frequency={baseFrequency * 3} />
            <OscillatorNode type="sine" frequency={baseFrequency * 4} />
          </GainNode>
        </GainNode>
        <GainOscillator />
      </AudioContextNode>
    );
  }

  return (
    <React.Fragment>
      <button onClick={() => setMakeNoise(!makeNoise)}>Make some noise!</button>
      <button onClick={() => setBaseFrequency(baseFrequency * 2)}>Higher</button>
      { renderSynth() }
    </React.Fragment>
  );
}

export default App;
