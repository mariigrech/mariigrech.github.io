$(function(){
  $("#task1").hide();
  $("#task2").hide();
  $("#task3").hide();
  $("#timer1").hide();
  $("#timer2").hide();
  $("#timer3").hide();
});

function showTask1() {
  $("#summary").hide();
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
  var minutesToCountDown = 25;
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
