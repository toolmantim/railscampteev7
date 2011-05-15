Rubpocalypse.Views.Order = Backbone.View.extend({
  initialize: function() {
    var airlock = this.$(".airlock");
    
    var gateView = new Rubpocalypse.Views.Gate({el:airlock.find("> .gate")}),
        formView = new Rubpocalypse.Views.Form({el:airlock.find("> .form")}),
        confirmationView = new Rubpocalypse.Views.Confirmation({el:airlock.find("> .confirmation")});
    
    gateView.bind("unlocked", function(password) {
      setTimeout(function() { formView.show(password); }, 700);
    });
    
    formView.bind("complete", function() {
      setTimeout(function() { confirmationView.show(); }, 500);
    });
  }
});