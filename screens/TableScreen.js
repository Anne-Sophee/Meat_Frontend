import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { Button, Avatar, Card, TextInput, List } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import Appbarmodel from '../navigation/appbar';
import { connect } from 'react-redux';
import io from "socket.io-client";


function TableScreen(props) {  
  
  // ---------VARIABLE D'ETAT INPUT---------
  const [tableData, setTableData] = useState(['']);
  const [guestList, setGuestList] = useState(['']);
  const [planner, setPlanner] = useState('');
  const [plannerPicture, setPlannerPicture] = useState('');
  const [currentMessage,setCurrentMessage] =useState('')
  const [author, setAuthor] =useState('');
  const [listMessages,setListMessages] = useState([])

  const isFocused = useIsFocused();
  const socket = io("https://newmeat.herokuapp.com:3000");




  // ---------RÉCCUPÉRATION DES DONNÉES DE LA TABLE SÉLECTIONNÉES---------
  useEffect(async () => {
    
    let tableDataResponse = await fetch(`https://newmeat.herokuapp.com/join-table/${props.tableId}`);

    let tableResponse = await tableDataResponse.json();
    setTableData(tableResponse.result);
    console.log(tableResponse.result)
    setGuestList(tableResponse.result.guests);
    setPlanner(tableResponse.planner);
    setPlannerPicture(tableResponse.planner.avatar);

  }, [])



    // ---------DEMANDE DE SUPPRESSION DES DONNÉES DE LA TABLE RATTACHÉES AU USER---------
  const leaveTable = async () => {
    
    var tableDataResponse = await fetch(`http://newmeat.herokuapp.com/delete-guest/${props.tableId}/${props.userToken}`,{
      method: 'DELETE' 
    });

    props.navigation.navigate('Home')
  };




  // ---------AFFICHAGE AUTOMATIQUE DES INFORMATIONS DE LA TABLE---------
  //informations sur les participants
  var tableInfo = tableData;
  var plannerInfo = planner;
  var plannerPix = <Avatar.Image size={30} style={styles.account} source={(plannerPicture) ? {uri: plannerPicture} : require("../assets/avatar.png")} />

  let avatarList = guestList.map((e, i) => {
    return (
      <Avatar.Image key={i} size={30} style={styles.account} source={(e.avatar) ? { uri: e.avatar } : require("../assets/avatar.png")} />
    )
  })

  var guestCount = guestList.length + 1;

  //affichage de la date et heure de l'évènement
  let dateParse = new Date(tableInfo.date);
  let formattedDate = dateParse.toLocaleDateString("fr-FR", {timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"});
  formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)

  //informations sur le nombre de participants
  var tabCapacity = [];
  for (let i = 0; i < tableInfo.capacity - guestList.length - 1; i++) {
    tabCapacity.push(<Avatar.Icon key={i} size={30} style={styles.account} color='grey' icon='seat'/>)
  }

  //informations sur le budget de l'event
  var bugdetInfo = [];
  for (let j = 0; j < tableInfo.budget; j++) {
    bugdetInfo.push(<Avatar.Icon key={j} size={30} style={styles.budget} color='#38b000' icon='currency-eur'/>)
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




  // ---------INFORMATIONS LIÉES À LA DISCUSSION-CHAT---------
  //mise à jour des messages reçus et envoyés, envoi des informations en bdd et sauvarge locale
  const handlePress = async () => {

    const loadNewMessageToDatabase = async (message) => {

      let chatRawResponse = await fetch(`https://newmeat.herokuapp.com/interactions/update-table-messages`,{
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body: `content=${message.content}&author=${message.author}&eventId=${props.tableId}&date=${message.date}`
      });

      let chatResponse = await chatRawResponse.json();
      console.log('chatResponse:', chatResponse.messages)
    };

    //style d'affichage de la date et heure de l'évènement
    const today = new Date(Date.now());
    let formattedChatDate = today.toLocaleDateString("fr-FR", {timeZone: "UTC", weekday: "long", day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit"});
    formattedChatDate = formattedChatDate[0].toUpperCase() + formattedChatDate.slice(1)

    //pour envoyer des données au server converties au format json
    socket.emit("sendMessage", JSON.stringify({
      content: currentMessage,
      author: author,
      room : props.tableId, date: formattedChatDate
    }));

    //envoi d'une copie des informations en database
    await loadNewMessageToDatabase({
      content: currentMessage,
      author: author,
      room: props.tableId, date: formattedChatDate
    });
    setCurrentMessage("");
  };


  //récupération des données des messages
  useEffect( ()=> {

    const getChatMessages = async () => {
      let chatRawResponse = await fetch(`https://newmeat.herokuapp.com/interactions/list-table-messages/${props.tableId}/${props.userToken}`)
      
      let chatResponse = await chatRawResponse.json();
      setListMessages(chatResponse.chatMessages);
      setAuthor(chatResponse.author);
    };
    getChatMessages();

  },[isFocused]);


  //pour recevoir des données du server converties au format json
  useEffect(() => {

    socket.on('sendMessageToAll', (newMessage) => {

      if(newMessage !== null) {
        let messageToFilter = JSON.parse(newMessage)
        if (messageToFilter.room === props.tableId) {
          setListMessages([...listMessages,messageToFilter ])};
      };
    });
  }, [listMessages]);




  // var userMessage = socket.emit("sendMessage", {message: currentMessage});
  // setCurrentMessage('');



  //affichage de la discussion 
  var showMessages = listMessages.map((message, i) => {
    
    return (
    <View  key={i} style={{flexDirection: 'column', alignItems: 'center'}}>
      <List.Section>
        <Text style={styles.time}>{message.author} - {message.date}</Text>
        <List.Item style={styles.input} theme={themes.input} description={message.content}/>
      </List.Section>
    </View>
    )
  })


    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Appbarmodel></Appbarmodel>

          <ScrollView style={{backgroundColor: '#ffffed', height: '100%'}}>
            <TouchableOpacity onPress={Keyboard.dismiss}>

              <View style={styles.container}>

                <View>
                  <View style={{alignItems: 'center', marginTop: 10, marginBottom: 35}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18, marginBottom: 5}}>Table de {plannerInfo.firstname}</Text>
                    <Text style={{fontSize: 14}}>{formattedDate}</Text>
                  </View>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <View style={{marginRight: 10}}>
                    <Text style={{fontWeight: 'bold', marginBottom: 5}}>M.eaters : {guestCount}/{tableInfo.capacity}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                      {plannerPix}{avatarList}{tabCapacity}
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
                      <Text style={{fontWeight: 'bold'}}>Budget : {bugdetInfo}</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
                      <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='walk'/>
                      <Text style={{fontWeight: 'bold'}}>à 150 m de bureau</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='food-fork-drink'/>
                      <Text style={{fontWeight: 'bold'}}>{tableInfo.foodType}</Text>
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Avatar.Icon size={30} style={styles.account} color='#0E9BA4' icon='cake-variant'/>
                      <Text style={{fontWeight: 'bold'}}>{tableInfo.age}</Text>
                    </View>

                    <StatusBar style="auto" hidden={false} />
                  </View>

                  <View style={{borderStyle: 'solid', borderWidth: 1, borderColor: '#FFC960'}}>
                    <Card.Cover style={{flex: 1, width: 150, height: 120, borderBottomWidth: 1, borderRadius: 0, borderBottomColor: '#FFC960', backgroundColor: '#FFFFFF'}} source={{uri: cardImage}}/>
                    <Text style={{marginTop: 5, marginHorizontal: 2, color: '#0E9BA4', fontWeight: 'bold'}}>{tableInfo.restaurantName}</Text>
                    <Text style={{marginTop: 3, marginHorizontal: 2, fontSize: 9, fontWeight: 'bold', fontStyle: 'italic'}}>{tableInfo.restaurantAddress}</Text>
                    <Text style={{marginTop: 3, marginHorizontal: 2, marginBottom: 5, fontSize: 9, fontWeight: 'bold', color: '#3382F0'}}>(voir plan)</Text>
                  </View>
                </View>
              </View>


              <View style={{alignItems: 'center', marginBottom: 20}}>
                <Text style={{fontWeight: 'bold', color: 'grey', marginBottom: 5}}>{tableInfo.title}</Text>
                <Text style={{color: 'grey', textAlign: 'justify', marginHorizontal: 15}}>{tableInfo.presentation}</Text>
              </View>

              <View style={{borderWidth: 1, borderRadius: 5, width: '90%', height: 190, borderColor: '#FFC960', alignSelf: 'center', backgroundColor: '#FFFFFF'}}>
                <ScrollView style={{flex:1, marginTop: 5}}>
                  {showMessages}
                </ScrollView>
              </View>

              <View>
                <TextInput 
                  style={styles.chat} 
                  theme={themes.chat} 
                  mode="outlined" 
                  label="Ecrire ici..." 
                  multiline={true} 
                  numberOfLines={5} 
                  selectionColor='#0E9BA4'
                  value={currentMessage}
                  onChangeText={(message)=>setCurrentMessage(message)}
                  right={<TextInput.Icon name="arrow-right" color={'#0E9BA4'} style={{alignSelf: 'center', marginBottom: -10}} onPress={() => handlePress()}/>}/>
              </View>

              <View style={styles.container}>
                <Button
                  style={{width: "50%", marginBottom: 15, marginTop: 10, borderRadius: 10, justifyContent: 'center', backgroundColor: '#FFC960', height: 30}}
                  labelStyle={{color: '#0E9BA4', fontSize: 12, fontWeight: 'bold'}}
                  uppercase={false}
                  mode="contained"
                  onPress={{}}>
                  Quitter la table
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
    marginBottom: 20
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
  },
  budget: {
    borderWidth: 1,
    borderColor: '#ffffed',
    backgroundColor: '#ffffed',
    marginBottom: -10
  },
  chat: {
    width:'90%',
    marginHorizontal: 20,
    marginVertical: 5,
    alignSelf: 'center',
    height: 40
  },
  input: {
    width: "100%",
    backgroundColor: '#ffffff',
    fontStyle: 'italic',
    paddingTop: 4,
    padding: 10,
    textAlign: 'justify'
  },
  time: {
    fontSize: 8,
    marginHorizontal: 4,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#0E9BA4'
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



// fonction qui rappel l'information définie dans le réduceur
function mapStateToProps(state) {
  return { 
    tableId: state.tableId, 
    userToken: state.userToken
  }
}

// composant conteneur
export default connect(
  mapStateToProps,
  null
)(TableScreen);