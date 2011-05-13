$(function() {
  new Rubpocalypse.OrderView({el:$("#order-form")});
});

Rubpocalypse = {};

Rubpocalypse.OrderView = Backbone.View.extend({
  initialize: function() {
    new Rubpocalypse.AirlockView({el:this.$(".airlock")});
  }
});

Rubpocalypse.AirlockView = Backbone.View.extend({
  events: {
    "blur input": "showPasswordLabel",
    "focus input": "hidePassordLabel",
    "submit form": "checkPassword"
  },
  initialize: function() {
    this.hidePassordLabel();
  },
  showPasswordLabel: function() {
    // TODO
  },
  hidePassordLabel: function() {
    // TODO
  },
  checkPassword: function(e) {
    e.preventDefault();
    if (this.currentPassword() === "sekrit") this.unlock();
  },
  currentPassword: function() {
    return this.$("input").val();
  },
  unlock: function() {
    $(this.el).addClass("unlocked");
  }
});