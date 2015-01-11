(function() {
  var QuizController = function(parentElement) {
    this.parentElement = parentElement;
    this.title = "";
  };

  QuizController.prototype.showQuizzes = function() {
    var $el = $(this.parentElement);
    var _controller = this
    Models.Quiz.fetch(function(quizzes) {
      var quizView = new Views.Quiz($el, quizzes, _controller);
    });
  };

  QuizController.prototype.showEdit = function(questions,quest_controller) {
    quiz_controller = this;
    var $el = $(this.parentElement);
    var editView = new Views.Edit($el,quiz_controller,quest_controller,questions);
  };

  QuizController.prototype.create = function(quiz) {
    var _this = this;
    Models.Quiz.create(quiz,function(data) {
      _this.title = data.entity.title;
    });
  };

  QuizController.prototype.quit = function() {
    sessionStorage.clear();
    this.showQuizzes();
  };
  
  QuizController.prototype.setUser = function(name) {
    sessionStorage.name = name;
  };

  QuizController.prototype.update = function(quiz_id,newTitle) {
    Models.Quiz.update(quiz_id,newTitle);
  };

  QuizController.prototype.delete = function(id) {
    Models.Quiz.delete(id);
  };

  window.Controllers = window.Controllers || {};
  window.Controllers.Quiz = QuizController;
})();