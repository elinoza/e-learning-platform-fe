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
  triggerParentComponentforRedux = () => {
    this.props.triggerParentComponentforRedux(true);
  };


  postProgress = async (courseId, currentIndex) => {
let data;
 
  data = {
        playlistIndex: currentIndex
       
    }
  
    
    try {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(url + "/users/myLearning/" + courseId, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("progress saved to server");
        this.triggerParentComponentforRedux();
      } else {
        console.log("save error", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  postCompleteProgress = async (courseId, currentIndex) => {

  
    
       let   data = {
         index:currentIndex
          };
     
      
        
        try {
          const token = localStorage.getItem("token");
          const url = process.env.REACT_APP_URL;
          const response = await fetch(url + "/users/myLearning/" + courseId, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          if (response.ok) {
            console.log("progress saved to server");
            this.triggerParentComponentforRedux();
          } else {
            console.log("save error", response);
          }
        } catch (error) {
          console.log(error);
        }
      };

  componentDidMount() {
    console.log("current----", this.props.currentCourse);

    const self = this; // thıs = <Vıdeo>
    let courseId = self.props.currentCourse._id;
    const myPlaylist = self.props.currentCourse.playList.map(
      ({ src, type }) => {
        return {
          sources: [{ src, type }],
        };
      }
    );

    console.log("my playlist:", { myPlaylist });

    // inititate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      let myPlayer = this;

      // thıs  = onPlayerReady
      // self = <Vıdeo>

      console.log("onPlayerReady", this);
      ///set default value scale between 0-1
      let defaultVolume = 0.3;
      myPlayer.volume(defaultVolume);

      let currentProgress = self.props.currentProgress;
      console.log("currentItem from database", currentProgress.playlistIndex);

      //WHICH INDEX OF PLAYLIST USER'PROGRESS COMING FROM BACKEND AND SETTING THE PLAYER BASED ON IT
      let currentItem = currentProgress.playlistIndex;
      console.log("currentItem fcheck", currentItem);

      if (!currentItem) {
        currentItem = 0;
      }

      myPlayer.playlist(myPlaylist, currentItem);

      // Play through the playlist automatically.
      myPlayer.playlist.autoadvance(0);

      // Metadata's loaded before video starts.
      myPlayer.on("loadedmetadata", function () {
       
        console.log("metadata loadedddd", myPlayer.duration());
        console.log("current source", myPlayer.currentSource().src);

        //WHENEVER INDEX CHANGE POST PROGRESS TO THE BACKEND--->
        let currentIndex = myPlayer.playlist.currentIndex();
        if (currentItem !== currentIndex) {
          self.postProgress(courseId, currentIndex);
        }

        

        console.log("currentIndex in loadedmetadata function", currentIndex);
      });

      ///  SETTING CURRENT TIME AFTER REFRESHING PAGE OR STH FROM LOCAL STORAGE
      let resumeInfo = JSON.parse(window.localStorage.getItem("resumeInfo"));
      console.log(resumeInfo.courseId);

      if (courseId === resumeInfo.courseId) {
        let currentTime = resumeInfo.secondLeft;
        myPlayer.currentTime(currentTime);
      }

      // whenever video progressin time is updated;
      myPlayer.on("timeupdate", function () {


        //get current second of player to resume

        let currentTime = myPlayer.currentTime();

        let resumeInfo = {
          secondLeft: currentTime,
          courseId: courseId,
        };

        window.localStorage.setItem("resumeInfo", JSON.stringify(resumeInfo));

        // localStorage.setItem("secondLeft", currentTime);

        // not necessary anymore, using backend --->localStorage.setItem("playlistIndex", currentItem);

        // console.log("remaining time:",myPlayer.remainingTime())
        // console.log("percentage of my progress:",myPlayer.currentTime()/myPlayer.duration()*100)
      });
      myPlayer.on("ended", function () {
                let played = myPlayer.played();
          
      
        //WHEN IT IS ended , CALCULATE THE TIME RANGE OF WATCHED, AND SUM THEM AND
        // IF IT IS MORE THAN DURATION IT MEANS COMPLETED
        let duration=myPlayer.duration()

        
            let i;
            let totalWatch=0
            let isCompleted;
for (i = 0; i < played.length; i++) {
  console.log(played.start(i), played.end(i))
 let playedRange =  played.end(i) - played.start(i)
 totalWatch+=playedRange

 
}
console.log( duration,totalWatch)

if(totalWatch>= duration) { isCompleted =true}
else {isCompleted =false}

console.log("Completed", isCompleted)
//WHENEVER INDEX CHANGE && END POST PROGRESS TO THE BACKEND--->
let currentIndex = myPlayer.playlist.currentIndex();
console.log("ended",currentIndex,currentItem)

if(isCompleted){self.postCompleteProgress(courseId, currentIndex)}
    
 

      });
      myPlayer.on("duringplaylistchange", function () {
        // Remember, this will not trigger a "playlistsorted" event!
      });
      //it is triggered when play change except the first time
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
    console.log("from vifdeo render", this.props.currentProgress);
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
