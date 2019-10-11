import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
  Image,
} from 'react-native';

import * as yup from 'yup';
import {Formik} from 'formik';

import api from '../services/api.js';

export default function AnimalRegister({navigation}) {
  const validationSchema = yup.object().shape({
    nome: yup
      .string()
      .label('Nome')
      .required('Favor preencher campo nome.'),
    idade: yup
      .string()
      .label('Idade')
      .required('Favor preencher campo idade'),

    peso: yup
      .number()
      .label('Peso')
      .required('Favor preencher o campo peso.'),
    raca: yup
      .string()
      .label('Raça')
      .required('Favor preencher o campo raça'),
  });

  async function handleRegister(values) {
    try {
      const response = api.post('/animal/cadastrarAnimal', values);
      navigation.navigate('Petlist');
    } catch (e) {
      console.log(e.message);
    }
  }
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          nome: '',
          peso: '',
          nascimento: '',
          raca: '',
          idPessoa: navigation.state.params.id,
        }}
        onSubmit={async (values, actions) => {
          const resp = await handleRegister(values); //gambiarra para pegar o valor de quando nao loga
          if (resp) {
            ToastAndroid.show(resp, ToastAndroid.SHORT);
          }
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}>
        {props => (
          <>
            <Image
              source={require('../assets/petspeed-logo-text.png')}
              resizeMode="center"
            />
            <TextInput
              placeholder="Digite o nome do seu pet"
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('nome')}
              blurOnSubmit={false}
              onSubmitEditing={() => this.cpfRef.focus()} // chama o focus para o proximo
              onBlur={props.handleBlur('nome')}
            />
            <Text style={{color: 'red'}}>
              {props.touched.nome && props.errors.nome}
            </Text>

            <TextInput
              placeholder="Digite o peso do seu pet"
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('peso')}
              blurOnSubmit={false}
              keyboardType="numeric"
              onSubmitEditing={() => this.idadeRef.focus()} // chama o focus para o proximo
              onBlur={props.handleBlur('peso')}
              ref={ref => (this.pesoRef = ref)}
            />
            <Text style={{color: 'red'}}>
              {props.touched.peso && props.errors.peso}
            </Text>
            <TextInput
              placeholder="Digite a idade do seu pet"
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('idade')}
              blurOnSubmit={false}
              onSubmitEditing={() => this.racaRef.focus()} // chama o focus para o proximo
              keyboardType="idade"
              onBlur={props.handleBlur('idade')}
              ref={ref => (this.idadeRef = ref)}
            />
            <Text style={{color: 'red'}}>
              {props.touched.nascimento && props.errors.nascimento}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={props.handleChange('raca')}
              onBlur={props.handleBlur('raca')}
              placeholder="Digite a raça do seu pet"
              secureTextEntry={false}
              ref={ref => (this.racaRef = ref)} //cria uma referencia desse input
            />
            <Text style={{color: 'red'}}>
              {props.touched.raca && props.errors.raca}
            </Text>
            {props.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar Pet</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#00b894',
  },
  input: {
    alignSelf: 'stretch',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: '#FAFAF2',
    marginVertical: 10,
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 40,
    marginVertical: 25,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Cochin',
    textAlign: 'center',
    color: '#FAFAF2',
    alignContent: 'center',
    fontWeight: 'bold',
  },
  text: {
    borderStartWidth: 0,
    marginBottom: -20,
    fontSize: 12,
  },
  textTitle: {
    fontSize: 35,
    color: 'white',
    padding: 10,
    fontFamily: 'helvica',
  },
  passordRecoverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alternativeMessage: {
    marginTop: 40,
    marginBottom: 20,
  },
});
