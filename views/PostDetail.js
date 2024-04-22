import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
  ActivityIndicator,
  Share,
  Platform,
} from "react-native";
import Carousel from "../components/Carousel";
import { PostsData, getPostDb } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import Footer from "../components/Footer";
import HeaderApp from "../components/HeaderApp";
import CardPost from "../components/CardPost";
import HeaderBack from "../components/HeaderBack";
import WebView from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import FooterPost from "../components/FooterPost";
import { IP_ADDRESS, getPost } from "../api";
import RenderHTML from "react-native-render-html";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Q } from "@nozbe/watermelondb";

export default function PostDetail({ navigation, route }) {
  const { width } = useWindowDimensions();
  const postId = route?.params?.id;
  // const postId = 8;
  const [title, setTitle] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [local, setLocal] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [visited, setVisited] = useState(false);
  const [visiteds, setVisiteds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getPostData = async () => {
    const res = await getPostDb(Q.where("post_id", postId));
    if (res && res[0]) {
      const response = JSON.parse(res[0].content);
      setLat(response?.lat);
      setLng(response?.lng);
      setTitle(response?.title);
      setSubtitle(response?.subtitle);
      setLocal(response?.local);
      setContent(response?.content);
      setImage(`${IP_ADDRESS}${response?.image}`);
    }

    setIsLoading(false);
  };

  const changePage = () => {
    navigation.push("Map", { lat: lat, lng: lng, name: title });
  };

  const setVisitedData = async () => {
    try {
      if (visiteds.length > 0) {
        if (visiteds.includes(postId)) {
          let newVisiteds = visiteds.filter((item) => item != postId);
          setVisiteds(newVisiteds);
          await AsyncStorage.setItem("visiteds", JSON.stringify(newVisiteds));
          setVisited(false);
        } else {
          await AsyncStorage.setItem(
            "visiteds",
            JSON.stringify([...visiteds, postId])
          );
          setVisiteds([...visiteds, postId]);
          setVisited(true);
        }
      } else {
        setVisited(true);
        setVisiteds([postId]);
        await AsyncStorage.setItem("visiteds", JSON.stringify([postId]));
      }
    } catch (e) {
      console.log(e);
      // saving error
    }
  };

  const getVisitedData = async () => {
    try {
      const values = await AsyncStorage.getItem("visiteds");

      if (values !== null) {
        setVisiteds(JSON.parse(values));
        let exist = JSON.parse(values).filter((item) => item == postId);
        if (exist.length > 0) {
          setVisited(true);
        }
        return values;
      } else {
        setVisited(false);
        setVisiteds([]);
      }

      return [];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const getFavoriteData = async () => {
    try {
      const values = await AsyncStorage.getItem("favorites");
      if (values !== null) {
        setFavorites(JSON.parse(values));
        let exist = JSON.parse(values).filter((item) => item == postId);
        if (exist.length > 0) {
          setFavorited(true);
        }
        return values;
      } else {
        setFavorites([]);
      }

      return [];
    } catch (e) {
      console.log(e);
      return [];
    }
  };

  const setFavoritedData = async () => {
    try {
      if (favorites.length > 0) {
        if (favorites.includes(postId)) {
          let newFavorites = favorites.filter((item) => item != postId);
          setFavorites(newFavorites);
          await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
          setFavorited(false);
        } else {
          await AsyncStorage.setItem(
            "favorites",
            JSON.stringify([...favorites, postId])
          );
          setFavorites([...favorites, postId]);
          setFavorited(true);
        }
      } else {
        setFavorited(true);
        setFavorites([postId]);
        await AsyncStorage.setItem("favorites", JSON.stringify([postId]));
      }
    } catch (e) {
      console.log(e);
      // saving error
    }
  };

  useEffect(() => {
    getFavoriteData();
    getVisitedData();
    getPostData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView style={{ marginBottom: 100 }}>
        <HeaderBack name={local} onBack={() => navigation.goBack()} />
        {isLoading ? (
          <View style={{ marginTop: 10 }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View>
            <View style={styles.imageContainer}>
              <Image
                position="top"
                backgroundPosition="top"
                source={{
                  uri: image,
                }}
                style={styles.image}
              />
              <View style={styles.absoluteContainer}>
                <TouchableOpacity
                  onPress={setFavoritedData}
                  style={
                    favorited
                      ? styles.iconContainerActive
                      : styles.iconContainer
                  }
                >
                  <Image
                    source={require(`../assets/heart_active.png`)}
                    style={styles.menu}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={setVisitedData}
                  style={
                    visited ? styles.iconContainerActive : styles.iconContainer
                  }
                >
                  <Image
                    source={require(`../assets/map_active.png`)}
                    style={styles.menu}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              style={{
                color: "#A67C00",
                textAlign: "center",
                fontSize: 42,
                marginVertical: 12,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                color: "#000",
                textAlign: "center",
                fontSize: 20,
                marginBottom: 12,
              }}
            >
              {subtitle}
            </Text>
            <View style={{ alignItems: "center", marginVertical: 12 }}>
              <View
                style={{
                  borderRadius: 10,
                  background: "#DEDEDE",
                  width: 77,
                  height: 5,
                }}
              ></View>
            </View>
            <SafeAreaView style={styles.webviewContainer}>
              <RenderHTML contentWidth={width} source={{ html: content }} />
              {/* <WebView
                  style={{ width: "100%", height: 900, flex: 1 }}
                  originWhitelist={["*"]}
                  source={{ html: content }}
                /> */}
            </SafeAreaView>
          </View>
        )}
      </ScrollView>
      <FooterPost
        share={async () =>
          await Share.share({
            message: `Nekhor app: Buddha Shakyamuni and Guru Rinpoche sacred places ${
              Platform.OS === "ios"
                ? "https://apps.apple.com/us/app/nekhor/id1495713473"
                : "https://play.google.com/store/apps/details?id=com.cavernalabs.nekhor"
            } `,
          })
        }
        changeMap={() => changePage()}
        hasMap={lat && lng}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    position: "relative",
  },
  gradient: {
    height: "50%",
    width: 120,
    position: "absolute",
    bottom: 0,
  },

  imageContainer: {
    position: "relative",
  },
  // absoluteContainer: {
  //   position: "absolute",
  //   color: "white",
  //   bottom: 10,
  //   padding: 16,
  //   right: 10,
  //   backgroundColor: "black",
  //   borderRadius: 9999,
  // },

  image: {
    height: 220,
    width: "100%",
    objectFit: "cover",
    backgroundPosition: "top",
  },

  absoluteContainer: {
    position: "absolute",
    color: "white",
    right: "0",
    bottom: 2,
    width: "100%",
    paddingVertical: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  iconContainer: {
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 9999,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  iconContainerActive: {
    padding: 12,
    marginHorizontal: 4,
    borderRadius: 9999,
    backgroundColor: "#A67C00",
  },
  webview: {
    flex: 1,
  },
  webviewContainer: {
    alignSelf: "stretch",
    height: "100%",
    paddingHorizontal: 16,
  },
  menu: {
    height: 22,
    width: 22,
    marginHorizontal: 4,
    objectFit: "cover",
  },
});
