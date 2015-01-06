$(document).ready(function() {
  var controller = new Controllers.Quiz($(".quizzes-display"));
  controller.showQuizzes();
});

 var QuizView = function($el, quizzes) {
    this.element = $el;
    this.quizzes = quizzes;
    var template = $('.quizzes-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({quizzes: this.quizzes}));
    $el.append($html);

    var _view = this;
    $html.children('.quiz').on('click', function() {
      var id = $(this).data("id");
      _view.destroy();
      var questionsController = new Controller.QuestionsController(_view.element, id);
      questionsController.showFirstQuestion();
    });
    $el.append($html);
 };
