import React, { Fragment } from 'react';
import { Text, View } from 'react-native';
import { styles } from './style';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function ProjectContainer(props) {
  return (
    <Fragment>
      <View style={styles.projectsTitle}>
        <Text style={styles.titleText}>Projects</Text>
        <View style={styles.titleCountContainer}>
          <Text style={styles.countText}>{props.projectData.length}</Text>
        </View>
      </View>

      <View style={styles.projectsListContainer}>
        {props.projectData.map((item, index) => (
          <View key={index} style={styles.projectsCard}>
            <View style={styles.projectsIconContainer}>
              <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={item.iconColor}
                />
              </View>
            </View>

            <View style={styles.projectsDetail}>
              <Text style={styles.detailTitleText}>{item.title}</Text>
              <Text style={styles.dueDateText}>Due on {item.date}</Text>
            </View>

            <View style={styles.projectsUpcoming}>
              <Text style={styles.upcomingText}>{item.upcoming} Upcoming</Text>
            </View>
          </View>
        ))}
      </View>
    </Fragment>
  );
}
