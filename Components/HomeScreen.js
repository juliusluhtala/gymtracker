import { Pressable, Text, View } from 'react-native';
import { styles } from "../Styles";
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {
  const [show, setShow] = useState(false);
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  })
  const [location, setLocation] = useState(null);
    const gyms = [
    {id: 1, name: 'ELIXIA Vallila', latitude: 60.19536638690846, longitude: 24.949984105187433},
    {id: 2, name: 'ELIXIA Citycenter', latitude: 60.1704697228241, longitude: 24.944157724852086},
    {id: 3, name: 'ELIXIA Redi', latitude: 60.18734116088201, longitude: 24.98384994091297},
    {id: 4, name: 'ELIXIA Sörnäinen', latitude: 60.18734116088201, longitude: 24.970437127838878},
    {id: 5, name: 'ELIXIA Töölö', latitude: 60.17251174810855, longitude: 24.924617845006345},
    {id: 6, name: 'ELIXIA Fabian', latitude: 60.16676740616741, longitude: 24.95226076210764},
    {id: 7, name: 'ELIXIA Ruoholahti', latitude: 60.16475362454824, longitude: 24.91029561856063},
  ];

  // Ask permission for using location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to get location')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {show && (
        <View style={{ position:"absolute", top: 0, bottom:0, left:0, right:0 }}>
          <Pressable style={styles.closeMapButton} onPress={() => setShow(false)}>
            <Text style={styles.mapButtonText}>CLOSE</Text>
          </Pressable>
          <MapView         
            style={{ flex: 1 }}
            region={region}
            showsUserLocation={true}>
            {gyms.map((gym) => (
              <Marker
                key={gym.id}
                coordinate={{ latitude: gym.latitude, longitude: gym.longitude }}
                title={gym.name}/>
              ))}
          </MapView>
        </View>
      )}
      {!show && (
        <View>
          <Pressable style={styles.mapButton} onPress={() => setShow(true)}>
            <Text style={styles.mapButtonText}>MAP</Text>
          </Pressable>
          <View>
            <Text style={styles.titleText}>Choose Muscle Group</Text>
          </View>
          <View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Chest')} >
              <Text style={styles.buttonText}>CHEST</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Back')}>
              <Text style={styles.buttonText}>BACK</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Legs')}>
              <Text style={styles.buttonText}>LEGS</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Abs&Arms')}>
              <Text style={styles.buttonText}>ABS&ARMS</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}