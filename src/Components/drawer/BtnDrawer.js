import * as React from 'react';
import { Text, StyleSheet,Image,View } from 'react-native';
import { TouchableOpacity,} from 'react-native-gesture-handler';

const BtnDrawerText=({title, onPress})=>{
    return(
        <View style={styles.ContainerText}>
            <TouchableOpacity onPress={onPress} style={styles.btnContainerText}  activeOpacity={0.2}>
                <Text style={styles.btnText}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const BtnDrawerImg=({onPress, source})=>{
    return(
        <View style={styles.ContainerImg}>
            <TouchableOpacity onPress={onPress} style={styles.btnContainerImg}  activeOpacity={0.2}>
            <Image
            source={source}
            style={{
                width:'80%',
                height:'100%',
                position:'absolute',
                alignItems:'center'
            }}
            />
        </TouchableOpacity>
        </View>
    )
}
const styles=StyleSheet.create({
        btnContainerText:{
            backgroundColor:'white',
            alignContent:'center',
            alignItems:'center',
            height:50,
            borderRadius: 10,
        },
        btnContainerImg:{
            backgroundColor:'white',
            alignContent:'center',
            alignItems:'center',
            height:50,
            borderRadius: 10,
            width:50,
        },
        btnText:{
            fontSize:25,
            textAlign:'center',
            alignContent:'center',
            color:'black',
            margin:10,
            fontFamily:'sans-serif',
        },
        ContainerImg:{
            alignSelf:'flex-end',
            marginRight:60,
            marginTop:'100%',
            marginBottom:'10%'
        },
        ContainerText:{
            alignSelf:'center',
            
        }
    }
)
export {BtnDrawerText,BtnDrawerImg}