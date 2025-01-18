import {useDispatch} from "react-redux";
import {API_OPTIONS} from "../utils/constant";
import {addTrailerVideo} from "../utils/moviesSlice";
import {useEffect} from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  //Now to read data from store we need to use useSelector

  const getMovieVideos = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",

      API_OPTIONS
    );
    const json = await data.json();

    const filterData = json.results.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;