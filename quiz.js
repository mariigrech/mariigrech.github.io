$(function(){
    var loading = $('#loadbar').hide();
    $(document)
    .ajaxStart(function () {
        loading.show();
    }).ajaxStop(function () {
    	loading.hide();
    });

    showQuestion(1, "Choose a colour:", "Red", "Blue", "Green", "Yellow");

    $("label.btn").on('click',function () {
    	var chosenAnswer = $(this).find('input:radio').val();
    	$('#loadbar').show();
    	$('#quiz').fadeOut();
    	setTimeout(function(){
          switch($("#questionNumber").val()) {
            case '1':
              showQuestion(2, 'Choose a random number:', '7', '5', '1', '6');
              break;
            case '2':
              showQuestion(3, 'What type of animal do you identify yourself as?', 'Polar Bear', 'Cat', 'Owl', 'Dog');
              break;
            default:
              break;
          }
          $('#quiz').show();
          $('#loadbar').fadeOut();
    	}, 1500);
    });
});

function showQuestion(number, title, answer1, answer2, answer3, answer4) {
  $("#questionNumber").val(number);
  $("#questionTitle").html(title);
  $("#quiz > label:nth-child(2)").html(answer1);
  $("#quiz > label:nth-child(3)").html(answer2);
  $("#quiz > label:nth-child(4)").html(answer3);
  $("#quiz > label:nth-child(5)").html(answer4);
}
