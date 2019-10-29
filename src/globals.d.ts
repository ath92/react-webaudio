// override these definitions in lib.dom.d.ts for now. I think the ones provided are wrong?

interface AudioNode {
    connect(destinationAudioNode: AudioNode | AudioParam, input?: number, output?: number);
    disconnect(destinationAudioNode: AudioNode | AudioParam);
}