import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import { Countries } from "../utils";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
import HeaderBack from "../components/HeaderBack";
import CardItinerary from "../components/CardItinerary";
import FooterItinerary from "../components/FooterItinerary";
import CardSelectItinerary from "../components/CardSelectItinerary";
import { getPostsItineraries } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UpdateItinerary({ navigation, route }) {
  const nameItinerary = route.params?.id;
  const [selected, setSelected] = useState([]);
  const [posts, setPosts] = useState([]);
  const [name, setName] = useState("");

  const getItineraries = async () => {
    const values = await AsyncStorage.getItem("itineraries");
    if (values) {
      const itinerary = JSON.parse(values).filter(
        (item) => item.name === nameItinerary
      );
      if (itinerary) {
        console.log(itinerary[0].name);
        console.log(itinerary[0].posts);
        setName(itinerary[0].name);
        setSelected(itinerary[0].posts);
      }
    }
  };

  const getPostsData = async () => {
    const response = await getPostsItineraries();
    setPosts(response.data);
  };

  const setSelectedData = async (data) => {
    if (selected.includes(data)) {
      let newSelecteds = selected.filter((item) => item != data);
      setSelected(newSelecteds);
    } else {
      setSelected([...selected, data]);
    }
  };

  const updateItinerary = async () => {
    let res = await AsyncStorage.getItem("itineraries");
    const data = {
      name: name,
      posts: selected,
    };

    console.log(data);

    console.log(res);
    const itinerary = JSON.parse(res).filter(
      (item) => item.name !== nameItinerary
    );
    await AsyncStorage.setItem(
      "itineraries",
      JSON.stringify([...itinerary, data])
    );

    navigation.goBack();
  };

  useEffect(() => {
    getPostsData();
    getItineraries();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView style={{ marginBottom: 80 }}>
        <HeaderBack name="Add itinerary" onBack={() => navigation.goBack()} />
        <View style={{ padding: 16 }}>
          <TextInput
            placeholder="Choose itinerary name"
            placeholderTextColor="#8B8B8B"
            value={name}
            onChangeText={(item) => setName(item)}
            style={{
              borderRadius: 52,
              backgroundColor: "#EDEDED",
              padding: 16,
            }}
          />

          <Text style={{ color: "#A67C00", fontSize: 22, marginVertical: 18 }}>
            Select places
          </Text>
        </View>
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
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                      paddingVertical: 16,
                      paddingHorizontal: 8,
                    }}
                  >
                    <Text
                      style={{ fontSize: 18, color: "black", fontWeight: 700 }}
                    >
                      {item.local?.name}
                    </Text>
                    <Image
                      source={require(`../assets/arrow_bottom.png`)}
                      style={styles.menu}
                    />
                  </View>
                  <View
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#ccc",
                    }}
                  ></View>
                  <FlatList
                    data={item.posts}
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
                          <CardSelectItinerary
                            id={item.post_id}
                            name={item.title}
                            description={`${item.country}/${item.local}`}
                            image={item.image}
                            isChecked={selected.includes(item.post_id)}
                            setChecked={setSelectedData}
                          />
                        </View>
                      );
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <FooterItinerary size={selected.length} action={updateItinerary} />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    height: 32,
    width: 32,
    marginHorizontal: 4,
    objectFit: "cover",
  },
});
