import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  detailContiner: {
    flex: 0.7,
    backgroundColor: '#fff',
    borderRadius: 15
  },
  elementContainer: {
    flex: 0.85,
    marginHorizontal: 20
  },
  modalHeader: {
    flex: 0.25,
    justifyContent: 'center'
  },
  dataContainer: {
    flex: 0.75
  },
  titleInput: {
    height: 40,
    borderBottomWidth: 1
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap'
  },
  dates: {
    height: 40,
    padding: 20,
    borderRadius: 5,
    backgroundColor: '#EEF0F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row'
  },
  participantsHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 15
  },
  participantsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    flexWrap: 'wrap'
  },
  participantsCircle: {
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
  descriptionContainer: {
    marginBottom: 30
  },
  descriptionBox: {
    height: 100,
    borderWidth: 1,
    padding: 10
  },
  buttonContainer: { flex: 0.15 }
});
