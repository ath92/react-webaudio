import React, { useEffect } from "react";
import DestinationContext from "../context/DestinationContext";
import AudioParamProp from "../types/AudioParamProp";

// TODO: types are getting a little weird in here. See if there's a nicer way to do this.

const isAudioParam = (arg: any): arg is AudioParam => {
  return typeof arg.setValueAtTime === "function";
};

const isAudioNode = (arg: any): arg is AudioNode => {
  if (!arg) return false;
  return typeof arg.connect === "function";
};

const useAudioParam = (
  audioNode: AudioNode & { [key: string]: any },
  key: string,
  audioCtx: AudioContext,
  prop?: AudioParamProp
): JSX.Element | void => {
  const param = audioNode[key];
  useEffect(() => {
    if (param === undefined || prop === undefined) return;
    if (isAudioParam(param) && typeof prop === "number") {
      param.setValueAtTime(prop, audioCtx.currentTime);
    } else if (isAudioNode(prop)) {
      prop.connect(audioNode);
    }
  }, [param, prop, audioNode, audioCtx]);

  if (isAudioParam(param) && typeof prop !== "number" && !isAudioNode(prop)) {
    return (
      <DestinationContext.Provider value={param}>
        {prop}
      </DestinationContext.Provider>
    );
  }
};

export default useAudioParam;
