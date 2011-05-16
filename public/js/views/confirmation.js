Rubpocalypse.Views.Confirmation = Backbone.View.extend({
  show: function(number) {
    $(this.el).find(".number").text(number);
    $(this.el).addClass("visible");
    setTimeout(_.bind(function() { this.showPBJ(); }, this), 15000);
  },
  showPBJ: function() {
    this.loadPBJ(function(pbj) {
      pbj.appendTo("#order");
      _.defer(function() { pbj.addClass("boppin"); });
    });
  },
  loadPBJ: function(callback) {
    $("<img id='pbj'>")
      .load(function() { callback($(this)); })
      .attr("src", "/images/pjb-banana.gif");
  }
});