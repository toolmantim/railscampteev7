Rubpocalypse.Views.Gate = Backbone.View.extend({
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
    var input = this.$("input"),
        password = input.val();
    input.attr("disabled","disabled").val(null).blur();
    this.showPasswordLabel();
    this.verifyingPassword();
    // For suspense we want to ensure it takes at least Pi/2 seconds to verify
    setTimeout(_.bind(function() {
      $.ajax({
        url: this.$("form").attr("action"),
        type: this.$("form").attr("method"),
        data: {password:password},
        context: this,
        statusCode: {
          200: function() { this.unlock(); },
          401: function() { this.incorrectPassword(); }
        }
      });
    }, this), Math.floor(Math.PI/2 * 1000));
  },
  currentPassword: function() {
    return this.$("input").val();
  },
  verifyingPassword: function() {
    $(this.el).addClass("verifying");
    this.$("label").text("Verifying...");
  },
  unlock: function() {
    $(this.el).removeClass("verifying").addClass("success");
    this.setLabel("Authorised");
    Rubpocalypse.Sounds.success.play();
    setTimeout(_.bind(function() {
      $(this.el).addClass("unlocked");
      this.trigger("unlocked");
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