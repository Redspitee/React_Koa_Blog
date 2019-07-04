import React, { PureComponent } from 'react';

import musicpic from './music.png';
import './music.less';
const bgmp3 = require('./bgm.mp3');

export interface Props{
}
export interface State{
  play: boolean
}
class Music extends PureComponent<Props,State>{
  constructor(props: Props){
    super(props);
    this.state = {
      play: true
    };
    this.changePlay = this.changePlay.bind(this);
  }
  changePlay(){
    const mybgm = this.refs["mybgm"] as any;
    // 如果音乐暂停就播放否则暂停
    mybgm.paused ? mybgm.play() : mybgm.pause();
    this.setState({
      play: !this.state.play
    });
  }
  render(){
    const {play} = this.state;
    return(
      <div 
        className={`musicPic ${ play ? "rotate" : ""}`}
        onClick={this.changePlay} 
        >
        <img src={musicpic} alt="music" />
        <audio src={bgmp3} autoPlay={play} loop hidden ref="mybgm" />
      </div>
    )
  }
}

export default Music;