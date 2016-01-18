var request = require("request");
var config = require("../../config");
var utils = require("../utils");
var transforms = require("./transforms");


var _httpGet = (url, options) => {
	return new Promise((resolve, reject) => {
		options.url = url;
		request(options, (err, resp, body) => {
			if (err) reject(err);
			else resolve(body);
		});
	})
};

var _getJSON = (url) => _httpGet(url, {
	json: true
});

var api = {};
api.movies = {};

var _allMovies = [];

// AJAX
api.movies.loadOne = function(id) {
	return _getJSON(config.apiUrl + "/movies/" + id)
		.then(transforms.movie);
};

api.movies.loadAll = function() {
	var odata = [
		"$select=title,id,poster_path,backdrop_path,watched,rating,addedToDb,genres",
		"$top=2500",
		"$filter=id ne null",
		"$orderby=addedToDb desc"
	];
	var url = config.apiUrl + "/movies?" + odata.join("&");
	console.log(url);
	return _getJSON(url)
		.then(transforms.movies)
		.then(movies => {
			_allMovies = movies;
			return _allMovies;
		});
};

var moviesLoaded = api.movies.loadAll();

api.movies.getAll = () => moviesLoaded.then(() => _allMovies);

api.movies.getRandom = () => moviesLoaded.then(() => utils.getRandomItem(_allMovies));

api.movies.byContext = context => {
	return moviesLoaded.then(() => {
		return _allMovies.slice(0, 100);
	})
};

api.movies.byId = api.movies.loadOne;

module.exports = api;