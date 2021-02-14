import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, StyleSheet, TextInput, Text, View } from "react-native";

import { addTaskThunk } from "./taskSlice";

export default () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>();
  const [weight, setWeight] = useState<number>();

  const onClickAdd = () => {
    if (name && weight) {
      dispatch(addTaskThunk(name, weight));
      setName("");
      setWeight(undefined);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <TextInput
        onChangeText={(text) => setName(text)}
        style={{ height: 40 }}
        value={name}
      />
      <Text>Weight</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(text) => setWeight(Number(text))}
        style={{ height: 40 }}
        value={weight?.toString()}
      />
      <Button onPress={onClickAdd} title="Add" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
