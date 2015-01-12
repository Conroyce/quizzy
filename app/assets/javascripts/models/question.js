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

  Question.check = function(quiz_id,quest_id,answer,cb) {
    $.ajax({
      method: "GET",
      url: "/quizzes/"+quiz_id+"/questions/"+quest_id+"/check?answer="+answer,
      success:function(res) {
        if (cb) {
          return cb(res);
        }
      }  
    });
  };

  Question.create = function(quiz_id,quest,ans,choices,type) {
    $.post("/quizzes/"+quiz_id+"/questions",
      { question: {
          "question": quest,
          "answer": ans,
          "choices": choices,
          "question_type": type
      }} ,function(data) {
        console.log(data);
      });
  };

  Question.delete = function(quiz_id,quest_id,cb) {
    $.ajax({
      method: "DELETE",
      url: "/quizzes/"+quiz_id+"/questions/"+quest_id,
      success: function(data) {
        console.log(data);
      }
    });
  };

  window.Models = window.Models || {};
  window.Models.Question = Question;
})()