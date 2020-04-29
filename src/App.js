import React from 'react';

import './styles.css';
import Header from './components/Header';
import Main from './pages/Main/index';

const App = ()=>(
    <div className="App">
      <Header />
      <Main />
    </div>
  );

export default App;
