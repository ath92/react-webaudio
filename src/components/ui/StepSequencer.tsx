import React, { FC, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import AudioContextContext from '../../context/AudioContextContext';
import DestinationContext from '../../context/DestinationContext';
import ADSREnvelope from '../../types/ADSREnvelope';
import useInterval from 'use-interval';

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

const OnNote = styled(OffNote)`background-color: green`;

const CurrentNote = (note: any) => styled(note)`border: 4px solid red`;

const emptyTrack = (numNotes: number) => Array(numNotes).fill(false);

interface Props {
    sourceNode?: JSX.Element,
    bpm?: number,
    envelope: ADSREnvelope,
    beatsPerBar?: number,
    subdivisions?: number,
}

const StepSequencer: FC<Props> = ({ sourceNode, bpm = 100, envelope, beatsPerBar = 4, subdivisions = 4 }) => {
    const numNotes = beatsPerBar * subdivisions;
    const audioCtx = useContext(AudioContextContext);
    const destination = useContext(DestinationContext);
    const [track, setTrack] = useState(emptyTrack(numNotes));
    const [gainNode, setGainNode] = useState<GainNode>(audioCtx.createGain());
    const [currentNote, setCurrentNote] = useState(-1);

    const timePerNote = 60 / bpm / subdivisions;
    const barTime = timePerNote * beatsPerBar * subdivisions;

    const performEnvelope = (start: number) => {
        const { attack, decay, sustain, release } = envelope;
        gainNode.gain.setTargetAtTime(1, start + attack, attack);
        gainNode.gain.setTargetAtTime(sustain, start + attack + decay, decay);
        gainNode.gain.setTargetAtTime(0, start + attack + decay + release, release);
    };

    useInterval(() => {
        const now = audioCtx.currentTime;
        const note = Math.floor((now % barTime) / timePerNote);
        if (note !== currentNote) {
            setCurrentNote(note);
            const startOfBar = now - (now % barTime);
            // schedule next note
            const nextNote = (note + 1) % numNotes;
            if(track[nextNote]) performEnvelope(startOfBar + (note + 1) * timePerNote);
        }
    }, 10);

    useEffect(() => {
        const node = audioCtx.createGain();
        node.connect(destination);
        node.gain.setValueAtTime(0, audioCtx.currentTime);
        setGainNode(node);
        return () => node.disconnect(destination);
    }, [destination, audioCtx]);

    const toggleNote = (index: number) => {
        setTrack(track.map((value, i) => i === index ? !value : value));
    }

    const trackNotes = track.map((on, index) => {
        const onOff = on ? OnNote : OffNote;
        const NoteComponent = currentNote === index ? CurrentNote(onOff) : onOff;
        return (
            <NoteComponent 
                onClick={() => toggleNote(index)} 
                key={index} 
            />
        );
    });

    return (
        <React.Fragment>
            <Track>
                { trackNotes }
            </Track>
            <DestinationContext.Provider value={gainNode}>
                { sourceNode }
            </DestinationContext.Provider>
        </React.Fragment>
    );
}

StepSequencer.defaultProps = {
    bpm: 100,
}

export default StepSequencer;