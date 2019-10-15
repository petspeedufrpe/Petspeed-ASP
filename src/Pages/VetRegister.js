import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  Image,
} from 'react-native';

import * as yup from 'yup';
import {Formik} from 'formik';

export default function Register({navigation}) {
  const validationSchema = yup.object().shape({
    nome: yup
      .string()
      .label('Nome')
      .required('Favor preencher campo nome.'),
    localcrmv: yup
      .string()
      .label('Localcrmv')
      .required('Favor preencher campo região do CRMV.'),
    cpf: yup
      .number()
      .label('CPF')
      .required('Favor preencher campo cpf'),
    crmv: yup
      .number()
      .label('CRMV')
      .required('Favor preencher campo CRMV'),
    telefone: yup
      .number()
      .label('Telefone')
      .required('Favor preencher campo telefone'),
    email: yup
      .string()
      .label('Email')
      .email('Favor digitar um email válido.')
      .required('Favor preencher o campo email.'),
    senha: yup
      .string()
      .label('Senha')
      .required('Favor preencher o campo senha'),
  });

  return (
    <View Style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Formik
          initialValues={{
            nome: '',
            cpf: '',
            crmv: '',
            email: '',
            senha: '',
            localcrmv: '',
            telefone: '',
          }}
          onSubmit={(values, actions) => {
            values.email = values.email.toLowerCase();
            navigation.navigate('AddressPicker', {
              ...values,
              fromVetRegister: true,
            });
          }}
          validationSchema={validationSchema}>
          {props => (
            <>
              <Image
                source={require('../assets/petspeed-logo-text.png')}
                resizeMode="center"
              />
              <TextInput
                placeholder="Digite seu nome"
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
                placeholder="Digite seu CPF"
                style={styles.input}
                returnKeyType={'next'}
                onChangeText={props.handleChange('cpf')}
                keyboardType="numeric"
                blurOnSubmit={false}
                onSubmitEditing={() => this.crmvRef.focus()} // chama o focus para o proximo
                onBlur={props.handleBlur('cpf')}
                ref={ref => (this.cpfRef = ref)}
              />
              <Text style={{color: 'red'}}>
                {props.touched.cpf && props.errors.cpf}
              </Text>

              <TextInput
                placeholder="Digite seu CRMV"
                style={styles.input}
                returnKeyType={'next'}
                keyboardType="numeric"
                onChangeText={props.handleChange('crmv')}
                blurOnSubmit={false}
                onSubmitEditing={() => this.localcrmvRef.focus()} // chama o focus para o proximo
                onBlur={props.handleBlur('crmv')}
                ref={ref => (this.crmvRef = ref)}
              />
              <Text style={{color: 'red'}}>
                {props.touched.crmv && props.errors.crmv}
              </Text>

              <TextInput
                placeholder="Informe o estado do seu CRMV"
                style={styles.input}
                returnKeyType={'next'}
                onChangeText={props.handleChange('localcrmv')}
                blurOnSubmit={false}
                onSubmitEditing={() => this.telefoneRef.focus()} // chama o focus para o proximo
                onBlur={props.handleBlur('localcrmv')}
                ref={ref => (this.localcrmvRef = ref)}
              />
              <Text style={{color: 'red'}}>
                {props.touched.localcrmv && props.errors.localcrmv}
              </Text>

              <TextInput
                placeholder="Digite seu telefone"
                style={styles.input}
                returnKeyType={'next'}
                keyboardType="numeric"
                onChangeText={props.handleChange('telefone')}
                blurOnSubmit={false}
                onSubmitEditing={() => this.emailRef.focus()} // chama o focus para o proximo
                onBlur={props.handleBlur('telefone')}
                ref={ref => (this.telefoneRef = ref)}
              />
              <Text style={{color: 'red'}}>
                {props.touched.telefone && props.errors.telefone}
              </Text>

              <TextInput
                placeholder="Digite seu e-mail"
                style={styles.input}
                returnKeyType={'next'}
                autoCapitalize="none"
                onChangeText={props.handleChange('email')}
                blurOnSubmit={false}
                onSubmitEditing={() => this.passwordRef.focus()} // chama o focus para o proximo
                keyboardType="email-address"
                onBlur={props.handleBlur('email')}
                ref={ref => (this.emailRef = ref)}
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
                  <Text style={styles.buttonText}>Cadastrar Endereço</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
//arrumar style
const styles = StyleSheet.create({
  cntainer: {
    flex: 1,
  },
  scrollView: {
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
    marginVertical: 3,
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 40,
    marginVertical: 25,
    marginHorizontal: 20,
    marginBottom: 20,
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
