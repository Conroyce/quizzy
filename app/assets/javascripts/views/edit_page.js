(function() {
  var editView = function($el,quiz_controller,quest_controller,questions) {
    this.questions = questions;
    var _this = this;

    var dispQuest = function(temp) {               
        $('.question-display').html("");
        var template = $(temp).html();
        var uncompiledTemplate = _.template(template);
        var $html = $(uncompiledTemplate({
          questions: _this.questions[quest_controller.cnt],
          quiz: quiz_controller
        }));
        var $el = $($html); 
        $('.question-display').append($el);         
    };
    dispQuest($('.edit-template'));

    $('.question-display').on('click','.quiz-edit-submit',function(e) {
      e.preventDefault();
      var $title = $('.quiz-title').val();
      console.log($title);
      quiz_controller.update(quest_controller.id,$title);
      quiz_controller.showQuizzes();
    })
  };

  window.Views = window.Views || {};
  window.Views.Edit = editView;
})()