import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Appbarmodel from '../navigation/appbar';
import { connect } from 'react-redux';



function TableScreen(props) {

  const navigation = useNavigation();
  
  
  // ---------VARIABLE D'ETAT INPUT---------
  const [tableData, setTableData] = useState(['']);
  const [guestList, setGuestList] = useState(['']);
  const [planner, setPlanner] = useState('');
  const [plannerAvatar, setPlannerAvatar] = useState('');
  const isFocused = useIsFocused();



  // ---------RÉCCUPÉRATION DES DONNÉES DE LA TABLE SÉLECTIONNÉES---------
  useEffect(async () => {
    
    let tableDataResponse = await fetch(`https://newmeat.herokuapp.com/join-table/${props.tableId}/${props.userToken}`);

    let tableResponse = await tableDataResponse.json();
    setTableData(tableResponse.result);
    console.log(tableResponse.result)
    setGuestList(tableResponse.result.guests);
    console.log(tableResponse.result.guests)
    setPlanner(tableResponse.planner);
    console.log(tableResponse.planner)
    setPlannerAvatar(tableResponse.planner.avatar);
    console.log(tableResponse.planner.avatar)

  }, [])




  // ---------AFFICHAGE AUTOMATIQUE DES INFORMATIONS DE LA TABLE---------
  //informations sur les participants
  var tableInfo = tableData;
  var plannerPicture = <Avatar.Image size={30} style={styles.account} source={(plannerAvatar) ? { uri: plannerAvatar } : require("../assets/avatar.png")} />

  let avatarList = guestList.map((e, i) => {
    return (
      <Avatar.Image key={i} size={30} style={styles.account} source={(e.avatar) ? { uri: e.avatar } : require("../assets/avatar.png")} />
    )
  })

  var guestCount = guestList.length + 1;

  //informations sur le nombre de participants
  var tabCapacity = [];
  for (let i = 0; i < tableInfo.capacity - guestList.length - 1; i++) {
    tabCapacity.push(<Avatar.Icon key={i} size={30} style={styles.account} color='grey' icon='seat'/>)
  }

  //informations sur le budget de l'event
  var bugdetInfo = [];
  for (let j = 0; j < tableInfo.budget; j++) {
    bugdetInfo.push(<Avatar.Icon key={j} size={30} style={styles.account} color='#38b000' icon='currency-eur'/>)
  }

  //informations sur les images du restaurant
  var cardImage;
  if (tableInfo.foodType === "Japonais") {
    cardImage = 'https://www.terres-japonaises.com/app/media/26/files/2016/06/sushi-japon.jpg'
  }
  else if (tableInfo.foodType === "Fast-food") {
    cardImage = 'https://medias.toutelanutrition.com/ressource/104/Fast%20Food.jpg'
  }
  else if (tableInfo.foodType === "Italien") {
    cardImage = 'https://cache.marieclaire.fr/data/photo/w1000_ci/5b/italianfood.jpg'
  }
  else if (tableInfo.foodType === "Chinois") {
    cardImage = 'https://www.takeaway.com/be-fr/foodwiki/uploads/sites/3/2018/02/chine.jpg'
  }
  else if (tableInfo.foodType === "Mexicain") {
    cardImage = 'https://images.radio-canada.ca/q_auto,w_960/v1/ici-premiere/16x9/mlarge-cuisine-mexicaine-nourriture-mexique-alimentation-tacos-salsa-mais.jpg'
  }
  else if (tableInfo.foodType === "Coréen") {
    cardImage = 'https://aconsommerdepreference.lexpress.fr/wp-content/uploads/2018/02/iStock-849756458.jpg'
  }
  else if (tableInfo.foodType === "Indien") {
    cardImage = 'https://media.istockphoto.com/photos/assorted-indian-recipes-food-various-picture-id922783734'
  }
  else if (tableInfo.foodType === "Africain") {
    cardImage = 'https://afrogadget.com/wp-content/uploads/2021/06/01-couscous-royal-traditionnel.jpeg'
  }





    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Appbarmodel></Appbarmodel>

            <ScrollView style={{backgroundColor: '#ffffed', height: '100%'}}>
                <TouchableOpacity onPress={Keyboard.dismiss}>

                    <View style={styles.container}>

                        <View>
                            <View style={{alignItems: 'center', marginTop: 35, marginBottom: 35}}>
                                <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>{tableInfo.title}</Text>
                                <Text style={{fontSize: 14}}>{tableInfo.date}</Text>
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
                          onPress={console.log('ok test TableScreen')}>
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



// fonction qui rappel l'information définie dans le réduceur
function mapStateToProps(state) {
  return { tableId: state.tableId, userToken: state.userToken }
}

// composant conteneur
export default connect(
  mapStateToProps,
  null
)(TableScreen);