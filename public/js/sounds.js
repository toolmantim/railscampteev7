Rubpocalypse.Sounds = (function() {

  var soundForName = function(name) {
    return $("#" + name + "-sound").get(0);
  };
  
  return {
    play: function(name) {
      if (!Modernizr.audio) return;
      var sound = soundForName(name);
      // Can't play the same sound twice on Safari :( Chrome v13+ works.
      // http://jsfiddle.net/toolmantim/xEfSS/3/
      sound.play();
    },
    pause: function(name) {
      if (!Modernizr.audio) return;
      soundForName(name).pause();
    }
  };
  
})();
