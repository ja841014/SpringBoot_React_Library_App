"use strict";
exports.__esModule = true;
exports.HomePage = void 0;
var Carousel_1 = require("./components/Carousel");
var ExploreTopBooks_1 = require("./components/ExploreTopBooks");
var Heros_1 = require("./components/Heros");
var LibraryServices_1 = require("./components/LibraryServices");
exports.HomePage = function () {
    return (React.createElement(React.Fragment, null,
        React.createElement(ExploreTopBooks_1.ExploreTopBooks, null),
        React.createElement(Carousel_1.Carousel, null),
        React.createElement(Heros_1.Heros, null),
        React.createElement(LibraryServices_1.LibraryServices, null)));
};
