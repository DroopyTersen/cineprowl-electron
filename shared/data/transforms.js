var imageHelper = require("../utils/imageHelper");

var processMovies = function (movies) {
	movies.forEach(processMovie);
	return movies;
};
var processMovie = function (movie) {
	movie.url = "../details/details.html?id=" + movie.id;
	movie.poster = movie.posterThumb ? movie.posterThumb.replace("w92", "w185") : imageHelper.poster.getMid(movie.poster_path);
	movie.backdrop = movie.backdrop || imageHelper.backdrop.getMid(movie.backdrop_path);

	// Starring
	movie.starring = []
	if (movie.casts && movie.casts.cast) {
		for (var i = 0; i < 4 && i < movie.casts.cast.length; i++) {
			movie.starring.push({
				id: movie.casts.cast[i].id,
				url: "/movies.html?actor=" + movie.casts.cast[i].name + "&actorId=" + movie.casts.cast[i].id,
				name: movie.casts.cast[i].name,
				profilePic: imageHelper.profile.getMid(movie.casts.cast[i].profile_path)
			});
		}
	}
        
	// Trailer
	if (movie.trailers && movie.trailers.youtube && movie.trailers.youtube.length) {
		movie.trailerUrl = "https://www.youtube.com/embed/" + movie.trailers.youtube[0].source + "?autoplay=1";
	} else {
		movie.trailerUrl = "https://www.youtube.com/results?search_query=" + movie.title.replace(" ", "+") + "+trailer";
	}
	return movie;
};

module.exports = {
	movies: processMovies,
	movie: processMovie
};