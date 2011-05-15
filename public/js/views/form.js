Rubpocalypse.Views.Form = Backbone.View.extend({
  emailPattern: /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  events: {
    "submit form": "submitForm"
  },
  initialize: function() {
    _.bindAll(this, "transmissionComplete");
  },
  show: function(password) {
    this.password = password;
    $(this.el).addClass("visible");
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
  submitForm: function(e) {
    e.preventDefault();
    if (this.isComplete()) {
      Rubpocalypse.Sounds.success.play();
      this.transmit();
    } else {
      Rubpocalypse.Sounds.error.play();
    }
  },
  transmit: function() {
    // Do this before we disable the fields
    var formData = this.formData();
    this.$("input").attr("disabled","disabled");
    this.startTransmission(formData);
  },
  startTransmission: function(data) {
    var steps = 100,
        // Function to wait for AJAX and all steps
        finishTransmission = _.after(1 + steps, this.transmissionComplete);
    this.sendData(data, finishTransmission);
    this.startPercentageCounter(steps, finishTransmission);
  },
  startPercentageCounter: function(steps, callback) {
    _(_.range(1, steps+1, 100/steps)).each(_.bind(function(i) {
      this.showPercentage(i, callback);
    }, this));
  },
  showPercentage: function(tick, callback) {
    setTimeout(_.bind(function() {
      this.setStatus(tick + "% transmitted");
      callback();
    }, this), tick * 20);
  },
  sendData: function(data, callback) {
    $.ajax({
      url: this.$("form").attr("action"),
      type: this.$("form").attr("method"),
      data: data,
      context: this,
      statusCode: {200: callback}
    });
  },
  formData: function() {
    return [{name:"password", value:this.password}].concat(this.$("form").serializeArray());
  },
  setStatus: function(status) {
    this.$("header .status").text(status);
  },
  transmissionComplete: function() {
    Rubpocalypse.Utils.delayedForSuspense(_.bind(function() {
      $(this.el).removeClass("visible");
    }, this));
  }
});