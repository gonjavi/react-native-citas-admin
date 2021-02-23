import React, { useState} from 'react';
import { Text, StyleSheet, View, FlatList, TouchableHighlight,  TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';

const App = () => {
  const [mostrarform, guardarMostrarForm] = useState(false);

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

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarform);
  }

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.title}>Administrador Citas</Text>

        <View>
          <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
          <Text style={styles.textoMostrarForm}>{mostrarform ? 'Cancelar Cita' : 'Crear Nueva Cita' }</Text>
          </TouchableHighlight>
        </View>

      <View style={styles.contenido}>
        { mostrarform ? (
          <>
          <Text style={styles.title}>Crear Nueva Cita</Text>
            <Formulario
              citas={citas}
              setCitas={setCitas}
              guardarMostrarForm={guardarMostrarForm}
            />
          </>
        ) : (
          <>
            <Text style={styles.title}>{citas.length > 0 ? 'Adminstra tus citas' : 'No hay citas'}</Text>
            <FlatList
              style={styles.listado}
              data={citas}
              keyExtractor={ cita => cita.id }
              renderItem={({item}) => <Cita cita={item} eliminarPaciente={eliminarPaciente} />    }
            /> 
          </>
        )}
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
  
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#aa076b',
    flex: 1
  },
  title: {
    color: '#fff',
    marginTop: Platform === 'ios' ? 40 : 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%'
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default App;
