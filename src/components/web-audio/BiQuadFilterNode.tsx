import React, { FC, useContext, useEffect, useState } from 'react';
import DestinationContext from '../../context/DestinationContext';
import AudioContextContext from '../../context/AudioContextContext';

interface Props {
    frequency?: number,
    detune?: number,
    Q?: number,
    gain?: number,
    type: BiquadFilterType,
}

const BiQuadFilterNode: FC<Props> = props => {
    const audioCtx = useContext(AudioContextContext);
    const destination = useContext(DestinationContext);
    const [frequency] = useState(props.frequency || 100);
    const [filterNode, setFilterNode] = useState(audioCtx.createBiquadFilter());

    // setup node
    useEffect(() => {
        const node = audioCtx.createBiquadFilter();
        node.connect(destination);
        setFilterNode(node);
        return () => {
            node.disconnect(destination);
        }
    }, [audioCtx, destination]);

    // handle updates to frequency
    useEffect(() => {
        filterNode.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    }, [frequency]);

    // handle updates to type
    useEffect(() => {
        filterNode.type = props.type;
    }, [props.type])

    return (
        <DestinationContext.Provider value={filterNode}>
            { props.children }
        </DestinationContext.Provider>
    );
}

export default BiQuadFilterNode;