var api = require("../../shared/data/api");
var config = require("../../config");
var utils = require("../../shared/utils");
var MovieContext = require("./context");
var $ = require("jquery");

var MoviesViewModel = function() {
	this.observables = {
		items: [],
		context: new MovieContext(),
		globalNav: config.globalNav
	};

	this.observables.context.fromUrl();
	this.observables.context.message = this.observables.context.toWords();
	this.emptyItem = {
        name: "",
        id: "",
        title: "",
        backdrop: ""
    };

    var init = () => {
    	api.movies.byContext(this.observables.context)
    		.then(movies => this.observables.items = movies)
	};

	init();
};



var view = utils.createView(MoviesViewModel);
view.init();
