import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
export default function CreateItinerary() {
  const [selected, setSelected] = useState(null);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ marginBottom: 80 }}>
        <HeaderBack name="Add itinerary" />
        <View style={{ padding: 16 }}>
          <TextInput
            placeholder="Choose itinerary name"
            placeholderTextColor="#8B8B8B"
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
            data={Countries}
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
                      {item.name}
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
                            name={item.title}
                            description={"Nepal/Guru"}
                            image={item.image}
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
      <FooterItinerary />
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
