import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Carousel from "../components/Carousel";
import { PostsData, getCountriesDb, getPostDb } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
import HeaderBack from "../components/HeaderBack";
import { getSubCategories, getPosts } from "../api";
import { Q } from "@nozbe/watermelondb";
export default function Posts({ navigation, route }) {
  const [categoryId, setCategoryId] = useState(route?.params?.id || 1);
  const [name, setName] = useState(route?.params?.name || "The Buddha");
  const [selected, setSelected] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const [countries, setCountries] = useState([]);

  const getCountryData = async () => {
    const res = await getCountriesDb(Q.where("local_id", categoryId));
    setCountries(res.map((item) => JSON.parse(item.content)));
    setSelected(JSON.parse(res[0].content));
    getPostsData(JSON.parse(res[0].content)?.country?.id);
  };

  const getPostsData = async (country_id) => {
    const res = await getPostDb(Q.where("country_id", country_id));
    setPostsData(res.map((item) => JSON.parse(item.content)));
  };

  const selectCountry = async (select) => {
    getPostsData(select?.country?.id);
    setSelected(select);
  };

  useEffect(() => {
    getCountryData();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <HeaderBack name={name} onBack={() => navigation.goBack()} />
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
                  onPress={() => selectCountry(item)}
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
                    id={item.post_id}
                    title={item.title}
                    navigation={navigation}
                    description={item.subtitle}
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
