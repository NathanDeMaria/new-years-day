import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import store from "./app/store";
import AddTask from "./features/tasks/AddTask";
import TaskList from "./features/tasks/TaskList";
import Progress from "./features/progress/Progress";
import AddWork from "./features/work/AddWork";
import Settings from "./features/settings/Settings";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Progress">
          <Drawer.Screen name="Progress" component={Progress} />
          <Drawer.Screen name="Add Work" component={AddWork} />
          <Drawer.Screen name="Add Task" component={AddTask} />
          <Drawer.Screen name="Task List" component={TaskList} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
