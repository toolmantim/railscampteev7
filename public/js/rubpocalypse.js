Rubpocalypse = {};

Rubpocalypse.Views = {};
Rubpocalypse.Sounds = {};

Rubpocalypse.Utils = {
  // For suspense we want to ensure some things take at least Pi/2 seconds to
  // execute. A crude implementation.
  delayedForSuspense: function(callback) {
    setTimeout(callback, Math.floor(Math.PI/2 * 1000));
  }
};
