function autoFill() {
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

$(function() {
  new Rubpocalypse.Views.Order({el:$("#order")});
  autoFill();
});
