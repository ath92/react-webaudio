import { useState, useCallback } from "react";

const useAudioSourceRef = () => {
  const [source, setSource] = useState();
  const ref = useCallback(
    (audioSource: AudioNode) => setSource(audioSource),
    []
  );
  return [ref, source];
};

export default useAudioSourceRef;
