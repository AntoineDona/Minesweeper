import { StyleSheet, View, Text, TouchableHighlight } from "react-native";

export default function Tile({ x, y, value, isMine, isHidden, handleClick }) {
  return (
    <TouchableHighlight onPress={handleClick}>
      <View style={styles.tile}>
        <Text>{!isHidden && isMine ? "M" : value}</Text>
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
  },
});
