import React, { Fragment } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function TodoListContainer(props) {
  return (
    <Fragment>
      <View style={styles.todoTitle}>
        <Text style={styles.todoTitleText}>Things to do</Text>
        <View style={styles.todoCountContainer}>
          <Text style={styles.todoCountText}>{props.toDoData.length}</Text>
        </View>
      </View>

      <View style={styles.todoListContainer}>
        <ScrollView>
          {props.toDoData.map((item, index) => (
            <View key={index} style={styles.todoItemContainer}>
              <TouchableOpacity
                style={styles.todoCheckBoxContainer}
                onPress={() => props.onPressAction(index)}
              >
                {item.isCompleted ? (
                  <View style={styles.checkedBox}>
                    <MaterialCommunityIcons
                      name="check"
                      size={15}
                      color="#fff"
                    />
                  </View>
                ) : (
                  <View style={styles.uncheckedBox}></View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.todoDetailsContainer}
                onPress={() => props.onPressAction(index)}
              >
                <Text
                  style={[
                    styles.itemTitleText,
                    item.isCompleted && {
                      textDecorationLine: 'line-through'
                    }
                  ]}
                >
                  {item.title}
                </Text>
                {/* <View style={styles.todoTimeContainer}></View> */}
                {item.participants && item.participants.length ? (
                  <View style={styles.todoParticipantsContainer}>
                    {item.participants.map((participants, pIndex) => (
                      <View key={pIndex} style={styles.participantsContainer}>
                        <Text
                          style={[
                            styles.participantsText,
                            { color: participants.color }
                          ]}
                        >
                          {participants.initials}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : null}
                {item.description && (
                  <View style={styles.todoDescriptionTextContainer}>
                    <Text style={styles.descriptionText}>
                      {item.description}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
              <View style={styles.todoMusicContainer}>
                {item.url && (
                  <TouchableOpacity onPress={() => props.onPlayUrl(item.url)}>
                    <MaterialCommunityIcons
                      name="play"
                      size={30}
                      color="#0C07D2"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Fragment>
  );
}
