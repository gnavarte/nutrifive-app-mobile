import React, { useEffect , useState} from 'react';
import { Alert, Text, Button, StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const  UserInfo = () =>{
  const [nombre, setNombre] = useState('')
  useEffect(() => {
    
    const getName = async () => {
      try {
        const name = await AsyncStorage.getItem('nombre');
        setNombre(name);
      }
      catch (error) {
        console.log('Error occurred while fetching name:', error);
      }
    }
    getName();
    });
    return(
      <View style={styles.userContainer}>
        <Image
          style={styles.userImage}
          source={require('../../../assets/user.png')}
        />
        <Text style={styles.userText}>{nombre}</Text>
      </View>
    )
}
const styles=StyleSheet.create({
        userContainer:{
          flexDirection:'row', 
          alignItems:'center',
          borderColor: 'white',
          borderTopWidth:5,
          borderBottomWidth:5,
          marginTop:80,
          marginBottom:40
        },
        userText:{
          fontSize: 30,
          color:'white',
          fontFamily:'sans-serif',
          fontWeight:'bold'
        },
        userImage:{
          borderRadius:100,
          width:100,
          height:100,
          marginHorizontal: 15,
          marginVertical: 10
        }
    }
)
export default UserInfo;