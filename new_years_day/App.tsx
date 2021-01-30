import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from "react-redux";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import store from "./app/store";
import AddTask from './features/tasks/AddTask';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator  initialRouteName="AddTask">
          <Drawer.Screen name="AddTask" component={AddTask} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
