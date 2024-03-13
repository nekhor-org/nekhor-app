import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import { DATA, getPostDb } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
import { getHome, getPosts } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Q } from "@nozbe/watermelondb";
import { ActivityIndicator } from "react-native";

export default function Favorites({ navigation }) {
  const [favoritesData, setFavoritesData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [homePosts, setHomePosts] = useState([]);

  const getHomeData = async () => {
    const values = await AsyncStorage.getItem("favorites");
    if (values !== null && JSON.parse(values).length > 0) {
      const res = await getPostDb(
        Q.where("post_id", Q.oneOf(JSON.parse(values)))
      );
      setFavoritesData(res.map((item) => JSON.parse(item.content)));
    }

    setIsLoading(false);
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
          {isLoading ? (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
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
          )}
        </View>
      </ScrollView>
      <Footer navigation={navigation} active="heart" />
    </View>
  );
}

const styles = StyleSheet.create({});
