import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
export default function Itinerary() {
  const [itinerariesData, setItinerariesData] = useState(Itineraries);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <HeaderItinerary name="My itinerary" />
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
                  <ListItinerary name={item.name} />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <Footer active="location" />
    </View>
  );
}

const styles = StyleSheet.create({});
