(function() {
  var Score = function(data) {
    this.user = data.user;
    this.id = data.id;
    this.score = data.score;
  };

  Score.fetch = function(quiz_id,cb) {
    $.get("/scores",$.param({quiz_id: quiz_id}),function(scores) {
      var scoreObjs = scores.map(function(scoreData) {
        return new Score(scoreData);
      });
      if (cb) {
        cb(scoreObjs);
      }
    });
  };

  Score.create = function(score,user,quiz_id) {
    $.post("/scores",{
      "score[score]": score,
      "score[user]": user,
      "quiz_id": quiz_id
    }),function(data) {
      console.log(data);
    }
  }

  window.Models = window.Models || {};
  window.Models.Score = Score;
})()  