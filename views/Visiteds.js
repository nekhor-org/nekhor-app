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
import { getPosts } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Visiteds({ navigation }) {
  const [visitedsData, setVisitedsData] = useState([]);

  const getHomeData = async () => {
    const values = await AsyncStorage.getItem("visiteds");
    if (values !== null && JSON.parse(values).length > 0) {
      query = "";
      JSON.parse(values).map((item) => {
        query += `q[id_in][]=${item}&`;
      });
      const response = await getPosts(query);
      setVisitedsData(response.data);
    }
  };

  const removeAll = async () => {
    await AsyncStorage.setItem("visiteds", JSON.stringify([]));
    setVisitedsData([]);
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <HeaderApp name="Already visited" action={() => removeAll()} />
        <View>
          <FlatList
            data={visitedsData}
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
                    kind="map"
                    id={item.post_id}
                    navigation={navigation}
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
      <Footer navigation={navigation} active="map" />
    </View>
  );
}

const styles = StyleSheet.create({});
