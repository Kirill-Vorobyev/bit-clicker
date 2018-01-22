import React, { Component } from 'react';
import Layout from './containers/Layout';
import { CookiesProvider } from 'react-cookie';

const App = () => {
    return (
      <CookiesProvider>
        <Layout />
      </CookiesProvider>
    );
}

export default App;
