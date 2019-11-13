import React, {
  FC,
  useState,
  useContext,
  useEffect,
  forwardRef,
  useImperativeHandle
} from "react";
import styled from "styled-components";
import AudioContextContext from "../../context/AudioContextContext";
import DestinationContext from "../../context/DestinationContext";
import Gain from "../web-audio/Gain";
import ADSREnvelope from "../../types/ADSREnvelope";
import useInterval from "use-interval";
import useAudioSourceRef from "../../hooks/useAudioSourceRef";

// TODO: this is probably not the correct way to use styled componentns.

const Track = styled.div`
  display: flex;
`;

const OffNote = styled.div`
  box-sizing: border-box;
  flex: 0 0 auto;
  border-radius: 8px;
  margin: 8px;
  background-color: #666;
  height: 40px;
  width: 40px;
`;

const OnNote = styled(OffNote)`
  background-color: green;
`;

// explicit any because my intellisense is not working for whatever reason and I
const CurrentNote = (note: any) =>
  styled(note)`
    border: 4px solid red;
  `;

const emptyTrack = (numNotes: number) => Array(numNotes).fill(false);

interface Props {
  bpm?: number;
  envelope: ADSREnvelope;
  beatsPerBar?: number;
  subdivisions?: number;
  ref?: React.Ref<GainNode>; // envelope node is the output here
}

const StepSequencer: FC<Props> = forwardRef(
  (
    { bpm = 100, envelope, beatsPerBar = 4, subdivisions = 4, ...props },
    ref
  ) => {
    const numNotes = beatsPerBar * subdivisions;
    const audioCtx = useContext(AudioContextContext);
    const [track, setTrack] = useState(emptyTrack(numNotes));
    const [currentNote, setCurrentNote] = useState(-1);

    const [gainRef, gainNode] = useAudioSourceRef();

    const timePerNote = 60 / bpm / subdivisions;
    const barTime = timePerNote * beatsPerBar * subdivisions;

    const performEnvelope = (start: number) => {
      const { attack, decay, sustain, release } = envelope;
      gainNode.gain.setTargetAtTime(1, start + attack, attack);
      gainNode.gain.setTargetAtTime(sustain, start + attack + decay, decay);
      gainNode.gain.setTargetAtTime(
        0,
        start + attack + decay + release,
        release
      );
    };

    useInterval(() => {
      const now = audioCtx.currentTime;
      const timeInCurrentBar = now % barTime;
      const note = Math.floor(timeInCurrentBar / timePerNote);
      if (note !== currentNote) {
        setCurrentNote(note);
        const startOfBar = now - timeInCurrentBar;
        // schedule next note
        const nextNote = (note + 1) % numNotes;
        if (track[nextNote])
          performEnvelope(startOfBar + (note + 1) * timePerNote);
      }
    }, 10);

    useImperativeHandle(ref, () => gainNode);

    const toggleNote = (index: number) => {
      setTrack(track.map((value, i) => (i === index ? !value : value)));
    };

    const trackNotes = track.map((on, index) => {
      const onOff = on ? OnNote : OffNote;
      const NoteComponent = currentNote === index ? CurrentNote(onOff) : onOff;
      return <NoteComponent onClick={() => toggleNote(index)} key={index} />;
    });

    return (
      <Gain gain={0} ref={gainRef}>
        <Track>{trackNotes}</Track>
        {props.children}
      </Gain>
    );
  }
);

StepSequencer.defaultProps = {
  bpm: 100
};

export default StepSequencer;
