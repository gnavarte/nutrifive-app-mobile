import React from 'react';
import { Dimensions, Alert, Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Boton from '../botones/boton';
import BotonC from '../botones/botonCierre';
import closeB from '../../../assets/ModalNegativo.png'
import sadFace from '../../../assets/sadFace.png'

const ModalNegativo = ({ visible, onClose, additionalText }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.messageText}>No es apto para tu régimen</Text>
          <Image source={sadFace} style={styles.imagen} resizeMode="contain" />
          {additionalText && <Text style={styles.additionalText}>{additionalText}</Text>}
          <View style={styles.buttonContainer}></View>
          <BotonC source={closeB} styleB={styles.botonClose} onPress={onClose} />
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
    backgroundColor: '#E24444',
    width: '85%',
    height: '90%',
    padding: 20,
    borderRadius: 10,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: Dimensions.get('window').width*0.1,
    textAlign: 'center',
    backgroundColor: '#C86262',
    borderRadius: 20,
  },
  additionalText: {
    color: '#FFFFFF',
    fontSize: Dimensions.get('window').width*0.1,
    textAlign: 'center',
    backgroundColor: '#C86262',
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
    marginTop: '10%'
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

export default ModalNegativo;