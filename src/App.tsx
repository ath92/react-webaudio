import React from 'react';
import OscillatorNode from './components/OscillatorNode';
import AudioContextNode from './components/AudioContextNode';
import GainNode from './components/GainNoide';

const App: React.FC = () => {
  return (
    <AudioContextNode>
      <OscillatorNode />
      <GainNode>
        <OscillatorNode />
      </GainNode>
    </AudioContextNode>
  );
}

export default App;
