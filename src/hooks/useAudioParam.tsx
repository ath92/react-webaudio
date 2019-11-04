import React, { useEffect } from 'react';
import DestinationContext from '../context/DestinationContext';

const isAudioParam = (arg: any): arg is AudioParam => {
    return typeof arg.setValueAtTime === 'function';
}

// TODO: figure out if there's a nicer way to do this
interface AudioNode {
    [key: string]: any
}

export const useAudioParam = 
(
    audioNode: AudioNode,
    key: string,
    audioCtx: AudioContext,
    prop?: JSX.Element | number, 
): (JSX.Element | void) => {
    const param = audioNode[key];
    useEffect(() => {
        if (typeof prop === 'number') {
            param.setValueAtTime(prop, audioCtx.currentTime);
        }
    }, [param, prop, audioNode, audioCtx]);

    if (isAudioParam(param) && typeof prop !== 'number'){
        return (
            <DestinationContext.Provider value={param}>
                { prop }
            </DestinationContext.Provider>
        )
    }
};