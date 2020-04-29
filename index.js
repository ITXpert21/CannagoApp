/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import SigninPage from './src/pages/SigninPage';
import {name as appName} from './app.json';
import App from './App';


console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
