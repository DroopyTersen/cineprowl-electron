var api = require("../../shared/data/api");
var config = require("../../config");
var utils = require("../../shared/utils");
var $ = require("jquery");
var qs = require("querystring");

var DetailsViewModel = function() {
    var self = this;

	this.observables = {
		movie: {
			backdrop: "",
			title: "",
			id: ""
		},
		globalNav: config.globalNav
	};


    var init = function() {
        var params = qs.parse(window.location.search.substring(1));
        if (params.id) {
            api.movies.byId(params.id).then(function(movie) {
                self.observables.movie = movie;
            });

            $(document).on("play-movie-vlc", self.playVlc);
            $(document).on("play-movie-trailer", self.playTrailer);
        } else {
            alert("Hey dummy! Pass in an id.");
        }
    };

    this.playRaw = function() {
        var omxUrl = "/omx/start/" + encodeURIComponent(config.streamUrl + self.movie().id);
        $.get(omxUrl);
        //window.open(streamUrl);
        //var omxUrl = "/omx/start/" + encodeURIComponent(config.streamUrl + self.movie().id) + "?size=mobile";
        //$.get(omxUrl);
    };
    this.playVlc = function() {
        $.get("/vlc/" + self.observables.movie.id);
    };
    this.playTrailer = function() {
        window.open(self.observables.movie.trailerUrl);
    }
    init();
};



var view = utils.createView(DetailsViewModel);
view.init();