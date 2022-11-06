import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable } from "react-native";

import {
  styles,
  emptyTile,
  hiddenTile,
  hiddenText,
  flaggedTile,
} from "./Style";

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
    toDisplay = <MaterialCommunityIcons name="mine" size={24} color="black" />;
  } else if (value !== 0) {
    toDisplay = value;
  }

  let tileStyle;
  if (hasBeenFlagged) {
    tileStyle = flaggedTile;
  } else if (isHidden) {
    tileStyle = hiddenTile;
  } else if (value === 0) {
    tileStyle = emptyTile;
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
