import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Pages/Login';
import Formik from './Pages/Formik';
import Main from './Pages/Main';
import RegistrationType from './Pages/RegistrationType';
import AddressForm from './Pages/AddressForm';
const MainNavigator = createStackNavigator(
  {
    Login,
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
