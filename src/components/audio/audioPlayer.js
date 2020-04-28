import React, { useEffect, useState } from 'react';
import { View, Text, Slider, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { color } from "../../theme";
import { millisecondConvertor } from '../../utils/millisecondConvertor';
import { styles } from './audioPlayerStyles';

export const AudioPlayer = props => {
  const [soundObject, setSoundObject] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [playStatus, setPlayStatus] = useState('LOADING');
  const [positionMillis, setPositionMillis] = useState(null);
  const [durationMillis, setDurationMillis] = useState(0);
  const [maxSliderValue, setMaxSliderValue] = useState(0);
  const [currentSliderValue, setCurrentSliderValue] = useState(0);
  const [prevPlaybackStatus, setPrevPlaybackStatus] = useState(null);
  const [rate, setRate] = useState(null);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [shouldPlay, setShouldPlay] = useState(null);
  const [isBuffering, setIsBuffering] = useState('NOT_STARTED');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackMillis, setPlaybackMillis] = useState(0);
  const [muted, setMuted] = useState(null);
  const [volume, setVolume] = useState(null);
  const [shouldCorrectPitch, setShouldCorrectPitch] = useState(null);
  const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(null);

  useEffect(() => {
    loadSound();
  }, []);

  const loadSound = async () => {
    let sound = new Audio.Sound();
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false
      });

      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      const soundInfo = await sound.loadAsync({ uri: props.uri });
      setMaxSliderValue(soundInfo.durationMillis);
      setDurationMillis(soundInfo.durationMillis);
      setPositionMillis(soundInfo.positionMillis);
      setCurrentSliderValue(soundInfo.positionMillis);
      setShouldPlay(soundInfo.shouldPlay);
      setIsPlaying(soundInfo.isPlaying);
      setRate(soundInfo.rate);
      setMuted(soundInfo.isMuted);
      setVolume(soundInfo.volume);
      setShouldCorrectPitch(soundInfo.shouldCorrectPitch);
      setIsPlaybackAllowed(true);
      setSoundObject(sound);
    } catch (error) {
      // An error occurred!
      console.warn(`Player.js loadSound error : ${error}`);
    }
  };

  const onPlaybackStatusUpdate = async playbackStatus => {
    setPrevPlaybackStatus(playbackStatus);
    setPlaybackStatus(playbackStatus);

    if (playbackStatus.error) {
      setPlaybackStatus({ playBackStatus: 'ERROR' });
    }
    if (playbackStatus.isLoaded) {
      if (
        playStatus !== 'PLAYING' &&
        playStatus !== 'PAUSED' &&
        playStatus !== 'STOPPED' &&
        playStatus !== 'ERROR'
      ) {
        if (playbackStatus.isLoaded && !isLoaded) {
          setIsLoaded(true);
        }
        if (isLoaded && playbackStatus.isBuffering) {
          setPlayStatus('BUFFERING');
        }
        if (
          isLoaded &&
          !playbackStatus.isBuffering &&
          playbackStatus.hasOwnProperty('durationMillis')
        ) {
          setPlayStatus('STOPPED');
        }
      }
      if (playbackStatus.isPlaying) {
        // This is for updating position of progress bar
        setPositionMillis(playbackStatus.positionMillis);
        setCurrentSliderValue(playbackStatus.positionMillis);
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // This will execute once the audio pleayer is completed playing
        setPlayStatus('STOPPED');
        setIsPlaying(false);
        setPositionMillis(0);
        setCurrentSliderValue(0);
      }
    }
  };

  const onSliderValueChange = async value => {
    soundObject.setPositionAsync(value);
  };

  const forwardAudio = async () => {
    if (currentSliderValue < durationMillis) {
      let forwardValue = currentSliderValue + 500;
      setCurrentSliderValue(forwardValue);
      soundObject.pauseAsync().then(() => {
        setPlayStatus('PAUSED');
        soundObject.setPositionAsync(forwardValue);
      });
      soundObject.setPositionAsync(forwardValue);
    }
  };

  const backwordAudio = async () => {
    if (currentSliderValue) {
      let backwordValue = currentSliderValue - 500;
      setCurrentSliderValue(backwordValue);
      soundObject.pauseAsync().then(() => {
        setPlayStatus('PAUSED');
        soundObject.setPositionAsync(backwordValue);
      });
      soundObject.setPositionAsync(backwordValue);
    }
  };

  const onPausePress = async () => {
    if (soundObject != null) {
      soundObject.pauseAsync().then(() => {
        setPlayStatus('PAUSED');
      });
    }
  };

  const onPlayPress = async () => {
    if (soundObject != null) {
      if (positionMillis === durationMillis) {
        soundObject.stopAsync().then(() => {
          soundObject.playAsync().then(() => {
            setPlayStatus('PLAYING');
          });
        });
      } else if (positionMillis === 0) {
        soundObject
          .replayAsync()
          .then(() => {
            setPlayStatus('PLAYING');
          })
          .catch(err => {
            console.log('onPlayPress -> err', err);
          });
      } else {
        soundObject
          .playAsync()
          .then(() => {
            setPlayStatus('PLAYING');
          })
          .catch(err => {
            console.log('onPlayPress -> err', err);
          });
      }
    }
  };

  props.progressTime && props.progressTime({ positionMillis, durationMillis });

  const renderPlayButton = () => {
    if (playStatus === 'STOPPED') {
      return (
        <TouchableOpacity onPress={() => onPlayPress()}>
          <MaterialCommunityIcons
            name="play-circle-outline"
            size={props.isResponseInsightsPlayer ? 30 : 70}
            color={'#0C07D2'}
          />
        </TouchableOpacity>
      );
    } else if (playStatus === 'PLAYING') {
      return (
        <TouchableOpacity onPress={() => onPausePress()}>
          <MaterialCommunityIcons
            name="pause-circle-outline"
            size={props.isResponseInsightsPlayer ? 30 : 70}
            color={'#0C07D2'}
          />
        </TouchableOpacity>
      );
    } else if (playStatus === 'PAUSED') {
      return (
        <TouchableOpacity onPress={() => onPlayPress()}>
          <MaterialCommunityIcons
            name="play-circle-outline"
            size={props.isResponseInsightsPlayer ? 30 : 70}
            color={'#0C07D2'}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => onPlayPress()}>
          <MaterialCommunityIcons
            name="play-circle-outline"
            size={props.isResponseInsightsPlayer ? 30 : 70}
            color={'#0C07D2'}
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.audioPlayerMainContainer}>
        <View>
          <Text
            style={{
              color: '#0C07D2'
            }}
          >
            {millisecondConvertor(positionMillis)}
          </Text>
        </View>

        <View style={styles.audioPlayerContainer}>
          <Slider
            minimimValue={0}
            maximumValue={maxSliderValue}
            value={currentSliderValue}
            onValueChange={onSliderValueChange}
            maximumTrackTintColor={'#0C07D2'}
            minimumTrackTintColor={'#0C07D2'}
          />
        </View>
        <View>
          <Text
            style={{
              color: '#0C07D2'
            }}
          >
            {millisecondConvertor(durationMillis)}
          </Text>
        </View>
      </View>

      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: props.isResponseInsightsPlayer
            ? 'center'
            : 'space-around'
        }}
      >
        <TouchableOpacity onPress={() => backwordAudio()}>
          <MaterialCommunityIcons
            name="rewind"
            size={props.isResponseInsightsPlayer ? 30 : 70}
            color={'#0C07D2'}
          />
        </TouchableOpacity>
        {renderPlayButton()}
        <TouchableOpacity onPress={() => forwardAudio()}>
          <MaterialCommunityIcons
            name="fast-forward"
            size={props.isResponseInsightsPlayer ? 30 : 70}
            color={'#0C07D2'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
