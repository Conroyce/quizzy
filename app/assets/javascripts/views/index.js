(function() {
  var QuizView = function($el, quizzes) {
    this.element = $el;
    this.quizzes = quizzes;
    var _view = this;
    var controller = new Controllers.Quiz($(".quizzes-display"));
    if (sessionStorage.name) {
      $('.name-add').hide();
      $('.name').html(sessionStorage.name);
    } else {
      $('.name-add').show();
      $('.name-show').hide();
    }
    
    $('.quit').on('click',function(e) {
      e.preventDefault();
      sessionStorage.clear();
      $('.quizzes-display').html("");
      controller.showQuizzes();
    })
    $('.name-add').on('click','.name-submit',function(e) {
      e.preventDefault();
      var $name = $('.name-input').val();
      sessionStorage.name = $name;
      $('.name-add').hide();
      $('.name').html(sessionStorage.name);
      $('.name-show').show();
    })
    var template = $('.quiz-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({quizzes: _view.quizzes}));
    $el.append($html);
    
    $('.quest-form').on('click','.quest-submit',function() {
      var $quiz = $('.quest-value').val();
      controller.create($quiz);
    })
   

    $html.children('.quiz').on('click', function() {
      var id = $(this).data("id");

      var questionsController = new Controllers.Question(_view.element, id); 
      questionsController.showFirstQuestion();
    });
  };
  

  window.Views = window.Views || {};
  window.Views.Quiz = QuizView;
})();

