import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import { PostsData } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
import HeaderBack from "../components/HeaderBack";
export default function Posts() {
  const [selected, setSelected] = useState(null);
  const [postsData, setPostsData] = useState(PostsData);
  const [countries, setCountries] = useState([
    { id: 1, name: "Nepal" },
    { id: 2, name: "India" },
  ]);

  useEffect(() => {
    setSelected(countries[0]);
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <HeaderBack name="The Buddha" />
        <View>
          <FlatList
            data={countries}
            keyExtractor={(_, index) => String(index)}
            horizontal
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            contentContainerStyle={{
              justifyContent: "start",
              padding: 16,
            }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={{ marginHorizontal: 12 }}
                  onPress={() => setSelected(item)}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: selected?.id == item?.id ? "#B18C20" : "#AEAEAE",
                      fontWeight: selected?.id == item?.id ? 700 : 400,
                      paddingHorizontal: 12,
                    }}
                  >
                    {item.name}
                  </Text>
                  {selected?.id == item?.id && (
                    <View
                      style={{
                        width: "100%",
                        height: 5,
                        borderRadius: 8,
                        marginTop: 16,
                        backgroundColor: "#B18C20",
                      }}
                    ></View>
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View>
          <FlatList
            data={postsData}
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
                    title={item.title}
                    description={item.description}
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
