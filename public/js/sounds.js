$(function() {

  Rubpocalypse.Sounds = {};

  $("audio").each(function() {
    Rubpocalypse.Sounds[$(this).id().replace("sound-","")] = this;
  });

}());
