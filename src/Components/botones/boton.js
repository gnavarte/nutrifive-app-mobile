import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Boton = ({ onPress, title, styleB, styleT }) => (
  <TouchableOpacity
    style = {styleB}
    onPress={onPress}
  >
    <Text style = {styleT}>{title}</Text>
  </TouchableOpacity>
);

/*const styles = StyleSheet.create({
  /* button: {
    backgroundColor: '#70FF59',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: "40%",
    height: 75,
    marginTop: "40%",
    marginLeft: "25%"
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  }, 
}); */

export default Boton;
