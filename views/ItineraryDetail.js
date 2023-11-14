import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import { PostsData } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
import HeaderBack from "../components/HeaderBack";
import CardItinerary from "../components/CardItinerary";
export default function ItineraryDetail() {
  const [itineraries, setVisitedsData] = useState(PostsData);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <HeaderBack name="Itinerary example #21..." />
        <View>
          <FlatList
            data={itineraries}
            keyExtractor={(_, index) => String(index)}
            scrollEnabled={false}
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            contentContainerStyle={{
              justifyContent: "start",
              padding: 16,
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={{}}>
                  <CardItinerary
                    name={item.title}
                    description={"Nepal/Guru"}
                    image={item.image}
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
