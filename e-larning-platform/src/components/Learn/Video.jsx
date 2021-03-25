import React, { Component } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import videojsPlaylistPlugin from "videojs-playlist";

import "videojs-playlist";
import "./player.css";

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

class Video extends React.Component {


  source = (myPlayer,currentItem) => {
 
     let x =`     sources: [
            {
              src: "http://media.w3.org/2010/05/sintel/trailer.mp4",
              type: "video/mp4",
            },
          ]`
     
  return this.props.currentPlaylist
  };

  componentDidMount() {

     console.log("current----",this.source())
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      let myPlayer = this;
console.log("hello",myPlayer.currentCourse)
      console.log("onPlayerReady", myPlayer.isReady_);
      ///set default value scale between 0-1
      let defaultVolume = 0.3;
      myPlayer.volume(defaultVolume);
      //  let currentItem=this.props.currentCourseProgress
      // let currentItem
      // if (this.props.currentCourseProgress !== null) {
      // currentItem= this.props.currentCourseProgress.playlistIndex }
      // else { currentItem=0 }
      let currentItem = parseInt(localStorage.getItem("playlistIndex"));
      if (!currentItem) {
        currentItem = 0;
      }

      // console.log(this.props.currentPlaylist)
      //PLAYLIST 
      myPlayer.playlist(
        [
          {
            sources: [
              {
                src: "http://media.w3.org/2010/05/sintel/trailer.mp4",
                type: "video/mp4",
              },
            ],
          },
        ],
  
        currentItem
      );

      // Play through the playlist automatically.
      myPlayer.playlist.autoadvance(0);

      // Metadata's loaded before video starts.
      myPlayer.on("loadedmetadata", function () {
        console.log("metadata loadedddd", myPlayer.duration());
        console.log("current source", myPlayer.currentSource().src);

        let currentIndex = myPlayer.playlist.currentIndex();

        console.log("currentItem", currentItem);
        console.log("currentIndex", currentIndex);
      });

      ///  SETTING CURRENT TIME AFTER REFRESHING PAGE OR STH FROM LOCAL STORAGE
      let currentTime = localStorage.getItem("secondLeft");

      myPlayer.currentTime(currentTime);

      // whenever video progressin time is updated;
      myPlayer.on("timeupdate", function () {
        let currentTime = myPlayer.currentTime();
        localStorage.setItem("secondLeft", currentTime);
        let currentItem = myPlayer.playlist.currentItem();
        localStorage.setItem("playlistIndex", currentItem);

        // console.log("remaining time:",myPlayer.remainingTime())
        // console.log("percentage of my progress:",myPlayer.currentTime()/myPlayer.duration()*100)
      });

      myPlayer.on("duringplaylistchange", function () {
        // Remember, this will not trigger a "playlistsorted" event!
      });

      myPlayer.on("playlistchange", function () {});
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
      localStorage.setItem("disposed", "yes");
    }
  }

  // componentWillReceiveProps(newProps) {
  //   // When a user moves from one title to the next, the VideoPlayer component will not be unmounted,
  //   // instead its properties will be updated with the details of the new video. In this case,
  //   // we can update the src of the existing player with the new video URL.
  //   if (this.player) {
  //     this.player.src({
  //       type: newProps.video.mime_type,
  //       src: newProps.video.video_url,
  //     });
  //   }
  // }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856

  // use `ref` to give Video JS a reference to the video DOM element: https://reactjs.org/docs/refs-and-the-dom
  render() {
    console.log(this.props.currentPlaylist);
    return (
      <div data-vjs-player>
        <video
          id="videoPlayer"
          ref={(node) => (this.videoNode = node)}
          className="video-js vjs-big-play-centered "
        ></video>
      </div>
    );
  }
}

export default Video;
