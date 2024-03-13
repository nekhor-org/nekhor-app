import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import { DATA } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
import { getHome, getPosts } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Favorites({ navigation }) {
  const [favoritesData, setFavoritesData] = useState([]);

  const [homePosts, setHomePosts] = useState([]);

  const getHomeData = async () => {
    const values = await AsyncStorage.getItem("favorites");
    if (values !== null && JSON.parse(values).length > 0) {
      query = "";
      JSON.parse(values).map((item) => {
        query += `q[id_in][]=${item}&`;
      });
      const response = await getPosts(query);

      setFavoritesData(response.data);
    }
  };

  const removeAll = async () => {
    await AsyncStorage.setItem("favorites", JSON.stringify([]));
    setFavoritesData([]);
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <HeaderApp name="My favorites" action={() => removeAll()} />
        <View>
          <FlatList
            data={favoritesData}
            keyExtractor={(_, index) => String(index)}
            scrollEnabled={false}
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            contentContainerStyle={{
              justifyContent: "start",
              padding: 16,
              marginBottom: 90,
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={{}}>
                  <CardPost
                    id={item.post_id}
                    navigation={navigation}
                    kind="heart"
                    title={item.title}
                    description={item.subtitle}
                    image={item.image}
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <Footer navigation={navigation} active="heart" />
    </View>
  );
}

const styles = StyleSheet.create({});
