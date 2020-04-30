import React, { Fragment, useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';
import moment from 'moment';

import {
  DateContainer,
  ProjectContainer,
  TodoListContainer,
  ModalContainer,
  ConfirmModal,
  PlayerModal,
} from '../../containers';
import { Button } from '../../components';
import { styles } from './style';

export function MainScreen(props) {
  const [dates, setDates] = useState([]);
  const [sDate, setSDate] = useState(moment());
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [playerVisible, setPlayerVisible] = useState(false);
  const [playUrl, setPlayUrl] = useState(null);
  const [todoIndex, setTodoIndex] = useState();
  const [toDoData, setToDo] = useState([
    {
      title: 'Prepare interview',
      description: "Don't forget to bring the documents.",
      isCompleted: false,
      url: null,
    },
    {
      title: 'Plan Weekend Outing',
      isCompleted: true,
      participants: [
        {
          name: 'Deepak Das',
          initials: 'DD',
          color: '#28CAEC',
        },
        {
          name: 'Ravi Nagpal',
          initials: 'RN',
          color: '#A36AFF',
        },
        {
          name: 'Frady Walt',
          initials: 'FW',
          color: '#FF8BC3',
        },
      ],
      url: null,
    },
  ]);

  const projectData = [
    {
      icon: 'worker',
      iconColor: '#0C07D2',
      title: 'Project 1',
      date: '12 June 2019',
      upcoming: 16,
    },
    {
      icon: 'alpha',
      iconColor: '#D33B8C',
      title: 'Project 2',
      date: '13 June 2019',
      upcoming: 8,
    },
  ];

  const participants = [
    {
      name: 'Deepak Das',
      initials: 'DD',
      color: '#28CAEC',
    },
    {
      name: 'Ravi Nagpal',
      initials: 'RN',
      color: '#A36AFF',
    },
    {
      name: 'Frady Walt',
      initials: 'FW',
      color: '#FF8BC3',
    },
  ];

  const modalDates = ['Today', 'Tomorrow', 'Other'];

  const onDateSelect = (index) => {
    let newDates = [];
    for (let i = 0; i < dates.length; i++) {
      let UpdateValue = {};
      if (i === index) {
        UpdateValue = dates[i];
        UpdateValue.isSelected = true;
      } else {
        UpdateValue = dates[i];
        UpdateValue.isSelected = false;
      }
      newDates = [...newDates, UpdateValue];
    }

    setDates(newDates);
  };

  const onAddTask = (data) => {
    const newTask = {
      title: data.title,
      description: data.description !== '' && data.description,
      isCompleted: false,
      participants: data.participants,
      url: null,
    };
    setToDo([...toDoData, newTask]);
  };

  const onTaskPress = async (index) => {
    let newTodoList = [...toDoData];
    if (toDoData[index].isCompleted) {
      newTodoList[index] = {
        ...toDoData[index],
        isCompleted: !toDoData[index].isCompleted,
        url: null,
      };
      setToDo(newTodoList);
    } else {
      setTodoIndex(index);
      setConfirmVisible(true);
    }
  };

  const submitWithAudio = async (uri) => {
    let newTodoList = toDoData;
    if (uri) {
      newTodoList[todoIndex] = {
        ...toDoData[todoIndex],
        isCompleted: !toDoData[todoIndex].isCompleted,
        url: uri,
      };
      await setToDo(newTodoList);
    } else {
      newTodoList[todoIndex] = {
        ...toDoData[todoIndex],
        isCompleted: !toDoData[todoIndex].isCompleted,
        url: null,
      };
      setToDo(newTodoList);
    }
    setTodoIndex(null);
    setConfirmVisible(!confirmVisible);
  };

  const getDates = (data) => {
    switch (data) {
      case 'next':
        const next = sDate.add(7, 'days');
        updateDate(next);
        break;

      case 'previous':
        const prev = sDate.add(-7, 'days');
        updateDate(prev);
        break;
      default:
        updateDate(moment());
    }
  };

  const updateDate = (startDate) => {
    let dates = [];
    for (let i = 1; i < 6; i++) {
      const sunday = startDate.startOf('week');
      let isSelected = false;
      if (i === 1) {
        isSelected = true;
      }
      let date = sunday.add(i, 'days');

      const newDay = {
        date: date.format('DD'),
        day: date.format('ddd'),
        isSelected,
      };
      dates = [...dates, newDay];
    }
    setDates(dates);
  };

  useEffect(() => {
    updateDate(moment());
  }, []);

  const onPlayUrl = (url) => {
    setPlayUrl(url);
    setPlayerVisible(true);
  };
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View style={styles.dateBarContainer}>
            <DateContainer
              dateData={dates}
              onDateSelect={(index) => onDateSelect(index)}
              getDates={(data) => getDates(data)}
            />
          </View>

          <View style={styles.projectsContainer}>
            <ProjectContainer projectData={projectData} />
          </View>

          <View style={styles.todoContainer}>
            <TodoListContainer
              toDoData={toDoData}
              onPressAction={(index) => {
                onTaskPress(index);
              }}
              onPlayUrl={(url) => onPlayUrl(url)}
            />
          </View>

          <View style={styles.ButtonContainer}>
            <Button
              onPressAction={() => {
                setModalVisible(true);
              }}
              title="Add task"
              isIcon={true}
            />
          </View>
          <ModalContainer
            modalVisible={modalVisible}
            participants={participants}
            modalDates={modalDates}
            onClose={() => {
              setModalVisible(!modalVisible);
            }}
            onAddTask={(data) => {
              onAddTask(data), setModalVisible(!modalVisible);
            }}
          />

          <ConfirmModal
            isVisible={confirmVisible}
            onClose={() => {
              setConfirmVisible(!confirmVisible);
            }}
            onSubmit={(url) => {
              submitWithAudio(url);
            }}
          />
          <PlayerModal
            isVisible={playerVisible}
            onClose={() => {
              setPlayUrl(null);
              setPlayerVisible(!playerVisible);
            }}
            url={playUrl}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Fragment>
  );
}
