(function() {
  var QuestView = function($el, questions) {
    this.element = $el;
    this.questions = questions;
    $('.quizzes-display').html("");
    var template = $('.quiz-questions-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({
      questions:this.questions
    }));
    $el.append($html);
  };

  window.Views = window.Views || {};
  window.Views.Question = QuestView;
})();
