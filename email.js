function sendQuizResults(data){
    Email.send({
      Host : "smtp.mailtrap.io",
      Username : "b508ab347d19d1",
      Password : "87e5d764bacd44",
      To : "dummy@email.com",
      From : "dummy@email.com",
      Subject : "Results",
      Body : data
  }).then(
    message => {
      alert("Results sent");
      window.location.href = "task.html";
    }
  );

}
