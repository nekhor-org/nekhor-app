import { useActionSheet } from "@expo/react-native-action-sheet";
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
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");
const icon = (name) => <MaterialIcons key={name} name={name} size={24} />;

export default function HeaderBack({ name, hasMenu, onBack }) {
  const { showActionSheetWithOptions } = useActionSheet();

  const openSettings = () => {
    const options = ["Re-order", "Edit", "Delete"];
    const icons = [icon("reorder"), icon("edit"), icon("delete")];
    showActionSheetWithOptions(
      {
        options,
        icons: icons,
        title: "Settings",
        titleTextStyle: { color: "black", fontSize: 24, fontWeight: 700 },
      },
      (selectedIndex) => {
        console.log(selectedIndex);
      }
    );
  };

  const backAction = () => {
    onBack ? onBack() : false;
  };

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
          <TouchableOpacity onPress={backAction}>
            <Image
              source={require(`../assets/arrow_back.png`)}
              style={styles.menu}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 32,
              marginLeft: 12,
              fontWeight: "700",
              width: hasMenu ? "70%" : "100%",
            }}
            numberOfLines={1}
          >
            {name}
          </Text>
          {hasMenu && (
            <TouchableOpacity
              style={{
                color: "#A67C00",
                fontSize: 14,
                justifyContent: "flex-end",
                width: "10%",
              }}
              onPress={openSettings}
            >
              <Image
                source={require(`../assets/menu_points.png`)}
                style={styles.menu}
              />
            </TouchableOpacity>
          )}
        </View>
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
