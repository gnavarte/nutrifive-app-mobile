import React from 'react';
import { Dimensions, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BotonDetalles = ({ onPress, title }) => (
  <TouchableOpacity
    style={styles.button}
    onPress={onPress}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#55BB72',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: Dimensions.get('window').width*0.08,
  },
});

export default BotonDetalles;
