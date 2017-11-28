"use strict";
var vidList=[], 
	options={
		poster: null,
		autoplay: null
	}, 
	defaultPlay=null;

var getQualityTags = function () {
	var html;
	vidList.forEach(function(val,i){
		if(i%2===0){
			if(i!==0&&val!==defaultPlay){
				html=html+'<p class="qs">'+val+'</p>';
			}
			else if(i!==0&&val===defaultPlay){
				html=html+'<p class="qs active-quality">'
				+val+'</p>';
			}
			else if(i===0&&val===defaultPlay){
				html='<p class="qs active-quality">'
				+val+'</p>';
			}
			else if(i===0&&val!==defaultPlay){
				html='<p class="qs">'+val+'</p>';
			}
		}
	})
	return html;
}
var stopVideo = function () {
	var progress = document.getElementById('progress');
	var video = document.getElementById('video');
	var playpause = document.getElementById('playpause')
	video.pause();
	video.currentTime=0;
	progress.value=0;
}
var switchQuality = function () {
	var el = this;
	var switchTo = el.innerHTML; 
	var activeEl = document.getElementsByClassName('active-quality');
	var video = document.getElementById('video');
	var playpause = document.getElementById('playpause')
	
	if(switchTo===activeEl[0].innerHTML) return;
	else{
		activeEl[0].className='qs';
		el.className+=' active-quality';
		var seekTime = null;
		for(var i=0;i<vidList.length;i++){
			if (vidList[i]===switchTo) {
				seekTime=video.currentTime;
				stopVideo();
				video.src=vidList[i+1];
				video.currentTime=seekTime;
				video.load();
				video.play();
				playpause.className='pause-icon';
				return;
			}
		}
	}
}
var listenQualitySwitching = function () {
	var el = document.getElementsByClassName("qs");
	for (var i=0; i<el.length; i++){
		el[i].addEventListener("click", switchQuality);
	}
}
var getPlayableSource = function () {
	for(var i=0;i<vidList.length;i++){
		if(vidList[i]===defaultPlay){
			return vidList[i+1];
		}
	}
}
var getPlayerHtml = function () {
	return `<figure id="player"><div class="header"><div class="inputs">`
	+`<div id="quality-overlay">`
	+getQualityTags()
	+`</div><div id="loader" class="no-display loader"></div><video `
	+getVideoPoster()
	+getAutoPlayAttr()
	+` id="video" preload="auto" src=`
	+getPlayableSource()
	+`></video></div><div class="inputs-overlay"></div></div></figure>`
	+`<ul id="video-controls" class="controls"><li class="progress">`
	+`<progress id="progress" value="0" min="0"><span id="progress-bar"></span>`
	+`</progress></li><li><div id="playpause" title="Play/Pause" class="play-icon">`
	+`</div></li><li><div id="stop" title="Stop" class="stop-icon"></div></li>`
	+`<li><div id="mute" title="Mute/Unmute" class="mute-icon"></div>`
	+`<div id="volume" class="volume" title="Set volume">`
	+`<span id="volumeBar" class="volumeBar"></span></div></li>`
	+`<li><div id="vidDuration"></div><div id="vidCurrDuration"></div></li>`
	+`<li><div id="fs" title="Fullscreen" class="fullscreen"></div></li>`
	+`<li><div id="quality" title="Quality" class="quality"></div></li></ul>`;
}
var getVideoPoster = function () {
	if (options) {
		if (options.poster) return ` poster=`+options.poster
	} 
}
var getAutoPlayAttr = function () {
	if (options) {
		if (options.autoplay) return ` autoplay=`+options.autoplay
	}
}
exports.initPlayer = function (vids,defaultPlayParam,optionsParam) {
	vidList=vids
	options=optionsParam
	defaultPlay=defaultPlayParam

	var el = document.getElementById('player-container'),
    elChild = document.createElement('div');
	elChild.innerHTML = getPlayerHtml();
	el.appendChild(elChild);
	listenQualitySwitching();

	var video = document.getElementById('video');
	var videoContainer = document.getElementById('player');
	var videoControls = document.getElementById('video-controls');
	var volume = document.getElementById('volume');
	var volumeBar = document.getElementById('volumeBar');
	var vidDuration = document.getElementById('vidDuration');
	var vidCurrDuration = document.getElementById('vidCurrDuration');
	var vidDurationEl = document.createElement('span');
	var vidCurrDurationEl = document.createElement('span');
	var playpause = document.getElementById('playpause');
	var stop = document.getElementById('stop');
	var mute = document.getElementById('mute');
	var progress = document.getElementById('progress');
	var progressBar = document.getElementById('progress-bar');
	var fullscreen = document.getElementById('fs');
	var loader = document.getElementById('loader');
	var qualityOverlay = document.getElementById('quality-overlay');
	var quality = document.getElementById('quality');

	quality.addEventListener('click',function(){
		if (qualityOverlay.style.visibility === 'visible'){
			qualityOverlay.style.visibility = 'hidden';
		} else {
			qualityOverlay.style.visibility = 'visible';
		}
	})
	el.addEventListener('click',function(e){
		//if(e.srcElement.attributes[0].value!=='quality') qualityOverlay.style.visibility='hidden';
	})
	video.addEventListener('loadedmetadata',function(){
	    vidDurationEl.innerHTML = video.duration.toFixed(2).toString().toHHMMSS(0);
		vidDuration.appendChild(vidDurationEl);
	});
	video.addEventListener('seeking',function(){
		loader.className = 'loader';
	})
	video.addEventListener('seeked',function(){
		loader.className = 'loader no-display';
	})
	video.addEventListener('waiting',function(){
		loader.className = 'loader';
	})
	video.addEventListener('playing',function(){
		loader.className = 'loader no-display';
	})
	video.addEventListener('timeupdate', function() {
		vidCurrDurationEl.innerHTML = video.currentTime.toFixed(2).toString().toHHMMSS(1);
		vidCurrDuration.appendChild(vidCurrDurationEl);
		if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
		progress.value = video.currentTime;
		progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
	});
	String.prototype.toHHMMSS = function(el){
	    var sec_num = parseInt(this, 10);
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);
	    if(hours<10){hours = "0"+hours;}
	    if(minutes<10){minutes = "0"+minutes;}
	    if(seconds<10){seconds = "0"+seconds;}
	    if(hours=="00"&&!el){return minutes+':'+seconds;}
	    else if(!el&&hours!=="00"){return hours+':'+minutes+':'+seconds;}
	    else if(el&&hours!=="00")return '/'+hours+':'+minutes+':'+seconds;
	    else if(el&&hours==="00")return '/'+minutes+':'+seconds;
	}
	var isFirstPlay = true
	var playOrPauseVideo = function () {
		if(isFirstPlay) {video.play();playpause.className='pause-icon';isFirstPlay=false}
		else if(!isFirstPlay&&video.paused){video.play();playpause.className='pause-icon';}
		else if(!video.paused){video.pause();playpause.className='play-icon';}
	}
	var ifAutoPlay = function () {
		if (options) {
			if (options.autoplay) playOrPauseVideo()
		}
	}
	ifAutoPlay()
	var videoOverlay = document.getElementsByClassName('inputs-overlay')[0]
	videoOverlay.addEventListener('click', function(e) {
		playOrPauseVideo();
	});
	playpause.addEventListener('click', function(e) {
		playOrPauseVideo();
	});
	stop.addEventListener('click', function(e) {
	   video.pause();
	   playpause.className='play-icon';
	   video.currentTime=0;
	   progress.value=0;
	});
	var volBeforeMute = null;
	mute.addEventListener('click', function(e) {
		if(video.muted){
			mute.className='mute-icon';volumeBar.style.width=(volBeforeMute*100)+'%';
			video.volume=volBeforeMute;
		}
		else{
			volBeforeMute = video.volume;
			mute.className='unmute-icon';volumeBar.style.width='0%';video.volume=0;
		}
		video.muted=!video.muted;
	});
	var alterVolume = function(dir) {
		var currentVolume=Math.floor(video.volume * 10) / 10;
		if(dir==='+'){if (currentVolume < 1) video.volume += 0.1;}
		else if(dir === '-'){if(currentVolume > 0) video.volume -= 0.1;}
	}
	progress.addEventListener('click', function(e) {
		var pos = ((e.pageX - this.offsetLeft) / this.offsetWidth);
		var currTime = video.currentTime;
		var vidDuration = video.duration;
		currTime = (vidDuration * pos);
		video.currentTime = currTime;
	});
	var fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
	if(!fullScreenEnabled){fullscreen.style.display='none';}
	fs.addEventListener('click', function(e) {
	    handleFullscreen();
	});
	var handleFullscreen = function() {
		if (isFullScreen()) {
			if (document.exitFullscreen) document.exitFullscreen();
			else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
			else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
			else if (document.msExitFullscreen) document.msExitFullscreen();
			setFullscreenData(false);
		}
		else {
			if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
			else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
			else if (videoContainer.webkitRequestFullScreen) videoContainer.webkitRequestFullScreen();
			else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
			setFullscreenData(true);
		}
	}
	var isFullScreen = function() {
	   return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
	}
	var setFullscreenData = function(state) {
	   videoContainer.setAttribute('data-fullscreen', !!state);
	   var videoControls=document.getElementById('video-controls');
	   if(state){isFullScreenState=true;videoControls.className += ' fullscreen-controls';} 
	   else{isFullScreenState=false;videoControls.className='controls';}
	}
	document.addEventListener('fullscreenchange', function(e) {
		console.log("fullScreen change")
	   setFullscreenData(!!(document.fullScreen || document.fullscreenElement));
	});
	document.addEventListener('webkitfullscreenchange', function() {
	   setFullscreenData(!!document.webkitIsFullScreen);
	});
	document.addEventListener('mozfullscreenchange', function() {
	   setFullscreenData(!!document.mozFullScreen);
	});
	document.addEventListener('msfullscreenchange', function() {
		console.log("fullScreen change ms")
	   setFullscreenData(!!document.msFullscreenElement);
	});
	//volume bar event
	var volumeDrag = false;
	volume.addEventListener('mousedown', function (e) {
	    volumeDrag = true;
	    video.muted = false;
	    mute.className = 'unmute-icon'
	    updateVolume(e.pageX);
	});
	document.addEventListener('mouseup', function (e) {
	    if(volumeDrag){volumeDrag = false;updateVolume(e.pageX);}
	});
	var isFullScreenState=false, isHiddenControls=false;
	var hideCursorControls = function(){
		if(isFullScreenState&&!isHiddenControls){isHiddenControls=true;var videoControls=document.getElementById('video-controls');videoControls.className='no-display';}
	}
	var showCursorControls = function(){
		if(isHiddenControls){isHiddenControls=false;var videoControls=document.getElementById('video-controls');videoControls.className='controls fullscreen-controls';}
	}
	var timingVar;
	document.addEventListener('mousemove', function(e){
	    if(volumeDrag){updateVolume(e.pageX);}
	    clearTimeout(timingVar);
	    if(isFullScreenState){showCursorControls();timingVar=setTimeout(hideCursorControls, 2000)}
	});
	var updateVolume = function(x,vol){
	    var percentage;
	    if(vol){percentage = vol * 100;} 
	    else{var position = x - volume.offsetLeft;percentage = 100 * position / volume.offsetWidth;}
		if(percentage>100){percentage = 100;}
	    if(percentage<0){percentage = 0;}
	    volumeBar.style.width = percentage+'%';
	    video.volume = percentage / 100;
	    if(video.volume===0){mute.className = 'unmute-icon';} 
	    else if(video.volume>0){mute.className = 'mute-icon';}
	};
}
