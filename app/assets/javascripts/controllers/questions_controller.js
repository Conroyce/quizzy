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

  QuestionsController.prototype.showFirstQuestion = function(quiz_control) {
    var $el = $(this.parentElement);
    var _controller = this;
    var id = this.id;
    var quiz_control = quiz_control
    Models.Question.fetch(id,function(questions) {
      _controller.questions = questions;
      var questView = new Views.Question($el, questions,_controller,quiz_control);
    });
  };
  //questionview(question,controller)
    //display question
    //create listeners

    //click submit
    //show nextquestion

  QuestionsController.prototype.showNext = function(question,controller) {
    if (controller.status == "end") {
          
      var $name = sessionStorage.name || "Guest";
      score_controller.create(quest_controller.score,$name,_this.questions[0].quiz_id);

      setTimeout(function() { dispRes() },1000); //possible new view >
      setTimeout(function() { 
        $('.question-display').html("");
        $('.add-name').show();
        $('.quest-form').show();
        quiz_controller.showQuizzes(); 
        
      },2500);                                   // possible new view <
         
    } else { 
      quest_controller.cnt++;  
      setTimeout(function(){ dispQuest('.quiz-questions-template'); }, 1000);
    }
      
    var questView = new Views.Question(question,controller);
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