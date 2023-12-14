
import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPageBienvenida from './src/Components/landingPages/LandingPageBienvenida';
import LandingPageBienvenidaConfigInicial from './src/Components/landingPages/LandingPageBienvenidaConfigInicial';
import LandingPageConfiguracionRegimen from './src/Components/landingPages/LandingPageConfiguracionRegimen';
import LandingInicioEscaneo from './src/Components/landingPages/LandingInicioEscaneo'; 
import MyDrawer from './src/Components/drawer/SideBar';
import LandingNavegadorEmb from './src/Components/landingPages/LandingPageNavEmbebido'
import modalSatisfactorio from './src/Components/modals/modalSatisfactorio';

import ModalNegativo from './src/Components/modals/modalNegativo';

const Stack=createNativeStackNavigator();
const App =()=> {
  return (
    <NavigationContainer>
      
      <Stack.Navigator>
        <Stack.Screen name="Bienvenida" component={LandingPageBienvenida} options={{  headerShown: false  }} />
        <Stack.Screen name="BienvenidaConfigInicial" component={LandingPageBienvenidaConfigInicial} options={{  headerShown: false  }} />
        <Stack.Screen name="InicioEscaneo" component={MyDrawer} options={{  headerShown: false  }} />
        <Stack.Screen name="ConfiguracionRegimen" component={LandingPageConfiguracionRegimen} options={{  headerShown: false  }} />
        <Stack.Screen name="Navegador" component={LandingNavegadorEmb} options={{    headerShown: false  }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;