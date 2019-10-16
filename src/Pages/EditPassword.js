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
    const [oldPasswd, setOldPasswd] = useState('');
    const [newPasswd, setNewPasswd] = useState('');
    const [cnfPasswd, setCnfPasswd] = useState('');
    const [flag,setFlag] = useState(false);
    const [data,setData] = useState({});

    const validate = () => {
        if(
            oldPasswd !== '' 
            && 
            newPasswd !== ''
            &&
            cnfPasswd !== ''){
                if(newPasswd === cnfPasswd){
                    setFlag(true);
                    setData({oldPasswd,newPasswd,cnfPasswd})
                }
            }
    }

    const handleSubmit = async()=> { 
        setFlag(validate);
        if(flag){
            try{
                const response = await api.post('/usuario/editSenha/',data);
                reactotron.log(response);
            }
            catch(e){
                reactotron.log(e);
            }
        }
    }

    return(
        <View>
            <Text>Senha antiga</Text>
            <TextInput onChangeText={text => setOldPasswd(text)}></TextInput>
            <Text>Nova Senha</Text>
            <TextInput onChangeText={text => setNewPasswd(text)}></TextInput>
            <Text>Confirmar senha</Text>
            <TextInput onChange ={text => setCnfPasswd(text)}></TextInput>

            <TouchableOpacity onPress={handleSubmit}><Text>Confirmar Alteralção</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    }
})