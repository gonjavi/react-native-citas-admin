import React, { useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({ citas, setCitas, guardarMostrarForm, guardarCitasStorage }) => {
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardartelefono] = useState('');
  const [fecha, guargarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [sintomas, guardarSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    const opciones = { year: 'numeric', month: 'long', day: '2-digit' }
    guargarFecha(date.toLocaleString('es-ES', opciones));  
    hideDatePicker();  
  };

  // time picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = hora => {
    const opciones = { hour: 'numeric', minute: '2-digit'}
    guardarHora(hora.toLocaleString('en-US', opciones));
    hideTimePicker();
  };

  const crearNuevaCita = () => {
    if (paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' || 
      fecha.trim() === '' || 
      hora.trim() === '' ||
      sintomas.trim() === '') {
        mostrarAlerta();

        return;
      }

      // crear una nueva cita
      const cita = { paciente, propietario, telefono, fecha, hora, sintomas };

      cita.id = shortid.generate();
       
      // agregar al estado
      const citasNuevo = [...citas, cita];
      setCitas(citasNuevo);

      // pasar las nuevas citas
      guardarCitasStorage(JSON.stringify(citasNuevo)); // stringify para pasar objeto a string

      //ocultar form
      guardarMostrarForm(false);

  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //titulo
      'Todos los cmapos son obligatorios', //mensaje
      [{
        texto: 'OK'  // arreglo de botones
      }]
    )
  }

 return (
   <>
    <ScrollView style={styles.formulario}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <TextInput
          style={styles.input}
          onChangeText={texto => guardarPaciente(texto)}
        />
      </View>
      <View>
        <Text style={styles.label}>Propietario:</Text>
        <TextInput
          style={styles.input}
          onChangeText={texto => guardarPropietario(texto)}
          
        />
      </View>
      <View>
        <Text style={styles.label}>Teléfono Contacto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={texto => guardartelefono(texto)}
          
        />
      </View>

      <View>
      <Text style={styles.label}>Fecha:</Text>
        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale='es_Es' // para español para ios
            headerTextIOS="Selecciona la fecha"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirm"
        />
        <Text>{fecha}</Text>
      </View>

      <View>
        <Text style={styles.label}>Hora</Text>
        <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale='es_Es' // para español
            headerTextIOS="Seleciona una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirm"
        />
        <Text>{hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas:</Text>
        <TextInput
          multiline
          style={styles.input}
          onChangeText={texto => guardarSintomas(texto)}
        />
      </View>

      <View>
        <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
          <Text style={styles.textoSubmit}>Crear Niev Cita</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  btnSubmit: {
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
  },
  textoSubmit: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
export default Formulario;
