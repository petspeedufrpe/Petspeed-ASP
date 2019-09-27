import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Pages/Login';
import Main from './Pages/Main';
import RegistrationType from './Pages/RegistrationType';
import AddressForm from './Pages/AddressForm';
import UserRegister from './Pages/UserRegister';
import VetRegister from './Pages/VetRegister';
const MainNavigator = createStackNavigator(
  {
    Login,
    VetRegister,
    UserRegister,
    AddressForm,
    RegistrationType,
    Main,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
export default createAppContainer(MainNavigator);
