import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import * as yup from 'yup';
import {Formik} from 'formik';

import api from '../services/api.js';

export default function AddressForm({navigation}) {
  const validationSchema = yup.object().shape({
    cidade: yup
      .string()
      .label('Cidade')
      .required('Favor preencher o campo cidade.'),
    bairro: yup
      .string()
      .label('Bairro')
      .required('Favor preencher o campo bairro.'),
    logradouro: yup
      .string()
      .label('Logradouro')
      .required('Favor preencher o campo logradouro.'),
    numero: yup
      .number()
      .label('Numero')
      .required('Favor preencher o campo numero.'),
    cep: yup
      .number()
      .label('cep')
      .required('Favor preencher o campo CEP.'),
    complemento: yup
      .string()
      .label('Complemento')
      .required('Favor preencher o campo complemento.'),
  });

  async function handleAddress(values) {
    try {
      const response = await api.post('/pessoa/cadastrarEndereco', values);
      console.warn(response);
      if (response.status === 200) {
        navigation.navigate('Main', {data: {id}});
      }
    } catch (error) {
      return JSON.stringify(error.response.data.message); //gambiarra pra retornar a message de quando n looga
    }
  }

  return (
    <View style={styles.container} behavior="padding">
      <Formik
        initialValues={{
          cidade: '',
          bairro: '',
          logradouro: '',
          numero: '',
          complemento: '',
          cep: '',
        }}
        setFieldValue={{field: 'cep', value: '12421', shouldValidate: false}}
        onSubmit={async (values, actions) => {
          const resp = await handleAddress(values); //gambiarra para pegar o valor de quando nao loga
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
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('cep')}
              onBlur={props.handleBlur('cep')}
              onSubmitEditing={() => this.cidadeRef.focus()}
              placeholder="CEP"
              keyboardType="numeric"
              secureTextEntry={true}
              ref={ref => (this.cepRef = ref)} //cria uma referencia desse input
            />
            <Text style={{color: 'red'}}>
              {props.touched.cep && props.errors.cep}
            </Text>
            <TextInput
              placeholder="Cidade"
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('cidade')}
              blurOnSubmit={false}
              onSubmitEditing={() => this.bairroRef.focus()} // chama o focus para o proximo
              onBlur={props.handleBlur('cidade')}
              ref={ref => (this.cidadeRef = ref)}
            />
            <Text style={{color: 'red'}}>
              {props.touched.cidade && props.errors.cidade}
            </Text>
            <TextInput
              placeholder="Bairro"
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('bairro')}
              blurOnSubmit={false}
              onSubmitEditing={() => this.logradouroRef.focus()} // chama o focus para o proximo
              onBlur={props.handleBlur('bairro')}
              ref={ref => (this.bairroRef = ref)}
            />
            <Text style={{color: 'red'}}>
              {props.touched.bairro && props.errors.bairro}
            </Text>
            <TextInput
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('logradouro')}
              onSubmitEditing={() => this.numeroRef.focus()}
              onBlur={props.handleBlur('logradouro')}
              placeholder="Logradouro (Av. Agamenon Magalhães)"
              secureTextEntry={true}
              ref={ref => (this.logradouroRef = ref)} //cria uma referencia desse input
            />
            <Text style={{color: 'red'}}>
              {props.touched.logradouro && props.errors.logradouro}
            </Text>
            <TextInput
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('numero')}
              onBlur={props.handleBlur('numero')}
              onSubmitEditing={() => this.complementoRef.focus()}
              placeholder="Numero"
              keyboardType="numeric"
              secureTextEntry={true}
              ref={ref => (this.numeroRef = ref)} //cria uma referencia desse input
            />
            <Text style={{color: 'red'}}>
              {props.touched.numero && props.errors.numero}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={props.handleChange('complemento')}
              onBlur={props.handleBlur('complemento')}
              placeholder="Complemento (apartamento 601 , bloco C)"
              secureTextEntry={true}
              ref={ref => (this.complementoRef = ref)} //cria uma referencia desse input
            />
            <Text style={{color: 'red'}}>
              {props.touched.complemento && props.errors.complemento}
            </Text>
            {props.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}>
                <Text style={styles.buttonText}>CADASTRAR</Text>
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
    marginVertical: 5,
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
    fontStyle: 'italic',
    alignContent: 'center',
    fontWeight: 'bold',
  },
  text: {
    borderStartWidth: 0,
    marginBottom: -20,
    fontSize: 12,
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
  lostPasswordMessage: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});
