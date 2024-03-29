//import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Button, View, TextInput, ImageBackground } from 'react-native';

const image = require('./backgr.png');

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [forecast1, setForecast1] = useState('..');//опред переменную и функцию устаноыки ее значения и присваиваем первоначальное значение
  const [forecast2, setForecast2] = useState('..');
  const [forecast3, setForecast3] = useState('..');
  const [forecastAW1, setForecastAW1] = useState('..');
  const [forecastAW2, setForecastAW2] = useState('..');
  const [forecastAW3, setForecastAW3] = useState('..');
  const [forecastOW1, setForecastOW1] = useState('..');
  const [forecastOW2, setForecastOW2] = useState('..');
  const [forecastOW3, setForecastOW3] = useState('..');
  const [searchText, setSearchText] = useState('');
  const [locationText, setlocationText] = useState('');
  const [lat, setlat] = useState();
  const [lon, setlon] = useState();
  const [locid, setlocid] = useState(0);
  const [locflag, setlocflag] = useState(false);

  const getLocation = async () => {
    setlocflag(false);
    try {
      if (searchText.length == 0) {
        setlocationText('Nizhny Novgorod');
        setlat('56.194');
        setlon('44.0007');
        setlocid('294199');
        setlocflag(true);
        return;
      }



      txt = "https://nominatim.openstreetmap.org/search?q=";
      txt = txt + searchText + "&format=geocodejson";
      response = await fetch(txt,
        //await говорит о том что данная функция будет выполнятся асинхронно и не будет блокоровать выполнение другого кода приложения
        //fetch функция получения данных по api
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'User-Agent': 'MyTestApp/0.2'
          }
        }
      );
      if (response.ok) { // если HTTP-статус в диапазоне 200-299
        json = await response.json();//представляем ответ в виде json
        //console.log(JSON.stringify(json));

        ttt = JSON.stringify(json.features[0].properties.geocoding.name);
        setlocationText(ttt + ', ' + JSON.stringify(json.features[0].properties.geocoding.label));
        setlat(JSON.stringify(json.features[0].geometry.coordinates[1]));//вызываем функцию и передаем разпаршенное значение фунуции
        setlon(JSON.stringify(json.features[0].geometry.coordinates[0]));

      } else {
        //todo сообщить об ошибке
      }
      flag = false;
      txt = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=6L1XZVx53Vr591ZyuqZveNAGStoRgghs&q=" + searchText;
      response = await fetch(txt,
        //await говорит о том что данная функция будет выполнятся асинхронно и не будет блокоровать выполнение другого кода приложения
        //fetch функция получения данных по api
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'User-Agent': 'MyTestApp/0.2'
          }
        }
      );
      if (response.ok) { // если HTTP-статус в диапазоне 200-299
        json = await response.json();//представляем ответ в виде json
        textt = JSON.stringify(json);
        console.log(textt.slice(21, 27));


        // ttt = JSON.stringify(json.features[0].properties.geocoding.name);
        //setlocationText(ttt + ', ' + JSON.stringify(json.features[0].properties.geocoding.label));
        //setlat(JSON.stringify(json.features[0].geometry.coordinates[1]));//вызываем функцию и передаем разпаршенное значение фунуции
        setlocid(textt.slice(21, 27));
        flag = true;
        //setlocid('328328');

      } else {
        //todo сообщить об ошибке
        setlocid(1);
        flag = true;
      }


    } catch (error) {
      console.log(error);// в консоль приложения выводим свединья об ошибке
      //todo сделать вывод информации пользователю Что то пошло не так
      setlocationText('Not able to find location');
      setlocflag(true);
    } finally {//этот код выполнится всегда вне зависимости от того были ошибки в основном коде функции или нет
      if (flag == false) setlocid(1);
      setlocflag(true);
    }
  }



  const getForecast = async () => {
    try {
      setLoading(true);//ставим статус тру для сетлоадинг
      txt = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=" + lat + "&lon=" + lon;
      response = await fetch(txt,
        //await говорит о том что данная функция будет выполнятся асинхронно и не будет блокоровать выполнение другого кода приложения
        //fetch функция получения данных по api
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'User-Agent': 'MyTestApp/0.2'
          }
        }
      );

      if (response.ok) { // если HTTP-статус в диапазоне 200-299
        json = await response.json();//представляем ответ в виде json
        ttt = JSON.stringify(json.properties.timeseries[6].data.instant.details.air_temperature);
        setForecast1(ttt);
        setForecast2(JSON.stringify(json.properties.timeseries[24].data.instant.details.air_temperature));//вызываем функцию и передаем разпаршенное значение фунуции
        setForecast3(JSON.stringify(json.properties.timeseries[48].data.instant.details.air_temperature));
      } else {
        //todo сообщить об ошибке
      }

      txt = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + locid + "?apikey=6L1XZVx53Vr591ZyuqZveNAGStoRgghs&metric=true";
      response2 = await fetch(txt,
        // response2 = await fetch('http://dataservice.accuweather.com/forecasts/v1/daily/5day/294199?apikey=6L1XZVx53Vr591ZyuqZveNAGStoRgghs&metric=true',
        // const response2 = await fetch('https://api.weatherbit.io/v2.0/forecast/hourly?&lat=56.1943&lon=44.0007&key=fdf87b48498b44c1b432755e8dd1747c&hours=48',
        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'User-Agent': 'MyTestApp/0.2'
          }
        }
      );
      //console.log(await response2.json());
      if (response2.ok) {
        json2 = await response2.json();
        //console.log(json2);
        setForecastAW1(JSON.stringify(json2.DailyForecasts[0].Temperature.Minimum.Value));//три строчки ищут значения
        setForecastAW2(JSON.stringify(json2.DailyForecasts[1].Temperature.Minimum.Value));
        setForecastAW3(JSON.stringify(json2.DailyForecasts[2].Temperature.Minimum.Value));

        // setForecastAW1(JSON.stringify(json2.data[6].temp));//три строчки ищут значения
        // setForecastAW2(JSON.stringify(json2.data[24].temp));
        // setForecastAW3(JSON.stringify(json2.data[47].temp));

      } else {
        //todo сообщить об ошибке
        setForecastAW1('-');
        setForecastAW2('-');
        setForecastAW3('-');
      }
      txt = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=06eac4143280690e81a70a7ab328e288";
      response3 = await fetch(txt,

        {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'User-Agent': 'MyTestApp/0.2'
          }
        }
      );
      if (response3.ok) {
        json3 = await response3.json();
        setForecastOW1(JSON.stringify(json3.hourly[6].temp));//три строчки ищут значения
        setForecastOW2(JSON.stringify(json3.hourly[24].temp));
        setForecastOW3(JSON.stringify(json3.hourly[47].temp));
      } else {
        //todo сообщить об ошибке
      }

    } catch (error) {
      console.error(error);// в консоль приложения выводим свединья об ошибке
      //todo сделать вывод информации пользователю Что то пошло не так
    } finally {//этот код выполнится всегда вне зависимости от того были ошибки в основном коде функции или нет
      setLoading(false);
    }
  }


  useEffect(() => {//говорим react что этот код нужно выполнить после обновления перемнной
    getForecast();//основная функция получения данных
  }, [locflag]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>

        <View style={styles.titleView}>
          <Text style={styles.zagolovok}>
            Weather Forecaster
          </Text>
        </View>

        <View style={styles.titleView}>
          <Text style={styles.titletop}>
            Enter your city
          </Text>
        </View>

        <View style={styles.search}>
          <View style={styles.input}>
            <TextInput onChangeText={newText => setSearchText(newText)} />
          </View>
          <View style={styles.btnSrch}>
            <Button
              title="Search"
              color="rgb(12, 99, 53)"
              onPress={() => { getLocation(); }}
            />
          </View>
        </View>
        <View style={styles.titleView2}>
          <Text style={styles.titletop}>
            Location:
          </Text>
          <Text style={styles.titletop}>
            {locationText}
          </Text>
        </View>

        <View style={styles.line0}>
          <View style={styles.column}>
            <Text style={styles.title}>
              Source
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>
              After 6h
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>
              After 24h
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>
              After 48h
            </Text>
          </View>
        </View>

        <View style={styles.line}>
          <View style={styles.column}>
            <Text style={styles.title}>
              YR.NO
            </Text>
          </View>
          <View style={styles.column}>
            {isLoading ? <Text style={styles.title}>...</Text> : (
              <Text style={styles.title}>{forecast1} °C</Text>
            )}
          </View>

          <View style={styles.column}>
            {isLoading ? <Text style={styles.title}>...</Text> : (
              <Text style={styles.title}>{forecast2} °C</Text>
            )}
          </View>
          <View style={styles.column}>
            {isLoading ? <Text style={styles.title}>...</Text> : (
              <Text style={styles.title}>{forecast3} °C</Text>
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
              <Text style={styles.title}>{forecastAW1} °C</Text>
            )}
          </View>
          <View style={styles.column}>
            {isLoading ? <Text style={styles.title}>...</Text> : (
              <Text style={styles.title}>{forecastAW2} °C</Text>
            )}
          </View>
          <View style={styles.column}>
            {isLoading ? <Text style={styles.title}>...</Text> : (
              <Text style={styles.title}>{forecastAW3} °C</Text>
            )}
          </View>
        </View>

        <View style={styles.line}>
          <View style={styles.column}>
            <Text style={styles.title}>
              OpenWeatherMap
            </Text>
          </View>
          <View style={styles.column}>
            {isLoading ? <Text style={styles.title}>...</Text> : (
              <Text style={styles.title}>{forecastOW1} °C</Text>
            )}
          </View>
          <View style={styles.column}>
            {isLoading ? <Text style={styles.title}>...</Text> : (
              <Text style={styles.title}>{forecastOW2} °C</Text>
            )}
          </View>
          <View style={styles.column}>
            {isLoading ? <Text style={styles.title}>...</Text> : (
              <Text style={styles.title}>{forecastOW3} °C</Text>
            )}
          </View>
        </View>
        <View style={styles.extend}>
          <Text style={styles.title}>

          </Text>
        </View>
      </ImageBackground>
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
    fontWeight: 'bold',
  },
  titletop: {
    textAlign: 'left',
    fontWeight: 'bold',
  },
  titleView: {
    marginVertical: '2%', /* отступ сверху и снизу */
  },
  btnSrch: {
    flex: 1,//динамическое распределение(занимает все пространство)
  },
  input: {
    borderWidth: 1,//толщина рамки
    flex: 3,
  },
  search: {
    flexDirection: "row",//вью распологаются друг за дружкой по горизонтали
  },
  line: {
    flexDirection: "row",
    marginTop: 20,
  },
  column: {
    flex: 1,
  },
  line0: {
    flexDirection: "row",
    marginTop: 40,
    //marginVertical: '30%',

  },
  zagolovok: {
    textAlign: 'center',
    color: 'rgb(113, 245, 174)',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 50,
  },
  image: {
    justifyContent: "center"
  },
  extend: {
    flexDirection: "row",
    marginVertical: '70%',
  },
  titleView2: {
    marginTop: 100,

  },
});