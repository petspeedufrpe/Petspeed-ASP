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
import AnimalDetails from './Pages/AnimalDetails'
import AnimalSelect from './Pages/AnimalSelect'
import OrdemServico from './Pages/OrdemServico'
import SinptomsList from './Pages/SinptomsList';
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
    OrdemServico,
    RegistrationType,
    PetList,
    UserProfileEdit,
    EditPassword,
    AnimalDetails,
    AnimalSelect,
    SinptomsList,
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
  },
);
export default createAppContainer(MainNavigator);
