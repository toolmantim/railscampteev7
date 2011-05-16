Rubpocalypse.Views.Confirmation = Backbone.View.extend({
  show: function(number) {
    $(this.el).find(".number").text(number);
    $(this.el).addClass("visible");
  }
});