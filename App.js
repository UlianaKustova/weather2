import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Button, View, Alert, TextInput, ActivityIndicator, FlatList } from 'react-native';


export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [forecast1, setForecast1] = useState('..');
  const [forecast2, setForecast2] = useState('..');
  const [forecast3, setForecast3] = useState('..');
  const [forecastAW1, setForecastAW1] = useState('..');
  const [forecastAW2, setForecastAW2] = useState('..');
  const [forecastAW3, setForecastAW3] = useState('..');



  const getForecast = async () => {
    try {
      const response = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=56.1943&lon=44.0007',

        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'User-Agent': 'MyTestApp/0.2'
          }
        }
      );
      const json = await response.json();//эвэит ждет ответа
      //console.log(JSON.stringify(json));
      setData(json.properties.timeseries);
      //console.log(json.properties.timeseries.time[3 - 1].data.instant.details.air_temperature);
      ddd = JSON.stringify(json.properties.timeseries[5].data.instant.details.air_temperature);
      //console.log(ddd);
      setForecast1(JSON.stringify(json.properties.timeseries[6].data.instant.details.air_temperature));
      setForecast2(JSON.stringify(json.properties.timeseries[24].data.instant.details.air_temperature));
      setForecast3(JSON.stringify(json.properties.timeseries[48].data.instant.details.air_temperature));
      //console.log(JSON.search(json.properties.timeseries, '//data'));
      //rrr = response;
      //setData(response);


      const response2 = await fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/294199?apikey=6L1XZVx53Vr591ZyuqZveNAGStoRgghs&metric=true',

        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'User-Agent': 'MyTestApp/0.2'
          }
        }
      );
      const json2 = await response2.json();
      //setData(json2.DailyForecasts);

      //console.log(json.properties.timeseries.time[3 - 1].data.instant.details.air_temperature);
      //ddd2 = JSON.stringify(json2.properties.timeseries[5].data.instant.details.air_temperature);
      //console.log(JSON.stringify(json2));

      //setForecastAW1(JSON.stringify(json.DailyForecasts[1].Temperature.Minimum.Value));
      setForecastAW1(JSON.stringify(json2.DailyForecasts[0].Temperature.Minimum.Value));//три строчки ищут значения
      setForecastAW2(JSON.stringify(json2.DailyForecasts[1].Temperature.Minimum.Value));
      setForecastAW3(JSON.stringify(json2.DailyForecasts[2].Temperature.Minimum.Value));
      //setForecast2(JSON.stringify(json.properties.timeseries[24].data.instant.details.air_temperature));
      //setForecast3(JSON.stringify(json.properties.timeseries[48].data.instant.details.air_temperature));

      //console.log(JSON.search(json.properties.timeseries, '//data'));
      //rrr = response;
      //setData(response);  

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>
          Enter your city
        </Text>
      </View>

      <View style={styles.search}>
        <View style={styles.input}>
          <TextInput />
        </View>
        <View style={styles.btnSrch}>
          <Button
            title="k"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
      </View>

      <View style={styles.line0}>
        <View style={styles.column}>
          <Text style={styles.title}>

          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            Today
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            Tomorrow
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            After tomorrow
          </Text>
        </View>
      </View>

      <View style={styles.line}>
        <View style={styles.column}>
          <Text style={styles.title}>
            YR
          </Text>
        </View>
        <View style={styles.column}>
          {isLoading ? <Text style={styles.title}>...</Text> : (
            <Text style={styles.title}>{forecast1}</Text>
          )}
        </View>

        <View style={styles.column}>
          {isLoading ? <Text style={styles.title}>...</Text> : (
            <Text style={styles.title}>{forecast2}</Text>
          )}
        </View>
        <View style={styles.column}>
          {isLoading ? <Text style={styles.title}>...</Text> : (
            <Text style={styles.title}>{forecast3}</Text>
          )}
        </View>
      </View>

      <View style={styles.line}>
        <View style={styles.column}>
          <Text style={styles.title}>
            AccuWeather
          </Text>
        </View>
        <View style={styles.column}>
          {isLoading ? <Text style={styles.title}>...</Text> : (
            <Text style={styles.title}>{forecastAW1}</Text>
          )}
        </View>
        <View style={styles.column}>
          {isLoading ? <Text style={styles.title}>...</Text> : (
            <Text style={styles.title}>{forecastAW2}</Text>
          )}
        </View>
        <View style={styles.column}>
          {isLoading ? <Text style={styles.title}>...</Text> : (
            <Text style={styles.title}>{forecastAW3}</Text>
          )}
        </View>
      </View>

      <View style={styles.line}>
        <View style={styles.column}>
          <Text style={styles.title}>
            Yandex
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            500
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            -0
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            -2
          </Text>
        </View>
      </View>

      <View style={styles.line}>
        <View style={styles.column}>
          <Text style={styles.title}>
            Calculator
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            19
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            -5
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            -11
          </Text>
        </View>
      </View>

      <View style={{ padding: 24 }}>
        {isLoading ? <ActivityIndicator /> : (

          <FlatList
            data={data}
            keyExtractor={({ time }, index) => time}
            renderItem={({ item }) => (
              <Text>{item.data.instant.details.air_temperature}</Text>
            )}
          />

        )}
      </View>

    </SafeAreaView >
  );
}
//стили
const styles = StyleSheet.create({
  container: {
    marginHorizontal: "3%",// отступ справа и слева
    marginTop: 30, // отступ сверху экрана 
  },
  title: {
    textAlign: 'center',//текст по середине
  },
  titleView: {
    marginVertical: '2%', /* отступ сверху и снизу */
  },
  btnSrch: {
    flex: 1,//динамическое распределение(занимает все пространство)
  },
  input: {
    borderWidth: 1,//толщина рамки
    flex: 10,
  },
  search: {
    flexDirection: "row",//вью распологаются друг за дружкой по горизонтали
  },
  line: {
    flexDirection: "row",
    marginTop: 10,
  },
  column: {
    flex: 1,
  },
  line0: {
    flexDirection: "row",
    marginTop: 40,
  },
});