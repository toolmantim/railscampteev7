Rubpocalypse.Sounds = (function() {

  var soundForName = function(name) {
    return $("#" + name + "-sound").get(0);
  };
  
  return {
    play: function(name) {
      if (Modernizr.audio) soundForName(name).play();
    },
    pause: function(name) {
      if (Modernizr.audio) soundForName(name).pause();
    }
  }
  
})();

