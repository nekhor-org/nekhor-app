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
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const { width } = Dimensions.get("screen");

export default function HeaderBack({ name }) {
  return (
    <View style={styles.containerHeader}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 12,
          width: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require(`../assets/arrow_back.png`)}
            style={styles.menu}
          />
          <Text style={{ fontSize: 32, marginLeft: 12, fontWeight: "700" }}>
            {name}
          </Text>
        </View>
        {/* <TouchableOpacity
          style={{ color: "#A67C00", fontSize: 14, justifyContent: "flex-end" }}
          onPress={() => console.log(`VER TODOS ${item.id}`)}
        >
          Remove All
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  image: {
    height: 50,
    width: 206,
    objectFit: "cover",
  },
  menu: {
    height: 32,
    width: 32,
    marginHorizontal: 4,
    objectFit: "cover",
  },

  absoluteContainer: {
    position: "absolute",
    color: "white",
    bottom: 0,
    padding: 16,
  },
});
