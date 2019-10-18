import React,{useState,useEffect} from 'react';
import { 
    View,Text,StyleSheet,TouchableOpacity,ImageBackground,TextInput
} from 'react-native';
import reactotron from 'reactotron-react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import api from '../services/api';
import ImagePicker from 'react-native-image-picker';


export default function Pages({navigation}) {
    const {id,nome:name,raca:raça,peso:weight,nascimento:birth} = navigation.state.params;
    const [nome,setNome] = useState(name === undefined ? "" : name);
    const [raca,setRaca] = useState(raça === undefined ? "" : raça);
    const [peso, setPeso] = useState(weight === undefined ? "" : weight);
    const [nascimento,setBirth] = useState(birth === undefined ? "" : birth);
    const [photo,setPhoto] = useState(undefined);

    const handleSave = async () => {
        const data = {nome,raca,peso,nascimento};
        reactotron.log(data);
        const response = api.put(`/animal/editarAnimal/${{idAnimal:id}}`,data);
        if(response === 200){
            console.warn('Alterado Com Sucesso!');
            navigation.goBack()
        }
    }
    const handleUpload = ()=>{
        const options = {
            noData:true,
        };

        ImagePicker.launchImageLibrary(options,response =>{
            if (response.uri) {
                setPhoto(response);
            }
        })
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
                defaultValue={name}
                onChangeText={text => setNome(text)}
                style={styles.textInput}
                underlineColorAndroid={'#fff'}>
            </TextInput>

            <Text style={styles.input}>raca</Text>
            <TextInput
                placeholder= 'Não Pode Ficar em Branco'
                defaultValue={raça}
                onChangeText={raca => setRaca(raca)}
                style={styles.textInput}
                underlineColorAndroid={'#fff'}>
            </TextInput>
            <Text style={styles.input}>peso</Text>
            <TextInput
                placeholder= 'Não Pode Ficar em Branco'
                defaultValue={weight.toString()}
                onChangeText={peso => setPeso(peso)}
                style={styles.textInput}
                underlineColorAndroid={'#fff'}></TextInput>
            
            <Text style={styles.input}>nascimento</Text>
            <TextInput
                placeholder= 'Não Pode Ficar em Branco'
                defaultValue={birth.toString()}
                onChangeText={nascimento => setBirth(nascimento)}
                style={styles.textInput}
                underlineColorAndroid={'#fff'}></TextInput>
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
