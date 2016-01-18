var api = require("../../shared/data/api");
var ClockViewModel = require("./clock");
var config = require("../../config");
var utils = require("../../shared/utils");
var $ = require("jquery");

var HomeViewModel = function() {
    var self = this;
	self.observables = {
		clock: new ClockViewModel(),
		randomMovie: {
			title: "",
            backdrop: "../../images/background-dark.jpg"
		},
        globalNav: config.globalNav,
		searchText: ""
	};
   
    self.init = function() {
        self.observables.clock.init();
        self.updateRandomMovie().then(function(){
            $("#searchInput").focus();
        });
        setInterval(self.updateRandomMovie, 10000);
        $("form").on("submit", self.search);
        $("body").fadeIn();
    };
    
    self.search = function() {
        window.location.href = "../movies/movies.html?search=" + self.observables.searchText;
        return false;
    };
    
    self.updateRandomMovie = function() {
        return api.movies.getRandom().then(function(movie) {
            self.observables.randomMovie = movie;
        });
    };
    self.init();
};


var view = utils.createView(HomeViewModel);
view.init();