import { View, Text } from "react-native";

import styles from "./Style";
import Timer from "./Timer";

export default function ScoreBoard({ score, gameParams, gameStatus }) {
  return (
    <View style={styles.scoreBox}>
      <Timer gameStatus={gameStatus} />
      <Text style={styles.score}>
        Score: {score.toString().padStart(2, "0")} /&nbsp;
        {gameParams.width * gameParams.height - gameParams.minesAmount}
      </Text>
    </View>
  );
}
