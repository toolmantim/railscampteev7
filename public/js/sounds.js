// We want document ready, to push these file loads to the back of the queue
(function() {

  var createSound = function(src, autoplay) {
    if (!(Modernizr.audio && (Modernizr.audio.mp3 || Modernizr.audio.ogg)))
      return {play:function() {}, pause:function() {}};
    var audio = document.createElement("audio");
    audio.setAttribute("preload", "auto");
    if (autoplay) audio.setAttribute("autoplay", "true");
    audio.setAttribute("src", "/sounds/" + src + "." + (Modernizr.audio.mp3 ? "mp3" : "ogg"));
    return audio;
  };
  
  Rubpocalypse.Sounds = {
    crickets: createSound("crickets", Modernizr.cssanimations),
    fireball: createSound("fireball"),
    explosion: createSound("explosion"),
    success: createSound("success"),
    error: createSound("error")
  };
  
}());
