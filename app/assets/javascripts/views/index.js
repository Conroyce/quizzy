(function() {
  var QuizView = function($el, quizzes) {
    this.element = $el;
    this.quizzes = quizzes;
    var template = $('.quiz-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({quizzes: this.quizzes}));
    $el.append($html);
  };

  window.Views = window.Views || {};
  window.Views.Quiz = QuizView;
})();