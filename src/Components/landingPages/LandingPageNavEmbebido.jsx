import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Boton from '../botones/boton'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LandingPageNavEmbebido = () => {
  const [regimen, setRegimen] = useState('');
  const [productName, setProductName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        const productName = await AsyncStorage.getItem('nombreProducto');
        console.log("from embebido", productName);
        if (value !== null) {
          console.log('Datos recuperados:', JSON.parse(value));
          const regimen = JSON.parse(value).join(' ');
          setRegimen(regimen);
          setProductName(productName);
        } else {
          console.log('No se encontraron datos.');
        }
      } catch (error) {
        console.log('Error al recuperar los datos:', error);
      }
    };
    getData('regimen');
  }, []);

  const backToScan = () => {
    navigation.push('InicioEscaneo');
  };

  var recipes = `https://www.google.com/search?q=recetas+${productName}+${regimen}`;
  console.log(recipes);

  return (
    <View style={styles.container}>
      <Boton title="X" onPress={backToScan} styleB={styles.botonCerrar} styleT={styles.buttonText} />
      <WebView
        source={{ uri: recipes }}
        style={styles.navigator}
      />
    </View>
  );
};
  
  const styles = StyleSheet.create({

    container: {
      backgroundColor: '#5f996e',
      flex: 1
    },
    navigator: { 
    },

    buttonText: {
      fontSize: 40,
      color: 'white',
      fontFamily: 'sans-serif',
    },

    botonCerrar: {
      backgroundColor: 'black',
      marginTop: 30,
      height: 50,
      
      
     
      alignItems: 'center',
      

    },

  });

  export default LandingPageNavEmbebido;