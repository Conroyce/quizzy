(function() {

  var ScoreView = function($el,scores,score,quest) {
    this.element = $el;
    this.scores = scores;
    var score_controller = score;
    var quest_controller = quest;
    var _view = this;

    var topTen = function() {
      var ans = [];
      var res = [];
      var cnt = 0;
      for (var i = 0; i < _view.scores.length; i ++) {
        ans.push([_view.scores[i].id,_view.scores[i].score])
      }
      
      ans.sort(function(a,b) {return b[1] - a[1]})

      for (var j = 0; j < _view.scores.length; j++) {
        for (var k = 0; k < _view.scores.length; k++) {   
          if(cnt < 10 && ans[j][0] == _view.scores[k].id) {
            res.push(_view.scores[k]);
            cnt++;
          } else if (cnt == 10) {
            break;
          }
        }  
          
      }
      console.log(res);
      return res;
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
