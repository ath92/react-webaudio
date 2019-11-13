import React, { FC, useState } from "react";
import AudioContextContext from "../../context/AudioContextContext";
import DestionationContext from "../../context/DestinationContext";

const AudioContextProvider: FC = props => {
  const [audioContext] = useState(new AudioContext());
  return (
    <AudioContextContext.Provider value={audioContext}>
      <DestionationContext.Provider value={audioContext.destination}>
        {props.children}
      </DestionationContext.Provider>
    </AudioContextContext.Provider>
  );
};

export default AudioContextProvider;
