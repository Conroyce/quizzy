(function() {
  var editView = function($el,quiz_controller,quest_controller,questions) {
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
    dispQuest($('.edit-template'));
  };

  window.Views = window.Views || {};
  window.Views.Edit = editView;
})()