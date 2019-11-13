import React, {
  FC,
  useState,
  useEffect,
  useContext,
  useImperativeHandle,
  forwardRef
} from "react";
import AudioContextContext from "../../context/AudioContextContext";
import DestionationContext from "../../context/DestinationContext";
import useAudioParam from "../../hooks/useAudioParam";
import AudioParamProp from "../../types/AudioParamProp";

interface Props {
  frequency?: AudioParamProp;
  type: OscillatorType;
  detune?: AudioParamProp;
  ref?: React.Ref<OscillatorNode>;
}

const Oscillator: FC<Props> = forwardRef((props, ref) => {
  const audioCtx = useContext(AudioContextContext);
  const destination = useContext(DestionationContext);
  const [oscillator, setOscillator] = useState(audioCtx.createOscillator());
  const frequencyParam = useAudioParam(
    oscillator,
    "frequency",
    audioCtx,
    props.frequency
  );
  const detuneParam = useAudioParam(
    oscillator,
    "detune",
    audioCtx,
    props.detune
  );
  useImperativeHandle(ref, () => oscillator);

  useEffect(() => {
    const node = audioCtx.createOscillator();
    node.connect(destination);
    node.start();
    setOscillator(node);
    return () => {
      node.stop();
      node.disconnect(destination);
    };
  }, [destination, audioCtx]);

  useEffect(() => {
    oscillator.type = props.type;
  }, [props.type, oscillator]);

  return (
    <React.Fragment>
      {props.children}
      {frequencyParam}
      {detuneParam}
    </React.Fragment>
  );
});

export default Oscillator;