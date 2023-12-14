import * as React from 'react';
import{View, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Constants from '../../resources/Constants'
import {LinearGradient} from 'expo-linear-gradient';
import UserHeader from './UserHeader';
import { BtnDrawerText,BtnDrawerImg } from './BtnDrawer';
const CustomDrawer=(props)=>{
    return(
        <View style={styles.container}>
        <LinearGradient colors={[Constants.lightGreen,Constants.mediumGreen,'rgba(0,0,0,0.05)']} style={styles.gradient}>
            <DrawerContentScrollView {...props}
            contentContainerStyle={styles.contentContainer}
            style={styles.drawerStyle}
            >
                <UserHeader />
                <BtnDrawerText title={'Escanear'} onPress={() => props.navigation.navigate("Escanear")}/>
                <DrawerItemList{...props}/>
                <BtnDrawerImg source={require('../../../assets/userconf.png')} onPress={() => props.navigation.navigate("config")}/>
            
            </DrawerContentScrollView>
        </LinearGradient>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        width:280,
    
        
    },
    gradient:{
        flex:1,
    },
    drawerStyle:{
     
     flex:1 

    },
    confImg:{
        width:50,
        height:50,
    }
})
export default CustomDrawer