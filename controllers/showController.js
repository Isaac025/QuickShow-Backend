const axios = require("axios");

const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      {
        headers: { Authorization: `Bearer ${process.env.TMDB_API_KEY}` },
      }
    );

    const movies = data.results;
    res.status(200).json({ success: true, movies: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, movies: movies });
  }
};

module.exports = { getNowPlayingMovies };
