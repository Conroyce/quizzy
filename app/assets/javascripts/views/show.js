(function() {
  
  var QuestView = function($el, questions,controller,quiz_control) {
    this.element = $el;
    this.questions = questions;
    var quiz_controller = quiz_control
    var quest_controller = controller;
    var score_controller = new Controllers.Score($(".question-display"));
    console.log(quest_controller);
    var _this = this;
    
    $('.quizzes-display').html("");
    $('.quest-form').html("");

    var dispQuest = function(temp) {               
        $('.question-display').html("");
        var template = $(temp).html();
        var uncompiledTemplate = _.template(template);
        var $html = $(uncompiledTemplate({
          questions:_this.questions[quest_controller.cnt]
        }));
        var $el = $($html); 
        $('.question-display').append($el);         
    }; 

    dispQuest('.quiz-edit-template'); 

    $('.question-display').on('click','.quiz-inspect',function(e) {
      e.preventDefault();
      var $id = $(this).data("id");  
      dispQuest('.quiz-questions-template'); 

      $('.question-display').off();
      $('.question-display').on('click','.quest-submit',function(e) {
        e.preventDefault();
        var $ans = $('.quest-option').val();
        var quiz_id = _this.questions[quest_controller.cnt].quiz_id;
        var quest_id = _this.questions[quest_controller.cnt].id;
           
        quest_controller.checkAnswer(quiz_id,quest_id,$ans,quest_controller,_this.questions.length); 
            
        if (quest_controller.status == "end") {
          var dispRes = function() {
              $('.question-display').html("");
              $('.question-display').append('<h3>You Finished with a score of ' + quest_controller.score + '</h3>');
          };
          var $name = sessionStorage.name || "Guest";
          score_controller.create(quest_controller.score,$name,_this.questions[0].quiz_id);

          setTimeout(function() { dispRes() },1000);
          setTimeout(function() { 
            $('.question-display').html("");
            quiz_controller.showQuizzes(); 
            
          },2500);
             
        } else { 
          quest_controller.cnt++;  
          setTimeout(function(){ dispQuest('.quiz-questions-template'); }, 1000);
        }
        });  
    });
     
    $('.question-display').on('click','.quiz-edit',function(e) {
      e.preventDefault();
      dispQuest('.edit-template');

      $('.question-display').on('click','.add-submit',function(e) {
        e.preventDefault();
        var $ans = $('input[name=ans]:checked').val() || $('.blank-ans').val() || $('.mult-ans').val();
        var $id = _this.questions[0].quiz_id;
        var $quest = $('.add-quest').val() || $('.blank-quest').val() || $('.mult-quest').val();
        // console.log($ans+" "+$id+" "+$quest+" "+$('.mult-choice').val());
        if ($('.blank-ans').val()) {
          quest_controller.createQuestion($id,$quest,$ans,$ans,"blank");
        } else if($('.mult-ans').val()) { 
          var $choice = $('.mult-choice').val();
          quest_controller.createQuestion($id,$quest,$ans,$choice,"multiple");
        } else {
          quest_controller.createQuestion($id,$quest,$ans,"true;false","boolean");
        }
          
        dispQuest('.quiz-questions-template');  
        
      });
    });

    $('.question-display').on('click','.score-check',function(e) {
      e.preventDefault();
      score_controller.showScores(_this.questions[0].id,quest_controller);
    })
      
 };

  window.Views = window.Views || {};
  window.Views.Question = QuestView;
})();
