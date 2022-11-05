import React from "react";
import { Text, View } from "react-native";

import Grid from "./Grid/Grid";

export default function Game() {
  return (
    <View>
      <Text>Minesweeper</Text>
      <Grid />
    </View>
  );
}
