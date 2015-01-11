(function() {
  var Quiz = function(data) {
    this.title = data.title;
    this.id = data.id;
  };

  Quiz.fetch = function(cb) {
    $.ajax({
      method: "GET",
      url: "/quizzes",
      success: function(quizzes) {
        var quizObjs = quizzes.map(function(quizData) {
          return new Quiz(quizData);
        });
        if (cb) {
          cb(quizObjs);
        }
      }
    });
  };

  Quiz.create = function(quiz,cb) {
    $.ajax({
      method: "POST",
      url: "/quizzes",
      data: {
        "quiz[title]": quiz
      }, success: function(data) {
        if(cb) {
          cb(data)
        }
      }
    }); 
  };

  Quiz.update = function(id,newTitle) {
    $.ajax({
      method: "PUT",
      url: "/quizzes/"+id,
      data: {
        "quiz[title]":newTitle
      }, success: function(data) {
        console.log(data);
      }
    });
  };

  Quiz.delete = function(id) {
    $.ajax({
      method: "DELETE",
      url: "/quizzes/"+id,
      success: function(data) {
        console.log(data);
      }
    });
  };

  Quiz.prototype.save = function(cb) {
    // use this.id, this.title to make ajax request
  };

  window.Models = window.Models || {};
  window.Models.Quiz = Quiz;
})();