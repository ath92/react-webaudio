import React, {
  FC,
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef
} from "react";
import DestinationContext from "../../context/DestinationContext";
import AudioContextContext from "../../context/AudioContextContext";
import useAudioParam from "../../hooks/useAudioParam";
import useAudioSources from "../../hooks/useAudioSources";
import AudioParamProp from "../../types/AudioParamProp";

interface Props {
  frequency?: AudioParamProp;
  detune?: AudioParamProp;
  Q?: AudioParamProp;
  gain?: AudioParamProp;
  type: BiquadFilterType;
  sources?: (AudioNode | null)[];
  ref?: React.Ref<BiquadFilterNode>;
}

const BiQuadFilterNode: FC<Props> = forwardRef((props, ref) => {
  const audioCtx = useContext(AudioContextContext);
  const destination = useContext(DestinationContext);
  const [filterNode, setFilterNode] = useState(audioCtx.createBiquadFilter());
  const frequencyParam = useAudioParam(
    filterNode,
    "frequency",
    audioCtx,
    props.frequency
  );
  const detuneParam = useAudioParam(
    filterNode,
    "detune",
    audioCtx,
    props.detune
  );
  const QParam = useAudioParam(filterNode, "Q", audioCtx, props.Q);
  const gainParam = useAudioParam(filterNode, "gain", audioCtx, props.gain);

  // setup node
  useEffect(() => {
    const node = audioCtx.createBiquadFilter();
    node.connect(destination);
    setFilterNode(node);
    return () => {
      node.disconnect(destination);
    };
  }, [audioCtx, destination]);

  // handle updates to type
  useEffect(() => {
    filterNode.type = props.type;
  }, [filterNode, props.type]);

  useImperativeHandle(ref, () => filterNode);

  return (
    <React.Fragment>
      <DestinationContext.Provider value={filterNode}>
        {props.children}
      </DestinationContext.Provider>
      {frequencyParam}
      {detuneParam}
      {QParam}
      {gainParam}
    </React.Fragment>
  );
});

export default BiQuadFilterNode;
