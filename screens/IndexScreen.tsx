import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import VaccinationCharts from '../components/VaccinationsCharts';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function IndexScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vaccinations Overview</Text>
      <VaccinationCharts path="/screens/ModalScreen.tsx" />

      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}

      <Text style={styles.title}>Vaccines</Text>
      <VaccinationCharts path="/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'black' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#F0F7F9'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    color: '#000',
    margin: 25
  },
  separator: {
    marginVertical: 30,
    height: 6,
    width: '80%',
    top: '10%'
  },
});
