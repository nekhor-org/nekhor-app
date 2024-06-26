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
import { DATA, getHomesDb } from "../utils";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import CardHome from "../components/CardHome";
import { Categories } from "../utils";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getHome, getMenus, getPosts } from "../api";
import { ActivityIndicator } from "react-native";
const { width } = Dimensions.get("screen");

export default function Home({ navigation }) {
  const [categoriesData, setCategoriesData] = useState([]);
  const [homePosts, setHomePosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHomeData = async () => {
    const response = await getHomesDb();
    setCategoriesData(JSON.parse(response[0].content));
    setHomePosts(JSON.parse(response[0].carousel));

    setIsLoading(false);
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {isLoading ? (
        <View style={{ marginTop: 10 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <Header navigation={navigation} setIsLoading={setIsLoading} />
          <View style={{ height: 340 }}>
            {homePosts && <Carousel propsData={homePosts} />}
          </View>
          <View>
            <FlatList
              data={categoriesData}
              ItemSeparatorComponent={
                <View
                  style={{
                    marginTop: 12,
                    backgroundColor: "#ccc",
                    height: 1,
                    flex: 1,
                  }}
                />
              }
              keyExtractor={(_, index) => String(index)}
              scrollEnabled={false}
              renderToHardwareTextureAndroid
              removeClippedSubviews={false}
              contentContainerStyle={{
                justifyContent: "start",
                padding: 16,
                marginBottom: 90,
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
                        onPress={() => {
                          navigation.push("Posts", {
                            id: item.local_id,
                            name: item.name,
                          });
                        }}
                      >
                        <Text>View All</Text>
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
                          <>
                            {item.posts && item.posts.length > 0 && (
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
                                        id={item.post_id}
                                      />
                                    );
                                  }}
                                />
                              </View>
                            )}
                          </>
                        );
                      }}
                    />
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      )}
      <Footer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({});
