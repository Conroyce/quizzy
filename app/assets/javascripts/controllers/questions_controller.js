(function() {
  var QuestionsController = function(parentElement, id) {
    this.parentElement = parentElement;
    this.id = id;
  };

  QuestionsController.prototype.showFirstQuestion = function() {
    var $el = $(this.parentElement);
    var $id = this.id;
    Models.Question.fetch($id,function(questions) {
      var questView = new Views.Question($el, questions);
    });
  };

  window.Controllers = window.Controllers || {};
  window.Controllers.Question = QuestionsController;
})()