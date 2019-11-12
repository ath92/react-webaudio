import React, { FC, useContext, useEffect, useState } from "react";
import DestinationContext from "../../context/DestinationContext";
import AudioContextContext from "../../context/AudioContextContext";
import useAudioParam from "../../hooks/useAudioParam";
import useAudioSources from '../../hooks/useAudioSources';
import AudioParamProp from "../../types/AudioParamProp";

interface Props {
  gain: AudioParamProp;
  sources?: (AudioNode | null)[];
}



const GainNode: FC<Props> = props => {
  const audioCtx = useContext(AudioContextContext);
  const destination = useContext(DestinationContext);
  const [gainNode, setGainNode] = useState<GainNode>(audioCtx.createGain());
  const gainParam = useAudioParam(gainNode, "gain", audioCtx, props.gain);

  // connect node
  useEffect(() => {
    const node = audioCtx.createGain();
    node.connect(destination);
    setGainNode(node);
    return () => node.disconnect(destination);
  }, [destination, audioCtx]);

  useAudioSources(gainNode, props.sources);

  return (
    <React.Fragment>
      <DestinationContext.Provider value={gainNode}>
        {props.children}
      </DestinationContext.Provider>
      {gainParam}
    </React.Fragment>
  );
};

export default GainNode;
