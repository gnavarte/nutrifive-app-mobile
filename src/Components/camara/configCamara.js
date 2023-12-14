import { StyleSheet, Text, View, Image, Dimensions, Alert,ActivityIndicator } from 'react-native';
import { Camera, } from 'expo-camera';

import * as MediaLibrary from 'expo-media-library';
import { useState, useEffect, useRef } from 'react';
import Button from '../botones/botonEscanear'
import { BarCodeScanner } from 'expo-barcode-scanner';

import { useIsFocused } from '@react-navigation/native';
import Constants from '../../resources/Constants';
import { useNavigation } from '@react-navigation/native';
import ModalSatisfactorio from '../modals/modalSatisfactorio';
import ModalNegativo from '../modals/modalNegativo';
import ModalNeutral from '../modals/modalNeutral';
import ModalNoIngredientes from '../modals/modalNoIngredientes';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function ConfigCamara() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isValueTrue, setIsValueTrue] = useState(false);
  const [modalNegativoVisible, setModalNegativoVisible] = useState(false);
  const navigation = useNavigation();
  //Variables lector de barra
  const [modalNeutral, setModalNeutralVisible] = useState(false);
  const [modalNoIngredientes , setModalNoIngredientes] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [scanData, setScanData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [loadingMessage, setLoadingMessage] = useState('Estamos realizando la búsqueda...');
  //Variables camara
  const [imagen, setImagen] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back) //Camara trasera
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off) //Desactivamos el flash
  const cameraRef = useRef(null);
  const [additionalText, setAdditionalText] = useState('');
  const handleOpenModal = () => {

    var condition = true
    Alert.alert(condition)
    //si la condicion es verdadera abrimos el modal apto, sino el no es apto
    if (condition) {
      setModalVisible(true);
    } else {
      setModalNegativoVisible(true);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setModalNegativoVisible(false);
    setModalNeutralVisible(false);
    setModalNoIngredientes(false);  
  };
  const getNameProduct = async (data) => {
    var condicion= "true"
    console.log("getName")
    const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
    const json = await response.json();

    if (json.status==0)
    {
      console.log("No se encontro el en getNameProduct");
      return false;
    }
    else{
      console.log("else!")
      const productName = json.product.product_name;
      console.log("producto",productName)
      await AsyncStorage.setItem('nombreProducto', productName);
      const nombreProducto = await AsyncStorage.getItem('nombreProducto');
      return true;
    }
  }

  const validarProducto = async (data) => {
    try {
      setIsLoading(true);
      setLoadingMessage('Estamos realizando la búsqueda...');
      var condicion = "valido";
      console.log('Fetching product data...');
      const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`);
      if (response.status===0) {
        console.log("No se encontro el producto");
        condicion = "null";
        return condicion;
      }
      else{
      const json = await response.json();
      const productData = json.product;
      const ingredients = productData.ingredients;
      console.log(productData.ingredients);

      var regimenes = await AsyncStorage.getItem('regimen');
      regimenes = regimenes.split(',');
      console.log(regimenes);
      console.log(ingredients)
      
      for (var regimen of regimenes) {

        if (ingredients === undefined) {
        
          condicion = "null";
          break;
        }
        console.log("regimen:");
        console.log(regimen);
        if (regimen.includes('Libre de Gluten')) {
          const productAllergens = productData.allergens;
          console.log("Product Allergens: " + productAllergens);
  
          if (productAllergens != undefined) {

            if (productAllergens.includes('gluten')) {
              console.log("Product contains Gluten");
              var regimenModal="Libre de Gluten"
              condicion = "noValido";
            }
            else {
              console.log("Product is Gluten Free")
            }
          }
        }
        if (regimen.includes("Bajo en Azucares")) {
          const productSugar = productData.nutrient_levels_tags;
          console.log("Product Sugar: " + productSugar);
          if (productSugar != undefined) {
            if (productSugar.includes('en:sugars-in-high-quantity' || 'en:sugars-in-moderate-quantity' || 'en:sugars-in-other')) {
              console.log("Contiene mucha azucar");
              var regimenModal="Bajo en Azucares"
              condicion = "noValido";
            }
          }
        }
        for (const ingredient of ingredients) {
          console.log("Ingredient is Vegan: " + ingredient.vegan)
          if (regimen.includes("Vegano")) {
            if (ingredient.vegan === "no") {
              var regimenModal="Vegano"
              condicion = "noValido";
            }
          }

          if (regimen.includes("Vegetariano")) {
            console.log("Ingredient is Vegetarian: " + ingredient.vegetarian)
            if (ingredient.vegetarian === "no") {
              var regimenModal="Vegetariano"
              condicion = "noValido";
            }
          }
          if (condicion === "noValido") {
            break;
          }
        }
      }
    }
      console.log('Condicion: ' + condicion);
      setIsLoading(false);
      if (condicion === "noValido") {
        console.log(regimenModal)
        setModalNegativoVisible(true);
        setAdditionalText(`${regimenModal}`);
      }
      else if (condicion === "valido") {
        setModalVisible(true);
      }
      else if (condicion === "null") {
        setModalNoIngredientes(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync(); //Pedimos permiso para acceder a la libreria
      const cameraStatus = await BarCodeScanner.requestPermissionsAsync(); //Pedimos permiso para acceder a la camara
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, [])

  if (hasCameraPermission === false) {
    return <Text>Sin acceso a la camara</Text>
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanData(data);
    console.log(`Data: ${data}`);
    console.log(`Type: ${type}`);

    var obtenemosValor=await getNameProduct(data);
    console.log("getvalo",obtenemosValor)
    if (obtenemosValor==false)
    {
      setModalNeutralVisible(true);
    }
    else if (obtenemosValor==true){
      console.log("entramos por else")
       var valor= await validarProducto(data);
    }
    // if (data === undefined) {
    //   console.log("No se encontro el producto");
    //   setModalNeutralVisible(true);
    // }
    // else{
    // //aca primero vemos si es apto o no
    //   
    // }
    //navigation.push("BienvenidaConfigInicial")
  }

  //useIsFocused returns a boolean indicating whether the screen is focused or not
  const viewFocused = useIsFocused();

  return (
    <View style={styles.container}>
      {viewFocused &&
        <Camera
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}

        />}
      {scanData && <Button
        icon={'retweet'}
        title={'Escanear otra vez'}
        onPress={() => setScanData(undefined)}
      />
      }
      <ModalSatisfactorio visible={modalVisible} onClose={handleCloseModal} />
      <ModalNegativo visible={modalNegativoVisible} onClose={handleCloseModal} additionalText={additionalText} />
      <ModalNeutral visible={modalNeutral} onClose={handleCloseModal} /> 
      <ModalNoIngredientes visible={modalNoIngredientes} onClose={handleCloseModal} />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="gray" />
          <Text style={styles.loadingText}>{loadingMessage}</Text> 
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignSelf: 'center',
    width: Dimensions.get('screen').width - 15,
    height: Dimensions.get('screen').height,
    overflow: 'hidden',
    flexDirection: 'column-reverse',
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    marginTop: 80,
    marginBottom: 20,
    borderWidth: 5,
    borderColor: "grey"
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  loadingText: {
    marginTop: 26,
    fontSize: 16,
    color: 'white',
  },
});