Rubpocalypse.Sounds = (function() {

  var soundForName = function(name) {
    return $("#" + name + "-sound").get(0);
  };
  
  return {
    play: function(name) {
      if (!Modernizr.audio) return
      var sound = soundForName(name);
      sound.currentTime = 0;
      sound.play();
    },
    pause: function(name) {
      if (!Modernizr.audio) return;
      soundForName(name).pause();
    }
  }
  
})();

