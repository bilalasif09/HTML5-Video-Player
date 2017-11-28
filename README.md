# HTML5-Video-Player
# HTML5 Video Player with custom controls, quality switching and no dependency 
# npm download link https://www.npmjs.com/package/html5-video-player-bilalasif09
# Quality List should be an array of quality tag name followed by video link


# For Example in Angular

# add HTML
<div id="player-container"></div>

# require js file
import { initPlayer } from 'html5-video-player-bilalasif09/player.js'

# require css file
@import "~html5-video-player-bilalasif09/player.css";

# declare video quality and sources array like this

var videoQualities = [
"1080p","https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4",
"720p","https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4",
"320p","https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4",
"144p","https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4"
];

# Specify default Video to Play

var defaultPlay = "720p";

# Provide options (Optional)

var options = {
			autoplay: true,
			poster: 'image.jpg'
		}

#Initialize the Player

initPlayer(videoQualities,defaultPlay,options);