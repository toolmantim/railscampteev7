// We want document ready, to push these file loads to the back of the queue
(function() {

  var createSound = function(src) {
    if (!(Modernizr.audio && (Modernizr.audio.mp3 || Modernizr.audio.ogg)))
      return {play: function() { }};
    var audio = document.createElement("audio");
    audio.setAttribute("preload", "auto");
    audio.setAttribute("src", "/sounds/" + src + "." + (Modernizr.audio.mp3 ? "mp3" : "ogg"));
    return audio;
  };
  
  Rubpocalypse.Sounds = {
    success: createSound("success"),
    error: createSound("error")
  };
  
}());
