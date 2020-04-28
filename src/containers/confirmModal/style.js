import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  detailContiner: {
    flex: 0.5,
    backgroundColor: '#fff',
    borderRadius: 15
  },
  elementContainer: {
    flex: 0.8
  },
  optionsContainer: {
    flex: 0.5
  },
  option: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  uncheckedBox: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#0C07D2',
    margin: 10
  },
  checkedBox: {
    height: 20,
    width: 20,
    borderRadius: 20,
    backgroundColor: '#0C07D2',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  actionButtonsContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  submitButton: {
    flex: 0.2
  }
});
