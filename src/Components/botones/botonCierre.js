import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const BotonCierre = ({ onPress, styleB, source }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={source} style = {styleB}/>
  </TouchableOpacity>
);

export default BotonCierre;