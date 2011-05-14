$(function() {
  new Rubpocalypse.OrderView({el:$("#order-form")});

  var form = $(".gate form");
  form.find("input").val('sekrit');
  form.submit();

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
    "focus input": "hidePasswordLabel",
    "submit form": "checkPassword"
  },
  hidePasswordLabel: function() {
    if (this.passwordBlank()) this.$("label").addClass("hidden");
  },
  showPasswordLabel: function() {
    if (this.passwordBlank()) this.$("label").removeClass("hidden");
  },
  passwordBlank: function() {
    return !this.$("input").val().length;
  },
  checkPassword: function(e) {
    e.preventDefault();
    if (this.currentPassword() === "sekrit")
      this.unlock();
    else
      this.incorrectPass();
  },
  currentPassword: function() {
    return this.$("input").val();
  },
  unlock: function() {
    soundManager.play('success');
    this.$("input").blur();
    $(this.el).addClass("unlocked");
  },
  incorrectPass: function() {
    soundManager.play('error');
  }
});