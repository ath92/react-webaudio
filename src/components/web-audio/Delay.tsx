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
  delayTime: AudioParamProp;
  sources?: (AudioNode | undefined)[];
  withNode?: (node: DelayNode) => void;
}

const Delay: FC<Props> = (props) => {
  const audioCtx = useContext(AudioContextContext);
  const destination = useContext(DestinationContext);
  const [delay, setDelay] = useState<DelayNode>(audioCtx.createDelay());
  const delayTimeParam = useAudioParam(
    delay,
    "delayTime",
    audioCtx,
    props.delayTime
  );

  // connect node
  useEffect(() => {
    const node = audioCtx.createDelay();
    if (destination instanceof AudioNode) node.connect(destination);
    setDelay(node);
    if (destination instanceof AudioNode)
      return () => node.disconnect(destination);
  }, [destination, audioCtx]);

  useEffect(() => {
    if (props.withNode === undefined) return;
    props.withNode(delay);
  }, [props.withNode, delay]);

  useAudioSources(delay, props.sources);

  return (
    <React.Fragment>
      <DestinationContext.Provider value={delay}>
        {props.children}
      </DestinationContext.Provider>
      {delayTimeParam}
    </React.Fragment>
  );
};

export default Delay;
