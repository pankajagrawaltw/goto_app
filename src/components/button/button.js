import React, { Fragment } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function Button(props) {
  return (
    <Fragment>
      <TouchableOpacity
        style={styles.button}
        onPress={() => (props.disabled ? null : props.onPressAction())}
        activeOpacity={props.disabled && 1}
      >
        {props.isIcon && (
          <MaterialCommunityIcons name="plus" size={20} color="#000" />
        )}
        <Text style={styles.ButtonText}>{props.title}</Text>
        {props.isIcon && (
          <MaterialCommunityIcons name="fire" size={20} color="#FF5931" />
        )}
      </TouchableOpacity>
    </Fragment>
  );
}
