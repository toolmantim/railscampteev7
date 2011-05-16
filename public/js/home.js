$(function() {
  new Rubpocalypse.Views.Order({el:$("#order")});

  document.addEventListener("webkitAnimationEnd", function(e) {
    if (e.animationName == "fade-out-intro") $("html").removeClass("intro-animating");
  }, false);

  function skipIntro() {
    $("html").removeClass("intro-animating");
  }

  $("html").click(function() { skipIntro(); });

  // Make everything in the intro clickable for lil ol Mobile Safari
  $("#intro, #intro *").each(function() {
    this.onclick = function() {};
  });

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
  
  if (window.location.search.match(/autofill/)) {
    skipIntro();
    engageAutoFillRobot();
  }
  
});
