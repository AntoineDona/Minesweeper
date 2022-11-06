import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#028090",
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
    color: "#E1F0C4",
    fontSize: 20,
  },
  emptyTile: {
    backgroundColor: "#1F747A", //"#1A5E63",
  },
  hiddenTile: {
    backgroundColor: "#134549",
  },
  hiddenText: {
    color: "#E1F0C4",
  },
  flaggedTile: {
    backgroundColor: "#9A94BC",
  },
});

const emptyTile = StyleSheet.compose(styles.tile, styles.emptyTile);
const hiddenTile = StyleSheet.compose(styles.tile, styles.hiddenTile);
const hiddenText = StyleSheet.compose(styles.text, styles.hiddenText);
const flaggedTile = StyleSheet.compose(styles.tile, styles.flaggedTile);

export { styles, emptyTile, hiddenTile, hiddenText, flaggedTile };
