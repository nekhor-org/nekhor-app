import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import Carousel from "../components/Carousel";
import {
  DATA,
  getCountriesDb,
  getCurrentLanguage,
  getHomesDb,
  getMenusDb,
  getPostDb,
  saveCountries,
  saveHome,
  saveItinerary,
  saveLanguage,
  saveMenus,
  savePostHome,
  savePosts,
} from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import { Categories } from "../utils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getHome, getMenus, getPosts } from "../api";
const { width } = Dimensions.get("screen");

export default function Splash({ navigation }) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [homePosts, setHomePosts] = useState([]);

  const getHomeData = async () => {
    const response = await getHomesDb();
    console.log("GOME Q VEM DO BANCO");
    console.log(response);
  };

  const saveData = async () => {
    await saveLanguage();

    setTimeout(async () => {
      await saveMenus();
      await saveHome();
      await saveCountries();
      await savePosts();
      await saveItinerary();
      navigation.replace("Home");
    }, 1000);
  };

  useEffect(() => {
    saveData();
    getHomeData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require(`../assets/gold_seal.png`)}
        style={{
          width: 200,
          height: 200,
        }}
      />
      <Text style={{ color: "#fff", marginTop: 12 }}>
        Please wait we are preparing the data!
      </Text>
      <View style={{ marginTop: 10 }}>
        <ActivityIndicator size="large" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
