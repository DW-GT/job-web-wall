import '../styles/globals.css';
import {Provider} from 'react-redux';
import React from 'react';
import store from '../redux/store';


export default function MyApp({ Component, pageProps }) {


  return (
  <Component {...pageProps} />)
  ;
}
