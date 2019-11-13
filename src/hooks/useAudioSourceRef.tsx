import { useState, useCallback } from "react";

const useAudioSourceRef = () => {
  const [source, setSource] = useState();
  const ref = useCallback(
    (audioSource: AudioNode | null) => setSource(audioSource || undefined),
    []
  );
  return [ref, source];
};

export default useAudioSourceRef;
