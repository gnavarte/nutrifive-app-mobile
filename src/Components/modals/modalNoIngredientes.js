import React from 'react';
import { Dimensions, Alert, Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Boton from '../botones/boton';
import BotonC from '../botones/botonCierre';
import closeB from '../../../assets/ModalNeutro.png'
import neutFace from '../../../assets/neutFace.png'



const ModalNoIngredientes = ({ visible, onClose }) => {

    return (
        <Modal
          visible={visible}
          animationType="slide"
          transparent={true}
          onRequestClose={onClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.messageText}>No se encontraron Ingredientes</Text>
              <Image source={neutFace} style={styles.imagen} resizeMode="contain" />
              <View style={styles.buttonContainer}></View>
              <BotonC source={closeB} styleB={styles.botonClose} onPress={onClose}/>
              
            </View>
          </View>
        </Modal>
      );
    };
    
    const styles = StyleSheet.create({
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: '#C9A115',
        width: '85%',
        height: '90%',
        padding: 20,
        borderRadius: 10,
      },
      messageText: {
        color: '#FFFFFF',
        fontSize: Dimensions.get('window').width*0.1,
        textAlign: 'center',
        backgroundColor: '#C8A562',
        borderRadius: 20,
      },
      buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      botonClose: {
        alignSelf: 'center',
        
        width: 60,
        height: 60,
      },
      buttonText: {
        color: 'black',
        fontFamily: 'sans-serif',
        fontSize: Dimensions.get('window').width*0.1,
        alignSelf: 'center',
    
      },
      imagen: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        marginTop: 10,
        alignSelf: 'center',
      }
    });
    
    export default ModalNoIngredientes;