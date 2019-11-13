import React, { useState } from "react";
import Oscillator from "./components/web-audio/Oscillator";
import AudioContextProvider from "./components/web-audio/AudioContextProvider";
import Gain from "./components/web-audio/Gain";
import BiQuadFilter from "./components/web-audio/BiquadFilter";
import Delay from "./components/web-audio/Delay";
import StepSequencer from "./components/ui/StepSequencer";
import ADSREnvelope from "./types/ADSREnvelope";
import useAudioSourceRef from "./hooks/useAudioSourceRef";
import GainOscillator from "./components/ui/GainOscillator";

const App: React.FC = () => {
  const [makeNoise, setMakeNoise] = useState(false);

  const [fromSequencer, toDelay] = useAudioSourceRef();

  const envelope: ADSREnvelope = {
    attack: 0.01,
    decay: 0.01,
    sustain: 0.5,
    release: 0.2
  };

  const renderSynth = () => {
    if (!makeNoise) return;
    return (
      <AudioContextProvider>
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
        <Gain gain={0.1}>
          <BiQuadFilter type="lowpass">
            <Delay delayTime={0.1} sources={[toDelay]} />
          </BiQuadFilter>
        </Gain>

        <StepSequencer envelope={envelope} ref={fromSequencer}>
          <Oscillator
            frequency={<GainOscillator>oscillator frequency</GainOscillator>}
            detune={<GainOscillator>oscillator detune</GainOscillator>}
            type="square"
          />
        </StepSequencer>
      </AudioContextProvider>
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
