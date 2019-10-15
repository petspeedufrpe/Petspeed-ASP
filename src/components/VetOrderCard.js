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
  FlatList,
} from 'react-native';
import {List} from 'realm';
import {bold} from 'ansi-colors';
import {BOLD_WEIGHT} from 'jest-matcher-utils';

const response = {
  animal: {
    id: 2352,
    nome: 'adasd',
    raca: 'dadas',
    peso: 5.234,
    nascimento: 2017,
    foto: '4j35g3l4g63ç46h34lg623l5h35',
    idPessoa: 23,
  },
  cliente: {
    id: 2352,
    idusuario: 1232,
    idPessoa: 23,
    pessoa: {
      id: 1231,
      nome: 'Jose Arineu',
      cpf: 214125,
      idusuario: 123,
    },
  },

  medico: {
    id: 24124,
    cpf: 12414,
    crmv: 124124,
    estado: 'PE',
    pessoa: {
      id: 7457,
      nome: 'trhrth',
      cpf: 346346,
      idusuario: 4566,
    },
  },
  descricao: 'sadasdasd',
  sintomas: ['asadasd', 'fdgsgb', 'sdgsdgsdg', 'wetwet'],
  prioridade: 3,
};

export default function VetOrderCard() {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.priority}>PRIORIDADE ALTA</Text>
      <Text style={styles.petOwnerName}>{`Nome do cliente: ${
        response.cliente.pessoa.nome
      }`}</Text>
      <View style={styles.animalContainer}>
        <Text style={styles.animalInfoTitle}>Dados do animal:</Text>
        <Text style={styles.animalInfo}>{`Nome do Animal: ${
          response.animal.nome
        }`}</Text>
        <Text style={styles.animalInfo}>{`Raça do animal: ${
          response.animal.raca
        }`}</Text>
        <Text style={styles.animalInfo}>{`peso: ${response.animal.peso}`}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.symptomButton}>
          <Text style={styles.symptomButtonText}>VER SINTOMAS</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity>
          <Text style={styles.declineButton}>CANCELAR</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.acceptButton}>ACEITAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 15,
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
  priority: {
    color: '#f55f',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  buttonsContainer: {
    height: 30,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
    marginTop: 10,
    marginHorizontal: 5,
  },
  acceptButton: {
    backgroundColor: '#26ad28',
    fontSize: 18,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: '#ffff',
  },
  declineButton: {
    backgroundColor: '#ccc',
    fontSize: 18,
    borderRadius: 5,
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontWeight: 'bold',
    color: '#4d4d4d',
  },
  animalInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#26ad28',
    paddingStart: 20,
    marginBottom: 10,
  },
  animalInfo: {
    fontSize: 16,
    paddingStart: 30,
    lineHeight: 20,
  },
  petOwnerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#26ad28',
    paddingStart: 20,
    lineHeight: 30,
  },
  symptomButton: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  symptomButtonText: {
    paddingStart: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#139115',
  },
});
