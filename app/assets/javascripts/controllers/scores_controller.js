(function() {
  var ScoreController = function(parentElement) {
    this.parentElement = parentElement;
  };

  ScoreController.prototype.create = function(score,user,quiz_id) {
    Models.Score.create(score,user,quiz_id);
  };

  ScoreController.prototype.showScores = function(quiz_id,quest_control) {
    var $el = $(this.parentElement);
    var score = this;
    var quest = quest_control;
    Models.Score.fetch(quiz_id,function(scores) {
      var scoreView = new Views.Score($el,scores,score,quest);
    }); 
  }; 

  window.Controllers = window.Controllers || {};
  window.Controllers.Score = ScoreController;
})()