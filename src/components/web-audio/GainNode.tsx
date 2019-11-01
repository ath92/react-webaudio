import React, { FC, useContext, useEffect, useState } from "react";
import DestinationContext from "../../context/DestinationContext";
import AudioContextContext from "../../context/AudioContextContext";

interface Props {
  gain: number | JSX.Element;
}

const GainNode: FC<Props> = props => {
  const audioCtx = useContext(AudioContextContext);
  const destination = useContext(DestinationContext);
  const [gainNode, setGainNode] = useState<GainNode>(audioCtx.createGain());

  // connect node
  useEffect(() => {
    const node = audioCtx.createGain();
    node.connect(destination);
    setGainNode(node);
    return () => node.disconnect(destination);
  }, [destination, audioCtx]);

  // handle updates to gain
  useEffect(() => {
    if (typeof props.gain === "number") {
      gainNode.gain.value = props.gain;
    }
  }, [props.gain, gainNode]);

  const gainDestinationProvider =
    typeof props.gain !== "number" ? (
      <DestinationContext.Provider value={gainNode.gain}>
        {props.gain}
      </DestinationContext.Provider>
    ) : null;

  return (
    <React.Fragment>
      <DestinationContext.Provider value={gainNode}>
        {props.children}
      </DestinationContext.Provider>
      {gainDestinationProvider}
    </React.Fragment>
  );
};

export default GainNode;
