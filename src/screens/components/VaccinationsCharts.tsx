import { StyleSheet } from 'react-native';
import {LineChart,} from "react-native-chart-kit";
import Swiper from 'react-native-swiper';
import { Text, View } from './Themed';
import vaccineService from '../services/vaccine.service';
import { useEffect, useState } from 'react';
import Covid from '../../types/covid.type';
import VaccinationData from '../../types/vaccination.type';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function VaccinationCharts({ path }: { path: string }) {

  const [covid, setCovid] = useState<Covid>();
  const [vaccination, setVaccination] = useState<VaccinationData[]>([]);
  const [vaccinationData, setVaccinationData] = useState<[]>([]);
  const [vaccinationDaily, setDaily] = useState<number>(97746);
  const [vaccinationTotal, setTotal] = useState<number>(131200892);

  const [newCase, setNewCase] = useState<number>();
  const [recoveryCase, setNewRecover] = useState<number>();
  const [newDeath, setNewDeath] = useState<number>();

  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<string>();
  const [year, setYear] = useState<number>();
  const [date, setDate] = useState<string>('4/14/22');

  async function getCovidCase() {
    const data = await vaccineService.getCovidCase()
        .then(response => {
            return response.data;
        })
        .catch(e => {
            console.error(e);
        })
        return data;
  }

  async function getVaccinationData() {
    const data = await vaccineService.getVaccinationData()
    .then(response => {
      return response.data.items;
      })
      .catch(e => {
          console.error(e);
      })
      return data;
  }

  useEffect(() => {
    const fetchCovidCase = async () => {

      const covid = await getCovidCase();
      setCovid(covid);
      setNewCase(covid[0].new_case.toLocaleString());
      setNewRecover(covid[0].new_recovered.toLocaleString());
      setNewDeath(covid[0].new_death.toLocaleString());
      
      const date = new Date(covid[0].txn_date);
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      setDay(day);
      setMonth(month);
      setYear(year);
    }

    const fetchVaccinationData = async () => {
      const data = await getVaccinationData();
      console.log(data);
       
      setVaccination(data);
      
      let numData = [];
      for (const eachData of vaccination) {
        numData.push(eachData.daily)
      }
      setVaccinationData(numData);
      console.log(vaccinationData);
      
      setDaily(vaccination[vaccination.length - 1].daily);
      setTotal(vaccination[vaccination.length - 1].total);
      setDate(vaccination[vaccination.length - 1].date);
      // console.log(vaccinationData);
      
    };

    fetchCovidCase();
    fetchVaccinationData();
  }, []);

  const data = {
    datasets: [
      {
        data: [
          209479,
          205933,
          185425,
          182682,
          180883,
          173801,
          166555,
          136078,
          125633,
          147198,
          146485,
          145683,
          146026,
          136324,
          130479,
          97746,
        ]
      }
    ],
  };

  // const data = {
  //   datasets: [
  //     {
  //       data: vaccinationData,
  //     }
  //   ],
  // };

  const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#FFF",
    color: (opacity = 1) => "#A2D5AB",
  };

  return (    
    <View style={styles.container}>
        <Swiper 
          style={styles.wrapper}
          paginationStyle={{
            top: wp('90%'),
          }}
          dot={
            <View
              style={{
                backgroundColor: '#a4c7db',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: '#5fb0de',
                width: 8,
                height: 8,
                borderRadius: 4,
                marginLeft: 3,
                marginRight: 3,
                marginTop: 3,
                marginBottom: 3
              }}
            />
          }
        >
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={styles.title}>COVID-19 : {day} {month} {year}</Text>
            <View style={styles.card}>
              <View style={{ padding: 10, flex: 1 , backgroundColor: 'transparent'}}>
                <View style={styles.topSection}>
                  <Text style={styles.textHeader}>New Case</Text>
                  <Text style={styles.textBody}> {newCase} </Text>
                </View>
                <View
                  style={{
                    height: 120,
                    flexDirection: 'row',
                    backgroundColor: 'transparent'
                  }}>
                  <View style={styles.subLeft}>
                    <Text style={styles.textHeader}>Recovered Case</Text>
                    <Text style={styles.textBody}> {recoveryCase} </Text>
                  </View>
                  <View style={styles.subRight}>
                    <Text style={styles.textHeader}>Death</Text>
                    <Text style={styles.textBody}> {newDeath} </Text>
                  </View>
                </View>
              </View>
            </View>
         </View>
          <View style={{backgroundColor: 'transparent'}}>
            <Text style={styles.title}>Vaccinations Overview</Text>
            <View style={{backgroundColor: 'transparent'}}>
                <View style={{ flexDirection: 'row', flex:1, margin: 10}}>
                  <View style={{ width: 120, height: 245, backgroundColor: '#fff', borderRadius: 15}} >
                      <Text style={styles.textVacHeader}> Last updated {'\n'} {date} </Text>
                      <Text style={styles.textVacBody}> {vaccinationDaily.toLocaleString() || '-'} </Text>
                      <Text style={styles.textVacHeader}> Total </Text>
                      <Text style={styles.textVacBody}>{vaccinationTotal.toLocaleString()  || '-'} </Text>

                  </View>
                  <View style={{justifyContent: 'center' }} >
                    <LineChart
                          title={'r'}
                          data={data}
                          width={230}
                          height={250}
                          chartConfig={chartConfig}
                          style={styles.chart}
                          bezier
                          withHorizontalLines={false}
                          withVerticalLines={false}
                          withHorizontalLabels={false}
                          withDots={false}
                        /> 
                    </View>
                </View>
            </View>
          </View>
        </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    height: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    color: '#000',
    margin: 25,
    backgroundColor: 'transparent'
  },
  chart: {
    marginTop: 2,
    marginVertical: 8,
    marginHorizontal: 8,
    alignItems: 'center',
    paddingRight: 10,
    borderRadius: 20,
  },
  wrapper: {},
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    
  },
  topSection: {
    height: 120,
    backgroundColor: '#EF7B7B',
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  subLeft: {
    flex: 1,
    backgroundColor: '#91C483',
    justifyContent: 'center',
    borderBottomLeftRadius: 20
  },
  subRight: {
    flex: 1,
    backgroundColor: '#919190',
    justifyContent: 'center',
    borderBottomRightRadius: 20
  },
  textHeader: {
    alignSelf: 'stretch',
    marginLeft: 10 ,
    bottom: 15,
    color: 'white',
    fontWeight: '400',
    fontSize: 18,
  },
  textBody: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: '800',
    fontSize: 30,
  },
  textVacHeader: {
    alignSelf: 'stretch',
    marginLeft: 10 ,
    bottom: 15,
    color: 'green',
    fontWeight: '400',
    fontSize: 15,
    marginTop: 35
  },
  textVacBody: {
    alignSelf: 'stretch',
    marginLeft: 10 ,
    bottom: 15,
    color: 'green',
    fontWeight: '500',
    fontSize: 18,
    marginTop: 30
  }
});
