$(document).ready(function() {
  if (contactForm().length == 0) {
    return;
  }

  bindFieldErrorMessageAndValidate("name");
  bindFieldErrorMessageAndValidate("email");
  bindFieldErrorMessageAndValidate("message");

  contactForm().submit(function(event) {
    event.preventDefault();

    if (contactFormField("cage").val() != "") {
      alert(contactFormMessages("successSubmission"));

      return;
    }

    $.ajax({
      type: "POST",
      dataType: "json",
      url: $(this).attr("action"),
      data: $(this).serialize()
    })
    .done(function(data, textStatus, jqXHR) {
      cleanContactFormField();
      alert(contactFormMessages("successSubmission"));
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      cleanContactFormField();
      alert(contactFormMessages("failedSubmission"));
    });
  });
});

var bindFieldErrorMessageAndValidate = function(fieldName) {
  bindFieldErrorMessage(fieldName, true);
};

var bindFieldErrorMessage = function(fieldName, checkValidity) {
  var field = contactFormField(fieldName);

  field.on("valid invalid input", function (event) {
    var validity = event.originalEvent.target.validity;

    if (validity.typeMismatch || validity.valueMissing) {
      field.get(0).setCustomValidity(contactFormMessages(fieldName + "Error"));
    } else {
      field.get(0).setCustomValidity("");
    }
  });

  if (checkValidity) {
    field.get(0).checkValidity();
  }
};

var cleanContactFormField = function() {
  contactFormField("name").val("");
  contactFormField("email").val("");
  contactFormField("message").val("");

  contactFormFieldDOMObject("name").setCustomValidity("");
  contactFormFieldDOMObject("email").setCustomValidity("");
  contactFormFieldDOMObject("message").setCustomValidity("");
};

var contactForm = function() {
  return $("form[name=contact-form]");
};

var contactFormField = function(name) {
  return contactForm().find("[name=" + name + "]");
};

var contactFormFieldDOMObject = function(name) {
  return contactFormField(name).get(0);
};

var contactFormMessages = function(key) {
  var messages = {
    nameError: "The name can't be empty",
    emailError: "The email address is invalid",
    messageError: "The message can't be empty",
    successSubmission: "We received your submission, thanks!",
    failedSubmission: "An error occurred during the submission. Please, try again later.",
  };

  var mergedMessages = Object.assign(messages, window.contactFormMessagesTexts);

  if (mergedMessages[key] !== undefined) {
    return mergedMessages[key];
  }

  return "";
};
