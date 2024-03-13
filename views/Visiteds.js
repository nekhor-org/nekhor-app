import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "../components/Carousel";
import { DATA, getPostDb } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
import { getPosts } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Q } from "@nozbe/watermelondb";

export default function Visiteds({ navigation }) {
  const [visitedsData, setVisitedsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHomeData = async () => {
    const values = await AsyncStorage.getItem("visiteds");
    if (values !== null && JSON.parse(values).length > 0) {
      const res = await getPostDb(
        Q.where("post_id", Q.oneOf(JSON.parse(values)))
      );
      setVisitedsData(res.map((item) => JSON.parse(item.content)));
    }

    setIsLoading(false);
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
          {isLoading ? (
            <View style={{ marginTop: 10 }}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
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
          )}
        </View>
      </ScrollView>
      <Footer navigation={navigation} active="map" />
    </View>
  );
}

const styles = StyleSheet.create({});
