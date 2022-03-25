import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Appbar } from 'react-native-paper';


export default function Appbarmodel() {
  
  const navigation = useNavigation();

  return(

    <Appbar.Header style={styles.bar}>

      <Appbar.Action 
        size={30}
        icon="home" 
        color='#0E9BA4' 
        style={styles.icon} 
        onPress={() => navigation.navigate('Home')}
      />

      <Appbar.Action
        size={30}
        icon="plus-circle" 
        color='#0E9BA4'
        style={styles.icon} 
        onPress={() => navigation.navigate('Create')} 
      />

      <Appbar.Action 
        size={30}
        icon="mail" 
        color='#0E9BA4'
        style={styles.icon} 
        onPress={() => navigation.navigate('Message')}
      />

      <Appbar.Action 
        size={30}
        icon="calendar-month" 
        color='#0E9BA4'
        style={styles.icon} 
        onPress={() => navigation.navigate('Event')} 
      />

      <Appbar.Action 
        size={30}
        icon="account" 
        color='#0E9BA4'
        style={styles.icon} 
        onPress={() => navigation.navigate('Account')} 
      />

  </Appbar.Header>

  )
};


const styles = ({
  icon: {
    borderWidth: 1,
    borderColor: '#ffffed',
    backgroundColor: '#ffffed'
  },
  bar: {
    justifyContent: 'space-around',
    backgroundColor: '#ffffed'
  }
});