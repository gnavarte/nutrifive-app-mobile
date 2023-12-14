import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!checked);
  };

  return (
    <TouchableOpacity
      style={[styles.checkboxContainer, checked && styles.checkboxChecked]}
      onPress={handleCheckboxToggle}
    >
      {checked && (
        <Image
            source={{ uri: 'https://res.cloudinary.com/dgvlsnajj/image/upload/v1684896172/image_12_jduutw.png' }}
          style={styles.logo}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'black',
  },
  logo: {
    width: 16,
    height: 16,
  },
});

export default Checkbox;
