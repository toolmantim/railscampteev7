$(function() {
  new Rubpocalypse.Views.Order({el:$("#order")});

  document.addEventListener("webkitAnimationEnd", function(e) {
    if (e.animationName == "fade-out-intro") $("html").removeClass("intro-animating");
  }, false);

  if (window.location.search.match(/autofill/)) {
    skipIntro();
    engageAutoFillRobot();
  }
  
  $("html").click(function() { skipIntro(); });

  function skipIntro() {
    $("html").removeClass("intro-animating");
  }

  function engageAutoFillRobot() {
    setTimeout(function() {
      var f = $(".gate form");
      f.find("input").val("sekrit");
      f.submit();
    }, 500);
    setTimeout(function() {
      var f = $(".form form");
      f.find(".cut input:first").attr("checked", "checked");
      f.find(".size input:first").attr("checked", "checked");
      f.find("input[name='name']").val("Jesus");
      f.find("input[name='email']").val("holy@jesus.com");
      f.submit();
    }, 4000);
  }
  
});
