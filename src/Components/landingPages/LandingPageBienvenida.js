import Boton from "../botones/boton";
import { ImageBackground, StyleSheet , TouchableOpacity , View ,Text, Dimensions, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
const image = {uri: 'https://www.nacion.com/resizer/4yV9tdjAjZuGbRyiapcGGzntsV4=/1440x0/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-gruponacion.s3.amazonaws.com/public/RSJ72ROU4RGRNFPAOXAWRGHG7M.jpg'};

const LandingPageBienvenida = () => {
    const navigation = useNavigation();

    

    const navigateToConfig = async () => {
        const nombre= await AsyncStorage.getItem('nombre');
        console.log(nombre)
        if (nombre==null) {
          navigation.push('BienvenidaConfigInicial')
        } else {
          navigation.push('InicioEscaneo')
        }
      }
    return(
    <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style={styles.background}>
                <Text style={styles.logoText}>NutriFive</Text>
                <Boton onPress={navigateToConfig} styleB={styles.botonComenzar} styleT={styles.buttonText} title="Comenzar" />
            </LinearGradient>
        </ImageBackground>
    </View>
    )
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
      image: {
        flex: 1,
        justifyContent: 'center',
    },

    botonComenzar: {

        backgroundColor: '#70FF59',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height*0.1,
        borderColor: 'black',
        borderWidth: 1,
        marginLeft: '10%',
        marginRight: '10%',
        marginTop: Dimensions.get('window').height*0.7,

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
export default LandingPageBienvenida;