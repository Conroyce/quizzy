(function() {
  var QuizView = function($el, quizzes) {
    this.element = $el;
    this.quizzes = quizzes;
    var template = $('.quiz-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({quizzes: this.quizzes}));
    $el.append($html);
  
    var _view = this;
    $html.children('.quiz').on('click', function() {
      var id = $(this).data("id");

      var questionsController = new Controllers.Question(_view.element, id); 
      questionsController.showFirstQuestion();
    });
  };
  

  window.Views = window.Views || {};
  window.Views.Quiz = QuizView;
})();

