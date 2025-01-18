import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

const VideoTitle = ({title, overview}) => {
  return (
    <div className=" w-screen aspect-video absolute text-white pt-[20%] p-24 bg-gradient-to-r from-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      {overview && <p className="py-6 w-3/6">{overview}</p>}
      <div>
        <button className="  bg-white text-black p-3 px-12  text-xl  rounded-lg hover:bg-opacity-50">
          <FontAwesomeIcon
            className="px-2"
            icon={faPlay}
            size="xl"
            style={{color: "black"}}
          />
          Play
        </button>
        <button className=" mx-2 bg-gray-500 text-white p-3 px-12  text-xl  rounded-lg hover:bg-opacity-50">
          <FontAwesomeIcon className="px-2" icon={faInfoCircle} />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
