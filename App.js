import { StyleSheet, View } from "react-native";

import Game from "./components/Game";

export default function App() {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F0C4",
    alignItems: "center",
    justifyContent: "center",
  },
});
