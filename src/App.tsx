import React from 'react';
import OscillatorNode from './components/OscillatorNode';
import AudioContextNode from './components/AudioContextNode';
import GainNode from './components/GainNoide';
import BiQuadFilterNode from './components/BiQuadFilterNode';

const App: React.FC = () => {
  return (
    <AudioContextNode>
      <BiQuadFilterNode>
        <OscillatorNode />
      </BiQuadFilterNode>
      <OscillatorNode />
      <GainNode>
        <OscillatorNode />
      </GainNode>
    </AudioContextNode>
  );
}

export default App;
