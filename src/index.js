import React from 'react';
import Routes from './routes';
import {StatusBar, YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'componentWillReceiveProps',
  'componentWillMount',
]);

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#00A759">
        {' '}
      </StatusBar>
      <Routes />
    </>
  );
}
