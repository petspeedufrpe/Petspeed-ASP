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
import reactotron from 'reactotron-react-native';

export default function OrdemServico({navigation}) {
  const validationSchema = yup.object().shape({
    descricao: yup
      .string()
      .label('descricao')
      //.required('Favor preencher a descrição'),
  });

  async function handleOrdemServico(values) {
    try {
      const response = await api.post('/ordemServico/criarOrdemServico', values);
      navigation.navigate('Main');
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          descricao: '',
          idMedico: '',
          idCliente: '',
          idAnimal: '',
          idtriagem: '',
          prioridade:'',
          status: "Em aguardo",
          //idPessoa: navigation.state.params.id,
        }}
        onSubmit={async (values, actions) => {
          const resp = await handleOrdemServico(values); //gambiarra para pegar o valor de quando nao loga
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
              placeholder="Descrição"
              style={styles.input}
              returnKeyType={'next'}
              onChangeText={props.handleChange('descricao')}
              blurOnSubmit={false}
              onBlur={props.handleBlur('descricao')}
            />
            <Text style={{color: 'red'}}>
              {props.touched.descricao && props.errors.descricao}
            </Text>

            {props.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={props.handleSubmit}>
                <Text style={styles.buttonText}>Cadastrar Ordem de Serviço</Text>
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
