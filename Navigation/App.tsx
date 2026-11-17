import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Appbar, PaperProvider } from 'react-native-paper';
import CustomNavigationBar from './NavigationBar';

const Stack = createStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={style.container}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Second')}>
        Go to Second Screen
      </Button>
    </View>
  );
}

function SecondScreen() {
  return (
    <View style={style.container}>
      <Text>Second screen</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default function App() {
  return (
<PaperProvider>
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Second" component={SecondScreen} />
    </Stack.Navigator>
  </NavigationContainer>
</PaperProvider>
  );
}

