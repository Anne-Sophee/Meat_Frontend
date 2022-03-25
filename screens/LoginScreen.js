import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Keyboard, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFonts, Montserrat_400Regular_Italic } from '@expo-google-fonts/montserrat';
import LoadingScreen from './LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';




function LoginScreen(props) {

  const navigation = useNavigation();

  // ---------VARIABLE D'ETAT---------
  //variable d'état appelée "email" qui va évoluer à chaque modification du champ de saisie
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [hidden, setHidden] = useState(true);



  // ---------FONCTION DE VERIFICATION DE INFORMATIONS AVANT CONNEXON---------
  //Vérifie l'existence d'un user et de son token
  const handleLogin = async () => {

    //chaîne de caractère renvoyée par le fetch et stockée dans la variable data
    var rawData = await fetch('https://newmeat.herokuapp.com/users/login', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `email=${email}&password=${password}`
    });
    //variable qui transforme la chaîne de caractère du fetch en objet javascript 
    var response = await rawData.json();

    //login est l'un des résultats envoyé par notre res.json de notre route 'login' (result, error, user)
    if (response.login === true) {
      props.navigation.navigate('Home')

      let {token} = response.user
      await AsyncStorage.setItem('userToken', JSON.stringify(token))
      props.sendUserToken(token)

      } else {
      setErrorMessage(response.error)
      }

    if (response.signin === false) {
      setErrorPassword(response.errorPassword)
      } else {
      setErrorPassword('')
      }
  }

  // ---------KEYBOARD NEXT--------- 
  const secondTextInput = useRef();


  // ---------VARIABLE D'AFFICHAGE DU FONT---------
  let [fontsLoaded] = useFonts ({
    Montserrat_400Regular_Italic,
  });

  if(!fontsLoaded){
    //tant que notre écriture n'est pas chargée, on attend
    return <LoadingScreen/>;
  } else {


    //dès que notre écriture est chargée on affiche le return
    return (

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor: '#ffffed'}}>
          <TouchableOpacity onPress={Keyboard.dismiss}>

            <View style={styles.container}>
                <Image style= {styles.image} source={require('../assets/loginImg.jpg')}/>

                <Text style={{fontSize: 23, color: '#000000', fontStyle: 'italic',fontFamily: 'Montserrat_400Regular_Italic', marginTop: -80}}>Rejoignez la communauté</Text>
                <Text style={{marginBottom: 50, fontSize: 23, color: '#000000', fontStyle: 'italic', fontFamily: 'Montserrat_400Regular_Italic'}}>des M.eaters</Text>

                <TextInput
                  style={{width: "80%", marginBottom: 20, backgroundColor: '#FFFFFF'}}
                  theme={{roundness: 7, colors: {primary: '#0E9BA4'}}}
                  returnKeyType="next"
                  onSubmitEditing={() => {secondTextInput.current.focus()}}
                  keyboardType='email-address'
                  mode="outlined"
                  label="Adresse email"
                  placeholder="hello@matable.com"
                  onChangeText={(value) => setEmail(value)} //fonction onChange récupère l'évènement et son agument sous forme d'objet, le setteur va mettre à jour la valeur saisie (e.target.value)
                />

                <TextInput
                  style={{width: "80%", backgroundColor: '#FFFFFF'}}
                  theme={{roundness: 7, colors: {primary: '#0E9BA4'}}}
                  ref={secondTextInput}
                  returnKeyType="done"
                  mode="outlined"
                  label="Mot de passe"
                  placeholder="Mot de passe"
                  secureTextEntry={hidden}
                  right={<TextInput.Icon name={hidden ? "eye-off": "eye"} onPress={() => setHidden(!hidden)}/>}
                  onChangeText={(value) => setPassword(value)}
                />

                <Text
                style={{fontSize: 11, fontStyle: 'italic', color: '#FF0000', marginBottom: 60}}>
                {errorMessage} {errorPassword}
                </Text>

                <Button
                  style={{width: "80%", marginBottom: 40, borderRadius: 10, justifyContent: 'center', backgroundColor: '#0E9BA4', height: 60}}
                  labelStyle={{color: '#FFC960', fontSize: 22, fontWeight: 'bold'}}
                  uppercase={false}
                  mode="contained"
                  onPress={() => handleLogin()} >
                  Connexion
                </Button>

                <Text
                  style={{color: '#5c9dd6', textDecorationLine: 'underline', marginBottom: 90, fontSize: 20}}
                  onPress={() => navigation.navigate('Register')}>
                  Créer un compte
                </Text>

                <StatusBar style="auto" />
            </View>
            
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffed'
  },
  image: {
    transform: [{ rotate: '90deg' }],
    aspectRatio: 0.5,
    resizeMode: 'contain',
    height: 510,
    width: 400,
    marginTop: -130,
    paddingTop: 0
  },
  
});


function mapDispatchToProps(dispatch){
  return {
      sendUserToken: function (userToken){
          dispatch({type: 'saveUserToken', userToken})
      }

  }
}

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);