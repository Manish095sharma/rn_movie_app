

import React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { View, Text } from "react-native"
import PageOne from './src/screens/pageone/PageOne';
import PageTwo from './src/screens/psgetwo/PageTwo';
const Tab = createBottomTabNavigator();
import IonIcons from "react-native-vector-icons/Ionicons"
const App: () => React$Node = () => {
  return (
    <NavigationContainer>

      <Tab.Navigator
        tabBarOptions={{ showLabel: false }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Movie') {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <IonIcons name="film" size={25} color={color} />
                  <Text style={{ fontSize: 12, color: color }}>Movie</Text>
                </View>
              );
            }
            else if (route.name === 'Shortlisted') {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <IonIcons name="film" size={25} color={color} />
                  <Text style={{ fontSize: 12, color: color }}>Shortlisted</Text>
                </View>
              );
            }
          },
        })}

      >
        <Tab.Screen name={'Movie'} component={PageOne} />
        <Tab.Screen name={'Shortlisted'} component={PageTwo} />

      </Tab.Navigator>
    </NavigationContainer>

  );
};



export default App;
