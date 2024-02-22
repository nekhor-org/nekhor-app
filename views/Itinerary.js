import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import { Itineraries } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
import HeaderItinerary from "../components/HeaderItinerary";
import ListItinerary from "../components/ListItinerary";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Itinerary({ navigation }) {
  const [itinerariesData, setItinerariesData] = useState([]);

  const getItineraries = async () => {
    const values = await AsyncStorage.getItem("itineraries");
    if (values) {
      setItinerariesData(JSON.parse(values));
    } else {
      setItinerariesData([]);
    }
  };

  useEffect(() => {
    getItineraries();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <HeaderItinerary name="My itinerary" navigation={navigation} />
        <View>
          <FlatList
            data={itinerariesData}
            keyExtractor={(_, index) => String(index)}
            scrollEnabled={false}
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            contentContainerStyle={{
              justifyContent: "start",
              padding: 8,
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={{}}>
                  <ListItinerary
                    name={item.name}
                    navigate={() =>
                      navigation.push("ItineraryDetail", { id: item.name })
                    }
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <Footer navigation={navigation} active="location" />
    </View>
  );
}

const styles = StyleSheet.create({});
