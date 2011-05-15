Rubpocalypse.Views.Form = Backbone.View.extend({
  emailPattern: /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  events: {
    "keyup input": "checkForCompletion",
    "change input": "checkForCompletion",
    "submit form": "transmit"
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
    return this.validCut() &&
           this.validSize() && 
           this.validName() &&
           this.validEmail();
  },
  validCut: function() {
    return this.$("input[name='cut']:checked").length;
  },
  validSize: function() {
    return this.$("input[name='size']:checked").length;
  },
  validName: function() {
    return $.trim(this.$("input[name='name']").val()).length;
  },
  validEmail: function() {
    return this.emailPattern.test($.trim(this.$("input[name='email']").val()));
  },
  transmit: function(e) {
    e.preventDefault();
    alert("TRANSMIT!");
  }
});