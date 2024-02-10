/**
 *
 * Inspiration: https://dribbble.com/shots/3731362-Event-cards-iOS-interaction
 */

import * as React from "react";
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  State,
  FlingGestureHandler,
  Directions,
} from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");
import { EvilIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { IP_ADDRESS } from "../api";

const OVERFLOW_HEIGHT = 70;
const SPACING = 10;
const VISIBLE_ITEMS = 3;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = 300;

export default function Carousel({ propsData }) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(0);
  const data = propsData;
  // console.log(propsData);
  // console.log(data);

  const setAnimatedIndex = React.useCallback((i) => {
    setIndex(i);
    scrollX.setValue(i);
  }, []);

  // interconnected animations aka reactive animations :D
  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollX,
      useNativeDriver: true,
    }).start();
  });

  // React.useEffect(() => {
  //   if (index === data.length - VISIBLE_ITEMS - 2) {
  //     console.log('fetch more')
  //     const newData = [...data, ...data];

  //     setData(newData);
  //   }
  // }, [index]);

  return (
    <FlingGestureHandler
      direction={Directions.LEFT}
      onHandlerStateChange={(e) => {
        if (e.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            // setAnimatedIndex(0)
            return;
          }
          setAnimatedIndex(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        direction={Directions.RIGHT}
        onHandlerStateChange={(e) => {
          if (e.nativeEvent.state === State.END) {
            if (index === 0) {
              // setAnimatedIndex(data.length - 1)
              return;
            }
            setAnimatedIndex(index - 1);
          }
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar hidden />
          {/* <OverflowItems scrollX={scrollXAnimated} data={data} /> */}
          <FlatList
            data={data}
            keyExtractor={(_, index) => String(index)}
            scrollEnabled={false}
            inverted
            renderToHardwareTextureAndroid
            removeClippedSubviews={false}
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: SPACING * 2,
            }}
            CellRendererComponent={({ children, index, style, ...props }) => {
              const cellStyle = [
                style,

                // I want each item to have a higher zIndex than the previous one,
                // in reversed order due to the FlatList being inverted
                { zIndex: data.length - index },
              ];

              // OverflowableView for Android...
              return (
                <View style={cellStyle} index={index} {...props}>
                  {children}
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [50, 0, -100],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.3],
              });

              let imageData = `${IP_ADDRESS}${item.image}`;
              console.log(imageData);
              return (
                <Animated.View
                  style={{
                    position: "absolute",
                    width: ITEM_WIDTH,
                    top: -ITEM_HEIGHT / 2,
                    borderRadius: 10,
                    overflow: "hidden",
                    transform: [{ translateX }, { scale }],
                    opacity,
                  }}
                >
                  <View style={styles.relativeContainer}>
                    <Image
                      source={{ uri: imageData }}
                      style={{ width: ITEM_WIDTH, height: ITEM_HEIGHT }}
                    />
                    <LinearGradient
                      colors={["rgba(0, 0, 0, 0.00)", "#000"]}
                      style={styles.gradient}
                    ></LinearGradient>
                    <View style={styles.absoluteContainer}>
                      <Text style={{ color: "white", fontSize: 32 }}>
                        {item.title}
                      </Text>
                      <Text style={{ color: "white", fontSize: 14 }}>
                        {item.subtitle}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 300,
  },
  relativeContainer: {
    position: "relative",
  },
  gradient: {
    height: "50%",
    width: width * 0.8,
    position: "absolute",
    bottom: 0,
  },
  absoluteContainer: {
    position: "absolute",
    color: "white",
    bottom: 0,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING,
  },
  itemContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
