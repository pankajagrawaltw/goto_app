import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dateTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    width: '18%',
    backgroundColor: '#EEF0F9',
    borderRadius: 10
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  dayText: {
    fontSize: 10
  },
  actionButtonContainer: {
    flexDirection: 'row'
  },
  previousButtonContainer: {
    flex: 0.5
  },
  nextButtonContainer: {
    alignItems: 'flex-end',
    flex: 0.5
  },
  buttonText: {
    color: 'red'
  }
});
