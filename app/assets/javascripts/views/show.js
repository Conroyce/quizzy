(function() {
  

  var QuestView = function($el, questions) {
    this.element = $el;
    this.questions = questions;
    var quest_controller = new Controllers.Question(this.questions);
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
        
        dispQuest('.quiz-questions-template'); 

       $('.question-display').off();
       $('.question-display').on('click','.quest-submit',function(e) {
          e.preventDefault();
          var $ans = $('.quest-option').val();
          var quiz_id = _this.questions[quest_controller.cnt].quiz_id;
          var quest_id = _this.questions[quest_controller.cnt].id;
           
          quest_controller.checkAnswer(quiz_id,quest_id,$ans,quest_controller); 
            
             if (quest_controller.status == "end") {
               var dispRes = function() {
                    $('.question-display').html("");
                    $('.question-display').append('<h3>You Finished with a score of ' + quest_controller.score + '</h3>');
                };

               setTimeout(function() { dispRes() },1000); //continue
               setTimeout(function() { 
                $('.question-display').html("");
                var controller = new Controllers.Quiz($(".quizzes-display"));
                controller.showQuizzes(); 
                // $('.quizzes-display').off("click",".quiz",function)
               },2500);
             } else { 
               quest_controller.cnt++;  
               setTimeout(function(){ dispQuest('.quiz-questions-template'); }, 1000);
             }
        });  
    })
     
     $('.question-display').on('click','.quiz-edit',function(e) {
        e.preventDefault();
        dispQuest('.edit-template');

        $('.question-display').on('click','.add-submit',function(e) {
          e.preventDefault();
          var $ans = $('input[name=ans]:checked').val();
          var $id = $('.add-quest').data("id");
          var $quest = $('.add-quest').val();
          console.log($ans+" "+$id+" "+$quest);
          quest_controller.createQuestion($id,$quest,$ans,"true;false","boolean")
          // $.post('/quizzes/'+$id+"/questions",{
          //   "question[question]": $quest,
          //   "question[answer]": $ans,
          //   "question[choices]": "true;false",
          //   "question[type]": "boolean",
          // },function(data) {console.log(data)});
        });
     })
      
 };

  window.Views = window.Views || {};
  window.Views.Question = QuestView;
})();
