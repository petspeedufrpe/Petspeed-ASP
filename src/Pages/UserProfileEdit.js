import React,{useEffect,useState} from 'react';
import{
    Image,
    ImageBackground,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import api from '../services/api.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import reactotron from 'reactotron-react-native';


export default function Main({navigation}){
    const user = navigation.state.params;
    const [value,setValue] = useState('');
    reactotron.log(user);
    //const user = {pessoa:{id:1,name:'Caio',email:'teste@teste.com'}}
    const [nome, onChangeText] = useState(user!== undefined ? user.nome : "");
    const [email, setEmail] = useState(user !== undefined ? user.email: "");
    const [photo, setPhoto] = useState(AsyncStorage.getItem('foto')!== undefined ? AsyncStorage.getItem('foto') : null);
    const data = new FormData();

    const storeData = async (data)=>{
        try{
            await AsyncStorage.setItem('@storage_key',data)
        } catch(e){

        }
    }
const getMyValue = async () => {
  try {
    const value = await AsyncStorage.getItem('@MyApp_key');
    reactotron.log(value);
    setValue(value);
  } catch(e) {
    // read error
  }
}
useEffect(()=>{
    async ()=>{ await getMyValue()};
},[]);

    const validate = ()=>{
        if(nome === "" || email.length === "" ){
            return false;
        }
        return true;
    }
    const handleUpload =  ()=> {
        const options = {
            noData:true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if(response.uri){
                storeData(response.uri.toString());
                setPhoto(response);
            }
        })
    }
    const handleSave = async ()=>{
        if(validate()){
        data.append('name',nome);
        data.append('email',email);
        data.append('file',{
            photo
        });
        const config = {
            method: 'POST',
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'multipart/form-data',
            },
            body: data,
           };
        //const response = await api.post(`/usuario/posts/32`,config);
    }
    else{
        reactotron.log('toaq')
    }
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity 
            onPress={handleSave}
            style={
                {alignSelf:'flex-end',marginTop:10,position:'absolute'}
                }>
                    <Text style={{...styles.save,marginEnd:10}}>Salvar
                        </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{marginTop:25, alignSelf:'flex-start'}}
                onPress={handleUpload}>
                    {photo && (
                        <ImageBackground  borderRadius={100} source={photo.uri!== undefined ? {uri:photo.uri}:AsyncStorage.getItem('foto')}  style={styles.image}>
                            <Icon name={'plus'} size={25} style={{alignSelf:'center',paddingVertical:25}}></Icon>
                        </ImageBackground>
                    )}
                    {!photo && (
                        <ImageBackground source={require('../assets/logoApp.png')} style={styles.image}>
                        <Icon name={'plus'} size={25} style={{alignSelf:'center',paddingVertical:25}}></Icon>
                    </ImageBackground>
                    )}
            </TouchableOpacity>
            <Text style={styles.input}>Nome</Text>
            <TextInput
                placeholder= 'Não Pode Ficar em Branco'
                defaultValue={nome}
                onChangeText={text => onChangeText(text)}
                style={styles.textInput}
                underlineColorAndroid={'#fff'}>
            </TextInput>

            <Text style={styles.input}>Email</Text>
            <TextInput
                placeholder= 'Não Pode Ficar em Branco'
                defaultValue={email}
                onChangeText={email => setEmail(email)}
                style={styles.textInput}
                underlineColorAndroid={'#fff'}>
            </TextInput>
            <Text style={styles.input}>Endereço</Text>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <View style={{flex:10}}>
                    <TextInput
                        style={{backgroundColor:'transparent'}}
                        underlineColorAndroid={'#fff'}
                        placeholder={'Cadastre um endereço'} />
                </View>
                <View style={{flex:1}}>
                    <TouchableOpacity onPress={ () => navigation.navigate('AddressPicker') }>
                        <Icon name={'plus'} />
                    </TouchableOpacity>
                    </View>
            </View>
            
            <TouchableOpacity 
            style={styles.passwordChangeButton} 
            onPress={()=> navigation.navigate('EditPassword')}>
                <Text style={styles.input}>Alterar Senha</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#00b894'
    },
    image:{
        height:100,
        width:100,
        borderRadius:100,
        margin:8,
    },
    input:{
        fontSize:15,
        fontWeight:'bold',
        color:'#fff',
        margin:5
    },
    save:{
        fontSize:20,
        fontWeight:'bold',
        color:'#fff',
        
    },
    textInput: {
        fontSize: 15,
        marginTop:-12,
        color:'#fff',
      },
    passwordChangeButton:{
        alignContent:'center',
        alignSelf:'center',
        margin:25,
        borderColor:'#fff',
        borderWidth:1,
        borderRadius:20
    },
    plus:{
        position:'absolute',
        direction:'inherit',
        alignContent:'flex-end'
    }
})