import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "../components/Carousel";
import {
  DATA,
  getCountriesDb,
  getHomesDb,
  getPostDb,
  saveCountries,
  saveHome,
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
    const response = await getPostDb();
    console.log("GOME Q VEM DO BANCO");
    console.log(response);
  };

  useEffect(() => {
    // saveHome();
    // saveCountries();
    // savePosts();
    getHomeData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        <Text>Nekhor</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
