import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { TextInput, Button, IconButton, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import Appbarmodel from '../navigation/appbar';




function AccountScreen(props) {

  const navigation = useNavigation();


  // ---------RÉCUPERATION DES DONNÉES D'ORIGINE DU BACKEND---------
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function userInformations() {
      var rawData = await fetch (`https://newmeat.herokuapp.com/users/search-user/${props.userToken}`)
      var response = await rawData.json();
      setUserData(response.result)
    }
    userInformations()
},[])



  // ---------TRANSFÈRE DES DONNÉES MISE A JOUR AU BACKEND---------

  const [updateFirstname, setUpdateFirstname] = useState('');

  // let updateEmail = (value) => {
  //   var newUserData = {...userData}
  //   newUserData.email = value
  //   setUserData(newUserData)
  // }

  let updatePassword = (value) => {
    var newUserData = {...userData}
    newUserData.password = value
    setUserData(newUserData)
  }

  let updateLastname = (value) => {
    var newUserData = {...userData}
    newUserData.lastname = value
    setUserData(newUserData)
  }

  // let updateFirstname = (value) => {
  //   var newUserData = {...userData}
  //   newUserData.firstname = value
  //   setUserData(newUserData)
  // }

  let updateUserAddress = (value) => {
    var newUserData = {...userData}
    newUserData.userAddress = value
    setUserData(newUserData)
  }

  let updateUserPhoneNumber = (value) => {
    var newUserData = {...userData}
    newUserData.userPhoneNumber = value
    setUserData(newUserData)
  }



  // ---------RÉCUPERATION DES DONNÉES MISES A JOUR DU BACKEND---------
  const updatedUserInformations = async () => {
    var rawResponse = await fetch(`https://newmeat.herokuapp.com/users/update-account/${props.userToken}`, {
        method: 'PUT',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `user=${JSON.stringify(userData)}`
    })

    var response = await rawResponse.json();
    setUserData(response.result)
    }



    return (

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Appbarmodel></Appbarmodel>

          <ScrollView style={{backgroundColor: '#ffffed'}}>
            <TouchableOpacity onPress={Keyboard.dismiss}>

              <View style={styles.container}>

                <Avatar.Image size={150} style={{marginBottom: 15, backgroundColor: '#FFFFFF'}} source={{uri: userData.avatar}}/>

                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                      style={styles.input} 
                      theme={themes.input} 
                      mode="outlined" 
                      label="Adresse email*" 
                      value={userData.email} 
                      onChangeText={(value)=>{updateEmail(value)}}/>
                    <IconButton 
                      style={styles.icon} 
                      icon='pencil' 
                      size={38} 
                      color='#0E9BA4' 
                      onPress={(value) => updateEmail(value)}/>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                      style={styles.input} 
                      theme={themes.input} 
                      mode="outlined" 
                      label="Mot de passe*" 
                      value={userData.password} 
                      secureTextEntry={true}
                      onChangeText={(value)=>{updatePassword(value)}}/>
                    <IconButton 
                      style={styles.icon} 
                      icon='pencil' 
                      size={38} 
                      color='#0E9BA4' 
                      onPress={(value) => updatePassword(value)}/>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                      style={styles.input} 
                      theme={themes.input} 
                      mode="outlined" 
                      label="Nom*" 
                      value={userData.lastname} 
                      onChangeText={(value)=>{updateLastname(value)}}/>
                    <IconButton 
                      style={styles.icon} 
                      icon='pencil' 
                      size={38} 
                      color='#0E9BA4' 
                      onPress={(value) => updateLastname(value)}/>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                      style={styles.input} 
                      theme={themes.input} 
                      mode="outlined" 
                      label="Prénom*" 
                      value={userData.firstname} 
                      onChangeText={(value)=>{setUpdateFirstname(value)}}/>
                    <IconButton 
                      style={styles.icon} 
                      icon='pencil' 
                      size={38} 
                      color='#0E9BA4' 
                      onPress={() => props.updatedUserInformations()}/>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                      style={styles.input} 
                      theme={themes.input} 
                      mode="outlined" 
                      label="Adresse postale*" 
                      value={userData.userAddress} 
                      onChangeText={(value)=>{updateUserAddress(value)}}/>
                    <IconButton 
                      style={styles.icon} 
                      icon='pencil' 
                      size={38} 
                      color='#0E9BA4' 
                      onPress={(value) => updateUserAddress(value)}/>
                </View>

                <View style={{flexDirection: 'row'}}>
                <TextInput 
                      style={styles.input} 
                      theme={themes.input} 
                      mode="outlined" 
                      label="Numéro de mobile*" 
                      value={userData.userPhoneNumber} 
                      onChangeText={(value)=>{updateUserPhoneNumber(value)}}/>
                    <IconButton 
                      style={styles.icon} 
                      icon='pencil' 
                      size={38} 
                      color='#0E9BA4' 
                      onPress={(value) => updateUserPhoneNumber(value)}/>
                </View>


                <Button
                  style={{width: "80%", marginTop: 50, marginBottom: 15, borderRadius: 10, justifyContent: 'center', backgroundColor: '#0E9BA4', height: 60}}
                  labelStyle={{color: '#FFC960', fontSize: 22, fontWeight: 'bold'}}
                  uppercase={false}
                  mode="contained"
                  onPress={() => navigation.navigate('Message')}>              
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
  icon: {
    borderWidth: 1,
    borderColor: '#6c757d',
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  input: {
    width: "70%",
    marginBottom: 15,
    marginRight: 10,
    backgroundColor: '#FFFFFF'
  }
});

const themes = ({
  input: {
    roundness: 7,
    colors: {primary: '#0E9BA4'}
  }
})



function mapStateToProps(state) {
  return {userToken: state.userToken}
}

export default connect(
    mapStateToProps, 
    null
)(AccountScreen);