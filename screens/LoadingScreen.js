import React, { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';


export default function LoadingScreen() {

  const navigation = useNavigation();
  const fadeAnimation = useRef(new Animated.Value(1)).current;


  // mise sur écoute de notre composant pour exécuter l'action demandée à l'initialisation
  useEffect(() => {
    //méthode qui appelle notre fonction pour déclencher l'animation après 3 secondes
    setTimeout(() => {
        Animated.timing(fadeAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true
        }).start(({finished}) => {
            navigation.navigate('Login')
        })
      },1000)
  
  },[])

  // variable qui appelle notre import
  let [fontsLoaded] = useFonts ({
    Lobster_400Regular, Montserrat_500Medium,
  });


  if(!fontsLoaded){
    //tant que notre écriture n'est pas chargée, on attend
    // composant proposé par React qui se charge de l'attente et des erreurs en attendant le chatgement
    return <AppLoading/>;
  } else {
    //dès que notre écriture est chargée on affiche
    return (

    <View style={styles.container}>
      <Animated.View style={{opacity: fadeAnimation}}>
        <Text style={styles.welcome}>Bienvenue sur</Text>
        <Text style={styles.appname}>M.eat</Text>
        <StatusBar style="auto" hidden />
      </Animated.View>
    </View>
    
  );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E9BA4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 35,
    color: '#fff',
    fontFamily: 'Montserrat_500Medium'
  },
  appname: {
    fontSize: 60,
    color: '#ffc960',
    fontFamily: 'Lobster_400Regular',
    textAlign: 'center'
  }
});
