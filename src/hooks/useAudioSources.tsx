import { useEffect } from "react";

const useAudioSources = (
  destinationNode: AudioNode,
  sourceNodes?: (AudioNode | undefined)[]
) => {
  useEffect(() => {
    if (sourceNodes === undefined) return;
    let sources = [...sourceNodes];
    sources.forEach(source => {
      if (source === undefined) return;
      source.connect(destinationNode);
    });
    return () => {
      sources.forEach(source => {
        if (source === undefined) return;
        source.disconnect(destinationNode);
      });
    };
  }, [destinationNode, sourceNodes]);
};

export default useAudioSources;
