import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
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
export default function PostDetail({ navigation }) {
  const [content, setContent] = useState(
    "<p>Buddhist pilgrimage is as ancient as Buddhism itself. Indeed, it was Buddha Shakyamuni who made the first such pilgrimage, revealing to us the importance of visiting sacred sites. The Ghatikara Sutra, for instance, tells a story in which the Buddha was delighted upon arriving at a site where the previous Buddha Kashyapa had been before him. The location itself evoked a potent recollection for Buddha Shakyamuni of the previous Buddha Kashyapa’s presence there. The Buddha’s main disciples beseeched the Buddha to take a seat; they wanted him to impress the site with his own bodily presence, just as Kashyapa had done before. This episode teaches us that sacred sites themselves have power and can trigger rich experiences that aid us along the spiritual path. It also teaches us that a buddha’s appearance at a particular site imbues it with a specific power, or flow of blessings, a lasting imprint, a mark of the sacred.</p>"
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <HeaderBack name="The Buddha" onBack={() => navigation.goBack()} />
        <View>
          <Image
            position="top"
            backgroundPosition="top"
            source={{
              uri: "https://images.squarespace-cdn.com/content/v1/5b735348266c075124b0ffb3/1669424401961-I7AQJOUTBXRXKNLESX8U/PHOTO-2022-11-23-00-33-52.jpg?format=2500w",
            }}
            style={styles.image}
          />
          <Text
            style={{
              color: "#A67C00",
              textAlign: "center",
              fontSize: 42,
              marginVertical: 12,
            }}
          >
            The Eight Great Sacred Sites
          </Text>
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontSize: 20,
              marginBottom: 12,
            }}
          >
            INTRODUDTION TO THE BUDDHA
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
            <WebView
              style={styles.webview}
              originWhitelist={["*"]}
              source={{ html: content }}
            />
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
  image: {
    height: 220,
    width: "100%",
    objectFit: "cover",
    backgroundPosition: "top",
  },

  absoluteContainer: {
    position: "absolute",
    color: "white",
    bottom: 0,
    padding: 16,
  },
  webview: {
    flex: 1,
  },
  webviewContainer: {
    flex: 1,
    alignSelf: "stretch",
    height: "100%",
  },
});
