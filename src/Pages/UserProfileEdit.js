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

import ImagePicker from 'react-native-image-picker';
import api from '../services/api.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import reactotron from 'reactotron-react-native';


export default function Main({navigation}){
    const user = {pessoa:{id:1,name:'Caio',email:'teste@teste.com'}}
    const [nome, onChangeText] = useState(user.pessoa.name);
    const [email, setEmail] = useState(user.pessoa.email);
    const [photo, setPhoto] = useState(null);
    const data = new FormData();

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
                setPhoto(response);
            }
        })
    }
    const handleSave = async ()=>{
        if(validate()){
        data.append('name',nome);
        data.append('email',email);
        data.append('fileData',{
            uri: photo.uri,
            type: photo.type,
            fileName: photo.fileName
        });
        const config = {
            method: 'POST',
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'multipart/form-data',
            },
            body: data,
           };
           reactotron.log(config.body);
        const response = await api.post(`/pessoa/editarpessoa/${user.pessoa.id}`,config
        );
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
                        <ImageBackground resizeMode='cover' borderRadius={100} source={{uri:photo.uri}} style={styles.image}>
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
                defaultValue={user.pessoa.name}
                onChangeText={text => onChangeText(text)}
                style={styles.textInput}
                underlineColorAndroid={'#fff'}>
            </TextInput>

            <Text style={styles.input}>Email</Text>
            <TextInput
                placeholder= 'Não Pode Ficar em Branco'
                defaultValue={user.pessoa.email}
                onChangeText={email => setEmail(email)}
                style={styles.textInput}
                underlineColorAndroid={'#fff'}>
                
            </TextInput>


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
        

    }
})
