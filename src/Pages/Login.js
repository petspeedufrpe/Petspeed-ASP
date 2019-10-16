import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import * as yup from 'yup';
import {Formik} from 'formik';

import api from '../services/api.js';
import getRealm from '../services/realmConnection.js';

export default function Login({navigation}) {
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email('Favor digitar um email válido.')
      .required('Favor preencher o campo email.'),
    senha: yup
      .string()
      .label('Senha')
      .required('Favor preencher o campo senha.'),
  });

  async function handleLogin(values) {
    try {
      const response = await api.post('/usuario/login', values);
      if (response.status === 200) {
        const res = response.data;
        const {id, email, account} = res.user;
        const {token} = res;
        const data = {
          id,
          token,
          email,
        };
        try {
          const realm = await getRealm();
          realm.write(() => {
            realm.create('User', data, true);
          });
        } catch (e) {
          alert(e.message);
        }
        if (account === 'cliente') {
          navigation.navigate('Main', data);
        } else if (account === 'medico') {
          navigation.navigate('VetMain', data);
        }
      }
    } catch (error) {
      console.warn(error.message); //gambiarra pra retornar a message de quando n looga
    }
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{email: '', senha: ''}}
        onSubmit={async (values, actions) => {
          const resp = await handleLogin(values); //gambiarra para pegar o valor de quando nao loga
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
              placeholder="Digite seu e-mail"
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('email')}
              blurOnSubmit={false}
              onSubmitEditing={() => this.passwordRef.focus()} // chama o focus para o proximo
              keyboardType="email-address"
              onBlur={props.handleBlur('email')}
            />
            <Text style={{color: 'red'}}>
              {props.touched.email && props.errors.email}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={props.handleChange('senha')}
              onBlur={props.handleBlur('senha')}
              placeholder="Senha"
              secureTextEntry={true}
              ref={ref => (this.passwordRef = ref)} //cria uma referencia desse input
            />
            <Text style={{color: 'red'}}>
              {props.touched.senha && props.errors.senha}
            </Text>
            {props.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RegistrationType');
              }}>
              <Text style={styles.alternativeMessage}>
                Novo por aqui? Inscreva-se agora.
              </Text>
            </TouchableOpacity>
            <View style={styles.passwordRecoverContainer}>
              <Text style={styles.alternativeMessage}>
                ___________________OU___________________
              </Text>
              <TouchableOpacity
                onPress={() => {
                  //navigation.navigate('VetMain');
                }}>
                <Text
                  onPress={() => {
                    navigation.navigate('VetOrderCard');
                  }}
                  style={styles.lostPasswordMessage}>
                  Esqueci Minha Senha.
                </Text>
              </TouchableOpacity>
            </View>
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
    fontStyle: 'italic',
    alignContent: 'center',
    fontWeight: 'bold',
  },
  text: {
    borderStartWidth: 0,
    marginBottom: -20,
    fontSize: 12,
  },
  passwordRecoverContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alternativeMessage: {
    marginVertical: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
    textShadowColor: '#000',
  },
  lostPasswordMessage: {
    justifyContent: 'center',
    alignContent: 'center',
    marginVertical: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFF',
    textShadowColor: '#000',
  },
});
