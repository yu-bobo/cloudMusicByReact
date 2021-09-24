import React from 'react';
import './App.css';
import TxTabs from './commponent/Tabs'
import couldMusic from './assets/images/couldMusic.png'

function App() {
    return (
        //模块化设置多个类名
        <div className='content'>
            <div className='top'>
                <div className='content-box'>
                    <div>网 抑 云 音 乐</div>
                    <div>下载APP</div>
                </div>
            </div>
            <TxTabs></TxTabs>
        </div>
    );
}

export default App;
