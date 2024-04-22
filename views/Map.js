import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View, Image } from "react-native";
import Mapbox from "@rnmapbox/maps";
import { getLatLng } from "../api";

Mapbox.setAccessToken(
  "sk.eyJ1IjoianVuaW9ybmVsc29uMTIzIiwiYSI6ImNsdmF6Ym1iMjAzZmIya2w0MzNxejJsMXUifQ.20p81R35Xgd9h8BUisyfIg"
);
const Map = ({ navigation, route }) => {
  const lat = route?.params?.lat;
  const lng = route?.params?.lng;
  const [centerLocation, setCenterLocation] = useState([-73.970895, 40.723279]);
  const [locations, setLocations] = useState(null);
  const pointAnnotation = useRef(null);
  const getLocations = async () => {
    const response = await getLatLng();
    console.log(response.data);
    if (response.data?.length > 0) {
      console.log("PARAMETROS", route.params);
      setLocations(response.data);
      if (lat && lng) {
        setCenterLocation([lat, lng]);
      } else {
        setCenterLocation(response.data[response.data.length - 1].lat_lng);
      }
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <View style={styles.page}>
      {locations && (
        <View style={styles.container}>
          <Mapbox.MapView style={styles.map}>
            <Mapbox.Camera zoomLevel={9} centerCoordinate={centerLocation} />
            {locations.map((item, index) => (
              <Mapbox.MarkerView
                key={`key-${index}`}
                id={`id-${index}`}
                title={item.name}
                coordinate={item.lat_lng}
              >
                <View style={styles.annotationContainer}>
                  <Text>{item.name}</Text>
                  <Image
                    source={require(`../assets/gold_seal.png`)}
                    style={{ width: 30, height: 30 }}
                    fadeDuration={0}
                  />
                </View>
              </Mapbox.MarkerView>
            ))}
          </Mapbox.MapView>
        </View>
      )}
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
