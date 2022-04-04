import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { TextInput, Button, IconButton, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Appbarmodel from '../navigation/appbar';




export default (MessageScreen) => {

  const navigation = useNavigation();

    return (

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <Appbarmodel></Appbarmodel>

          <ScrollView style={{backgroundColor: '#ffffed'}}>
            <TouchableOpacity onPress={Keyboard.dismiss}>

              <View style={styles.container}>
                <View style={{flexDirection: 'row', alignSelf: 'flex-start', alignItems: 'center', marginBottom: 30}}>
                    <Avatar.Image size={70} style={{backgroundColor: '#FFFFFF', marginLeft: 30}} source={require('../assets/avatar.png')}/>
                    <Text style={{fontWeight: 'bold', fontSize: 18, marginLeft: 10}}>Océane</Text>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'flex-start', marginBottom: 15}}>
                    <Text style={[styles.input, {borderColor: '#0E9BA4', marginLeft: 15}]} theme={themes.input} >Hello, comment vas-tu ?</Text>
                    <View style={{flexDirection: 'column', justifyContent: 'center'}} >
                      <Text style={styles.time}>23/11/2021</Text>
                      <Text style={styles.time}>13h59</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 15}}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end'}} >
                      <Text style={styles.time}>23/11/2021</Text>
                      <Text style={styles.time}>14h09</Text>
                    </View>
                    <Text style={[styles.input, {borderColor: '#FFC960', marginRight: 15}]} theme={themes.input} >Très bien et toi ? Je pense créer une table pour le restaurant mexicain dont je t'avais parlé. Tu pourras y participer?</Text>
                </View>

                <View>
                  <TextInput style={styles.chat} theme={themes.chat} mode="outlined" label="Ecrire ici..." multiline={true} numberOfLines={5} selectionColor='#0E9BA4' right={<TextInput.Icon name="arrow-right" color={'#0E9BA4'} style={{alignSelf: 'center'}} onPress={() => navigation.navigate('Account')}/>}/>
                </View>


                <Button
                  style={{width: "80%", marginTop: 200, marginBottom: 15, borderRadius: 10, justifyContent: 'center', backgroundColor: '#0E9BA4', height: 60}}
                  labelStyle={{color: '#FFC960', fontSize: 22, fontWeight: 'bold'}}
                  uppercase={false}
                  mode="contained"
                  onPress={() => navigation.navigate('Event')}>              
                  Envoyer
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
    width: "80%",
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    fontStyle: 'italic',
    padding: 10,
    textAlign: 'justify'
  },
  time: {
    fontSize: 7,
    marginHorizontal: 4,
    fontStyle: 'italic'
  },
  chat: {
    minHeight: 150,
    minWidth: 345,
    maxHeight: 150,
    maxWidth: 345
  }
});

const themes = ({
  input: {
    roundness: 7,
    colors: {primary: '#0E9BA4', placeholder: '#0E9BA4'}
  },
  chat: {
    colors: {primary: '#F0F0F0', placeholder: '#C4C4C4'}
  }
})