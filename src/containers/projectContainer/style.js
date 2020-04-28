import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  projectsTitle: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  titleCountContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF0F9',
    height: 25,
    width: 25,
    borderRadius: 20,
    margin: 5
  },
  countText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#0C07D2'
  },
  projectsListContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  projectsCard: {
    flex: 0.48,
    backgroundColor: '#EEF0F9',
    borderRadius: 10,
    paddingLeft: 10
  },
  projectsIconContainer: {
    flex: 0.42,
    justifyContent: 'center'
  },
  iconContainer: {
    backgroundColor: '#fff',
    height: 35,
    width: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  projectsDetail: {
    flex: 0.38,
    justifyContent: 'center'
  },
  detailTitleText: {
    color: '#0C07D2',
    fontSize: 20,
    fontWeight: 'bold'
  },
  dueDateText: {
    fontSize: 12
  },
  projectsUpcoming: {
    flex: 0.2
  },
  upcomingText: {
    fontSize: 15,
    fontWeight: 'bold'
  }
});
