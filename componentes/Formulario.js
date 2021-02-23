import React, { useState} from 'react';
import { Text, StyleSheet, View, TextInput, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Formulario = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmarFecha = date => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  // time picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const confirmarHora = date => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

 return (
   <>
    <View style={styles.formulario}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => console.log(texto)}
          
        />
      </View>
      <View>
        <Text style={styles.label}>Propietario:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => console.log(texto)}
          
        />
      </View>
      <View>
        <Text style={styles.label}>Teléfono Contacto:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(texto) => console.log(texto)}
          
        />
      </View>

      <View>
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
      </View>

      <View>
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
      </View>
      <View>
        <Text style={styles.label}>Sintomas:</Text>
        <TextInput
          multiline
          style={styles.input}
          onChangeText={(texto) => console.log(texto)}
        />
      </View>
    </View>
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
  }
})
export default Formulario;
