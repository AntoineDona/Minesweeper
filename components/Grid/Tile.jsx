import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

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
      toDisplay = "F";
    }
  } else if (isMine) {
    toDisplay = "M";
  } else if (value !== 0) {
    toDisplay = value;
  }

  return (
    <TouchableHighlight
      onPress={handleShortPress}
      onLongPress={handleLongPress}
    >
      <View style={isHidden ? hiddenTile : styles.tile}>
        <Text style={isHidden ? hiddenText : styles.text}>{toDisplay}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20,
  },
  hiddenTile: {
    backgroundColor: "grey",
  },
  hiddenText: {
    color: "white",
  },
});

const hiddenTile = StyleSheet.compose(styles.tile, styles.hiddenTile);
const hiddenText = StyleSheet.compose(styles.text, styles.hiddenText);
