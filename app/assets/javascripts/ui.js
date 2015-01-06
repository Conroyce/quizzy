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
    e.preventDefault();
    var $quest = $(this).data('id');
    $('.quest-form').html("");
    $('.quizzes-display').html("");
    $.get('/quizzes/'+$quest+'/questions',function(data) {

      data.forEach(function(v) {
        var choice = v.choices.split(";");
        console.log(choice);
        var template = $('.quiz-questions-template').html();
        var uncompiledTemplate = _.template(template);

        var compiledTemplate = uncompiledTemplate({
          content: {
            question: v.question,
            id: v.id,
            answer: v.answer,
            choices: choice
          }
        });

        var $el = $(compiledTemplate);
        console.log($el);

        $('.question-display').append($el);
      });
    });
    
  });
})



