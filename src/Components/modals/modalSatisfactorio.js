import React from 'react';
import { Dimensions, Alert, Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BotonDetalle from '../botones/botonDetalles';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import BotonC from '../botones/botonCierre';
import closeB from '../../../assets/ModalSatisfactorio.png';
import happyFace from '../../../assets/happyFace.png'

const modalSatisfactorio = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const verRecetas = () => {
    navigation.push('Navegador');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.messageText}>Es apto para tu régimen</Text>
          <Image source={happyFace} style={styles.image} resizeMode="contain"/>
          <View style={styles.buttonContainer}>

            
            <BotonDetalle title="Ver Recetas" onPress={verRecetas} />
            
          </View>

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
    backgroundColor: '#44E25D',
    width: '85%',
    height: '90%',
    padding: 20,
    borderRadius: 10,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: Dimensions.get('window').width * 0.1,
    textAlign: 'center',
    backgroundColor: '#62C872',
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
    fontSize: Dimensions.get('window').width * 0.1,
    alignSelf: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.3,
    height: Dimensions.get('window').width * 0.3,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default modalSatisfactorio;
