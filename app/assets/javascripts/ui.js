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
       var cnt = 0;
       var score = 0;

       var dispQuest = function(num) {
          $('.question-display').html("");
          var choice = data[num].choices.split(";");
          var template = $('.quiz-questions-template').html();
          var uncompiledTemplate = _.template(template);

          var compiledTemplate = uncompiledTemplate({
              content: {
                question: data[num].question,
                id: data[num].id,
                answer: data[num].answer,
                choices: choice
            }
          });
          var $el = $(compiledTemplate);
          console.log($el);

          $('.question-display').append($el);
       };

       dispQuest(cnt);
       $('.question-display').on('click','.quest-submit',function(e) {
          e.preventDefault();
            
            var ans = $('.quest-option').val();

            if (ans === data[cnt].answer) {
              score++;
              $('.question-display').append("<p>Correct!</p>");
            } else {
              $('.question-display').append("<p>Incorrect.</p>");
            }

            if (cnt+1 == data.length) {
              var dispRes = function() {
                $('.question-display').html("");
                $('.question-display').append('<h3>You Finished with a score of ' + score + '</h3');
              };
              setTimeout(dispRes,1000);  
            } else {
              cnt++;  
              setTimeout(function(){ dispQuest(cnt) }, 1000);
            }  
            
        })
    });          
 });
  
});       

        // data.forEach(function(v) {
        //   var choice = v.choices.split(";");
        //   console.log(choice);
        //   var template = $('.quiz-questions-template').html();
        //   var uncompiledTemplate = _.template(template);

        //   var compiledTemplate = uncompiledTemplate({
        //     content: {
        //       question: v.question,
        //       id: v.id,
        //       answer: v.answer,
        //       choices: choice
        //     }
        //   });

        //   var $el = $(compiledTemplate);
        //   console.log($el);

        //   $('.question-display').append($el);
        // });          
       

      //  var cnt = 0;
      //  while (cnt < data.length) {   
      //     var choice = data[cnt].choices.split(";");
      //     console.log(choice);
      //     var template = $('.quiz-questions-template').html();
      //     var uncompiledTemplate = _.template(template);

      //     var compiledTemplate = uncompiledTemplate({
      //       content: {
      //         question: data[cnt].question,
      //         id: data[cnt].id,
      //         answer: data[cnt].answer,
      //         choices: choice
      //       }
      //     });

      //     var $el = $(compiledTemplate);
      //     console.log($el);
      //     $('.question-display').append($el);
      //   $('.quizzes-display').on('click','.quest-submit',function(e) {
      //     e.preventDefault();
      //     console.log(cnt)
      //     var $option = $('option').val();
      //     console.log($option);
          
      //     cnt++;
      //   })
          
      // }  
 
  



