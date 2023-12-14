import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Datos guardados correctamente.');
  } catch (error) {
    console.log('Error al guardar los datos:', error);
  }
};

const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // Los datos existen, puedes hacer algo con ellos
      console.log('Datos recuperados:', value);
      return 'ASDADS';
    } else {
      // Los datos no existen
      console.log('No se encontraron datos.');
    }
  } catch (error) {
    console.log('Error al recuperar los datos:', error);
  }
};

const removeData = async (key) => {
  try {
    await localStorage.removeItem(key);
    console.log('Datos eliminados correctamente.');
  } catch (error) {
    console.log('Error al eliminar los datos:', error);
  }
};

export { saveData, getData, removeData };