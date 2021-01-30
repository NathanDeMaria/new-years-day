import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from "react-redux";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import store from "./app/store";
import AddTask from './features/tasks/AddTask';
import TaskList from './features/tasks/TaskList';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator  initialRouteName="Add Task">
          <Drawer.Screen name="Add Task" component={AddTask} />
          <Drawer.Screen name="Task List" component={TaskList} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
