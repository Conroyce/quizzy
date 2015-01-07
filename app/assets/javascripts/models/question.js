(function() {
  var Question = function(data) {
    this.question = data.question;
    this.answer = data.answer;
    this.choices = data.choices.split(";");
    this.quiz_id = data.quiz_id;
    this.id = data.id;
    this.question_type = data.question_type;
  };

  Question.fetch = function(id,cb) {
    $.ajax({
      method: "GET",
      url: "/quizzes/"+id+"/questions",
      success: function(questions) {
        var questObjs = questions.map(function(questData) {
          return new Question(questData);
        });
        if (cb) {
          cb(questObjs);
        }
      }
    })
  };

  window.Models = window.Models || {};
  window.Models.Question = Question;
})()