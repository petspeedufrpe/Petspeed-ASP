import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Switch,TouchableOpacity } from 'react-native';
import reactotron from 'reactotron-react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


class InterestsList extends Component {
  constructor() {
    super();
    this.state = {
       listKeys: [
      {key: 'Vomito', bool : false},
      {key: 'Diarreia', bool : false},
      {key: 'Desidratacao', bool : false},
      {key: 'Febre', bool : false},
      {key: 'Letargia', bool : false},
      {key: 'Olhos vermelhos', bool : false},
      {key: 'Tosse', bool : false},
      {key: 'Dor abdominal', bool : false},
      {key: 'Paralisia', bool : false},
      {key: 'Excesso de urina', bool : false},
      {key: 'Mandíbula caida', bool : false},
      {key: 'Indisposição', bool : false},
      {key: 'Nauseas', bool : false},
      {key: 'Sede Excessiva', bool : false},
      {key: 'Aagressividade', bool : false},
    ],
    data:[{

    }]
    }
  }
  setSwitchValue = (val, ind) => {
      const tempData = JSON.parse(JSON.stringify(this.state.listKeys));
      tempData[ind].bool = val;
      this.setState({ listKeys: tempData });
      reactotron.log(this.state.listKeys)
  }

  handleSubmit = () => {    
      const {user,medico,animal} = this.props.navigation.state.params
      let symptoms = []
      this.state.listKeys.map(({key,bool})=> {
          if(bool){
              symptoms.push(key)
          }
      })
      let os = {
        user,
        medico,
        animal,
        symptoms
    }
      this.props.navigation.navigate('ordemServico', os);

  }

  listItem = ({item, index}) => (
      <>
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.item}>{item.key} </Text>
      <Switch
        trackColor={{true:'red'}}
        thumbColor={'#fff'}
        onValueChange={(value) => this.setSwitchValue(value, index)}
        value={item.bool}
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
              this.handleSubmit();
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