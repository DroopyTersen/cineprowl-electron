var utils = {};
var Binding = require("droopy-binding").DroopyBinding;
var $ = require("jquery");

utils.createView = function(ViewModel) {
	var viewModel = null;
    var init = function() {
        viewModel = new ViewModel();
        viewModel.binding = new Binding('body',viewModel.observables);
        $(document).on("navigate-back", function() {
            console.log("go back");
            window.history.back();
        });
    };
    return {
        vm: function() { return viewModel; },
        init: init
    };
};

utils.getRandomIndex = array => Math.floor(Math.random() * array.length)
utils.getRandomItem = array => array[utils.getRandomIndex(array)];
utils.imageHelper = require("./imageHelper");

module.exports = utils;
