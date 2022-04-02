import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import Appbarmodel from '../navigation/appbar';
import { connect } from 'react-redux';
import {useIsFocused} from "@react-navigation/native";



function BuddyScreen(props) {

  // ---------VARIABLE D'ETAT---------
  const isFocused = useIsFocused();
  const [relations,setRelations] = useState([]);
  const [currentUserStatus,setCurrentUserStatus] =useState([]);


  // useEffect( () => {
  //   const abortController = new AbortController();

  //   (async () => {
  //     let rawResponse = await fetch(`https://newmeat.herokuapp.com/interactions/list-related-users/${props.userToSend}`)
  //     let response = await rawResponse.json();
  //     setCurrentUserStatus(response.currentUser.buddies)
  //     setRelations([...response.listOfRelations])
  //   })()

  //   return () => {
  //     abortController.abort();}

  // }, [relations]);


  useEffect( () => {

    (async () => {
      let rawResponse = await fetch(`https://newmeat.herokuapp.com/interactions/list-related-users/${props.userToSend}`)
      let response = await rawResponse.json();
      setCurrentUserStatus(response.currentUser.buddies)
      setRelations([...response.listOfRelations])
    })()

  }, []);






  // ---------ACCEPTER UNE DEMANDE DE BUDDY---------
  const handleAcceptBuddy = async (buddyToken) => {

    let buddyRawResponse = await fetch(`https://newmeat.herokuapp.com/interactions/accept-buddy`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${props.userToSend}&userToken=${buddyToken}`
    });

    let sendResponse = await buddyRawResponse.json();
  };


  // ---------REFUSER UNE DEMANDE DE BUDDY---------
  const handleDeclineBuddy = async (buddyToken) => {

    let buddyRawResponse = await fetch(`https://newmeat.herokuapp.com/interactions/decline-buddy`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${props.userToSend}&userToken=${buddyToken}`
    });

    let sendResponse = await buddyRawResponse.json();
  };


  // ---------DEMARER UNE COVERSATION---------
  const handleConversation = async (buddyToken) => {

    let buddyRawResponse = await fetch(`https://newmeat.herokuapp.com/interactions/conversation`, {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `token=${props.userToSend}&userToken=${buddyToken}`
    });

    let sendResponse = await buddyRawResponse.json();
    props.saveConversationId(sendResponse.conv)
    props.navigation.navigate('Chat');
  };




  // ---------MODÈLE DE TABLES À AFFICHER---------
  const displayRelations = (user,i) => {

    let toDisplay;
    let friends = <IconButton
        icon="forum"
        mode="contained"
        color={'#0E9BA4'}
        style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2}}
        size={32}
        onPress={() => handleConversation(user.token)}/>

    let waiter = <IconButton
        icon="account"
        mode="contained"
        color={Colors.grey400}
        style={{borderColor: Colors.grey400, backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2}}
        size={32}
        onPress={() => console.log(userToken)}/>

    let add =  <IconButton
        icon="account-plus"
        mode="contained"
        color={'#0E9BA4'}
        style={{borderColor: "#009788", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2 }}
        size={32}
        onPress={() => handleAcceptBuddy(user.token)}/>

    if ((currentUserStatus.some((el) => el.token === user.token && el.status === true) )
      &&
      (user.buddies.some((el) => el.token === props.userToSend && el.status === true))) {
      toDisplay = friends;

    } else if ((currentUserStatus.some((el) => el.token === user.token && el.status === true) )
      &&
      (user.buddies.some((el) => el.token === props.userToSend && el.status === false))) {
      toDisplay = add;

    } else {
      toDisplay = waiter;
    };

    // affichage de la date et heure de l'évènement
    let dateParse = new Date(e.date);
    let formattedDate = dateParse.toLocaleDateString("fr-FR", {timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"});
    formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)


    return (

        <Card key={i} onPress={() => { props.navigation.navigate("MyTable"), props.saveTableId(e._id) }} style={{backgroundColor: '#ffffed'}}>
          <Card.Content style={styles.event}>
            <View>

              <Avatar.Image size={64} backgroundColor="#FFFFFF" marginRight="2%" marginLeft="2%" source={(user.avatar)?{uri: user.avatar}:require("../assets/avatar.png")} />
              <View style={{marginLeft: 20}}>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>{user.firstname}</Text>
                  <Text style={{fontSize: 14}}>Buddy depuis le {formattedDate}</Text>
              </View>

              <View style={{flexDirection: "row"}}>
                {toDisplay}

                <IconButton
                    icon="account-cancel"
                    mode="contained"
                    color={'#FF3D00'}
                    style={{borderColor: "#FF3D00", backgroundColor: "#FFFFFF", borderRadius: 15, borderWidth: 2, marginRight: 2}}
                    size={32}
                    onPress={() => handleDeclineBuddy(user.token)}
                />
              </View>

            </View>
          </Card.Content>
        </Card>
    );
  }



  return (

    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Appbarmodel></Appbarmodel>

        <ScrollView style={{backgroundColor: '#ffffed'}}>
            <TouchableOpacity onPress={Keyboard.dismiss}>

                <View style={styles.container}>

                  <Text
                    style={{color: '#FFC960', fontSize: 18, fontStyle: 'italic', alignSelf: 'center', marginTop: 25, marginBottom: 25}}>
                    - Liste des buddies -
                  </Text>

                  <StatusBar style="auto" hidden={false} />

                </View>


                <View>
                  {currentUserStatus}
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
    marginBottom: 10
  },
  event: {
      flex: 1,
      alignSelf: 'center',
      backgroundColor: '#fff6cc',
      width: '90%',
      borderRadius: 20,
      padding: 15,
      marginVertical: 8
  }
});




// fonction qui rappel l'information définie dans le réduceur
function mapStateToProps(state){
  return {
    userToken : state.userToken
  }
}


// fonction du composant de présentation à appeler pour effectuer l'ordre
function mapDispatchToProps(dispatch) {
  return {
    saveConversationId: function (conversationId) {
      dispatch({ type: "saveConversationId", conversationId })
    }
  }
}


// composant conteneur
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuddyScreen);