import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform, SafeAreaView } from 'react-native';
import { TextInput, Button, RadioButton, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import * as ImagePicker from 'expo-image-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect } from 'react-redux';


// composant de présentation
function RegisterScreen(props) {

  const navigation = useNavigation();


  // ---------VARIABLE D'ETAT INPUT---------
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visible, setVisible] = useState(true);
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new(Date));
  const [value, setValue] = useState('homme');


  // ---------COLLECTE DES DONNEES INPUT---------
  const handleSignUp = async () => {

    //chaîne de caractère renvoyée par le fetch et stockée dans la variable data
    var rawData = await fetch('https://newmeat.herokuapp.com/users/register', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `avatar=${avatarUri}&email=${email}&password=${password}&lastname=${lastname}&firstname=${firstname}&address=${address}&phoneNumber=${phoneNumber}&dateOfBirth=${dateOfBirth}&gender=${value}`
    });
    
    //variable qui transforme la chaîne de caractère du fetch en objet javascript 
    var response = await rawData.json();

    //sauvegarde du token en local (non crypté) + JSON.stringify pour convertir en json lors de la sauvegarde
    let {token} = response.userSaved
    await AsyncStorage.setItem('userToken', JSON.stringify(token))
    props.sendUserToken(token)
  }



  // ---------REGEX--------- 
  // ---------VARIABLE D'ETAT REGEX--------- 
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorCheckPassword, setErrorCheckPassword] = useState("");
  const [errorImage, setErrorImage] = useState("");
  const [errorLastname, setErrorLastname] = useState("");
  const [errorFirstname, setErrorFirstname] = useState("");
  const [errorUserAddress, setErrorUserAddress] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorDateOfBirth, setErrorDateOfBirth] = useState("");



  // Messages d'erreur pour les champs obligatoires
  const connexionValidation = () => {

    if (email && email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/) && password && password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/) && confirmPassword && password === confirmPassword && firstname && lastname && address && phoneNumber && phoneNumber.match(/^(0)[1-9](\d{2}){4}$/) && dateOfBirth) {
      handleSignUp(navigation.navigate('Home'))
      } else {
  
    if (email === "") {
      setErrorEmail("*Email requis!")
      } else if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      setErrorEmail("*Format de l'email invalide!")
      } else {
      setErrorEmail("")
      }

    if (password === "") {
      setErrorPassword("*Mot de passe requis!")
      } else if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/)) {
      setErrorPassword("*Mot de passe : minimum 5 charactères, une lettre et un nombre!")
      } else { 
      setErrorPassword("")
      }

    if (confirmPassword === "") {
      setErrorConfirmPassword("*Confirmation du mot de passe requise!  ")
      } else {
      setErrorConfirmPassword("")
      }

    if (visible === true) {
      setErrorImage("*Ajout d'une photo obligatoire!")
    } else {
      setErrorImage("")
    }

    if (password !== confirmPassword) {
      setErrorCheckPassword("*Les mots de passe ne correspondent pas.")
      } else{
      setErrorCheckPassword("")
      }

    if (lastname === "") {
      setErrorLastname("*Nom de famille requis!")
      } else {
      setErrorLastname("")
      }

    if (firstname === "") {
      setErrorFirstname("*Prénom requis!")
      } else {
      setErrorFirstname("")
      }

    if (address === "") {
      setErrorUserAddress("*Adresse requise!")
      } else {
      setErrorUserAddress("")
      }

    if (phoneNumber === "") {
      setErrorPhoneNumber("*Numéro de mobile requis!")
      } else if (!phoneNumber.match(/^(0)[1-9](\d{2}){4}$/)) {
      setErrorPhoneNumber("*Le numéro de mobile doit être au format '0123456789'!")
      } else {
      setErrorPhoneNumber("")
      }

    if (dateOfBirth === moment().subtract(18, "years")) {
      setErrorDateOfBirth("*Champ requis!")
      } else {
      setErrorDateOfBirth("")
      }  
    }
  }



  // ---------KEYBOARD NEXT OPTION--------- 
  const secondTextInput = useRef();
  const thirdTextInput = useRef();
  const fourthTextInput = useRef();
  const fifthTextInput = useRef();
  const sixthTextInput = useRef();
  const seventhTextInput = useRef();



  // ---------DATEPICKER---------
  const format = 'DD/MM/YYYY'
  const maxDate = moment().subtract(18, 'years').toDate()
  const minDate = moment().subtract(100, 'years').toDate()



  // ---------SELECTION AVATAR--------- 
  const [imagePath, setImagePath] = useState('');
  const [avatarUri, setAvatarUri] = useState('');


  const showImagePicker = async () => {

    // demande d'accès à la librarie d'image
    const imagePermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!imagePermission.granted) {
        alert ("Accès à la librairie obligatoire!");
        return
      }

    // réccupération de l'image et son chemin lors de la sélection
    const imageResult = await ImagePicker.launchImageLibraryAsync({mediaType: 'photo', includeBase64: true, quality: 0.3});
      if (!imageResult.cancelled) {
        setImagePath(imageResult.uri);
      }

    // définition du fichier à envoyer sous forme d'objet
    var dataAvatar = new FormData();
      dataAvatar.append('avatar', {
        uri: imageResult.uri,
        type: 'image/jpeg',
        name: 'userAvatar.jpg'
      })

    // envoi du fichier dans le backend
    var rawData = await fetch("https://newmeat.herokuapp.com/users/upload-avatar",{
      method: 'POST',
      body: dataAvatar
    });

    var response = await rawData.json();
    setAvatarUri(response.cloud.url)
  }


    return (

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
          <ScrollView style={{backgroundColor: '#ffffed'}}>
            <TouchableOpacity onPress={Keyboard.dismiss}>

              <View style={styles.container}>

                <Text
                  style={{color: '#FFC960', fontSize: 18, fontStyle: 'italic', alignSelf: 'center', paddingBottom: 15, paddingTop: 20}}>
                  - Informations de connexion -
                </Text>

                <TextInput 
                style={styles.input} 
                theme={themes.input} 
                returnKeyType="next"
                onSubmitEditing={() => {secondTextInput.current.focus()}}
                keyboardType='email-address'
                mode="outlined" 
                label="Adresse email*" 
                placeholder="hello@matable.com"
                onChangeText={(value) => setEmail(value)}
                value={email} />

                <Text style={styles.errorText}>{errorEmail}</Text>

                <TextInput 
                style={styles.input} 
                theme={themes.input}
                returnKeyType="next"
                onSubmitEditing={() => {thirdTextInput.current.focus()}}
                ref={secondTextInput}
                mode="outlined" 
                label="Mot de passe*" 
                placeholder="********"
                onChangeText={(value) => setPassword(value)}
                value={password} />

                <Text style={styles.errorText}>{errorPassword}</Text>

                <TextInput 
                style={styles.input} 
                theme={themes.input}
                returnKeyType="next"
                onSubmitEditing={() => {fourthTextInput.current.focus()}}
                ref={thirdTextInput}
                mode="outlined" 
                label="Confirmation de mot de passe*" 
                placeholder="********"
                onChangeText={(value) => setConfirmPassword(value)}
                value={confirmPassword} />

                <Text style={styles.errorText}>{[errorConfirmPassword, errorCheckPassword]}</Text>

                <Text
                  style={{color: '#0E9BA4', fontSize: 34, fontStyle: 'italic', alignSelf: 'center', paddingBottom: 30}}>
                  _________
                </Text>

                <Text
                  style={{color: '#FFC960', fontSize: 18, fontStyle: 'italic', alignSelf: 'center', paddingBottom: 15}}>
                  - Informations personnelles -
                </Text>

                <TouchableOpacity onPress={() => {showImagePicker(); setVisible(!visible)}} >
                  <View  >{(visible)?
                    <Avatar.Icon size={150} icon="camera" color={'#FFC960'} style={{marginBottom: 15, backgroundColor: "#FFFFFF"}}/>
                    :<Avatar.Image size={150} source={{uri: imagePath}} style={{marginBottom: 15, backgroundColor: "#FFFFFF"}}/>
                    }
                  </View>
                </TouchableOpacity>

                <Text style={styles.errorText}>{errorImage}</Text>

                <TextInput 
                style={styles.input} 
                theme={themes.input}
                returnKeyType="next"
                onSubmitEditing={() => {fifthTextInput.current.focus(); }}
                ref={fourthTextInput}
                mode="outlined" 
                label="Nom*" 
                placeholder="The Cat"
                onChangeText={(value) => setLastname(value)}
                value={lastname} />

                <Text style={styles.errorText}>{errorLastname}</Text>

                <TextInput 
                style={styles.input} 
                theme={themes.input}
                returnKeyType="next"
                onSubmitEditing={() => {sixthTextInput.current.focus(); }}
                ref={fifthTextInput}
                mode="outlined" 
                label="Prénom*" 
                placeholder="Dominique"
                onChangeText={(value) => setFirstname(value)}
                value={firstname} />

                <Text style={styles.errorText}>{errorFirstname}</Text>

                {/* <SafeAreaView
                style={styles.input}>
                <GooglePlacesAutocomplete
                styles={{
                  container: {
                    flex: 1                    
                  },
                  textInput: {
                    height: 60,
                    width: '80%',
                    borderRadius: 7,
                    paddingLeft: 12,
                    paddingRight: 12,
                    borderWidth: 1,
                    borderColor: "grey",
                    fontSize: 16
                  },
                  listView: {
                    borderWidth: 1,
                    borderColor: "#ddd",
                    backgroundColor: "#fff",
                    marginHorizontal: 200,
                    elevation: 5,
                  },
                  description: {
                    fontSize: 16
                  },
                  row: {
                    padding: 20,
                    height: 58
                  }
                }}
                theme={themes.input}
                minLength={2}
                returnKeyType={'Rechercher'}
                listViewDisplayed='auto'
                nearbyPlacesAPI='GooglePlacesSearch'
                currentLocation={true}
                fetchDetails={true}
                placeholder='56 boulevard Pereire, 75017 Paris'
                onPress={(data, details = null) => {console.log(data, details);}}
                query={{key: 'AIzaSyDykYpCt5BSj6QCbOJzhdCATgHmkQR-gNk', language: 'fr'}}
                />
                </SafeAreaView> */}



                <TextInput
                style={styles.input} 
                theme={themes.input}
                returnKeyType="next"
                onSubmitEditing={() => {seventhTextInput.current.focus(); }}
                ref={sixthTextInput}
                mode="outlined" 
                label="Adresse postale*" 
                placeholder="56 boulevard Pereire, 75017 Paris"
                onChangeText={(value) => setAddress(value)}
                value={address}
                />

                <Text style={styles.errorText}>{errorUserAddress}</Text>

                <TextInput 
                style={styles.input} 
                theme={themes.input}
                ref={seventhTextInput}
                keyboardType='numbers-and-punctuation'
                mode="outlined" 
                label="Numéro de mobile*" 
                placeholder="06 23 45 67 89"
                onChangeText={(value) => setPhoneNumber(value)}
                value={phoneNumber} />

                <Text style={styles.errorText}>{errorPhoneNumber}</Text>

                <View style={styles.date}>
                  <Text style={{color: '#756969', fontSize: 16}} >Date de naissance*</Text>
                  <DatePicker
                  customStyles={datepicker}
                  date={dateOfBirth}
                  locale='fr'
                  mode="date"
                  format={format}
                  minDate={minDate}
                  maxDate={maxDate}
                  confirmBtnText="Confirmer"
                  cancelBtnText="Annuler"
                  useNativeDriver={true}
                  onDateChange={(date) => {setDateOfBirth(date);}}
                  value={dateOfBirth} />
                </View>

                <Text style={styles.errorText}>{errorDateOfBirth}</Text>

                <RadioButton.Group style={{marginBottom: 50, backgroundColor: '#0E9BA4'}} onValueChange={(value) => setValue(value)} value={value} >
                  <View style={{flexDirection: 'row', backgroundColor: '#FFFFFF', marginBottom: 50, marginTop: 20}}>
                    <RadioButton.Item label="Homme" value="homme" />
                    <RadioButton.Item label="Femme" value="femme" />
                  </View>
                </RadioButton.Group>

                <Button
                  style={{width: "80%", marginBottom: 15, borderRadius: 10, justifyContent: 'center', backgroundColor: '#0E9BA4', height: 60}}
                  labelStyle={{color: '#FFC960', fontSize: 22, fontWeight: 'bold'}}
                  uppercase={false}
                  mode="contained"
                  onPress={() => {connexionValidation()}}>              
                  Enregistrer
                </Button>

                <StatusBar style="auto" hidden={false} />

              </View>

            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
    );
}



const styles = ({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffffed'
  },
  input: {
    width: "80%",
    marginBottom: 5,
    backgroundColor: '#FFFFFF'
  },
  errorText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#FF0000',
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "80%",
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    borderColor: 'grey',
    borderRadius: 7,
    borderWidth: 1,
    height: 60,
    paddingLeft: 7,
    justifyContent: 'center'
  }
});

const datepicker = {
  dateIcon: {
    position: 'absolute',
    left: '70%'                     
  },
  dateInput: {
    borderWidth: 0,
  },
  dateText: {
    fontSize: 17,
    color: 'black',
    left: -18
  },
  btnTextConfirm: {
    color: '#0E9BA4'
  },
  btnTextCancel: {
    color: '#FFC960'
  }
}

const themes = ({
  input: {
    roundness: 7,
    colors: {primary: '#0E9BA4'}
  }
})


// fonction du composant de présentation à appeler pour effectuer l'ordre
function mapDispatchToProps(dispatch) {
  return {
    sendUserToken: function(userToken) {
      dispatch({type: 'registerToken', userToken})
    }
  }
}

// composant conteneur
export default connect(
  null,
  mapDispatchToProps
)(RegisterScreen);
