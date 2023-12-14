import * as React from 'react';
import { Text,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from '../../resources/Constants';


const DrawerBtn=({title, onPress})=>{
    return(
      <TouchableOpacity onPress={onPress} style={styles.btnContainer}  activeOpacity={0.2}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    btnContainer:{
        backgroundColor:Constants.lightGreen,
        alignContent:'center',
        alignItems:'center',
        marginVertical: 20,
        marginHorizontal: 40,
        height:40,
        flexDirection:'column',
        borderRadius: 10,
        
        width: 150,
        marginLeft:120,
        marginTop:650
    },
    btnText:{
        fontSize:20,
        textAlign:'center',
        textAlignVertical:'center',
        alignContent:'center',
        color:'black',
        margin:10,
        letterSpacing:4,
        lineHeight:25
        
    },
}
)

export default DrawerBtn