import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { TextInput, Button, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Appbarmodel from '../navigation/appbar';


export default (HomeScreen) => {

  const navigation = useNavigation();

  

    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Appbarmodel></Appbarmodel>

            <ScrollView style={{backgroundColor: '#ffffed'}}>
                <TouchableOpacity onPress={Keyboard.dismiss}>

                    <View style={styles.container}>

                        <Button
                          style={{width: "80%", marginBottom: 45, marginTop: 35, borderRadius: 10, justifyContent: 'center', backgroundColor: '#FFFFFF', height: 60}}
                          labelStyle={{color: '#0E9BA4', fontSize: 22, fontWeight: 'bold'}}
                          uppercase={false}
                          mode="contained"
                          onPress={() => navigation.navigate('Join')}>              
                          Rechercher
                        </Button>

                        <TextInput style={styles.input} theme={themes.input} mode="outlined" label="Où ?*" placeholder="Paris 17" />

                        <TextInput style={styles.input} theme={themes.input} mode="outlined" label="Quand ?" placeholder="JJ/MM/AAAA" />

                        <TextInput style={styles.input} theme={themes.input} mode="outlined" label="De quoi avez-vous envie ?" placeholder="Italien..." />

                        <StatusBar style="auto" hidden={false} />

                    </View>


                    <View style={styles.event}>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar.Image size={40} style={{marginRight: 10, backgroundColor: '#FFFFFF'}} source={require('../assets/avatar.png')}/>
                                <View>
                                    <Text style={{fontWeight: 'bold', fontSize: 18}}>Table de Dominique</Text>
                                    <Text style={{fontSize: 14}}>Vendredi 21 janvier 2022 à 12h15</Text>
                                </View>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar.Icon size={30} style={styles.account} icon='account' />
                            <Avatar.Icon size={30} style={styles.account} icon='account' />
                            <Avatar.Icon size={30} style={styles.account} icon='account' />
                            <Avatar.Icon size={30} style={styles.account} icon='account' />
                            <Avatar.Icon size={30} style={styles.account} icon='account' />
                            <Avatar.Icon size={30} style={styles.account} icon='account' />
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar.Icon size={50} icon='storefront-outline' color='#FFC960' style={{backgroundColor:'#fff6cc'}}/>
                            <View style={{marginRight: 25}}>
                                <Text >Restaurant</Text>
                                <Text style={{color: '#0E9BA4', fontWeight: 'bold'}}>Taiyo Ramen</Text>
                            </View>
                            <Avatar.Icon size={50} icon="food-fork-drink" color='#FFC960' style={{backgroundColor:'#fff6cc'}}/>
                            <Text style={{fontWeight: 'bold'}}>Japonais</Text>
                        </View>

                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar.Icon size={50} icon="walk" color='#FFC960' style={{backgroundColor:'#fff6cc'}} />
                            <Text style={{fontWeight: 'bold'}}>à 150 m de bureau</Text>
                        </View>

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
    backgroundColor: '#ffffed',
    marginBottom: 40
  },
  event: {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: '#fff6cc',
      width: '80%',
      borderRadius: 20,
      paddingTop: 20,
      paddingBottom: 5,
      marginBottom: 20
  },
  account: {
    marginTop: 10,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: '#6c757d',
    backgroundColor: '#FFFFFF'
  },
  input: {
    width: "80%",
    marginBottom: 15,
    backgroundColor: '#FFFFFF'
  },
  
});

const themes = ({
  input: {
    roundness: 7, 
    colors: {primary: '#0E9BA4'}
  }
})