import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Switch,TouchableOpacity } from 'react-native';
import reactotron from 'reactotron-react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


class InterestsList extends Component {
  constructor() {
    super();
    this.state = {
       listKeys: [
      {key: 'Vomito', switch : false},
      {key: 'Diarreia', switch : false},
      {key: 'Desidratacao', switch : false},
      {key: 'Febre', switch : false},
      {key: 'Letargia', switch : false},
      {key: 'Olhos vermelhos', switch : false},
      {key: 'Tosse', switch : false},
      {key: 'Dor abdominal', switch : false},
      {key: 'Paralisia', switch : false},
      {key: 'Excesso de urina', switch : false},
      {key: 'Mandíbula caida', switch : false},
      {key: 'Indisposição', switch : false},
      {key: 'Nauseas', switch : false},
      {key: 'Sede Excessiva', switch : false},
      {key: 'Aagressividade', switch : false},
    ]
    }
  }

  setSwitchValue = (val, ind) => {
      const tempData = JSON.parse(JSON.stringify(this.state.listKeys));
      tempData[ind].switch = val;
      this.setState({ listKeys: tempData });
  }

  listItem = ({item, index}) => (
      <>
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.item}>{item.key} </Text>
      <Switch
        trackColor={{true:'red'}}
        thumbColor={'#fff'}
        onValueChange={(value) => this.setSwitchValue(value, index)}
        value={item.switch}
      />
    </View>
    <View style={{borderColor:'#efe',borderWidth:0.5}} />
    </>
    );

  render() {
    return (
        <View style={styles.container}>
      <FlatList
        data={this.state.listKeys}
        renderItem={this.listItem}
      />
      <View>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            navigation.navigate('AnimalRegister', navigation.state.params);
          }}>
          <Icon name={'arrow-circle-right'} size={50} />
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 10,
   paddingTop: 22,
   backgroundColor:'#00b894'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color:'#fff'
  },
  fab:{
    //borderWidth: 1,
    //borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 45,
    height: 70,
    //backgroundColor: '#fff',
    borderRadius: 100,
  }
})

export default InterestsList;