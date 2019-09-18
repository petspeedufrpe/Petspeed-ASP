import React from 'react';
import Routes from './routes';
import {StatusBar} from 'react-native';

export default function App() {
  return (
    <>
    <StatusBar barStyle='light-content' backgroundColor="#00A759"> </StatusBar>
     <Routes />
     </>
  );
}
