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
export default function Favorites({ navigation }) {
  const [favoritesData, setFavoritesData] = useState([]);

  const [homePosts, setHomePosts] = useState([]);

  const getHomeData = async () => {
    const response = await getPosts("q[has_home_true]=true");
    console.log(response);
    setFavoritesData(response.data);
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <HeaderApp name="My favorites" />
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
