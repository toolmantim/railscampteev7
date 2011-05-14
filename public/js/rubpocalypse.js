$(function() {
  new Rubpocalypse.OrderView({el:$("#order-form")});

  // var form = $(".gate form");
  // form.find("input").val('sekrit');
  // form.submit();

});

Rubpocalypse = {};

Rubpocalypse.OrderView = Backbone.View.extend({
  initialize: function() {
    var airlock = this.$(".airlock"),
        gateView = new Rubpocalypse.GateView({el:airlock.find(".gate")});
    gateView.bind("unlocked", function() { airlock.addClass("unlocked"); });
  }
});

Rubpocalypse.GateView = Backbone.View.extend({
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
    this.trigger("unlocked");
  },
  incorrectPass: function() {
    soundManager.play('error');
  }
});