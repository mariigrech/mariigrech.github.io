
var timer;
var obj = document.createElement("audio");

$(function(){

  var name = sessionStorage.getItem("name");
  var icon = sessionStorage.getItem("icon");
  $("#namePlaceholder").html(name);
  $("#iconPlaceholder img").attr("src", icon);

  var summaryContent = $("#summaryContent").html();
  $("#summary").append(summaryContent);
  $("#summaryModal > div > div > .modal-body").append(summaryContent);

  $("#task1").hide();
  $("#task2").hide();
  $("#task3").hide();

  $("#timer1").hide();
  $("#timer2").hide();
  $("#timer3").hide();

  $("#hintPage").hide();

  $("#submitButton1").hide();
  $("#submitButton2").hide();
  $("#submitButton3").hide();

  $("#task1Hint").hide();
  $("#task2Hint").hide();
  $("#task3Hint").hide();

  $("#goToTask2Button").hide();
  $("#goToTask3Button").hide();
  $("#finishTasks").hide();

  $('#audioModal').modal('show');

});

function playMusic() {
  var audio = sessionStorage.getItem("audio");

  if(audio != null){
    obj.src = "audio/" + audio;
    obj.volume = 0.1;
    obj.autoPlay = false;
    obj.preLoad = true;
    obj.controls = true;
    obj.play();
  }
}

function showSubmissionModal(task) {
  var dropboxSubmitLocation;

  if (task == 1) {
    dropboxSubmitLocation = "https://www.dropbox.com/sh/l4r3eiab8rq0eco/AABuWPXpRRoTcezSzlFTVWJPa?dl=0";
    $("#taskSubmittedButton").click(()=>{
      showTask2();
    });
  }
  else if (task == 2) {
    dropboxSubmitLocation = "https://www.dropbox.com/sh/chs4v8atu4013b1/AADzsRtIOGSgkzr7FSmGGjeta?dl=0";
    $("#taskSubmittedButton").unbind("click");
    $("#taskSubmittedButton").click(()=>{
      showTask3();
    });
  }
  else if (task == 3) {
    dropboxSubmitLocation = "https://www.dropbox.com/sh/uphmkevjslyij7i/AACA0AtyaqXOKBR3hG8jYlo6a?dl=0";
    $("#taskSubmittedButton").unbind("click");
    $("#taskSubmittedButton").click(()=>{
      submitLastTask();
    });
  }

  $("#submitDropboxLink").text(dropboxSubmitLocation);
  $("#submitDropboxLink").attr("href", dropboxSubmitLocation);

  $("#submitModal").modal("show");
}

function showTask1() {
  $("#summaryPage").hide();
  $("#hintPage").hide();
  $("#task1").show();
  $("#timer1").show();
  resetTimer(1);
}

function showTask2() {
  sendTaskSubmissionTime(name, 1, $("#timer1").text());
  $("#hintPage").hide();
  $("#task1").hide();
  $("#task2").show();
  $("#timer1").hide();
  $("#timer2").show();
  clearInterval(timer);
  resetTimer(2);
}

function showTask3() {
  sendTaskSubmissionTime(name, 2, $("#timer2").text());
  $("#hintPage").hide();
  $("#task2").hide();
  $("#task3").show();
  $("#timer2").hide();
  $("#timer3").show();
  clearInterval(timer);
  resetTimer(3);
}

function resetTimer(taskNumber) {

  // Set the date we're counting down to
  var minutesToCountDown = 25.03;
  var countDownDate = new Date();
  countDownDate.setTime(countDownDate.getTime() + (minutesToCountDown * 60 * 1000));

  // Update the count down every 1 second
  timer = setInterval(function() {

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
      clearInterval(timer);

      obj.pause();
      obj.src = "audio/timeup.mp3";
      obj.volume = 0.1;
      obj.autoPlay = false;
      obj.preLoad = true;
      obj.controls = true;
      obj.play();

      setTimeout(function(){obj.pause();},10000);

      document.getElementById("timer" + taskNumber).innerHTML = "Remaining time for this task: EXPIRED";
    }
  }, 1000);
}

function showHint(task) {
  var remainingTime = $("#timer" + task).html();
  submitTask(task, remainingTime);
}

function submitTask(task, remainingTime) {
  $("#task" + task).hide();
  $("#timer"  + task).hide();
  $("#submitTitle").html("Hint for task " + task);
  $("#submitButton" + task).html("Submit task " + task);

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
    $("#submitButton2").hide();
    $("#submitButton3").show();
    $("#task2Hint").hide();
    $("#task3Hint").show();
  }

  $("#submitButton" + task).parent().attr("href", dropboxSubmitLocation);
  $("#task" + task + "Hint").parent().attr("href", dropboxHintLocation);
  $("#hintPage").show();
}

function submitButtonClicked(task) {
  sendTaskSubmissionTime(name, task, $("#timer" + task).text());

  $("#task" + task + "Hint").prop('disabled', false);

  if (task == '1') {
    $("#goToTask2Button").show();
  }
  else if (task == '2') {
    $("#goToTask2Button").hide();
    $("#goToTask3Button").show();
  }
  else if (task == '3') {
    $("#goToTask3Button").hide()
    ;
    $("#finishTasks").show();
  }
}

function submitLastTask() {
  sendTaskSubmissionTime(name, 3, $("#timer3").text());
  window.location.href = "finish.html";
}
