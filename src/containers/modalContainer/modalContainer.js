import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Button } from '../../components';
import { styles } from './style';

export function ModalContainer(props) {
  const [title, setTitle] = useState('');
  const [description, setDdescription] = useState('');
  const [date, setDate] = useState(moment());
  const [dateIndex, setDateIndex] = useState();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const returnData = {
    title: title,
    description: description,
    date: date,
    participants: props.participants,
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(moment(currentDate));
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const onSave = () => {
    if (title === '') {
      Alert.alert('Title', 'Title can not be null');
      return;
    }
    setTitle('');
    setDdescription('');
    setDate(null);
    setDateIndex();
    props.onAddTask(returnData);
  };

  const onDateSelect = (day, index) => {
    setDate(moment());
    switch (day) {
      case 'Today':
        setDate(moment());
        setDateIndex(index);
        break;

      case 'Tomorrow':
        setDate(moment().add(1, 'days'));
        setDateIndex(index);
        break;

      case 'Another Date':
        showDatepicker();
        setDateIndex(index);
        break;

      default:
        setDate(moment());
    }
  };

  return (
    <Modal
      backdropOpacity={0.7}
      isVisible={props.modalVisible}
      onBackButtonPress={() => {
        props.onClose();
      }}
      onBackdropPress={() => {
        props.onClose();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.detailContiner}>
          <View style={styles.elementContainer}>
            <View style={styles.modalHeader}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                Create New Task
              </Text>
            </View>
            {/* MODAL DETAILS*/}
            <View style={styles.dataContainer}>
              <ScrollView style={{ flexGrow: 1 }}>
                <View style={{ marginBottom: 30 }}>
                  <TextInput
                    style={styles.titleInput}
                    placeholder="Title"
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                  />
                </View>
                <View style={styles.dateContainer}>
                  {props.modalDates.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dates,
                        dateIndex === index && { backgroundColor: '#0C07D2' },
                      ]}
                      onPress={() => onDateSelect(item, index)}
                    >
                      <MaterialCommunityIcons
                        name="calendar-check"
                        size={20}
                        color={dateIndex === index ? '#fff' : '#B4B3CE'}
                        style={{ marginRight: 2 }}
                      />
                      <Text
                        style={{
                          color: dateIndex === index ? '#fff' : '#B4B3CE',
                        }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.participantsHeaderText}>Participants</Text>
                <View style={styles.participantsContainer}>
                  {props.participants.map((item, index) => (
                    <View key={index} style={styles.participantsCircle}>
                      <Text
                        style={[styles.participantsText, { color: item.color }]}
                      >
                        {item.initials}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={styles.descriptionContainer}>
                  <TextInput
                    style={styles.descriptionBox}
                    placeholder="Description"
                    numberOfLines={10}
                    multiline
                    value={description}
                    onChangeText={(text) => setDdescription(text)}
                  />
                </View>
              </ScrollView>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPressAction={() => onSave()}
              title="Save"
              isIcon={false}
            />
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date()}
            mode={mode}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </Modal>
  );
}
