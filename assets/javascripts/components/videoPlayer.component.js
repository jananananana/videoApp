(function() {
  'use strict';

  angular
    .module('app')
    .component('videoPlayer', {
        templateUrl: './assets/javascripts/components/videoPlayer.html',
        controller: ['Video', VideoPlayerDataController],
        controllerAs:'view'
    });

    function VideoPlayerDataController (Video) {
        let view = this,
            numberOfVideos,
            videoIndex = 0,
            currentVideo = document.querySelector('#current-video');

        // Set mute on load
        currentVideo.volume = 0;

        Video.getVideoData()
            .then(function (data) {
                view.videoData = data.data;
                numberOfVideos = view.videoData.length;
                // Making assumption that the first video
                // should be the first in the list
                view.currentVideo = view.videoData[videoIndex];

                // Set caption settings for the view
                manageCaptions(view.currentVideo);
            });

        view.nextVideo = function(){
            if (videoIndex === numberOfVideos - 1) {
                videoIndex = 0;
            } else {
                videoIndex += 1;
            }
            view.currentVideo = view.videoData[videoIndex];
            manageCaptions(view.currentVideo);
        };

        view.previousVideo = function(){
            if (videoIndex === 0) {
                videoIndex = numberOfVideos - 1;
            } else {
                videoIndex -= 1;
            }
            view.currentVideo = view.videoData[videoIndex];
            manageCaptions(view.currentVideo);
        };

        view.toggleMute = function() {
            // change default mute setting once person turns up volume
            view.muted = !view.muted;
            // change actual volume
            if (currentVideo.volume === 0) {
                currentVideo.volume = 1;
            } else {
                currentVideo.volume = 0;
            }
        };
        // This should ideally be split into its own component
        function manageCaptions(videoData) {
            let customStyle = "",
                // check the number of captions
                noOfCaptions = (typeof videoData.captions !== "undefined") ? videoData.captions.length : 0;

            // set initial captions
            view.captions = [];

            // set custom styles on existing captions and element type
            if (noOfCaptions > 0) {
                view.captions = videoData.captions;
                for(let i = 0; i < noOfCaptions; i++){
                    let className = ".caption-c--" + i,
                        captionStyle = "";

                    // This isn't going to be pretty since I'm brute forcing the styles
                    // GENERATE CUSTOM CAPTION STYLING
                    if (videoData.captions[i].x) {
                        captionStyle += "left:" + videoData.captions[i].x +"px;";
                    }
                    if (videoData.captions[i].y) {
                        captionStyle += "top:" + videoData.captions[i].y +"px;";
                    }
                    if (videoData.captions[i].color) {
                        captionStyle += "color:" +videoData.captions[i].color +";";
                    }
                    if (videoData.captions[i].font) {
                        captionStyle += "font-family:" +videoData.captions[i].font +";";
                    }
                    switch (videoData.captions[i].size) {
                        case 'small':
                            captionStyle += "font-size: 14px;";
                            break;
                        case 'medium':
                            captionStyle += "font-size: 20px;";
                        case 'large':
                            captionStyle += "font-size: 28px;";
                    }
                    if (videoData.captions[i]["background-color"]) {
                        customStyle += ".caption-c--" + i + " .caption-c__text{ background-color:" +videoData.captions[i]["background-color"] +";}";
                    }

                    customStyle += className + "{" + captionStyle + "}";
                }
            }

            addStyle(customStyle);
        }

        function addStyle(customStyle) {
            let style = document.getElementById("custom-style");
            // Create the <style> tag if one doesn't exist
            if (!document.getElementById("custom-style")) {
                style = document.createElement("style");
            }
            style.id = "custom-style";
            style.innerHTML = customStyle;
            // WebKit
            style.appendChild(document.createTextNode(""));

            // Add the <style> element to the page
            document.head.appendChild(style);

        }

    }
})();
