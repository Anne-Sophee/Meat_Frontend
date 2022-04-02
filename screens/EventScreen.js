import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { Card } from 'react-native-paper';
import Appbarmodel from '../navigation/appbar';
import { connect } from 'react-redux';



function EventScreen(props) {

  // ---------VARIABLE D'ETAT---------
  const [eventDataList, setEventDataList] = useState([]);



  // ---------RÉCCUPÉRATION DES DONNÉES DES EVENTS---------
  useEffect(async () => {

    var rawResponse = await fetch(`https://newmeat.herokuapp.com/my-events/${props.userToken}`);
    var response = await rawResponse.json();
    setEventDataList(response.result);

  }, [])



  // ---------MODÈLE DE TABLES À AFFICHER---------
  var eventList = eventDataList.map((e, i) => {

    // affichage de la date et heure de l'évènement
    let dateParse = new Date(e.date);
    let formattedDate = dateParse.toLocaleDateString("fr-FR", {timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"});
    formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)


    return (

        <Card key={i} onPress={() => { props.navigation.navigate("MyTable"), props.saveTableId(e._id) }} style={{backgroundColor: '#ffffed'}}>
          <Card.Content style={styles.event}>
            <View>

              <View style={{marginLeft: 20}}>
                  <Text style={{fontWeight: 'bold', fontSize: 18}}>{e.title}</Text>
                  <Text style={{fontSize: 14}}>{formattedDate}</Text>
              </View>

            </View>
          </Card.Content>
        </Card>
    );
  })



  return (

    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Appbarmodel></Appbarmodel>

        <ScrollView style={{backgroundColor: '#ffffed'}}>
            <TouchableOpacity onPress={Keyboard.dismiss}>

                <View style={styles.container}>

                  <Text
                    style={{color: '#FFC960', fontSize: 18, fontStyle: 'italic', alignSelf: 'center', marginTop: 25, marginBottom: 25}}>
                    - Liste des évènements -
                  </Text>

                  <StatusBar style="auto" hidden={false} />

                </View>


                <View>
                  {eventList}
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
    saveTableId: function (tableId) {
      dispatch({ type: "saveTableId", tableId: tableId })
    }
  }
}


// composant conteneur
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventScreen);