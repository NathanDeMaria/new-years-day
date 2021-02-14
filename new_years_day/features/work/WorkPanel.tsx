import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Work } from "./workSlice";

export default ({ item }: { item: Work }) => {
  return (
    <View style={styles.item}>
      <Text style={{ width: "50%" }}>{item.task.name}</Text>
      <Text style={{ width: "50%" }}>{item.durationMinutes}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    backgroundColor: "gray",
  },
});
