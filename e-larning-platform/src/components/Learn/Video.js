import React,{Component} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import "./player.css"


// // City
// import '@videojs/themes/dist/city/index.css';

// // Fantasy
// import '@videojs/themes/dist/fantasy/index.css';

// // Forest
// import '@videojs/themes/dist/forest/index.css';

// // Sea
// import '@videojs/themes/dist/sea/index.css';
// vjs-theme-fantasy 

// video.js player from the docs: https://github.com/videojs/video.js/blob/master/docs/guides/react.md



class VideoPlayer extends React.Component {


  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      let myPlayer=this
      console.log('onPlayerReady',myPlayer)
      console.log('onPlayerReady',myPlayer.isReady_)
      
      console.log("current source",myPlayer.currentSource().src) 
      // if(myPlayer.isReady_){console.log("myplayer duration",myPlayer.duration())}
      let currentTime= localStorage.getItem("secondLeft")
      myPlayer.currentTime(currentTime)

      // whenever video progressin time is updated;
      myPlayer.on('timeupdate', function() {
        let currentTime= myPlayer.currentTime();
        console.log("remaining time:",myPlayer.remainingTime()) 
        console.log("percentage of my progress:",myPlayer.currentTime()/myPlayer.duration()*100) 
        localStorage.setItem("secondLeft",currentTime)
 

      });
   
     
   
    });

  
  }

 

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      

      this.player.dispose();
      localStorage.setItem("disposed","yes")
    }
  }

  componentWillReceiveProps(newProps) {
    // When a user moves from one title to the next, the VideoPlayer component will not be unmounted,
    // instead its properties will be updated with the details of the new video. In this case,
    // we can update the src of the existing player with the new video URL.
    if (this.player) {
      this.player.src({
        type: newProps.video.mime_type,
        src: newProps.video.video_url
      });
    } 
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  
  // use `ref` to give Video JS a reference to the video DOM element: https://reactjs.org/docs/refs-and-the-dom
  render() {
    return (
      <div data-vjs-player>
        <video id="videoPlayer"  ref={ node => this.videoNode = node } className="video-js  "></video>
     
      </div>
    )
  }
}

export default VideoPlayer;