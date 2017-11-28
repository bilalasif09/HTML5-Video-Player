# HTML5-Video-Player
#HTML5 Video Player with custom controls, quality switching and no dependency 

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

#Initialize the Player


initPlayer(videoQualities,defaultPlay);