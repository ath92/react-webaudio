import { createContext } from 'react';
import { defaultAudioContext } from './AudioContextContext';

// TODO: figure out if we really need this default value
const DestionationContext = createContext<AudioNode>(defaultAudioContext.destination);

export default DestionationContext;