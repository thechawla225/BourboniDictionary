import HomeScreen from './screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import themeReducer from "./redux/themeReducer";
import { Provider } from "react-redux";
import 'react-native-gesture-handler';
import { ResultsScreen } from './screens/ResultsScreen';

const Stack = createStackNavigator();
const store = createStore(
  combineReducers({ themeReducer }),
  applyMiddleware(thunk)
);

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name = "Home" component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name = "Results" component={ResultsScreen} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>  
    </NavigationContainer></Provider>
  );
  
}
