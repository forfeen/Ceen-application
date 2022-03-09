import * as WebBrowser from 'expo-web-browser';
import { Dimensions } from 'react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Colors from '../../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function VaccinationCharts({ path }: { path: string }) {
  const screenWidth = Dimensions.get("window").width;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 50, 80, 99, 120],
      }
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#FFF",
    color: (opacity = 1) => "#313552",
  };
  return (
    <View>
    <LineChart
      data={data}
      width={330}
      height={256}
      chartConfig={chartConfig}
      // bezier
      style={{
        marginTop: 2,
        marginVertical: 8,
        marginHorizontal: 8,
        // borderRadi
        borderRadius: 16
      }}
    />

    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}

const styles = StyleSheet.create({
  text: {
    // backgroundColor: 'white'
  }
  // getStartedContainer: {
  //   alignItems: 'center',
  //   marginHorizontal: 50,
  // },
  // homeScreenFilename: {
  //   marginVertical: 7,
  // },
  // codeHighlightContainer: {
  //   borderRadius: 3,
  //   paddingHorizontal: 4,
  // },
  // getStartedText: {
  //   fontSize: 17,
  //   lineHeight: 24,
  //   textAlign: 'center',
  // },
  // helpContainer: {
  //   marginTop: 15,
  //   marginHorizontal: 20,
  //   alignItems: 'center',
  // },
  // helpLink: {
  //   paddingVertical: 15,
  // },
  // helpLinkText: {
  //   textAlign: 'center',
  // },
});
