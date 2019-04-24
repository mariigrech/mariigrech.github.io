var name;

$(function(){
    var loading = $('#loadbar').hide();
    $(document)
    .ajaxStart(function () {
        loading.show();
    }).ajaxStop(function () {
    	loading.hide();
    });

    $("#quizDiv").hide();

    var answers = [9];

    showQuestion(1, "Choose a colour:", "Red", "Blue", "Green", "Yellow");

    $("label.btn").on('click',function () {
    	var chosenAnswer = $(this).data('answer');
    	// $('#loadbar').show();
    	$('#quiz').fadeOut();
    	setTimeout(function(){
          switch($("#questionNumber").val()) {
            case '1':
              answers[0] = chosenAnswer;
              showQuestion(2, 'Choose a random number:', '7', '5', '1', '6');
              break;
            case '2':
              answers[1] = chosenAnswer;
              showQuestion(3, 'What type of animal do you identify yourself as?', 'Polar Bear', 'Cat', 'Owl', 'Dog');
              break;
            case '3':
              answers[2] = chosenAnswer;
              showQuestion(4, 'Choose a shape:', 'Square', 'Circle', 'Triangle', 'Rectangle');
              break;
            case '4':
              answers[3] = chosenAnswer;
              showQuestion(5, 'You have been asked back for that all important second interview, but this time it is a panel interview and you will be faced with five people. This can be intimidating. What is a good way to get through this?', 'Focus on the person talking to you at any given time', 'Pick one person and direct your answers only to him/her', 'Try to watch and talk to everyone at once', 'Talk to a point somewhere above their heads');
              break;
            case '5':
              answers[4] = chosenAnswer;
              showQuestion(6, 'Why did you leave your last job?', 'I need a new adventure and try out new things', 'I felt like I wasn not important and appreciated enough and lack of recognition', 'No Opportunity for advancement', 'Wage was not enough for me to cope with my everyday life/needs');
              break;
            default:
              sendResults(answers);
              break;
          }
          $('#quiz').show();
          // $('#loadbar').fadeOut();
    	}, 600);
    });

  $("label.btn").on('mouseenter',function () {
      var src = 'img/question_' + $("#questionNumber").val() + '/' + $(this).data('question') + '.png';
      $("#imgPlaceholder").attr('src', src);
      $("#imgPlaceholder").error(function(){
        if($("#imgPlaceholder").attr('src').indexOf('/0.png') == -1) // this is to prevent a for loop when image error occurs
          $("#imgPlaceholder").attr('src', 'img/question_' + $("#questionNumber").val() + '/0.png');
      });
  });

var obj = document.createElement("audio");

    $(".sound-start").on('click',function () {

      obj.pause();

      if($(this).val()){
        obj.src = "audio/" + $(this).val() + ".mp3";
        obj.volume = 0.1;
        obj.autoPlay = false;
        obj.preLoad = true;
        obj.controls = true;
        obj.play();
      }

    });


});

function showQuestion(number, title, answer1, answer2, answer3, answer4) {
  $("#questionNumber").val(number);
  $("#questionTitle").html(title);
  $("#quiz > label:nth-child(2)").html(answer1).data('answer', answer1).data('question', '1');
  $("#quiz > label:nth-child(3)").html(answer2).data('answer', answer2).data('question', '2');
  $("#quiz > label:nth-child(4)").html(answer3).data('answer', answer3).data('question', '3');
  $("#quiz > label:nth-child(5)").html(answer4).data('answer', answer4).data('question', '4');
  $("#imgPlaceholder").attr('src', 'img/question_' + number + '/0.png');
}

function nameSubmitted(){
  name = $("#nameinput").val();
  $("#nameInputDiv").hide();
  $("#quizDiv").show();
}

function sendResults(data){
    Email.send({
      Host : "smtp.mailtrap.io",
      Username : "b508ab347d19d1",
      Password : "87e5d764bacd44",
      To : "dummy@email.com",
      From : "dummy@email.com",
      Subject : "Results",
      Body : data
  }).then(
    message => alert("Results sent")
  );

}
