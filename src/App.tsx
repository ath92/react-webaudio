import React, { useState, useCallback } from "react";
import OscillatorNode from "./components/web-audio/OscillatorNode";
import AudioContextNode from "./components/web-audio/AudioContextNode";
import GainNode from "./components/web-audio/GainNode";
import BiQuadFilterNode from "./components/web-audio/BiQuadFilterNode";
import StepSequencer from "./components/ui/StepSequencer";
import ADSREnvelope from "./types/ADSREnvelope";

import GainOscillator from "./components/ui/GainOscillator";

const App: React.FC = () => {
  const [makeNoise, setMakeNoise] = useState(false);
  const [baseFrequency, setBaseFrequency] = useState(50);
  const [osc, setOsc] = useState(null);

  const oscRef = useCallback(oscillator => setOsc(oscillator), []);

  const [osc2, setOsc2] = useState(null);

  const oscRef2 = useCallback(oscillator => setOsc2(oscillator), []);

  const [isOsc2, setisOsc2] = useState(false);

  const whatever = isOsc2 ? (
    <GainNode gain={0}>
      <OscillatorNode
        frequency={baseFrequency * 2}
        ref={oscRef2}
        type="square"
      />
    </GainNode>
  ) : null;

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

        <GainNode gain={0.1} sources={[osc, osc2]}>
          <OscillatorNode frequency={baseFrequency} type="square" />
        </GainNode>

        {whatever}
        <button onClick={() => setisOsc2(!isOsc2)}>add osc</button>

        <StepSequencer
          envelope={envelope}
          sourceNode={
            <OscillatorNode
              frequency={<GainOscillator />}
              detune={<GainOscillator>oscillator frequency</GainOscillator>}
              type="square"
              ref={oscRef}
            />
          }
        />
      </AudioContextNode>
    );
  };

  return (
    <>
      <button onClick={() => setMakeNoise(!makeNoise)}>Make some noise!</button>
      <button onClick={() => setBaseFrequency(baseFrequency * 2)}>
        Higher
      </button>
      {renderSynth()}
    </>
  );
};

export default App;
