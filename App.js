import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore, combineReducers } from 'redux';
import { Provider as StoreProvider } from 'react-redux';

import LogBox from './LogBox';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import JoinScreen from './screens/JoinScreen';
import CreateScreen from './screens/CreateScreen';
import AccountScreen from './screens/AccountScreen';
import EventScreen from './screens/EventScreen';
import MessageScreen from './screens/MessageScreen';

import userToken from './reducers/userToken';
import Appbarmodel from './navigation/appbar';


export default function App() {

  //variable qui récupère un objet contenant les fonctionnalités contenues dans la navigation
  const Stack = createStackNavigator(); 

  //variable de création du store qui appelle les reducers
  const Store = createStore(combineReducers({userToken}));
  
  //fonction fléchée qui fait évoluer l'opacité à partir de l'opacité existante - effet fondue de page en page
  const forFade = ({ current }) => ({ 
    cardStyle: {opacity: current.progress}
  });


  return (
      
    <StoreProvider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{cardStyleInterpolator: forFade}} >
          <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown: false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{title: 'Créer mon compte', headerStyle: {backgroundColor: '#FFC960'}, headerTitleStyle: {fontSize: 23, color: '#0E9BA4'}, headerLeft: null}} />
          <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Tables disponibles', headerStyle: {backgroundColor: '#FFC960'}, headerTitleStyle: {fontSize: 23, color: '#0E9BA4'}, headerLeft: null}} />
          <Stack.Screen name="Join" component={JoinScreen} options={{title: 'Rejoindre une table', headerStyle: {backgroundColor: '#FFC960'}, headerTitleStyle: {fontSize: 23, color: '#0E9BA4'}, headerLeft: null}} />
          <Stack.Screen name="Create" component={CreateScreen} options={{title: 'Créer une table', headerStyle: {backgroundColor: '#FFC960'}, headerTitleStyle: {fontSize: 23, color: '#0E9BA4'}, headerLeft: null}} />
          <Stack.Screen name="Account" component={AccountScreen} options={{title: 'Mon profil', headerStyle: {backgroundColor: '#FFC960'}, headerTitleStyle: {fontSize: 23, color: '#0E9BA4'}, headerLeft: null}} />
          <Stack.Screen name="Event" component={EventScreen} options={{title: 'Mes évènements', headerStyle: {backgroundColor: '#FFC960'}, headerTitleStyle: {fontSize: 23, color: '#0E9BA4'}, headerLeft: null}} />
          <Stack.Screen name="Message" component={MessageScreen} options={{title: 'Mes messages', headerStyle: {backgroundColor: '#FFC960'}, headerTitleStyle: {fontSize: 23, color: '#0E9BA4'}, headerLeft: null}} />
        </Stack.Navigator>
      </NavigationContainer>
      </StoreProvider>

  );
}


