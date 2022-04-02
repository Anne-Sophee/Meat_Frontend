import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { TextInput, Button, Avatar, Card } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import Appbarmodel from '../navigation/appbar';
import { Dropdown } from 'react-native-element-dropdown';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';




function HomeScreen(props) {

  // ---------VARIABLE D'ETAT INPUT---------
  const [dateOfEvent, setDateOfEvent] = useState(new Date(Date.now()));
  const [foodType, setFoodType] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const isFocused = useIsFocused();
  const [tableDataList, setTableDataList] = useState([]);
  const [dateFilter, setDateFilter] = useState(0) // Filtre la date


  
  // ---------LISTES DÉROULANTES INPUT---------
  // liste déroulante type de cuisine
  const restaurantTypeList = [
    { label: 'Italien', value: 'Italien' },
    { label: 'Japonais', value: 'Japonais' },
    { label: 'Fast-food', value: 'Fast-food' },
    { label: 'Chinois', value: 'Chinois' },
    { label: 'Mexicain', value: 'Mexicain' },
    { label: 'Indien', value: 'Indien' },
    { label: 'Coréen', value: 'Coréen' },
    { label: 'Africain', value: 'Africain' },
  ];



  // ---------DATEPICKER---------
  const format = 'DD/MM/YYYY'
  const minDate = moment().add(1, 'days').toDate()

  const dateUpdate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfEvent;
    setDateOfEvent(currentDate);
    setDateFilter(currentDate);
  }



  // ---------AFFICHAGE DES TABLES---------
  // réccupération des données de la table 
  useEffect(() => {
    if (isFocused === true) {

      const getTableList = async () => {
        let rawResponse = await fetch(`https://newmeat.herokuapp.com/search-table`);
        let response = await rawResponse.json();
        setTableDataList(response.result)

        //sauvegarde du tableId en local (non crypté) + JSON.stringify pour convertir en json lors de la sauvegarde
        let {tableId} = rawResponse.result._id;
        await AsyncStorage.setItem('tableId', JSON.stringify(tableId));
        props.saveTableId(tableDataResponse.newTable._id);
      };
      getTableList()
    }
  }, [isFocused]
  )




  // ---------FILTRAGE DES TABLES---------
  // réccupération des données en fonction de la date et du type sélectionné
  const foodFilter = async () => {

    if (foodType !== "" || dateFilter !== 0) {
      let rawDataFilterResponse = await fetch(`https://newmeat.herokuapp.com/filters`, {
        method: "POST",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `date=${dateFilter}&type=${foodType}`
      });

      let dataFilterResponse = await rawDataFilterResponse.json();
      setTableDataList(dataFilterResponse.result)

    } else {
      let rawResponse = await fetch(`https://newmeat.herokuapp.com/search-table`);
      let response = await rawResponse.json();
      setTableDataList(response.result)
      console.log('respone:', response.result)
    }
  }



  // ---------MODÈLE DE TABLES À AFFICHER---------
  var tableList = tableDataList.map((e, i) => {

    // affichage du nombre de participants attendu à l'évènement
    let capacityAvatar = [];
    for (let avatar = 0; avatar < e.capacity; avatar++) {
      capacityAvatar.push(
        <Avatar.Icon key={avatar} size={30} style={styles.account} icon='account' />
      )
    }

    // affichage de la date et heure de l'évènement
    let dateParse = new Date(e.date);
    let formattedDate = dateParse.toLocaleDateString("fr-FR", {timeZone: "UTC", weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"});
    formattedDate = formattedDate[0].toUpperCase() + formattedDate.slice(1)
    var redirect = false

    // redirection vers la screen adaptée en fonction du statut du user
    const onCardClick = () => {
      props.saveTableId(e._id);

      let guestCheck = e.guests.some(el => el.token === props.userToken)
      if (e.planner === props.userToken || guestCheck === true) {
        redirect = true
      }
      if (redirect) {
        props.navigation.navigate('MyTable')
      } else {
        props.navigation.navigate("Join")
      }
    }


    return(

      <Card key={i} onPress={() => {onCardClick()}} style={{backgroundColor: '#ffffed'}}>
        <Card.Content style={styles.event}>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Image size={40} style={{marginRight: 10, backgroundColor: '#FFFFFF'}} source={e.planner.avatar}/>
                  <View>
                      <Text style={{fontWeight: 'bold', fontSize: 18}}>{e.title}</Text>
                      <Text style={{fontSize: 14}}>{formattedDate}</Text>
                  </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {capacityAvatar}
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Icon size={50} icon='storefront-outline' color='#FFC960' style={{backgroundColor:'#fff6cc'}}/>
              <View style={{marginRight: 25}}>
                  <Text >Restaurant</Text>
                  <Text style={{color: '#0E9BA4', fontWeight: 'bold'}}>{e.restaurantName}</Text>
              </View>
              <Avatar.Icon size={50} icon="food-fork-drink" color='#FFC960' style={{backgroundColor:'#fff6cc'}}/>
              <Text style={{fontWeight: 'bold'}}>{e.foodType}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Avatar.Icon size={50} icon="walk" color='#FFC960' style={{backgroundColor:'#fff6cc'}} />
              <Text style={{fontWeight: 'bold'}}>à 150 m de bureau</Text>
          </View>

        </Card.Content>
      </Card>
    )

  })



    return (

        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Appbarmodel></Appbarmodel>

            <ScrollView style={{backgroundColor: '#ffffed', marginBottom: 60}}>
                <TouchableOpacity onPress={Keyboard.dismiss}>

                    <View style={styles.container}>

                        <Button
                          style={{width: "80%", marginBottom: 25, marginTop: 35, borderRadius: 10, justifyContent: 'center', backgroundColor: '#FFFFFF', height: 60}}
                          labelStyle={{color: '#0E9BA4', fontSize: 22, fontWeight: 'bold'}}
                          uppercase={false}
                          mode="contained"
                          onPress={() => foodFilter()}>              
                          Rechercher
                        </Button>

                        <TextInput 
                          style={styles.input} 
                          theme={themes.input} 
                          mode="outlined" 
                          label="Où ?*" 
                          placeholder="Paris 17" />

                        <View style={styles.date}>
                          <Text style={{color: '#756969', fontSize: 16, marginRight: 90}} >Date:*</Text>
                          <DatePicker
                            customStyles={datepicker}
                            date={dateOfEvent}
                            locale='fr'
                            mode="date"
                            format={format}
                            minDate={minDate}
                            confirmBtnText="Confirmer"
                            cancelBtnText="Annuler"
                            useNativeDriver={true}
                            onDateChange={dateUpdate}
                            value={dateOfEvent} />
                        </View>

                        <Dropdown
                          style={[styles.dropdown, showDropDown && { borderColor: '#0E9BA4' }]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          activeColor={'#FFC960'}
                          data={restaurantTypeList}
                          maxHeight={200}
                          labelField={"label"}
                          valueField={"value"}
                          placeholder={"Type de cuisine*"}
                          value={foodType}
                          onFocus={() => setShowDropDown(true)}
                          onBlur={() => setShowDropDown(false)}
                          onChange={item => {setFoodType(item.value); setShowDropDown(false)}}
                        />

                        <StatusBar style="auto" hidden={false} />

                    </View>

                    <View>
                      {tableList}
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
    marginVertical: 5
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
    marginBottom: 5,
    backgroundColor: '#FFFFFF'
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
    height: 57,
    paddingLeft: 7,
    justifyContent: 'center'
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'grey',
    height: 57,
    fontColor: 'red'
  },
  placeholderStyle: {
    color: 'grey',
    marginLeft: 14
  },
  selectedTextStyle: {
    textAlign: 'start',
    marginLeft: 14
  },
  
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
    left: -70
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



// fonction qui rappel l'information définie dans le réduceur
function mapStateToProps(state) {
  return {
      tableId: state.tableId,
      userToken: state.userToken,
  }
}


// fonction du composant de présentation à appeler pour effectuer l'ordre
function mapDispatchToProps(dispatch) {
  return {
      saveTableId: function (tableId) {
          dispatch({ type: "saveTableId", tableId: tableId })
      },
  }
}


// composant conteneur
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)