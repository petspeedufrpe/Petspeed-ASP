import React, {useState,useEffect} from 'react';

import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';

import api from '../services/api';
import reactotron from 'reactotron-react-native';

export default function({navigation}){
    const user = navigation.state.params
    const {idUsuario}= user;
    const [oldPasswd, setOldPasswd] = useState('');
    const [newPasswd, setNewPasswd] = useState('');
    const [confPass, setConfPass] = useState('');
    let data = {};

    reactotron.log(confPass)
    const handleSubmit = async ()=>{
        if(oldPasswd === '' || newPasswd === '' || confPass === ''){
            reactotron.log('vazio')
            setData(null)
            return false;
        }
        else if(newPasswd === confPass){
            data = {id:idUsuario,senhaAntiga:oldPasswd,senhaNova:newPasswd}
            try{
               const response = await api.put('/usuario/alterarSenha',data);
                if(response.status === 200){
                    navigation.navigate('Main',navigation.state.params);
                }
            }
            catch(e){
                reactotron.log(e);
            }
        }
    }
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Senha antiga</Text>
            <TextInput secureTextEntry={true} style={styles.input} onChangeText={text => setOldPasswd(text)}></TextInput>
            <Text style={styles.text}>Nova Senha</Text>
            <TextInput secureTextEntry={true} style={styles.input} onChangeText={text => setNewPasswd(text)}></TextInput>
            <Text style={styles.text}>Confirmar senha</Text>
            <TextInput secureTextEntry={true} style={styles.input} onChangeText ={text => setConfPass(text)}></TextInput>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.textButton} >CONFIRMAR</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#00b894'
    },
    text:{
        fontSize:15,
        fontWeight:'bold',
        color:'#fff'
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
      textButton:{
          alignSelf:'center',
          fontSize:15,
          fontWeight:'bold',
          color:'#fff'}
})