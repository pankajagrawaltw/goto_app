import React, { Fragment } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './style';

export function DateContainer(props) {
  return (
    <Fragment>
      <View style={styles.dateContainer}>
        {props.dateData.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateTextContainer,
              item.isSelected && { backgroundColor: '#0C07D2' }
            ]}
            onPress={() => props.onDateSelect(index)}
          >
            <Text
              style={[styles.dateText, item.isSelected && { color: '#fff' }]}
            >
              {item.date}
            </Text>
            <Text
              style={[styles.dayText, item.isSelected && { color: '#fff' }]}
            >
              {item.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          onPress={() => props.getDates('previous')}
          style={styles.previousButtonContainer}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.getDates('next')}
          style={styles.nextButtonContainer}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
}
