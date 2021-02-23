import React, { useState} from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import Cita from './componentes/Cita';

const App = () => {
  const [citas, setCitas] = useState([
    { id: '1', paciente: 'Hook', propietario: 'Juan', sintomas: 'No Come'},
    { id: '2', paciente: 'Redux', propietario: 'Itzel', sintomas: 'No Duerme'},
    { id: '3', paciente: 'Native', propietario: 'Josue', sintomas: 'No Conta'},
  ]);

  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.title}>Administrador Citas</Text>

      <Text style={styles.title}>{citas.length > 0 ? 'Adminstra tus citas' : 'No hay citas'}</Text>
      <FlatList
        data={citas}
        keyExtractor={ cita => cita.id }
        renderItem={({item}) => <Cita cita={item} eliminarPaciente={eliminarPaciente} />    }
      />    
    </View>
  );
};
  
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#aa076b',
    flex: 1
  },
  title: {
    color: '#fff',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  }
})
export default App;
