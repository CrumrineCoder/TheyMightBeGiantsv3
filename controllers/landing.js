'use strict';

const apiUrl = 'https://tmbg.herokuapp.com/';



// !!! NAV !!!
$("#menu-icon").bind("click", function (e) {
    var body = $("html");
    e.preventDefault();
    if (body.hasClass("nav-open")) {
        body.removeClass("nav-open");
        $("#mobile-nav li.menu-item-has-children > a, .sub-menu").removeClass("open");
    } else {
        e.stopPropagation();
        body.one("click", function () {
            body.removeClass("nav-open");
            $("#mobile-nav, #menu-icon").removeClass("active");
            $("#mobile-nav li.menu-item-has-children > a, #mobile-nav li.menu-item-has-children > .sub-menu").removeClass("open");
        }).addClass("nav-open");
    }
});

$("#mobile-nav").bind("click", function () {
    event.stopPropagation();
});
$("#menu-icon").on("click", function () {
    $("#mobile-nav, #menu-icon").toggleClass("active");
    event.preventDefault();
});

$('#mobile-nav li.menu-item-has-children > a').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('open');
    $(this).siblings('.sub-menu').toggleClass('open');
});

function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
}

// Convert Degress to Radians
function Deg2Rad(deg) {
    return deg * Math.PI / 180;
}

// !!! END OF NAV !!!
/*

 */

(function () {

    var app = angular.module('album', []);

    app.filter('reverse', function () {
        return function (items) {
            return items.slice().reverse();
        };
    });
    // Because handlebar uses {{}}, we have to use {[{}]}
    app.config(function ($interpolateProvider) {
        $interpolateProvider.startSymbol('{[{');
        $interpolateProvider.endSymbol('}]}');
    });

    app.controller('tourController', function ($scope) {
        $scope.Tours = [];

        ready(ajaxRequest('GET', apiUrl + "tours", showTour))

        function showTour(data) {
            var TourObject = JSON.parse(data);
            var dates = TourObject[0].dates; 
            // Show the Comments
            for (var i = 0; i < dates.length; i++) {
               // ajaxRequest('GET', apiUrl + "geocoding/?address=" + dates[i].location + "&id=" + dates[i]._id, showGeo);
               ajaxRequest('GET', "https://nominatim.openstreetmap.org/search/" + dates[i].location + "?format=json&addressdetails=1&limit=1&polygon_svg=1", showGeo, dates[i]["_id"])
                $scope.$apply(function () {
                    $scope.Tours.push(dates[i]);
                });
            }

        }

        $scope.Coords = [];

        function showGeo(data, id) {
            var object = JSON.parse(data);
            var lat = object[0].lat; 
            var lng = object[0].lon; 
            var address = object[0].display_name; 
            $scope.$apply(function () {
                $scope.Coords.push({ "lat": lat, "lng": lng, "address": address, "id": id });
                $scope.id++; 
            });
            
      /*      var object = (JSON.parse(JSON.parse(data).geoData.body));
            var id = JSON.parse(data).id;
            var lat = object.results["0"].geometry.location.lat;
            var lng = object.results["0"].geometry.location.lng;
            var address = object.results["0"].formatted_address
            $scope.$apply(function () {
                $scope.Coords.push({ "lat": lat, "lng": lng, "address": address, "id": id });
            }); */
        }

        $scope.getLocation = function () {
            navigator.geolocation.getCurrentPosition($scope.getLoc, $scope.error, $scope.options);
        }

        $scope.closestTour;

        $scope.getLoc = function (position) {
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;

            var mindif = 99999;
            var closest;

            for (var index = 0; index < $scope.Coords.length; ++index) {
                var dif = PythagorasEquirectangular(lat, lng, $scope.Coords[index].lat, $scope.Coords[index].lng);
                if (dif < mindif) {
                    closest = index;
                    mindif = dif;
                }
            }
            for (var i = 0; i < $scope.Tours.length; i++) {
                if ($scope.Tours[i]["_id"] === $scope.Coords[closest].id) {
                    $scope.$apply(function () {
                        $scope.closestTour = $scope.Tours[i];
                    });
                    break;
                }
            }
        }
    });

    app.filter('split', function () {
        return function (items, count) {
            if (!count) {
                count = 3;
            }
            var array = [];
            for (i = 0; i < items.length; i++) {
                var chunkIndex = parseInt(i / count);
                var isFirst = (i % count == 0);
                if (isFirst) {
                    array[chunkIndex] = [];
                }
                array[chunkIndex].push(items[i]);
            }
            return array;
        }
    });

    app.controller('albumController', function ($scope) {
        $scope.comments = [];

        $scope.isAllLoaded = false; 

        // set the default amount of items being displayed
        $scope.limit = 2;

        // loadMore function
        $scope.loadMore = function () {
            $scope.limit += 2;
            if ($scope.limit+2 >= $scope.comments.length){
                $scope.isAllLoaded = true; 
            }
        }

        // Set because we're using the same Album on the initial launch every time.
        var albumID = "5b25428dfb6fc033f885e375";
        // Get Album Info from Database
        function revealAlbumInfo(data) {
            var albumObject = JSON.parse(data);
            // Store info
            $scope.$apply(function () {
                $scope.name = albumObject.name;
                $scope.tracklist = albumObject.tracklist;
                $scope.comments = albumObject.comments;
            });

            ajaxRequest('GET', apiUrl + "api/song/?song=" + $scope.tracklist[0].name, showSong);
        }

        // On page load, load above function after calling the backend. 
        ready(ajaxRequest('GET', apiUrl + "api/album/?id=" + albumID, revealAlbumInfo));

        $scope.lyrics = "Testing - You Should Not See This Message";
        $scope.currentSong = 0;

        $scope.select = function (index) {
            $scope.currentSong = index;
        };

        $scope.go = function (id) {
            ajaxRequest('GET', apiUrl + "api/song/?song=" + $scope.tracklist[id].name, showSong)
        }

        function showSong(data) {
            var obj = JSON.parse(JSON.parse(data).body);
            $scope.$apply(function () { $scope.lyrics = obj.lyric });

        }

        ready(ajaxRequest('GET', apiUrl + "comments", showComments))

        function showComments(data) {
            var CommentObject = JSON.parse(data);

            // Show the Comments
            for (var i = 0; i < CommentObject.length; i++) {
                $scope.$apply(function () {
                    $scope.comments.push(CommentObject[i]);

                });
            }
        }
    });
})();




