$('#signup').validate({
  rules: {
    name: {
      required: true,
      minlength: 5,
    },
    email: {
      required: true,
      email: true,
    },
    encrypted_password: {
      required: true,
      minlength: 5,
    },
    password_confirm: {
      equalTo: '#encrypted_password',
    },
    organization: {
      required: true,
    },
    username: 'required',
    mobile: {
      required: true,
      minlength: 11,
    },
    currency: 'required',
  },
  //For custom messages
  messages: {
    name: {
      required: 'Enter a name',
      minlength: 'Enter at least 5 characters',
    },
    username: {
      required: 'Username is required',
      minlength: 'ENter at least 5 characters',
    },
    email: {
      required: 'Email is required field',
      email: 'It is invalid email',
    },
    organization: 'Enter your organization name',
    currency: 'Please select currency',
  },
  encrypted_password: {
    minlength: 'Password must be more than 5 characters',
    required: 'Password is required field',
  },
  password_confirm: {
    equalTo: 'Password dont match',
  },
  mobile: {
    required: 'Mobile number is required field',
    minlength: 'Number must be of 11 characters',
  },
  errorElement: 'div',
  errorPlacement: function(error, element) {
    var placement = $(element).data('error')
    if (placement) {
      $(placement).append(error)
    } else {
      error.insertAfter(element)
    }
  },
})
$('select[required]').css({
  display: 'block',
  height: 0,
  padding: 0,
  width: 0,
  position: 'absolute',
})
