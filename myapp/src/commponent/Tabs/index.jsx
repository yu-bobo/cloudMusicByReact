import React from 'react';
import { Tabs  } from 'antd-mobile';
import './reset.css'
import PlayList from '../Playlist/index'
import TopMusic from '../HotMusic/index'
const tabs = [
  { title: '推荐音乐' },
  { title: '热歌榜' },
  { title: '搜索' },
];

export default class TxTabs extends React.Component {
  render() {
    return (
      <div>
        <Tabs tabs={tabs} initialPage={0} animated={true} useOnPan={false}>
          <div style={{display: 'flex', height:'100%', backgroundColor: '#fff' }}>
           {<PlayList/>}
      </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            {<TopMusic/>}
      </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#fff' }}>
            Content of third tab
      </div>
        </Tabs>
        
      </div>
    );
  }
}






