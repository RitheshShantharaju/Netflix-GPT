import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import {faVolumeMute, faVolumeUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import VideoTitle from "./VideoTitle";

const VideoBackground = ({movieId, title, overview}) => {
  const [isMuted, setIsMuted] = useState(true);
  //Dispatch is used to push data into store

  //Now to read data from store we need to use useSelector

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);
  const toggleMute = () => {
    setIsMuted((prevMuteStatus) => !prevMuteStatus);
  };

  useEffect(() => {
    // Ensure mute status is updated when the video URL changes
  }, [trailerVideo]);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          trailerVideo?.key
            ? `https://www.youtube.com/embed/${
                trailerVideo.key
              }?&autoplay=1&mute=${isMuted ? 1 : 0}`
            : ""
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      <VideoTitle title={title} overview={isMuted ? overview : null} />
      <button
        onClick={toggleMute}
        className="absolute bottom-40  right-20 bg-white text-gray-700 p-4 rounded-full shadow-lg z-10 hover:bg-gray-200 transition-colors"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} size="lg" />
      </button>
    </div>
  );
};

export default VideoBackground;
