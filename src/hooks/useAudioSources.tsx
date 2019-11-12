import { useEffect } from 'react';

const useAudioSources = (destinationNode: AudioNode, sourceNodes?: (AudioNode | null)[]) => {
    useEffect(() => {
      if (sourceNodes === undefined) return;
      let sources = [...sourceNodes];
      sources.forEach(source => {
        if (source === null) return;
        source.connect(destinationNode);
      });
      return () => {
        sources.forEach(source => {
          if (source === null) return;
          source.disconnect(destinationNode);
        });
      };
    }, [destinationNode, sourceNodes]);
  }

  export default useAudioSources;