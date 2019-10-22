import React from 'react';
import { 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import api from '../services/api';

export default function MedicMarkerCard({navigation}) {
    const medico = navigation.state.params;
  return (
    <View style={Styles.cardContainer} >
        <Text>{`Nome: ${medico.nome}`} </Text>
        <Text>{`CRMV: ${medico.crmv}`} </Text>
        <Text>{`Endereço: ${medico.endereco}`} </Text>
        <View style={{alignContent:'space-between'}}>
            <TouchableOpacity><Text style={styles.cancel}>Cancelar</Text></TouchableOpacity>
            <TouchableOpacity onPress={navigation.navigate('AnimalSelect',medico)}
            >
                <Text style={styles.confirm} >Agendar</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
        backgroundColor: '#e3e3e3',
        borderRadius: 8,
        overflow: 'hidden',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 4,
        borderColor: '#c2c2c2',
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: {x: 0, y: 0},
        shadowRadius: 15,
    },
    confirm:{
        fontSize:15,
        color:'green'
    },
    cancel:{
        fontSize:15,
        color:'red',
    },
})
