import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getHome, getPosts } from "../api";

export default function ItineraryDetail({ navigation, route }) {
  const id = route?.params?.id;
  const [posts, setPosts] = useState([]);
  const [itinerary, setItinerary] = useState(null);

  const getItineraries = async () => {
    const values = await AsyncStorage.getItem("itineraries");
    if (values) {
      const itinerary = JSON.parse(values).filter((item) => item.name === id);
      if (itinerary) {
        setItinerary(itinerary[0]);

        query = "";
        itinerary[0].posts.map((item) => {
          query += `q[id_in][]=${item}&`;
        });
        const response = await getPosts(query);
        setPosts(response.data);
      }
    }
  };

  useEffect(() => {
    getItineraries();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <HeaderBack
          name={id}
          hasMenu
          navigation={navigation}
          onBack={() => navigation.onBack()}
        />
        <View>
          <FlatList
            data={posts}
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
                    description={`${item.country}/${item.local}`}
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
