var name;
var audio;

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
            case '6':
              answers[5] = chosenAnswer;
              showQuestion(7, 'What would you do if you made a mistake and no one noticed?', 'Try and fix it as best I can but feel guilty for doing it and putting my team mates behind.', 'Reach out to your team mates and try to fix it together', 'Ask your team-leader and explain the issue and ask how it can be fixed.', 'Ask someone from your team who can be more experienced on the subject to fix it for you. ');
              break;
            case '7':
              answers[6] = chosenAnswer;
              showQuestion(8, ' A new team member joins your team and he is a bit hard to work with. What would you do?', 'Keep a distance from him and try to focus on your own work', 'Try and talk to him about what he is doing and advise him about his actions.', 'Try and work with the other team mates and include him as much as possible', 'Talk to your team-lead or HR about him and try and find a solution on what can be done.');
              break;
            case '8':
              answers[7] = chosenAnswer;
              showQuestion(9, 'An issue arises at work and your team-lead is off on leave. How would you go about the situation?', 'Call the team-lead and ask for his opinion as he is the one that knows the best about the situation.', 'Take the issue into your own hands and try and fix it on your own.', 'Speak with your team mates about the issue and divide it amongst all of you.', 'Go and ask the head of your department about the issue and decide how to handle it. ');
              break;
            default:
              answers[8] = chosenAnswer;
              sendQuizResults(name, answers);
              $('#quizDiv .container').html('please wait while the results are being sent...');
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
        audio = $(this).val() + ".mp3";
        sessionStorage.setItem("audio", audio);
        obj.src = "audio/" + audio;
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
  $("label.questionLabel").removeClass("active");
}

function selectedImage(imageNumber, image) {
  $("div#iconImages > img").css("opacity", "0.5").removeClass('selected');
  $(image).css("opacity", "1.0").addClass('selected');
}

function nameSubmitted(){
  name = $("#nameinput").val();
  icon = $("#iconImages img.selected").clone();

  if(name == "" || !icon.length){
    alert('Please enter a name and select an image');
    return false;
  }

  icon.removeClass('col-3')

  sessionStorage.setItem("name", name);
  sessionStorage.setItem("icon", icon.attr('src'));
  $("#nameInputDiv").hide();
  $("#quizDiv").show();

  $("#namePlaceholder").html(name);
  $("#iconPlaceholder").html(icon);

}
