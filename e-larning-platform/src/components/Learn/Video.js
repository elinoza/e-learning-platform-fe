import React,{Component} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import videojsPlaylistPlugin from 'videojs-playlist';

import 'videojs-playlist';
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
      videojs.registerPlugin('playlist', videojsPlaylistPlugin);
      myPlayer.playlist([{
        sources: [{
          src: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/sintel/poster.png'
      }, {
        sources: [{
          src: 'http://vjs.zencdn.net/v/oceans.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://www.videojs.com/img/poster.jpg'
      }, {
        sources: [{
          src: 'http://media.w3.org/2010/05/bunny/movie.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/bunny/poster.png'
      }, {
        sources: [{
          src: 'http://media.w3.org/2010/05/video/movie_300.mp4',
          type: 'video/mp4'
        }],
        poster: 'http://media.w3.org/2010/05/video/poster.png'
      }],2);

      
      
      // Play through the playlist automatically.
      myPlayer.playlist.autoadvance(0);

      console.log('onPlayerReady',myPlayer)
      console.log('onPlayerReady',myPlayer.isReady_)
      
      console.log("current source",myPlayer.currentSource().src) 
     
      let currentTime= localStorage.getItem("secondLeft")
      // let currentIndex= localStorage.getItem("playlistIndex")
      myPlayer.currentTime(currentTime)

      // whenever video progressin time is updated;
      myPlayer.on('timeupdate', function() {
        let currentTime= myPlayer.currentTime();
        // let currentIndex=myPlayer.currentItem()

        // console.log("currentIndex",currentIndex)
     
        // console.log("remaining time:",myPlayer.remainingTime()) 
        // console.log("percentage of my progress:",myPlayer.currentTime()/myPlayer.duration()*100) 
        localStorage.setItem("secondLeft",currentTime)
        // localStorage.setItem("playlistIndex",currentIndex)
        

      });
      myPlayer.on('loadedmetadata', function() { console.log("metadata loadedddd",myPlayer.duration())});
     
   
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
        <video id="videoPlayer"  ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered "></video>
     
      </div>
    )
  }
}

export default VideoPlayer;