import { createContext } from 'react';

export const defaultAudioContext= new AudioContext();

const audioContextContext = createContext(defaultAudioContext);

export default audioContextContext;