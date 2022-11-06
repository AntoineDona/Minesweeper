import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View, Text, Pressable } from "react-native";

export default function Tile({
  x,
  y,
  value,
  isMine,
  isHidden,
  hasBeenFlagged,
  handleShortPress,
  handleLongPress,
}) {
  let toDisplay = " ";

  if (isHidden) {
    if (hasBeenFlagged) {
      toDisplay = (
        <MaterialCommunityIcons name="flag-triangle" size={24} color="white" />
      );
    }
  } else if (isMine) {
    toDisplay = <MaterialCommunityIcons name="mine" size={24} color="red" />;
  } else if (value !== 0) {
    toDisplay = value;
  }

  let tileStyle;
  if (hasBeenFlagged) {
    tileStyle = flaggedTile;
  } else if (isHidden) {
    tileStyle = hiddenTile;
  } else {
    tileStyle = styles.tile;
  }

  return (
    <Pressable
      onPress={handleShortPress}
      onLongPress={handleLongPress}
      delayLongPress={300}
      style={styles.touchable}
    >
      <View style={tileStyle}>
        <Text style={isHidden ? hiddenText : styles.text}>{toDisplay}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#1A5E63",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  touchable: {
    margin: 2,
    borderRadius: 10,
  },
  text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  hiddenTile: {
    backgroundColor: "#028090",
  },
  hiddenText: {
    color: "white",
  },
  flaggedTile: {
    backgroundColor: "#9A94BC",
  },
});

const hiddenTile = StyleSheet.compose(styles.tile, styles.hiddenTile);
const hiddenText = StyleSheet.compose(styles.text, styles.hiddenText);
const flaggedTile = StyleSheet.compose(styles.tile, styles.flaggedTile);
