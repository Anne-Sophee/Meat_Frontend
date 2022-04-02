import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar'; 
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { TextInput, Button, Avatar } from 'react-native-paper';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import Appbarmodel from '../navigation/appbar';
import { Dropdown } from 'react-native-element-dropdown';



// composant de présentation
function CreateScreen(props) {

  // ---------VARIABLE D'ETAT INPUT---------
  const [dateOfEvent, setDateOfEvent] = useState(new Date(Date.now()));
  const [dateValue, setDateValue] = useState(false);
  const [titleEvent, setTitleEvent] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [foodType, setFoodType] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [presentationEvent, setPresentationEvent] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [planner, setPlanner] = useState(props.userToken);


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

  // Liste déroulante tranche d'âge
  const ageRangeList = [
    { label: "Sans préférence", value: "Sans préférence" },
    { label: "18-24 ans", value: "18-24" },
    { label: "25-34 ans", value: "25-34" },
    { label: "35-44 ans", value: "35-44" },
    { label: "45-54 ans", value: "45-54" },
    { label: "55 ans +", value: "55+" },
  ];


  // ---------NOMBRE DE PARTICIPANTS---------
  const [capacity, setCapacity] = useState(2);

  var setTableCapacity = (countCapacity) => {
    if (countCapacity < 2) {
      countCapacity = 2
    }
    if (countCapacity > 6) {
      countCapacity = 6
    }
    setCapacity(countCapacity)
  }

  const tabCapacity = [];
    for (let i = 0; i < 6; i++) {
      var seatColor = "grey"
        if (i < capacity) {
          seatColor = "#FFC960"
        }
      var capacityCount = i + 1
        tabCapacity.push(<Avatar.Icon key={i} onPress={() => setTableCapacity(capacityCount)} icon="seat" size={37} color={seatColor} style={styles.icon} />)
    }



  // ---------BUDGET D'UNE TABLE---------
  const [budget, setBudget] = useState(1);

  var setTableBudget = (countBudget) => {
    if (countBudget < 1) {
      countBudget = 1
    }
    if (countBudget > 4) {
      countBudget = 4
    }
    setBudget(countBudget)
  }

  const tabBudget = [];
    for (let i = 0; i < 4; i++) {
      var signColor = "grey"
        if (i < budget) {
          signColor = "#FFC960"
        }
      tabBudget.push(<Avatar.Icon key={i} icon="currency-eur" size={37} color={signColor} style={styles.icon} />)
  }



  // ---------COLLECTE DES DONNEES INPUT---------
  const createTable = async () => {

    //alerte d'erreurs en cas de champs vides
    if (dateOfEvent === false) {
      alert("Veuillez renseigner la date et l'heure !")
    } else if (titleEvent === "") {
      alert("Veuillez renseigner le titre de l'évènement !")
    } else if (restaurantName === "") {
      alert("Veuillez renseigner le nom du restaurant !")
    } else if (restaurantAddress === "") {
      alert("Veuillez renseigner l'adresse du restaurant !")
    } else if (foodType === "") {
      alert("Veuillez renseigner le type de cuisine !")
    } else if (presentationEvent === "") {
      alert("Veuillez ajouter une présentation de l'évènement !")
    } else if (ageRange === "") {
      alert("Veuillez sélectionner une tranche d'âge !")
    } else {


    //chaîne de caractère renvoyée par le fetch et stockée dans la variable data
    var rawTableData = await fetch('https://newmeat.herokuapp.com/add-table', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: `dateOfEvent=${dateOfEvent}&titleEvent=${titleEvent}&restaurantName=${restaurantName}&restaurantAddress=${restaurantAddress}&foodType=${foodType}&presentationEvent=${presentationEvent}&ageRange=${ageRange}&capacity=${capacity}&budget=${budget}&planner=${planner}`
    });
    
    //variable qui transforme la chaîne de caractère du fetch en objet javascript 
    var tableDataResponse = await rawTableData.json();
    props.sendTableId(tableDataResponse.newTable._id);
    props.navigation.navigate('MyTable');
    }
  }



  // ---------KEYBOARD NEXT OPTION--------- 
  const secondTextInput = useRef();
  const thirdTextInput = useRef();
  const fourthTextInput = useRef();
  const fifthTextInput = useRef();



  // ---------DATEPICKER FORMAT D'AFFICHAGE---------
  const minDate = moment().add(1, 'days').toDate()
  const formattedDate = dateOfEvent.toLocaleString("fr-FR", options)
  const options = {day: '2-digit', month: '2-digit', year: '2-digit'}

  const dateUpdate = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfEvent;
    setDateOfEvent(currentDate);
    setDateValue(true);
  }



    return (

      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <Appbarmodel></Appbarmodel>

          <ScrollView style={{backgroundColor: '#ffffed', marginBottom: 60}}>
            <TouchableOpacity onPress={Keyboard.dismiss}>

              <View style={styles.container}>

              <Text
                  style={{color: '#FFC960', fontSize: 18, fontStyle: 'italic', alignSelf: 'center', marginTop: 25, marginBottom: 25}}>
                  - Informations de la table -
                </Text>

                <View style={styles.date}>
                  <Text style={{color: '#756969', fontSize: 16, marginRight: 40}} >Date/Heure:*</Text>
                  <DatePicker
                  onSubmitEditing={() => {secondTextInput.current.focus()}}
                  customStyles={datepicker}
                  date={dateOfEvent}
                  locale='fr'
                  mode="datetime"
                  format={formattedDate}
                  minDate={minDate}
                  confirmBtnText="Confirmer"
                  cancelBtnText="Annuler"
                  minuteInterval={15}
                  useNativeDriver={true}
                  onDateChange={dateUpdate}
                  value={dateOfEvent} />
                </View>

                <TextInput 
                style={styles.input} 
                theme={themes.input} 
                returnKeyType="next"
                onSubmitEditing={() => {thirdTextInput.current.focus()}}
                ref={secondTextInput}
                mode="outlined" 
                label="Titre de l'évènement*" 
                placeholder="Hello les amis, ce midi c'un rôti !"
                onChangeText={(value) => setTitleEvent(value)}
                value={titleEvent} />

                <TextInput 
                style={styles.input} 
                theme={themes.input}
                returnKeyType="next"
                onSubmitEditing={() => {fourthTextInput.current.focus()}}
                ref={thirdTextInput}
                mode="outlined" 
                label="Nom du restaurant*" 
                placeholder="La Brasserie du voisin"
                onChangeText={(value) => setRestaurantName(value)}
                value={restaurantName} />

                <TextInput 
                style={styles.input} 
                theme={themes.input}
                returnKeyType="next"
                onSubmitEditing={() => {fifthTextInput.current.focus(); }}
                ref={fourthTextInput}
                mode="outlined" 
                label="Adresse du restaurant*" 
                placeholder="62 rue de la restauration, 75010 Paris"
                onChangeText={(value) => setRestaurantAddress(value)}
                value={restaurantAddress} />

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

                <TextInput 
                style={styles.presentationEvent} 
                theme={themes.input}
                returnKeyType="next"
                ref={fifthTextInput}
                mode="outlined" 
                multiline={true}
                numberOfLines={5}
                label="Présentation de l'évènement*" 
                placeholder="Les amis, envie d'un rôti un jeudi à Midi :)"
                onChangeText={(value) => setPresentationEvent(value)}
                value={presentationEvent} />

                <Dropdown
                style={[styles.dropdown, showDropDown && { borderColor: '#0E9BA4' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                activeColor={'#FFC960'}
                data={ageRangeList}
                maxHeight={200}
                labelField={"label"}
                valueField={"value"}
                placeholder={"Tranche d'âge*"}
                value={ageRange}
                onFocus={() => setShowDropDown(true)}
                onBlur={() => setShowDropDown(false)}
                onChange={item => {setAgeRange(item.value); setShowDropDown(false)}}
                />

                <View style={{ flexDirection: "column", alignItems: "flex-end", marginTop: 30 }}>

                  <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center", justifyContent: "flex-end" }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Meaters: </Text>
                      {tabCapacity}
                    <Button compact style={styles.iconButton} labelStyle={styles.iconLabel} mode="contained" onPress={() => setTableCapacity(capacity - 1)}>-</Button>
                    <Button compact style={styles.iconButton} labelStyle={styles.iconLabel} mode="contained" onPress={() => setTableCapacity(capacity + 1)}>+</Button>
                  </View>

                  <View style={{ flexDirection: "row", alignSelf: 'center', alignItems: "center", justifyContent: "flex-end" }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Budget: </Text>
                      {tabBudget}
                    <Button compact style={styles.iconButton} labelStyle={styles.iconLabel} mode="contained" onPress={() => setTableBudget(budget - 1)}>-</Button>
                    <Button compact style={styles.iconButton} labelStyle={styles.iconLabel} mode="contained" onPress={() => setTableBudget(budget + 1)}>+</Button>
                  </View>

                </View>

                <Button
                  style={{width: "80%", marginBottom: 15, marginTop: 70, borderRadius: 10, justifyContent: 'center', backgroundColor: '#0E9BA4', height: 60}}
                  labelStyle={{color: '#FFC960', fontSize: 22, fontWeight: 'bold'}}
                  uppercase={false}
                  mode="contained"
                  onPress={() => {createTable()}}>              
                  Créer ma table
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
    fontColor: 'red',
    marginBottom: 5,
    marginTop: 5
  },
  placeholderStyle: {
    color: 'grey',
    marginLeft: 14
  },
  selectedTextStyle: {
    textAlign: 'start',
    marginLeft: 14
  },
  icon: {
    borderWidth: 1,
    borderColor: '#ffffed',
    backgroundColor: '#ffffed',
    marginHorizontal: -5
  },
  iconButton: {
    backgroundColor: '#0E9BA4',
    borderRadius: 50,
    marginHorizontal: 2,
    marginVertical: 2
  },
  iconLabel: {
    fontSize: 18
  },
  presentationEvent:{
    width: "80%",
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    minHeight: 150
  }
});

const datepicker = {
  dateIcon: {
    position: 'absolute',
    left: '77%'
  },
  dateInput: {
    borderWidth: 0,
  },
  dateText: {
    fontSize: 17,
    color: 'black',
    left: -38
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
    userToken: state.userToken
  }
}

// fonction du composant de présentation de l'ordre
function mapDispatchToProps(dispatch) {
  return {
    sendTableId: function(tableId) {
      dispatch({type: 'registerTableId', tableId: tableId})
    }
  }
}

// composant conteneur
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateScreen);
