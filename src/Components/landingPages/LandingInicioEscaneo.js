import Boton from "../botones/boton";
import { useNavigation } from '@react-navigation/native';
import { Dimensions, ImageBackground, Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import ModalSatisfactorio from "../modals/modalSatisfactorio";
import ModalNegativo from "../modals/modalNegativo";
import ConfigCamara from "../camara/configCamara";
import { LinearGradient } from 'expo-linear-gradient';

const image = {uri: 'https://www.nacion.com/resizer/4yV9tdjAjZuGbRyiapcGGzntsV4=/1440x0/filters:format(jpg):quality(70)/arc-anglerfish-arc2-prod-gruponacion.s3.amazonaws.com/public/RSJ72ROU4RGRNFPAOXAWRGHG7M.jpg'};

const LandingInicioEscaneo = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isValueTrue, setIsValueTrue] = useState(false);
    


    const handleOpenModal = () => {

      var condition=true
      console.log(condition)
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
    };

    const [modalNegativoVisible, setModalNegativoVisible] = useState(false);

    return(
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
            <LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style={styles.background}>
                <ConfigCamara/>
                <ModalSatisfactorio visible={modalVisible} onClose={handleCloseModal} />
                <ModalNegativo visible={modalNegativoVisible} onClose={handleCloseModal} />
            </LinearGradient>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: 'center',
      },
    logoText: {
        color: 'white',
        fontSize: Dimensions.get('window').width*0.15,
        textAlign: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
      },
    
});

export default LandingInicioEscaneo;
