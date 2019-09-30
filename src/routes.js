import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Pages/Login';
import Main from './Pages/Main';
import RegistrationType from './Pages/RegistrationType';
import AddressForm from './Pages/AddressForm';
import UserRegister from './Pages/UserRegister';
import VetRegister from './Pages/VetRegister';
import UserProfile from './Pages/UserProfile';
import PetList from './Pages/PetList';
import AnimalRegister from './Pages/AnimalRegister'
const MainNavigator = createStackNavigator(
  {
    Login,
    AnimalRegister,
    VetRegister,
    UserRegister,
    UserProfile,
    AddressForm,
    RegistrationType,
    Main,
    PetList,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
export default createAppContainer(MainNavigator);
