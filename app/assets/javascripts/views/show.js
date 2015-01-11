(function() {
  
  var clear_all = function() {
      $('.quizzes-display').html("");
      $('.quest-form').hide();
      $('.add-name').hide();
  };

  var QuestView = function($el, questions,controller,quiz_control) {
    this.element = $el;
    this.questions = questions;
    var quiz_controller = quiz_control
    var quest_controller = controller;
    var score_controller = new Controllers.Score($(".question-display"));
    console.log(quest_controller);
    var _this = this;
    
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

    var dispRes = function() {
        $('.question-display').html("");
        $('.question-display').append('<h3>You Finished with a score of ' + quest_controller.score + '</h3>');
    };
    
    clear_all();

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
           
        quest_controller.checkAnswer(_this.questions,$ans,quest_controller,score_controller,_this.questions.length); 
            
        // quest_controller.next() ??

        if (quest_controller.status == "end") {

          setTimeout(function() { dispRes() },1000); // possible new view >
          setTimeout(function() { 
            $('.question-display').html("");
            $('.add-name').show();
            $('.quest-form').show();
            quiz_controller.showQuizzes(); 
            
          },2500);                                   // possible new view <
             
        } else {   
          setTimeout(function(){ dispQuest('.quiz-questions-template'); }, 1000);
        }
      });  
    });
     
    $('.question-display').on('click','.quiz-edit',function(e) {
      e.preventDefault();
      var inter = new Controllers.Intermediate($('.quizzes'));
      inter.showOptions(quest_controller,_this.questions);
    });

    $('.question-display').on('click','.score-check',function(e) {
      e.preventDefault();
      score_controller.showScores(quest_controller);
    })
      
 };

  window.Views = window.Views || {};
  window.Views.Question = QuestView;
})();
