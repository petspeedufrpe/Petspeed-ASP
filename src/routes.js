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
import VetMain from './Pages/VetMain';
import AnimalRegister from './Pages/AnimalRegister';
import AddressPicker from './Pages/AddressPicker';
import VetOrderCard from './components/VetOrderCard';
import UserProfileEdit from './Pages/UserProfileEdit'
import EditPassword from './Pages/EditPassword';
const MainNavigator = createStackNavigator(
  {
    Login,
    VetOrderCard,
    AddressPicker,
    VetMain,
    Main,
    AnimalRegister,
    VetRegister,
    UserRegister,
    UserProfile,
    AddressForm,
    RegistrationType,
    PetList,
    UserProfileEdit,
    EditPassword,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
export default createAppContainer(MainNavigator);
