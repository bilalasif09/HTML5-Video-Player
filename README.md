# HTML5-Video-Player
#HTML5 Video Player with custom controls, quality switching and no dependency 

#Include the JS and CSS
<link rel="stylesheet" type="text/css" href="player.css">
<script type="text/javascript" src="player.js"></script>

#Write this in your html file where you want the player to be shown
<div id="player-container"></div>

#Call the player initPlayer function with the video qualities array, default quality to play as string and options(if any).

#Quality List should be an array of quality tag name followed by video link

#For Example
var videoQualities = [
"1080p","https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4",
"720p","https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4",
"320p","https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4",
"144p","https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4"
];

#Specify default Video to Play
var defaultPlay = "720p";

#Provide options (if any)
var options = {
	poster: "http://d17716y51on07i.cloudfront.net/videos/thumbs/000/011/605/original/Jpeg_5660.jpg?1504608645",
	autoplay: false
}

#Call the Player
initPlayer(videoQualities,defaultPlay,options);