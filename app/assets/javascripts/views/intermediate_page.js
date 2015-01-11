(function() {
  var intermediateView = function($el,controller,quest_controller,questions) {
    this.questions = questions;
    var _this = this;

    var dispQuest = function(temp) {               
        $('.question-display').html("");
        var template = $(temp).html();
        var uncompiledTemplate = _.template(template);
        var $html = $(uncompiledTemplate({
          questions: _this.questions[quest_controller.cnt]
        }));
        var $el = $($html); 
        $('.question-display').append($el);         
    }; 

    dispQuest('.edit-template');
    $('.question-display').on('click','.add-submit',function(e) {
        e.preventDefault();
        var $ans = $('input[name=ans]:checked').val() || $('.blank-ans').val() || $('.mult-ans').val();
        var $id = _this.questions[0].quiz_id;
        var $quest = $('.add-quest').val() || $('.blank-quest').val() || $('.mult-quest').val();
        
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
  };

  window.Views = window.Views || {};
  window.Views.Intermediate = intermediateView;
})()