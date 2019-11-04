import React, { FC, useContext, useEffect, useState } from 'react';
import DestinationContext from '../../context/DestinationContext';
import AudioContextContext from '../../context/AudioContextContext';
import { useAudioParam } from '../../hooks/useAudioParam';
import { AudioParamValue } from '../../types/AudioParamValue';

interface Props {
    frequency?: AudioParamValue,
    detune?: AudioParamValue,
    Q?: AudioParamValue,
    gain?: AudioParamValue,
    type: BiquadFilterType,
}

const BiQuadFilterNode: FC<Props> = props => {
    const audioCtx = useContext(AudioContextContext);
    const destination = useContext(DestinationContext);
    const [filterNode, setFilterNode] = useState(audioCtx.createBiquadFilter());
    const frequencyParam = useAudioParam(filterNode, 'frequency', audioCtx, props.frequency);
    const detuneParam = useAudioParam(filterNode, 'detune', audioCtx, props.detune);
    const QParam = useAudioParam(filterNode, 'Q', audioCtx, props.Q);
    const gainParam = useAudioParam(filterNode, 'gain', audioCtx, props.gain);

    // setup node
    useEffect(() => {
        const node = audioCtx.createBiquadFilter();
        node.connect(destination);
        setFilterNode(node);
        return () => {
            node.disconnect(destination);
        }
    }, [audioCtx, destination]);

    // handle updates to type
    useEffect(() => {
        filterNode.type = props.type;
    }, [filterNode, props.type]);

    return (
        <React.Fragment>
            <DestinationContext.Provider value={filterNode}>
                { props.children }
            </DestinationContext.Provider>
            { frequencyParam }
            { detuneParam }
            { QParam }
            { gainParam }
        </React.Fragment>
    );
}

export default BiQuadFilterNode;