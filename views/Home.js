import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import { DATA } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import { Categories } from "../utils";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ navigation }) {
  const [categoriesData, setCategoriesData] = useState(Categories);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Header />
        <View style={{ height: 340 }}>
          <Carousel propsData={DATA} />
        </View>
        <View>
          <FlatList
            data={categoriesData}
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
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 12,
                    }}
                  >
                    <Text style={{ fontSize: 32 }}>{item.name}</Text>
                    <TouchableOpacity
                      style={{ color: "#A67C00", fontSize: 14 }}
                      onPress={() => console.log(`VER TODOS ${item.id}`)}
                    >
                      View All
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={item.countries}
                    keyExtractor={(_, index) => String(index)}
                    scrollEnabled={false}
                    renderToHardwareTextureAndroid
                    removeClippedSubviews={false}
                    contentContainerStyle={{}}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={{}}>
                          <Text style={{ fontSize: 14, marginTop: 8 }}>
                            {item.name}
                          </Text>
                          <FlatList
                            horizontal={true}
                            data={item.posts}
                            keyExtractor={(_, index) => String(index)}
                            scrollEnabled={true}
                            renderToHardwareTextureAndroid
                            removeClippedSubviews={false}
                            contentContainerStyle={{}}
                            renderItem={({ item, index }) => {
                              return (
                                <CardHome
                                  navigation={navigation}
                                  title={item.title}
                                  image={item.image}
                                  id={item.id}
                                />
                              );
                            }}
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
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({});
