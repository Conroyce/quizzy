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
      _view.destroy();
      var questionsController = new Controllers.Question(_view.element, id); //stuck here
      questionsController.showFirstQuestion();
    });
  };

  QuizView.prototype.destroy = function() {
    // this.remove();
  };

  

  window.Views = window.Views || {};
  window.Views.Quiz = QuizView;
})();
