import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, StyleSheet, TextInput, Text, View } from "react-native";
import { Picker } from '@react-native-picker/picker';

import { addWorkThunk } from "./workSlice";
import { fetchTasks, selectTasks } from "../tasks/taskSlice";

export default () => {
  const dispatch = useDispatch();
  const [taskId, setTaskId] = useState<string>();
  const [durationMinutes, setDurationMinutes] = useState<number>();

  const onClickAdd = () => {
    if (taskId && durationMinutes !== undefined) {
      dispatch(addWorkThunk(taskId, durationMinutes));
      setTaskId("");
      setDurationMinutes(undefined);
    }
  };
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch])
  const tasks = useSelector(selectTasks);

  return (
    <View style={styles.container}>
      <Text>Task</Text>
      <Picker selectedValue={taskId} style={{height: 50, width: 100}} onValueChange={(itemValue, itemIndex) => {setTaskId(itemValue.toString())}} >
        {tasks.map(task => 
          <Picker.Item label={task.name} value={task.taskId} key={task.taskId} />
        )}
      </Picker>
      <Text>Duration (minutes)</Text>
      <TextInput
        keyboardType="numeric"
        onChangeText={(text) => setDurationMinutes(Number(text))}
        style={{ height: 40 }}
        value={durationMinutes?.toString()}
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
