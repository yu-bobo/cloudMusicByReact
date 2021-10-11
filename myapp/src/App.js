import React from 'react';
import './App.css';
import TxTabs from './commponent/Tabs'
import logo from '@/assets/images/logo.png'

function App() {
    return (
        //模块化设置多个类名
        <div className='content'>
            <div className='top'>
                <div className='content-box'>
                    <div><img src={logo} style={{width: '30px', height: '30px',}}/><p>网 抑 云 音 乐</p></div>
                    <div>下载APP</div>
                </div>
            </div>
            <TxTabs/>
        </div>
    );
}

export default App;
