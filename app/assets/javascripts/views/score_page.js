(function() {

  var ScoreView = function($el,scores,score,quest) {
    this.element = $el;
    this.scores = scores;
    var score_controller = score;
    var quest_controller = quest;
    var _view = this;

    var topTen = function() {
      var ans = [];
      for (var i = 0; i < _view.scores.length; i ++) {
        if (i < 10) {
           ans.push(_view.scores[i]);
        } else {
          ans = ans.sort(function(a,b) {return b-a});
          if (ans[9] < _view.scores[i].score) {
            ans.push(_view.scores[i]);
            ans = ans.sort(function(a,b) {return b-a});
          }
        } 
      }
      return ans;
    };
    
    var topScores = topTen();
    var dispScores = function(scores) {
      $el.html("");
      var template = $('.score-template').html();
      var uncompiledTemplate = _.template(template);
      var $html = $(uncompiledTemplate({
        scores: scores
      }));
      $el.append($html);
    };
      
    dispScores(topScores);
  }

  window.Views = window.Views || {};
  window.Views.Score = ScoreView;
})();
