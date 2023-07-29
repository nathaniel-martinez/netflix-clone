//List of content which will be pulled when needed in making the website
//Remember these are METHODS!
const ApiResources = {
    popularTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?page=${page}&api_key=${apiKey}`,
    highRatedTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?sort_by=vote_average.desc&page=${page}&api_key=${apiKey}`,
    newTvShows: (page) => `https://api.themoviedb.org/3/discover/tv?sort_by=first_air_date.desc&page=${page}&api_key=${apiKey}`,
    popularMovies: (page) => `https://api.themoviedb.org/3/trending/movie?page=${page}&api_key=${apiKey}`,
    highRatedMovies: (page) => `https://api.themoviedb.org/3/movie/top_rated?page=${page}&api_key=${apiKey}`,
    nowPlayingMovies: (page) => `https://api.themoviedb.org/3/movie/now_playing?page=${page}&api_key=${apiKey}`
};

