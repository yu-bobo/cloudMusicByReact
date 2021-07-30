import React from 'react';
import './App.css';
import TxTabs from './commponent/Tabs'
import couldMusic from './assets/images/couldMusic.png'
function App() {
  return (
    //模块化设置多个类名
    <div className='content'>
      <div className='top'>
        <img src={couldMusic}></img>
      </div>
      <TxTabs></TxTabs>
    </div>
  );
}

export default App;
