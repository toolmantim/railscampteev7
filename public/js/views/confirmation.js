Rubpocalypse.Views.Confirmation = Backbone.View.extend({
  show: function(number) {
    $(this.el).find(".number").text(number);
    $(this.el).addClass("visible");
    setTimeout(_.bind(function() { this.showPBJ(); }, this), 10000);
  },
  showPBJ: function() {
    $("<img id='pbj'>")
      .load(function() {
        $(this).appendTo("#order");
        _.defer(_.bind(function() { $(this).addClass("boppin"); }, this));
      })
      .attr("src", "/images/pjb-banana.gif");
  }
});