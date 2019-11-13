import React, {
  FC,
  useContext,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";
import DestinationContext from "../../context/DestinationContext";
import AudioContextContext from "../../context/AudioContextContext";
import useAudioParam from "../../hooks/useAudioParam";
import useAudioSources from "../../hooks/useAudioSources";
import AudioParamProp from "../../types/AudioParamProp";

interface Props {
  delayTime: AudioParamProp;
  sources?: (AudioNode | null)[];
  ref?: React.Ref<DelayNode>;
}

const DelayNode: FC<Props> = forwardRef((props, ref) => {
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

  useAudioSources(delay, props.sources);

  useImperativeHandle(ref, () => delay);

  return (
    <React.Fragment>
      <DestinationContext.Provider value={delay}>
        {props.children}
      </DestinationContext.Provider>
      {delayTimeParam}
    </React.Fragment>
  );
});

export default DelayNode;
