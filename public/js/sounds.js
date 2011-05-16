$(function() {

  Rubpocalypse.Sounds = {};

  $("audio").each(function() {
    Rubpocalypse.Sounds[$(this).attr("id").replace("-sound","")] = this;
  });

}());
