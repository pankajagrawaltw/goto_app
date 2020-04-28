import { Audio } from 'expo-av';

let recording = new Audio.Recording();


const mode = {
    playsInSilentModeIOS: true,
    allowsRecordingIOS: true,
    staysActiveInBackground: false,
    playThroughEarpieceAndroid: false,
    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
    shouldDuckAndroid: true,
    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
};

const recordingOption = {
    android: {
        extension: '.amr',
        sampleRate: 8000,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
    },
    ios: {
        extension: '.amr',
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_AMR,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
        sampleRate: 8000,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

Audio.setAudioModeAsync(mode);


export const startRecordAudio = async () => {
    try {
        await Audio.requestPermissionsAsync();
        await recording.prepareToRecordAsync(recordingOption);
        await recording.startAsync();
    } catch (error) {
        console.log("recordAndPlay -> error", error)
    }
}

export const stopAudioRecorder = async () => {
    await recording.stopAndUnloadAsync();

}

export const getRecordedAudioURI = async () => {
    const url = await recording.getURI();
    return url
}

export const getRecordingStatus = async () => {
    const status = await recording.getStatusAsync()
    return status;
}

export const createNewLoadedSound = async () => {
    recording = null;
    recording = new Audio.Recording();
}