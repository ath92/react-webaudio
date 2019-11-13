import React, { useState } from "react";
import OscillatorNode from "./components/web-audio/OscillatorNode";
import AudioContextNode from "./components/web-audio/AudioContextNode";
import GainNode from "./components/web-audio/GainNode";
import BiQuadFilterNode from "./components/web-audio/BiQuadFilterNode";
import DelayNode from "./components/web-audio/DelayNode";
import StepSequencer from "./components/ui/StepSequencer";
import ADSREnvelope from "./types/ADSREnvelope";
import useAudioSourceRef from "./hooks/useAudioSourceRef";
import GainOscillator from "./components/ui/GainOscillator";

const App: React.FC = () => {
  const [makeNoise, setMakeNoise] = useState(false);

  const [sequencerEnvelopeRef, sequencerEnvelope] = useAudioSourceRef();
  const [fromFilter, toDelay] = useAudioSourceRef();

  const envelope: ADSREnvelope = {
    attack: 0.01,
    decay: 0.01,
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
        {/* Add a DelayNode to the current audioContext, with the sequencer as its source */}
        <GainNode gain={0.1}>
          <BiQuadFilterNode type="lowpass" ref={fromFilter}>
            <DelayNode delayTime={0.1} sources={[sequencerEnvelope, toDelay]} />
          </BiQuadFilterNode>
        </GainNode>

        <StepSequencer envelope={envelope} ref={sequencerEnvelopeRef}>
          <OscillatorNode
            frequency={<GainOscillator>oscillator frequency</GainOscillator>}
            detune={<GainOscillator>oscillator detune</GainOscillator>}
            type="square"
          />
        </StepSequencer>
      </AudioContextNode>
    );
  };

  return (
    <>
      <button onClick={() => setMakeNoise(!makeNoise)}>Make some noise!</button>
      {renderSynth()}
    </>
  );
};

export default App;

// now nodes can easily be patched by storing refs (vertices) and connections (edges)
