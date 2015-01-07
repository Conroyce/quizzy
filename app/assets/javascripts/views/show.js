(function() {
  

  var QuestView = function($el, questions) {
    this.element = $el;
    this.questions = questions;
    var _this = this;
    var score = 0;
    var cnt = 0;
    $('.quizzes-display').html("");
    $('.quest-form').html("");
    var template = $('.quiz-questions-template').html();
    var uncompiledTemplate = _.template(template);
    var $html = $(uncompiledTemplate({
        questions:this.questions[cnt]
      }));
      var $el = $($html); 
      $('.question-display').append($el);

    var dispQuest = function() {        
        
        $('.question-display').html("");

        var $html = $(uncompiledTemplate({
          questions:_this.questions[cnt]
        }));
        var $el = $($html); 
        $('.question-display').append($el);
       
      
    };  

     $('.question-display').on('click','.quest-submit',function(e) {
        e.preventDefault();
        var $ans = $('.quest-option').val();
        
         $.get("/quizzes/"+_this.questions[cnt].quiz_id+"/questions/"+_this.questions[cnt].id+"/check?answer="+$ans,
          function(res) { 
            console.log(res); 
            if (res.correct) {
              score++;
              $('.question-display').append("<p>Correct!</p>")     
            } else {
              $('.question-display').append("<p>Incorrect.</p>")      
            }

            if (cnt+1 == _this.questions.length) {
                var dispRes = function() {
                  $('.question-display').html("");
                  $('.question-display').append('<h3>You Finished with a score of ' + score + '</h3');
                };
                setTimeout(dispRes,1000);  
              } else {
                cnt++;  
                setTimeout(function(){ dispQuest(cnt) }, 1000);
              }   
        });


        // if (dispQuest() == "true") {
        //   $('.question-display').append('<p>Correct!</p>');
        //   setTimeout(function() { dispQuest(); },1000)
        // } else if(dispQuest() == "false") {
        //   $('.question-display').append('<p>Incorrect.</p>');
        //   setTimeout(function() { dispQuest(); },1000)
        // } else {
        //   dispQuest();
        // }
          
     });   
        
        
  };

  window.Views = window.Views || {};
  window.Views.Question = QuestView;
})();
// var dispQuest = function(num) {
//           $('.question-display').html("");
//           var choice = data[num].choices.split(";");
//           var template = $('.quiz-questions-template').html();
//           var uncompiledTemplate = _.template(template);

//           var compiledTemplate = uncompiledTemplate({
//               content: {
//                 question: data[num].question,
//                 id: data[num].id,
//                 answer: data[num].answer,
//                 choices: choice
//             }
//           });
//           var $el = $(compiledTemplate);
//           console.log($el);

          
//        };

       // 