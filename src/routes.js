import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Login from './Pages/Login';
import Formik from './Pages/Formik';
import Main from './Pages/Main';
const MainNavigator = createSwitchNavigator({
  Login,
  Main,
});
export default createAppContainer(MainNavigator);
