import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import RegistrationScreen from './src/Screens/RegistrationScreen';
import LoginScreen from './src/Screens/LoginScreen';
import Home from './src/Screens/Home';
import PostsScreen from './src/Screens/PostsScreen';
import CreatePostsScreen from './src/Screens/CreatePostsScreen';
import CommentsScreen from './src/Screens/CommentsScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import MapScreen from './src/Screens/MapScreen';
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';

const App = () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./src/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./src/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./src/fonts/Roboto-Medium.ttf"),
  });

  const MainStack = createStackNavigator();

  return (
    <>
      {fontsLoaded && (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <NavigationContainer>
              <MainStack.Navigator initialRouteName="RegistrationScreen">
                  <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
                  <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                  <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                  <MainStack.Screen name="PostsScreen" component={PostsScreen} options={{ headerShown: false }}/>
                  <MainStack.Screen name="Map" component={MapScreen} options={{ headerShown: false }}/>
                  <MainStack.Screen name="CreatePosts" component={CreatePostsScreen} options={{ headerShown: false }} />
                  <MainStack.Screen name="Comments" component={CommentsScreen} options={{ headerShown: false }}/>
                  <MainStack.Screen name="Profile" component={ProfileScreen}  options={{ headerShown: false }} />
              </MainStack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      )}
    </>
  );
}

export default App;