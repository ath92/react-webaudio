import React, { useState } from 'react';
import OscillatorNode from './components/OscillatorNode';
import AudioContextNode from './components/web-audio/AudioContextNode';
import GainNode from './components/web-audio/GainNoide';
import BiQuadFilterNode from './components/web-audio/BiQuadFilterNode';

const App: React.FC = () => {
  const [makeNoise, setMakeNoise] = useState(false);
  const [baseFrequency, setBaseFrequency] = useState(50);

  const renderSynth = () => {
    console.log(baseFrequency);
    if (!makeNoise) return;
    return (
      <AudioContextNode>
        <GainNode gain={0.1}>
          <BiQuadFilterNode type="lowpass">
            <OscillatorNode type="square" frequency={baseFrequency} />
          </BiQuadFilterNode>
          <GainNode gain={0.5}>
            <OscillatorNode type="square" frequency={baseFrequency * 3} />
            <OscillatorNode type="sine" frequency={baseFrequency * 4} />
          </GainNode>
        </GainNode>
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
