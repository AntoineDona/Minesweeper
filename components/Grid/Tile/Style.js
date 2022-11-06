import { StyleSheet } from "react-native";

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

export { styles, hiddenTile, hiddenText, flaggedTile };
