import React, { Fragment, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Button,
  startRecordAudio,
  stopAudioRecorder,
  getRecordedAudioURI,
  createNewLoadedSound,
  AudioPlayer
} from '../../components';
import { styles } from './style';

export function ConfirmModal(props) {
  const [recordAudio, setRecordAudio] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [url, setUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [withAudio, setWithAudio] = useState(false);
  const [withoutAudio, setWithoutAudio] = useState(false);

  const onWithAudio = () => {
    setWithAudio(true);
    setWithoutAudio(false);
    setRecordAudio(true);
  };

  const onWithoutAudio = () => {
    setWithAudio(false);
    setWithoutAudio(true);
    setRecordAudio(false);
  };

  const onStart = async () => {
    setIsRecording(true);
    await createNewLoadedSound();
    await startRecordAudio();
  };

  const onStop = async () => {
    setIsRecording(false);
    await stopAudioRecorder();
    const uri = await getRecordedAudioURI();
    if (uri) {
      setUrl(uri);
      setIsAudio(true);
    }
  };

  const submitWithUrl = () => {
    let uri = url;
    setRecordAudio(false);
    setIsAudio(false);
    setUrl(null);
    setIsRecording(false);
    setWithAudio(false);
    setWithoutAudio(false);
    props.onSubmit(uri);
  };

  const submitWithOutUrl = () => {
    setRecordAudio(false);
    setIsAudio(false);
    setUrl(null);
    setIsRecording(false);
    setWithAudio(false);
    setWithoutAudio(false);
    props.onSubmit();
  };

  return (
    <Modal
      isVisible={props.isVisible}
      onBackButtonPress={() => props.onClose()}
      onBackdropPress={() => props.onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.detailContiner}>
          <Fragment>
            <View style={styles.elementContainer}>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => onWithAudio()}
                >
                  {withAudio ? (
                    <View style={styles.checkedBox}>
                      <MaterialCommunityIcons
                        name="check"
                        size={15}
                        color="#fff"
                      />
                    </View>
                  ) : (
                    <View style={styles.uncheckedBox} />
                  )}
                  <Text>Submit with audio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => onWithoutAudio()}
                >
                  {withoutAudio ? (
                    <View style={styles.checkedBox}>
                      <MaterialCommunityIcons
                        name="check"
                        size={15}
                        color="#fff"
                      />
                    </View>
                  ) : (
                    <View style={styles.uncheckedBox} />
                  )}
                  <Text>Submit without audio</Text>
                </TouchableOpacity>
              </View>
              {recordAudio ? (
                !isAudio ? (
                  <View style={styles.actionButtonsContainer}>
                    {!isRecording ? (
                      <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => onStart()}
                      >
                        <MaterialCommunityIcons
                          name="microphone"
                          size={50}
                          color="#0C07D2"
                        />
                        <Text>Mic</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => onStop()}
                      >
                        <MaterialCommunityIcons
                          name="stop-circle-outline"
                          size={50}
                          color="#0C07D2"
                        />
                        <Text>Stop</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : (
                  <AudioPlayer uri={url} />
                )
              ) : null}
            </View>
            <View style={styles.submitButton}>
              {!withoutAudio && !withAudio ? (
                <Button
                  title="Submit"
                  onPressAction={() => props.onClose()}
                  // disabled={withAudio && isRecording}
                />
              ) : withoutAudio ? (
                <Button
                  title="Submit"
                  onPressAction={() => submitWithOutUrl()}
                  // disabled={withAudio && isRecording}
                />
              ) : (withAudio && !url) || (withAudio && isRecording) ? (
                <Button title="Submit" disabled={true} />
              ) : url ? (
                <Button title="Submit" onPressAction={() => submitWithUrl()} />
              ) : (
                <Button title="Submit" disabled={true} />
              )}
            </View>
          </Fragment>
          {/* )} */}
        </View>
      </View>
    </Modal>
  );
}
