Rubpocalypse.Views.Form = Backbone.View.extend({
  events: {
    "keyup input": "checkForCompletion",
    "change input": "checkForCompletion"
  },
  initialize: function() {
    this.checkForCompletion();
  },
  show: function() {
    $(this.el).addClass("visible");
  },
  checkForCompletion: function() {
    var submit = this.$(":submit");
    if (this.isComplete())
      submit.removeAttr("disabled");
    else
      submit.attr("disabled",true);
  },
  isComplete: function() {
    return false;
  }
});