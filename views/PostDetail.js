import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import Carousel from "../components/Carousel";
import { PostsData } from "../utils";
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

export default function PostDetail({ navigation, route }) {
  const { width } = useWindowDimensions();
  const postId = route?.params?.id;
  // const postId = 8;
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [local, setLocal] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [favorited, setFavorited] = useState(false);
  const [visited, setVisited] = useState(false);
  const getPostData = async () => {
    const response = await getPost(postId);

    setTitle(response.data?.title);
    setSubtitle(response.data?.subtitle);
    setLocal(response.data?.local);
    setContent(response.data?.content);
    setImage(`${IP_ADDRESS}${response.data?.image}`);
  };

  const setVisitedData = async () => {
    setVisited(!visited);
  };

  const setFavoritedData = async () => {
    setFavorited(!favorited);
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <HeaderBack name={local} onBack={() => navigation.goBack()} />
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
                  favorited ? styles.iconContainerActive : styles.iconContainer
                }
              >
                <Image
                  source={require(`../assets/heart_active.svg`)}
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
                  source={require(`../assets/map_active.svg`)}
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
      </ScrollView>
      <FooterPost />
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
  absoluteContainer: {
    position: "absolute",
    color: "white",
    bottom: 10,
    padding: 16,
    right: 10,
    backgroundColor: "black",
    borderRadius: 9999,
  },

  image: {
    height: 220,
    width: "100%",
    objectFit: "cover",
    backgroundPosition: "top",
  },

  absoluteContainer: {
    position: "absolute",
    color: "white",
    right: "30%",
    bottom: 2,
    padding: 16,
    display: "flex",
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
