import React,{useState,useEffect}from 'react';
import {
  View, 
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator, 
  ToastAndroid,
} from 'react-native';

import * as yup from 'yup';
import {Formik} from 'formik';

import api from '../services/api.js';

export default Login = ({navigation}) =>{

  [stateLogin, setStateLogin] = useState(false);
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .label('Email')
      .email('Favor digitar um email válido.')
      .required('Favor preencher o campo email.'),
    senha: yup
      .string()
      .label('Senha')
      .required('Favor preencher o campo senha')
  });
  
        handleLogin = async (values) =>{  
         try{
           const response = await api.post('/cliente/login',values);
           const {id} =  response.data;
           if (response.status === 200) {
             navigation.navigate('Main',{data:{id}})
           }
          }
          catch(error){
            return JSON.stringify(error.response.data.message);//gambiarra pra retornar a message de quando n looga
          }
        }
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <Formik initialValues={{email:'',senha:''}} onSubmit={async (values,actions)=>{
        resp = await handleLogin(values) //gambiarra para pegar o valor de quando nao loga
        if(resp){
          ToastAndroid.show(resp,
          ToastAndroid.SHORT)
        }
        setTimeout(()=>{
          actions.setSubmitting(false);
        },1000)
      }}
      validationSchema={validationSchema}
      >
        {props =>(
          <>
          <Image 
        source={require('../assets/petspeed-logo-text.png')}resizeMode='center'>
      </Image>
      <TextInput
        placeholder="Digite seu e-mail"
        style={styles.input}
        returnKeyType={ "next" }
        onChangeText={props.handleChange('email')}
        blurOnSubmit={false}
        onSubmitEditing={()=>this.passwordRef.focus()} // chama o focus para o proximo 
        keyboardType='email-address'
        onBlur={props.handleBlur('email')}
      />
      <Text style={{ color: 'red' }}>
              {props.touched.email && props.errors.email}
            </Text>
    <TextInput 
    style={styles.input}
    onChangeText={props.handleChange('senha')}
    onBlur={props.handleBlur('senha')}
    placeholder="Senha"
    secureTextEntry={true}
    ref={ref => this.passwordRef = ref} //cria uma referencia desse input   
    />
    <Text style={{ color: 'red' }}>
              {props.touched.senha && props.errors.senha}
            </Text>
    {props.isSubmitting ? (
      <ActivityIndicator />
    ): (
      <TouchableOpacity 
      style={styles.button}
      onPress={props.handleSubmit}
       >
      <Text 
        style={styles.buttonText}>
            LOGIN
      </Text>
    </TouchableOpacity>
    )}
    <TouchableOpacity>
      <Text>
        Novo por aqui? Inscreva-se agora.
      </Text>
      </TouchableOpacity>
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{marginTop:40,marginBottom:20}}>
          ___________________OU___________________
          </Text>
        <TouchableOpacity style={{justifyContent:'center',alignContent:'center'}}>
          <Text>
            Esqueci Minha Senha.
          </Text>
        </TouchableOpacity>
      </View>
    </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  )
    }


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'#00b894',
  },
  input:{
    alignSelf:'stretch',    
    borderRadius:5,
    fontSize:16,
    backgroundColor:'#FAFAF2',
    marginVertical:10,
  },
  button:{
    alignSelf:'stretch',
    justifyContent:'center',
    height:40,
    marginVertical:25,
    marginHorizontal:20,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#fff' 
  },
  buttonText:{
    fontSize:20,
    fontFamily:'Cochin',
    textAlign:'center',
    color:'#FAFAF2',
    fontStyle:'italic',
    alignContent:'center',
    fontWeight:'bold'
  },
  text:{
    borderStartWidth:0,
    marginBottom:-20,
    fontSize:12,
  },
})
