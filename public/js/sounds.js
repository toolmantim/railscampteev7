Rubpocalypse.Sounds = (function() {

  var soundForName = function(name) {
    return $("#" + name + "-sound").get(0);
  };
  
  return {
    play: function(name) {
      if (!Modernizr.audio) return;
      var sound = soundForName(name);
      sound.pause();
      // Work-around for a Webkit bug:
      // http://code.google.com/p/chromium/issues/detail?id=25972
      sound.src = sound.src;
      sound.play();
    },
    pause: function(name) {
      if (!Modernizr.audio) return;
      soundForName(name).pause();
    }
  };
  
})();
