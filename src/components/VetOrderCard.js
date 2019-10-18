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

const response = [
  {
    animal: {
      id: 2352,
      nome: 'Tchutxuba',
      raca: 'unknown',
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
        nome: 'Irineu VNSNEkkk',
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
    prioridade: 2,
    status: 'open',
    timestamp: 2019101521007,
    local: {
      latitude: -8.34534,
      longitude: -35.3543,
    },
    id: 144124,
  },
  {
    animal: {
      id: 2352,
      nome: 'Pitoco',
      raca: 'Pincher',
      peso: 0.234,
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
    prioridade: 1,
    status: 'open',
    timestamp: 2019101521007,
    local: {
      latitude: -8.522,
      longitude: -35.5323,
    },
    id: 245716,
  },
  {
    animal: {
      id: 2352,
      nome: 'doguinho',
      raca: 'pooddle',
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
        nome: 'Seu Zé',
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
        nome: 'Marciel andrade',
        cpf: 346346,
        idusuario: 4566,
      },
    },
    descricao: 'sadasdasd',
    sintomas: ['asadasd', 'fdgsgb', 'sdgsdgsdg', 'wetwet'],
    prioridade: 1,
    status: 'open',
    timestamp: 2019101521007,
    local: {
      latitude: -8.34534,
      longitude: -35.3543,
    },
    id: 83635,
  },
  {
    animal: {
      id: 2352,
      nome: 'Zambetão',
      raca: 'yorkshire',
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
        nome: 'Sansin Fausthanos',
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
        nome: 'Marciel andrade',
        cpf: 346346,
        idusuario: 4566,
      },
    },
    descricao: 'sadasdasd',
    sintomas: ['asadasd', 'fdgsgb', 'sdgsdgsdg', 'wetwet'],
    prioridade: 0,
    status: 'open',
    timestamp: 2019101521007,
    local: {
      latitude: -8.34534,
      longitude: -35.3543,
    },
    id: 83635,
  },
  {
    animal: {
      id: 2352,
      nome: 'Tiquin',
      raca: 'Não sei',
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
        nome: 'Michalelo Telófliflo',
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
        nome: 'Marciel andrade',
        cpf: 346346,
        idusuario: 4566,
      },
    },
    descricao: 'sadasdasd',
    sintomas: ['asadasd', 'fdgsgb', 'sdgsdgsdg', 'wetwet'],
    prioridade: 0,
    status: 'open',
    timestamp: 2019101521007,
    local: {
      latitude: -8.34534,
      longitude: -35.3543,
    },
    id: 83635,
  },
];

export default function VetOrderCard({navigation}) {
  const medico = navigation.state.params;
  const {email} = medico;
  return (
    <View style={{flex: 3}}>
      <View style={styles.container}>
        <Text
          style={{
            marginHorizontal: 10,
            alignSelf: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}>{`Olá ${email}, Estas são as suas ordens de serviço`}</Text>
      </View>
      <FlatList
        style={styles.list}
        data={response}
        keyExtractor={response => response.prioridade.toString()}
        renderItem={({item}) => (
          <View
            style={
              item.prioridade === 2
                ? {...styles.cardContainer, borderColor: '#f55'}
                : item.prioridade === 1
                ? {...styles.cardContainer, borderColor: '#00b098'}
                : styles.cardContainer
            }>
            {item.prioridade === 2 ? (
              <Text style={styles.priority}>EMERGÊNCIA</Text>
            ) : item.prioridade === 1 ? (
              <Text style={{...styles.priority, color: '#00b098'}}>
                PARA MIM
              </Text>
            ) : (
              <Text style={{...styles.priority, color: '#757171'}}>OUTROS</Text>
            )}
            <Text
              style={
                item.prioridade === 2
                  ? {...styles.petOwnerName, color: '#f55'}
                  : item.prioridade === 1
                  ? {...styles.petOwnerName, color: '#00b098'}
                  : styles.petOwnerName
              }>{`Nome do cliente: ${item.cliente.pessoa.nome}`}</Text>
            <View style={styles.animalContainer}>
              <Text
                style={
                  item.prioridade === 2
                    ? {...styles.animalInfoTitle, color: '#f55'}
                    : item.prioridade === 1
                    ? {...styles.animalInfoTitle, color: '#00b098'}
                    : styles.animalInfoTitle
                }>
                Dados do animal:
              </Text>
              <Text style={styles.animalInfo}>{`Nome do Animal: ${
                item.animal.nome
              }`}</Text>
              <Text style={styles.animalInfo}>{`Raça do animal: ${
                item.animal.raca
              }`}</Text>
              <Text style={styles.animalInfo}>{`Peso: ${
                item.animal.peso
              }Kg`}</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.symptomButton}>
                <Text
                  style={
                    item.prioridade === 2
                      ? {...styles.symptomButtonText, color: '#f55'}
                      : item.prioridade === 1
                      ? {...styles.symptomButtonText, color: '#00b098'}
                      : styles.symptomButtonText
                  }>
                  VER SINTOMAS
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity>
                <Text style={styles.declineButton}>
                  {item.prioridade === 2
                    ? 'OCULTAR'
                    : item.prioridade === 1
                    ? 'CANCELAR'
                    : 'DISPENSAR'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={
                    item.prioridade === 2
                      ? {...styles.acceptButton, backgroundColor: '#f55'}
                      : item.prioridade === 1
                      ? {...styles.acceptButton, backgroundColor: '#00b098'}
                      : styles.acceptButton
                  }>
                  ACEITAR
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    backgroundColor: '#139115',
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
