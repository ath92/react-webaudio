import React, {
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import DestinationContext from "../../context/DestinationContext";
import AudioContextContext from "../../context/AudioContextContext";
import useAudioParam from "../../hooks/useAudioParam";
import useAudioSources from "../../hooks/useAudioSources";
import AudioParamProp from "../../types/AudioParamProp";

interface Props {
  gain?: AudioParamProp;
  sources?: (AudioNode | undefined)[];
  withNode?: (node: GainNode) => void;
}

const Gain: FC<Props> = (props) => {
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

  useEffect(() => {
    if (props.withNode === undefined) return;
    props.withNode(gainNode);
  }, [props.withNode, gainNode]);

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

export default Gain;
