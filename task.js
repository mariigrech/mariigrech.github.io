var name = sessionStorage.getItem("name");

$(function(){

  var summaryContent = $("#summaryContent").html();
  $("#summary").append(summaryContent);
  $("#summaryModal > div > div > .modal-body").append(summaryContent);

  $("#task1").hide();
  $("#task2").hide();
  $("#task3").hide();

  $("#timer1").hide();
  $("#timer2").hide();
  $("#timer3").hide();

  $("#submitPage").hide();

  $("#submitButton1").hide();
  $("#submitButton2").hide();
  $("#submitButton3").hide();

  $("#task1Hint").hide();
  $("#task2Hint").hide();
  $("#task3Hint").hide();

  $('#audioModal').modal('show');

});

function playMusic() {
  var audio = sessionStorage.getItem("audio");

  if(audio != null){
    var obj = document.createElement("audio");
    obj.src = "audio/" + audio;
    obj.volume = 0.1;
    obj.autoPlay = false;
    obj.preLoad = true;
    obj.controls = true;
    obj.play();
  }
}

function showTask1() {
  $("#summaryPage").hide();
  $("#task1").show();
  $("#timer1").show();
  resetTimer(1);
}

function showTask2() {
  $("#task1").hide();
  $("#task2").show();
  $("#timer1").hide();
  $("#timer2").show();
  resetTimer(2);
}

function showTask3() {
  $("#task2").hide();
  $("#task3").show();
  $("#timer2").hide();
  $("#timer3").show();
  resetTimer(3);
}

function resetTimer(taskNumber) {

  // Set the date we're counting down to
  var minutesToCountDown = 25.03;
  var countDownDate = new Date();
  countDownDate.setTime(countDownDate.getTime() + (minutesToCountDown * 60 * 1000));

  // Update the count down every 1 second
  var x = setInterval(function() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="timer"
    document.getElementById("timer" + taskNumber).innerHTML = "Remaining time for this task: " + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("timer" + taskNumber).innerHTML = "Remaining time for this task: EXPIRED";
    }
  }, 1000);

}

function showHint(task) {
  var remainingTime = $("#timer" + task).html();
  submitTask(1, remainingTime);
}

function submitTask(task, remainingTime) {
  $("#task" + task).hide();
  $("#timer"  + task).hide();
  $("#submitTitle").html("Hint for task " + task);
  $("#submitButton" + task).html("Submit task " + task);

  $("#goToTask2Button").show();

  var dropboxSubmitLocation;
  var dropboxHintLocation;
  if (task == '1') {
    dropboxSubmitLocation = "https://www.dropbox.com/sh/l4r3eiab8rq0eco/AABuWPXpRRoTcezSzlFTVWJPa?dl=0";
    dropboxHintLocation = "https://www.dropbox.com/sh/r4iiw7f6rgep79c/AAAA14HoTd5e83NLcoy29bk1a?dl=0";
    $("#submitButton1").show();
    $("#task1Hint").show();
  }
  else if (task == '2') {
    dropboxSubmitLocation = "https://www.dropbox.com/sh/chs4v8atu4013b1/AADzsRtIOGSgkzr7FSmGGjeta?dl=0";
    dropboxHintLocation = "https://www.dropbox.com/sh/jcdhxtgplwl4vne/AABojtXhPSWZATgv97snGxoZa?dl=0";
    $("#submitButton1").hide();
    $("#submitButton2").show();
    $("#task1Hint").hide();
    $("#task2Hint").show();
  }
  else if (task == '3') {
    dropboxSubmitLocation = "https://www.dropbox.com/sh/uphmkevjslyij7i/AACA0AtyaqXOKBR3hG8jYlo6a?dl=0";
    dropboxHintLocation = "https://www.dropbox.com/sh/mn9f032iw7nuozk/AABZgNlCCPtSxQMyvnqiAviwa?dl=0";
    $("#task2Hint").hide();
    $("#task3Hint").show();
  }

  $("#submitButton" + task).parent().attr("href", dropboxSubmitLocation);
  $("#task" + task + "Hint").parent().attr("href", dropboxHintLocation);
  $("#submitPage").show();
}

function submitButtonClicked(task) {
  $("#task" + task + "Hint").prop('disabled', false);
}

function submitLastTask() {
  window.location.href = "finish.html";
}
