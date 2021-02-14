import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchTasks, selectTasks, Task } from "./taskSlice";


const renderTaskRow = ({item}: {item: Task}) => {
  return <View style={styles.item}>
    <Text style={{width: "50%"}}>{item.name}</Text>
    <Text style={{width: "50%"}}>{item.weight}</Text>
  </View>;
}

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch])

  const tasks = useSelector(selectTasks);
  return (
    <View style={styles.container}>
      <FlatList data={tasks} renderItem={renderTaskRow} keyExtractor={(task) => task.taskId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    backgroundColor: "gray"
  }
});
