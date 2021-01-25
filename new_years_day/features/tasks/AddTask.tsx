import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, TextInput, Text } from "react-native";

import { addTaskThunk } from "./taskSlice";

export default () => {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>();
  const [weight, setWeight] = useState<number>();

  const onClickAdd = () => {
    if (name && weight) {
      dispatch(addTaskThunk(name, weight));
      setName('');
      setWeight(undefined);
    }
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};
