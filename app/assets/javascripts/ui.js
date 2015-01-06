$(function() {
  $.get('/quizzes',function(data) { 
    var quizDisplay = $('.quizzes-display');
    data.forEach(function(v) {
      var template = $('.quiz-template').html();
      var uncompiledTemplate = _.template(template);
      var compiledTemplate = uncompiledTemplate({
        content: {
          title: v.title,
          id:v.id
        }
      });
      // var newElem = $('<h1>');
      // newElem.text(v.title);
      // quizDisplay.append(newElem);
      // newElem.on('click',function() {
      //   //what you do when you click on a quiz
      // })
       var $el = $(compiledTemplate);
       $('.quizzes-display').append($el);
    });
  });
});

$(function() {
  $('.quest-form').on('click','.quest-submit',function(e) {
    var $quiz = $('.quest-value').val();
    $.post("/quizzes",{"quiz[title]": $quest },function(status) {
      // console.log(status);
    });
  })
})

$(function() {
  $('.quizzes-display').on('click','.quiz-inspect',function(e) {
    var $quest = $(this).data('id');
    $.get('/quizzes/'+$quest+'/questions',function(data) {
      // console.log(data);
      var quizDisplay = $('.quizzes-display');
      data.forEach(function(v) {
        var choices = v.choices.split(";");
        // console.log(choices);
        var template = $('.quiz-questions-template').html();
        // console.log(template);
        var uncompiledTemplate = _.template(template);
        var compiledTemplate = uncompiledTemplate({
          content: {
            question: v.question,
            id:v.id,
            answer: v.answer,
            choices: choices
          }
        });
        // console.log(compiledTemplate);
        var $el = $(compiledTemplate);
        console.log($el.html())
        $('.quizzes-display').append($el.html());
      });
    });
    
  });
})

