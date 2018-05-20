$(document).ready(function () {

  $("#donateForm").on("submit", function() {

    var formValid = true;

    var NameIsValid = $("#user_nameD").prop("validity").valid;
    if(NameIsValid) {
      $("#nameErrorD").hide();
    } else {
      $("#nameErrorD").show();
      formValid = false;
    }

    if($("#emailD").prop("validity").valueMissing) {
      $("#emailErrorNoEmailD").show();
      formValid = false;
    } else {
      $("#emailErrorNoEmailD").hide();
    }

    if($("#emailD").prop("validity").typeMismatch) {
      $("#emailErrorInvalEmailD").show();
      formValid = false;
    } else {
      $("#emailErrorInvalEmailD").hide();
    }

    var OccupationIsValid = $("#occupationD").prop("validity").valid;
    if(OccupationIsValid) {
      $("#occupationErrorD").hide();
    } else {
      $("#occupationErrorD").show();
      formValid = false;
    }

    var ReasonIsValid = $("#reason").prop("validity").valid;
    if(ReasonIsValid) {
      $("#reasonErrorD").hide();
    } else {
      $("#reasonErrorD").show();
      formValid = false;
    }
    return formValid
  });
});
