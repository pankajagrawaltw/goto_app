import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  todoTitle: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  todoTitleText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  todoCountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF0F9',
    height: 25,
    width: 25,
    borderRadius: 20,
    margin: 5
  },
  todoCountText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0C07D2'
  },
  todoListContainer: {
    flex: 0.8
  },
  todoItemContainer: {
    flexDirection: 'row',
    minHeight: 80
  },
  todoCheckBoxContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  uncheckedBox: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0C07D2'
  },
  checkedBox: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#0C07D2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  todoDetailsContainer: {
    flex: 0.7,
    justifyContent: 'center'
  },
  itemTitleText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10
  },
  todoParticipantsContainer: {
    flexDirection: 'row',
    marginBottom: 10
  },
  participantsContainer: {
    height: 30,
    width: 30,
    borderRadius: 20,
    backgroundColor: '#EEF0F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
    marginBottom: 10
  },
  participantsText: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 14
  },
  descriptionText: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 10
  },
  todoMusicContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
