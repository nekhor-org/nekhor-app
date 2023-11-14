import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import { DATA } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
export default function Visiteds() {
  const [visitedsData, setVisitedsData] = useState(DATA);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <HeaderApp name="Already visited" />
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
            }}
            renderItem={({ item, index }) => {
              return (
                <View style={{}}>
                  <CardPost
                    kind="map"
                    title={item.title}
                    description={item.description}
                    image={item.poster}
                  />
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
      <Footer active="map" />
    </View>
  );
}

const styles = StyleSheet.create({});
