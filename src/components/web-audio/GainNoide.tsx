import React, { FC, useContext, useEffect, useState } from 'react';
import DestinationContext from '../../context/DestinationContext';
import AudioContextContext from '../../context/AudioContextContext';

interface Props {
    gain: number
}

const GainNode: FC<Props> = props => {
    const audioCtx = useContext(AudioContextContext);
    const destination = useContext(DestinationContext);
    const [gainNode, setGainNode] = useState<GainNode>(audioCtx.createGain());

    // connect node
    useEffect(() => {
        const node = audioCtx.createGain();
        node.connect(destination);
        setGainNode(node);
        return () => node.disconnect(destination);
    }, [destination, audioCtx]);

    // handle updates to gain
    useEffect(() => {
        gainNode.gain.value = props.gain;
    }, [props.gain]);

    return (
        <DestinationContext.Provider value={gainNode}>
            { props.children }
        </DestinationContext.Provider>
    );
}

export default GainNode;