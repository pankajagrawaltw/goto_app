import React, { Fragment, useState } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { AudioPlayer } from '../../components';
import { styles } from './style';

export function PlayerModal(props) {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackButtonPress={() => props.onClose()}
      onBackdropPress={() => props.onClose()}
    >
      <View style={styles.modalContainer}>
        <View style={styles.mainConatiner}>
          <AudioPlayer uri={props.url} />
        </View>
      </View>
    </Modal>
  );
}
