import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, Button, View, Alert, TextInput, ActivityIndicator, FlatList } from 'react-native';


export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=51.5&lon=0', {
        userAgent: 'MyTestApp'
      });
      const json = await response.json();
      setData(json.forecst);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
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
            Tmr
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            After tmr
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
          <Text style={styles.title}>
            4
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            -2
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            -1
          </Text>
        </View>
      </View>

      <View style={styles.line}>
        <View style={styles.column}>
          <Text style={styles.title}>
            Google
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            6
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            0
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>
            -3
          </Text>
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
            0
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
            -0
          </Text>
        </View>
      </View>

      <View style={{ padding: 24 }}>
        {isLoading ? <ActivityIndicator /> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.title}, {item.releaseYear}</Text>
            )}
          />
        )}
      </View>
    </SafeAreaView>
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