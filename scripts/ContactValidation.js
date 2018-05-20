$(document).ready(function () {

  $("#contactForm").on("submit", function() {

    var formValid = true;

    var NameIsValid = $("#user_name").prop("validity").valid;
    if(NameIsValid) {
      $("#nameError").hide();
    } else {
      $("#nameError").show();
      formValid = false;
    }

    if($("#email").prop("validity").valueMissing) {
      $("#emailErrorNoEmail").show();
      formValid = false;
    } else {
      $("#emailErrorNoEmail").hide();
    }

    if($("#email").prop("validity").typeMismatch) {
      $("#emailErrorInvalEmail").show();
      formValid = false;
    } else {
      $("#emailErrorInvalEmail").hide();
    }

    var CommentIsValid = $("#comment").prop("validity").valid;
    if(CommentIsValid) {
      $("#commentError").hide();
    } else {
      $("#commentError").show();
      formValid = false;
    }
    return formValid
  });
});
