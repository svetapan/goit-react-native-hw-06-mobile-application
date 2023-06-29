import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import RegistrationScreen from './assets/Screens/RegistrationScreen';
import LoginScreen from './assets/Screens/LoginScreen';
import Home from './assets/Screens/Home';
import PostsScreen from './assets/Screens/PostsScreen';
import CreatePostsScreen from './assets/Screens/CreatePostsScreen';
import CommentsScreen from './assets/Screens/CommentsScreen';
import ProfileScreen from './assets/Screens/ProfileScreen';
import MapScreen from './assets/Screens/MapScreen';
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './assets/redux/persistor';
// import store from './assets/redux/store'

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const MainStack = createStackNavigator();

  return (
    // <Provider store={store}>
      // <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="RegistrationScreen">
              <MainStack.Screen name="Registration" component={RegistrationScreen} options={{ headerShown: false }} />
              <MainStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
              <MainStack.Screen name="PostsScreen" component={PostsScreen} />
              <MainStack.Screen name="Map" component={MapScreen} />
              <MainStack.Screen name="CreatePosts" component={CreatePostsScreen} options={{ headerShown: false }} />
              <MainStack.Screen name="Comments" component={CommentsScreen} />
              <MainStack.Screen name="Profile" component={ProfileScreen}  options={{ headerShown: false }} />
          </MainStack.Navigator>
        </NavigationContainer>
      // </PersistGate>
    // </Provider>
  );
}

const styles = StyleSheet.create({
 page: {
   flex: 1,
   position: 'relative'
 },
});
