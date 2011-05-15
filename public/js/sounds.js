// We want document ready, to push these file loads to the back of the queue
$(document).ready(function() {

  var createSound = function(src) {
    var elem = document.createElement("audio");
    elem.preload = true;
    elem.loop = false;
    elem.src = src;
    $("body").append(elem);
    return audiojs.create(elem, {createPlayer: false, css: false});
  };
  
  Rubpocalypse.Sounds = {
    success: createSound("/sounds/success.mp3"),
    error: createSound("/sounds/error.mp3")
  };
  
});
