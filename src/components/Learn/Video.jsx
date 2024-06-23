import React, { Component } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import videojsPlaylistPlugin from "videojs-playlist";
import "videojs-playlist";
import "./player.css";

class Video extends React.Component {
  triggerParentComponentforRedux = () => {
    this.props.triggerParentComponentforRedux(true);
  };

  postProgress = async (courseId, currentIndex, totalWatch) => {
    let data;
    if (Number.isInteger(currentIndex)) {
      data = {
        playlistIndex: currentIndex + 1,
        totalWatch: totalWatch,
      };
    } else {
      data = {};
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
        this.triggerParentComponentforRedux();
      } else {
      }
    } catch (error) {}
  };

  postCompleteProgress = async (courseId, currentIndex) => {
    let data = {
      index: currentIndex,
    };

    try {
      const token = localStorage.getItem("token");
      const url = process.env.REACT_APP_URL;
      const response = await fetch(
        url + "/users/myLearning/" + courseId + "/complete",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
      } else {
      }
    } catch (error) {}
  };

  handlePlaylist = () => {
    let courseId = this.props.currentCourse._id;
    let myplaylist = this.props.currentCourse.playList.map(({ src, type }) => {
      return {
        sources: [{ src, type }],
      };
    });
    return myplaylist;
  };

  play = () => {
    const self = this; // thıs = <Vıdeo>
    let courseId = self.props.currentCourse._id;
    const myPlaylist = self.handlePlaylist();

    // inititate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      let myPlayer = this;

      // thıs  = onPlayerReady
      // self = <Vıdeo>
      ///set default value scale between 0-1
      let defaultVolume = 0.3;
      myPlayer.volume(defaultVolume);

      let currentProgress = self.props.currentProgress;

      //WHICH INDEX OF PLAYLIST USER'PROGRESS COMING FROM BACKEND AND SETTING THE PLAYER BASED ON IT
      let currentItem = currentProgress.playlistIndex;

      // /// If user has already finished this course, index number= playlist length in database, so we should manipulate it here.
      //   if (currentItem >= myPlaylist.length){ currentItem = 0; console.log("here------>",currentItem )}

      //If user havent started this course, this logic creates a new progress
      if (!Number.isInteger(currentItem)) {
        self.postProgress(courseId, currentItem, 0);
        currentItem = 0;
      }

      myPlayer.playlist(myPlaylist, currentItem);

      // Play through the playlist automatically.
      myPlayer.playlist.autoadvance(0);

      // Metadata's loaded before video starts.
      myPlayer.on("loadedmetadata", function () {
        //WHENEVER INDEX CHANGE POST PROGRESS TO THE BACKEND--->
        let currentIndex = myPlayer.playlist.currentIndex();
        // if (currentItem !== currentIndex) {
        //   self.postProgress(courseId, currentIndex);
        // }

        //WHENEVER INDEX CHANGE POST PROGRESS TO THE BACKEND--->
      });

      ///  SETTING CURRENT TIME AFTER REFRESHING PAGE OR STH FROM LOCAL STORAGE
      let resumeInfo = JSON.parse(window.localStorage.getItem("resumeInfo"));

      if (resumeInfo && courseId === resumeInfo.courseId) {
        let currentTime = resumeInfo.secondLeft;
        myPlayer.currentTime(currentTime);
      }

      // whenever video progressin time is updated;
      myPlayer.on("timeupdate", function () {
        //get current second of player to resume

        let currentTime = myPlayer.currentTime();
        // if (currentTime === "60.00") {
        //   self.postProgress(courseId);
        // }

        let resumeInfo = {
          secondLeft: currentTime,
          courseId: courseId,
        };

        window.localStorage.setItem("resumeInfo", JSON.stringify(resumeInfo));

        // localStorage.setItem("secondLeft", currentTime);

        // not necessary anymore, since using backend --->localStorage.setItem("playlistIndex", currentItem);
      });
      myPlayer.on("ended", function () {
        let played = myPlayer.played();

        //WHEN IT IS ended , CALCULATE THE TIME RANGE OF WATCHED, AND SUM THEM AND
        // IF IT IS MORE THAN DURATION IT MEANS COMPLETED
        let duration = myPlayer.duration();

        let i;
        let totalWatch = 0;
        let isCompleted;
        for (i = 0; i < played.length; i++) {
          let playedRange = played.end(i) - played.start(i);
          totalWatch += playedRange;
        }

        if (totalWatch >= duration) {
          isCompleted = true;
        } else {
          isCompleted = false;
        }

        //WHENEVER INDEX CHANGE && END POST PROGRESS TO THE BACKEND--->
        let currentIndex = myPlayer.playlist.currentIndex();

        if (isCompleted) {
          self.postCompleteProgress(courseId, currentIndex);
        }

        Number.isInteger(currentIndex) &&
          self.postProgress(courseId, currentIndex, totalWatch);
      });
    });
  };

  componentDidMount() {
    this.play();
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
      localStorage.setItem("disposed", "yes");
    }
  }

  componentWillReceiveProps(newProps) {
    // When a user moves from one title to the next, the VideoPlayer component will not be unmounted,
    // instead its properties will be updated with the details of the new video. In this case,
    // we can update the src of the existing player with the new video URL.

    if (this.player) {
      const self = this;
      let myPlaylist = self.handlePlaylist();
      let newCurrentItem = newProps.currentProgress.playlistIndex;
      this.player.playlist(myPlaylist, newCurrentItem);

      this.player.playlist.autoadvance(0);
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856

  // use `ref` to give Video JS a reference to the video DOM element: https://reactjs.org/docs/refs-and-the-dom
  render() {
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
