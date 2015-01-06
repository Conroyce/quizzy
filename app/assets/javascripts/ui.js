$(function() {
  var getAll = function() {
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


    $('.quest-form').on('click','.quest-submit',function(e) {
      var $quiz = $('.quest-value').val();
      $.post("/quizzes",{"quiz[title]": $quest },function(status) {
        // console.log(status);
      });
    })
  }; 


  $('.quizzes-display').on('click','.quiz-inspect',function(e) {
    e.preventDefault();
    $('.quest-form').html("");
    var $id = $(this).data("id");
    var $title = $(this).html();
    console.log($id + " " + $title);
    $('.quizzes-display').html("");
    var template = $('.quiz-edit-template').html();
    var uncompiledTemplate = _.template(template);
    var compiledTemplate = uncompiledTemplate({
        content: {
          title: $title,
          id:$id
        }
    });
    var $el = $(compiledTemplate);
    $('.quizzes-display').append($el);


    $('.quizzes-display').on('click','.quiz-edit',function(e) {
      e.preventDefault();
      var $id = $(this).data("id");
      var $title = $(this).html();
      $('.quizzes-display').html("");
      var template = $('.edit-template').html();
      var uncompiledTemplate = _.template(template);
      var compiledTemplate = uncompiledTemplate({
          content: {
            title: $title,
            id:$id
          }
      });
      var $el = $(compiledTemplate);
      $('.quizzes-display').append($el);

      $('.quizzes-display').on('click','.add-submit',function(e) {
        e.preventDefault();
        var $id = $('.add-quest').data("id");
        console.log($id);
        var $quest = $('.add-quest').val();
        var $ans = $('input[name=ans]:checked').val();
        console.log($quest + " " + $ans);
        $.post('/quizzes/'+$id+"/questions",{
          "question[question]": $quest,
          "question[answer]": $ans,
          "question[choices]": "true;false",
          "question[type]": "boolean",
        },function(data) {console.log(data)});
      });                                       //WAS ABLE TO CREATE A QUESTION!!!
    })


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
            $.get('/quizzes/' + $quest + '/questions/' + data[cnt].id + "/check?answer=" + ans,function(res) {
              console.log(res.correct);
              if (res.correct) {
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
          })
      });          
    }); 
  });  
    

   getAll(); 
});       


 
  



