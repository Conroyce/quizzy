(function() {
  var ScoreController = function(parentElement) {
    this.parentElement = parentElement;
  };

  ScoreController.prototype.create = function(score,user,quiz_id) {
    Models.Score.create(score,user,quiz_id);
  };

  window.Controllers = window.Controllers || {};
  window.Controllers.Score = ScoreController;
})()