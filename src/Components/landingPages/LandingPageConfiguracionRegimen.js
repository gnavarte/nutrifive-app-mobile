import Boton from "../botones/boton";
import { Alert, Text, View, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import regimenData from '../../data/data.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveData, getData } from "../../localStorage";
import Icon from 'react-native-vector-icons/FontAwesome'
const image = {uri: 'https://www.nacion.com/resizer/4yV9tdjAjZuGbRyiapcGGzntsV4=/1440x0/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-gruponacion.s3.amazonaws.com/public/RSJ72ROU4RGRNFPAOXAWRGHG7M.jpg'};

const LandingPageConfiguracionRegimen = () => {
  const [selectedRegimen, setSelectedRegimen] = useState([]); //Llamar a regimenes de AsyncStorage en caso de que existan
  const navigation = useNavigation();
  
  const handleCheckboxToggle = (regimen) => {
    if (selectedRegimen.includes(regimen)) {
      setSelectedRegimen(selectedRegimen.filter(item => item !== regimen));
    } else {
      setSelectedRegimen([...selectedRegimen, regimen]);
    }
  };

  const handleConfirmar =  async () => {
    if (selectedRegimen.length > 0) {
      saveData('regimen', JSON.stringify(selectedRegimen));
      console.log(selectedRegimen)
      navigation.push('InicioEscaneo');
    } else {
      Alert.alert("Debes seleccionar un regimen para continuar")
      console.log('No se seleccionó ningún regimen.');
    }
  };

  const backToName = async () => {
    navigation.push("BienvenidaConfigInicial");
  };

  const backToHome = async () => {
    await AsyncStorage.clear();
    navigation.push("Bienvenida");
  };
  const restart = () => {
    Alert.alert(
      'Se eliminaran todos tus datos',
      'Estas seguro?',
      [
        {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
        {text: 'Si', onPress: () => {
          backToHome()
        }},
        
      ],
      { cancelable: false }
    );
  }

useEffect(() => {
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Los datos existen, puedes hacer algo con ellos
        console.log('Datos recuperados:', JSON.parse(value));
        setSelectedRegimen(JSON.parse(value));
      } else {
        // Los datos no existen
        console.log('No se encontraron datos.');
      }
    } catch (error) {
      console.log('Error al recuperar los datos:', error);
    }
  };
  getData('regimen');
}, []);

  console.log('regimenData:', regimenData);
  console.log('selectedRegimen:', selectedRegimen);

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style={styles.background}/>
        <Text style={styles.logoText}>NutriFive</Text>
        <Text style={styles.configText}>Configuración</Text>
        <View style={styles.boxContainer}>
          <Text style={styles.altText}>Regimenes alimenticios</Text>
          
          {regimenData && regimenData.map((item, index) => (
            <View style={styles.regimenItem} key={index}>
              <TouchableOpacity
                style={[
                  styles.checkboxContainer,
                  selectedRegimen.includes(item.regimen) && styles.checkboxChecked,
                ]}
                onPress={() => handleCheckboxToggle(item.regimen)}
              >
              {selectedRegimen.includes(item.regimen) 
              &&(
                <Icon name="check-circle" size={20} color="#70FF59" /> 
              )}
              </TouchableOpacity>
              <Text style={styles.regimenText}>{item.regimen}</Text>
            </View>
          ))}

        </View>
        <Boton styleB={styles.botonConfirmar} styleT={styles.textoBotonConfirmar} title="Confirmar" onPress={handleConfirmar} />
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Boton title="Cambiar Nombre" styleT={styles.textoCambiar} styleB={styles.botonCambiar} onPress={backToName}/>
          <Boton title="Reiniciar" styleT={styles.textoReiniciar} styleB={styles.botonReiniciar} onPress={restart}/>
        </View>
        
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  configText: {
      color: 'white',
      fontSize: Dimensions.get('window').width*0.1,
      textAlign: 'center',
      marginTop: '15%',
      marginBottom: '1%'
  },
  image: {
    flex: 1,
  },

  regimenesRender: {
      color: 'black',
      fontSize: Dimensions.get('window').width*0.05,
  },

  boxContainer: {
      backgroundColor: 'white',
      border: ' 1px solid white',
      height: Dimensions.get('window').width*0.5,
      borderRadius: 20,
      marginLeft: '5%',
      marginRight: '5%',
  },

  altText: {
      fontSize: Dimensions.get('window').width*0.07,
      color: 'black',
      
      textAlign: 'center',
    },


  botonConfirmar: {
      
      backgroundColor: '#70FF59',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').width*0.15,
      marginTop: "-8%",
      marginLeft: "15%",
      marginRight: "15%",
      borderColor: 'black',
      borderWidth: 1,
  },
  textoBotonConfirmar: {
    color: 'black',
    fontSize: Dimensions.get('window').width*0.08,
    fontFamily: 'sans-serif',
  },
  logoText: {
      color: 'white',
      fontSize: Dimensions.get('window').width*0.15,
      textAlign: 'center',
      fontFamily: 'sans-serif-medium',
      marginTop: '10%',

  },
  regimenItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  checkboxContainer: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '1%',
    borderRadius: 10

  },
  checkboxChecked: {
    backgroundColor: 'black',
    borderRadius: 10
  },

  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: 'white',

  },

  regimenText: {
    marginLeft: '3%',
    fontSize: Dimensions.get('window').width*0.06,
    color: 'black',
  },

  botonCambiar: {
    marginTop: '10%',
  
    backgroundColor: '#0492C2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').width*0.15,
    width: Dimensions.get('window').width*0.4,
    borderColor: 'black',
    borderWidth: 1,
  },
  textoCambiar: {
    color: 'black',
    fontSize: Dimensions.get('window').width*0.05,
    fontFamily:'sans-serif',
  },
  botonReiniciar: {
    marginTop: '10%',
    
    backgroundColor: '#C90000',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').width*0.15,
    width: Dimensions.get('window').width*0.4,
    borderColor: 'black',
    borderWidth: 1,
  },
  textoReiniciar: {
    color: 'black',
    fontSize: Dimensions.get('window').width*0.05,
    fontFamily:'sans-serif',
  },
});

export default LandingPageConfiguracionRegimen;