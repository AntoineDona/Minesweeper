import { View, Text } from "react-native";

export default function Tile({ x, y, isMine }) {
  return (
    <View>
      <Text>{isMine ? 1 : 0}</Text>
    </View>
  )
}