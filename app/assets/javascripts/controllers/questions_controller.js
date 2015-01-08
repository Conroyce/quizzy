(function() {
  var QuestionsController = function(parentElement, id) {
    this.parentElement = parentElement;
    this.id = id;
    this.score = 0;
    this.cnt = 0;
    this.status = "clean";
  };

  QuestionsController.prototype.createQuestion = function(quiz_id,quest,ans,choice,type) {
     Models.Question.create(quiz_id,quest,ans,choice,type);
  }

  QuestionsController.prototype.showFirstQuestion = function() {
    var $el = $(this.parentElement);
    var _controller = this;
    var id = this.id;
    Models.Question.fetch(id,function(questions) {
      var questView = new Views.Question($el, questions,_controller);
    });
  };

  QuestionsController.prototype.checkAnswer = function(quiz_id,quest_id,ans,control,len) {
    Models.Question.check(quiz_id,quest_id,ans,function(res) {
      console.log(res.correct+" "+control.cnt);
      if (res.correct) {
        control.score++;
        $('.question-display').append("<p>Correct!</p>")     
      } else {
        $('.question-display').append("<p>Incorrect.</p>")      
      }

      if (control.cnt == len-1) {
          control.status = "end"; 
      } else {
      }   
    });
  }; 

  QuestionsController.prototype.createScore = function(score,user,quiz_id) {
    Models.Question.createScore(score,user,quiz_id);
  };

  

  window.Controllers = window.Controllers || {};
  window.Controllers.Question = QuestionsController;
})()