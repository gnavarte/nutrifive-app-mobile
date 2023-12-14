import * as React from 'react';
import { StyleSheet,Image} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer'
import Constants from '../../resources/Constants';
import LandingInicioEscaneo from '../landingPages/LandingInicioEscaneo'
import LandingPageConfiguracionRegimen from '../landingPages/LandingPageConfiguracionRegimen'
const Drawer=createDrawerNavigator();
function MyDrawer(){
  return(
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: 'front',
        swipeEdgeWidth: 180,
        drawerActiveTintColor:'red',
        drawerActiveBackgroundColor:'transparent',
        headerTitleAlign:'center',
        headerShown:true,      
        headerTransparent:true,
        headerTitle:'NF',
        headerTintColor:'white',
        headerTitleStyle:{
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        }
      }}
      drawerContent={(props) => <CustomDrawer {...props} />} 
    >
        <Drawer.Screen name='Escanear' component={LandingInicioEscaneo}
            options={{
                drawerLabelStyle:styles.invisible,
                
        }}/>
        <Drawer.Screen name='config' component={LandingPageConfiguracionRegimen}
        options={{
          drawerLabelStyle:styles.invisible,
          headerTransparent:true,
          headerTitle:''
        }} />
    </Drawer.Navigator>
  ) 
}





const styles=StyleSheet.create({
    drawerStyles:{
        flex:1,
        backgroundColor:Constants.mediumGreen,
    },
    invisible:{
      display:'none',
      height:0,
      width:0,
      
    },
    
})

export default MyDrawer