Rubpocalypse.Views.Gate = Backbone.View.extend({
  events: {
    "blur input": "showPasswordLabel",
    "focus input": "hidePasswordLabel",
    "submit form": "checkPassword"
  },
  initialize: function() {
    if (this.$("input").is(":focus") || !this.passwordBlank()) this.hidePasswordLabel();
  },
  hidePasswordLabel: function() {
    this.$("label").addClass("hidden");
  },
  showPasswordLabel: function() {
    if (this.passwordBlank()) this.$("label").removeClass("hidden");
  },
  passwordBlank: function() {
    return !this.$("input").val().length;
  },
  checkPassword: function(e) {
    e.preventDefault();
    // Do this before we disable the input
    var password = this.password();
    this.$("input").attr("disabled","disabled").val(null).blur();
    this.showPasswordLabel();
    this.verifyingPassword();
    Rubpocalypse.Utils.delayedForSuspense(_.bind(function() {
      $.ajax({
        url: this.$("form").attr("action"),
        type: this.$("form").attr("method"),
        data: {password:password},
        context: this,
        statusCode: {
          200: function() { this.unlock(password); },
          401: function() { this.incorrectPassword(); }
        }
      });
    }, this));
  },
  password: function() {
    return this.$("input").val();
  },
  verifyingPassword: function() {
    $(this.el).addClass("verifying");
    this.$("label").text("Verifying");
  },
  unlock: function(password) {
    $(this.el).removeClass("verifying").addClass("success");
    this.setLabel("Authorised");
    Rubpocalypse.Sounds.success.play();
    setTimeout(_.bind(function() {
      $(this.el).addClass("unlocked");
      this.trigger("unlocked", password);
    }, this), 650);
  },
  incorrectPassword: function() {
    $(this.el).removeClass("verifying").addClass("error");
    this.setLabel("Access denied");
    Rubpocalypse.Sounds.error.play();
    setTimeout(_.bind(function() {
      $(this.el).removeClass("error");
      this.$("input").removeAttr("disabled");
      this.setLabel(null);
      this.showPasswordLabel();
    }, this), 1500);
  },
  setLabel: function(label) {
    this.$("label").text(label ? label : "Passphrase");
  }
});