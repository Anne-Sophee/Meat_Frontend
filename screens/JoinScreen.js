import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Appbarmodel from '../navigation/appbar';



export default (JoinScreen) => {

    const navigation = useNavigation();
  

    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Appbarmodel></Appbarmodel>

            <ScrollView style={{backgroundColor: '#ffffed', height: '100%'}}>
                <TouchableOpacity onPress={Keyboard.dismiss}>

                    <View style={styles.container}>

                        <View>
                            <View style={{alignItems: 'center', marginTop: 35, marginBottom: 35}}>
                                <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>Table de Dominique</Text>
                                <Text style={{fontSize: 14}}>Vendredi 21 janvier 2022 à 12h15</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <View style={{marginRight: 10}}>
                                <Text style={{fontWeight: 'bold', marginBottom: 5}}>M.eaters : 3/6</Text>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='account' />
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='arrow-left-circle' />
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='currency-eur' />
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='seat' />
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='home' />
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='pencil' />
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                    <Text style={{fontWeight: 'bold'}}>Budget :</Text>
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='calendar-month'/>
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='plus-circle'/>
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='cake-variant'/>
                                    <Avatar.Icon size={30} style={styles.account} color='#38b000' icon='currency-eur'/>
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='walk'/>
                                    <Text style={{fontWeight: 'bold'}}>à 150 m de bureau</Text>
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='food-fork-drink'/>
                                    <Text style={{fontWeight: 'bold'}}>Japonais</Text>
                                </View>

                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='cake-variant'/>
                                    <Text style={{fontWeight: 'bold'}}>25 - 30 ans</Text>
                                </View>

                                <StatusBar style="auto" hidden={false} />
                            </View>

                            <View style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#FFC960'}}>
                                <Avatar.Image style={{flex: 1, width: '100%', borderBottomWidth: 1, borderRadius: 0, borderBottomColor: '#FFC960', backgroundColor: '#FFFFFF'}}/>
                                <Text style={{marginTop: 5, marginHorizontal: 2, color: '#0E9BA4', fontWeight: 'bold'}}>Taiyo Ramen</Text>
                                <Text style={{marginTop: 3, marginHorizontal: 2, fontSize: 9, fontWeight: 'bold', fontStyle: 'italic'}}>169 rue Saint-Martin, 75003 Paris</Text>
                                <Text style={{marginTop: 3, marginHorizontal: 2, marginBottom: 5, fontSize: 9, fontWeight: 'bold', color: '#3382F0'}}>(voir plan)</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', color: 'grey', marginBottom: 5}}>Et si on parlait de Naruto ?</Text>
                        <Text style={{color: 'grey', textAlign: 'justify', marginHorizontal: 15}}>Je suis un fan de manga mais ne vous inquiétez pas je peux aussi bien discuter art ou politique !</Text>
                    </View>

                    <View style={styles.container}>
                        <Button
                          style={{width: "80%", marginBottom: 15, marginTop: 35, borderRadius: 10, justifyContent: 'center', backgroundColor: '#0E9BA4', height: 60}}
                          labelStyle={{color: '#FFC960', fontSize: 22, fontWeight: 'bold'}}
                          uppercase={false}
                          mode="contained"
                          onPress={() => navigation.navigate('Account')}>
                          Rejoindre la table
                        </Button>
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
    borderWidth: 1,
    borderColor: '#ffffed',
    backgroundColor: '#ffffed'
  }
  
});
