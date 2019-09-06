import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Login from './Pages/Login';
export default createAppContainer(
  createSwitchNavigator({
    Login,
  }),
);
