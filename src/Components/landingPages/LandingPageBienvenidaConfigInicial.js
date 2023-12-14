import Boton from "../botones/boton";
import {Text , View, StyleSheet, TextInput, Alert, KeyboardAvoidingView, ImageBackground, Dimensions, Platform} from "react-native";
import React, {useState} from "react";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';



const image = {uri: 'https://www.nacion.com/resizer/4yV9tdjAjZuGbRyiapcGGzntsV4=/1440x0/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-gruponacion.s3.amazonaws.com/public/RSJ72ROU4RGRNFPAOXAWRGHG7M.jpg'};

const LandingPageBienvenidaConfigInicial = () =>{
    const [nombre, setNombre] = useState('');
    const navigation = useNavigation();
    const continuarConfiguracion = async () => {
        console.log("validamos el nombre ingresado")
        if (nombre === '') {
            Alert.alert("ingrese un nombre porfavor")
        }
        else if (nombre.includes('@')) {
            console.log("tu nombre contiene @")
            Alert.alert("tu nombre tiene @")
        }
        else {
            Alert.alert("Bienvenido/a " + nombre)
            var regimenGuardado= await AsyncStorage.getItem('regimen')
            console.log(regimenGuardado)
            navigation.push("ConfiguracionRegimen")
            await AsyncStorage.setItem('nombre', nombre);
            const nombreSavev= await AsyncStorage.getItem('nombre');

            setNombre(nombreSavev);
        }
    }
    return(
        <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style={styles.background}/>
            <Text style={styles.logoText}>NutriFive</Text>
            <View style={styles.boxContainer}>
                <Text style={styles.nameInput}>Indicanos tu nombre</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Nombre" 
                    value={nombre}
                    onChangeText={setNombre}
                    />
            </View>
            <Boton onPress={continuarConfiguracion} styleB={styles.botonSiguiente} styleT={styles.buttonText} title="Siguiente" />
            </ImageBackground>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgreen',
        flex: 1,
    },
    
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
      },
      image: {
        flex: 1,
      },
    boxContainer: {
        marginTop: '30%',
        backgroundColor: 'white',
        border: ' 1px solid white',
        height: Dimensions.get('window').width*0.4,
        marginLeft: '5%',
        marginRight: '5%',
        borderRadius: 20,
        
    },
    nameInput: {
        fontSize: Dimensions.get('window').width*0.08,
        color: 'black',
        textAlign: 'center',
    },
    input: {
        fontSize: Dimensions.get('window').width*0.07,
        marginLeft: '5%',
        color: "#616161",
        marginTop: '8%',
    },
    botonSiguiente: {
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
    buttonText: {
        color: 'black',
        fontSize: Dimensions.get('window').width*0.1,
        fontFamily: 'sans-serif',
    },
    logoText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'sans-serif-medium',
        marginTop: '10%',
        fontSize: Dimensions.get('window').width*0.15,
    },
});
export default LandingPageBienvenidaConfigInicial;