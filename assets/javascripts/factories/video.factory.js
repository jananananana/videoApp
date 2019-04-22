(function () {
    'use strict';
    angular
        .module('app')
        .factory('Video', Video);

    Video.$inject = ['$http'];

    function Video ($http) {
        return {
            getVideoData: getVideoData
        };

        function getVideoData () {
            return $http({
                method: 'GET',
                url: 'https://demo.arturo.video/data/videos.json'
            })
            .then(function (result) { 
                return result;
            });
        }
    }

})();