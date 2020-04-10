$('#signup').validate({
  rules: {
    name: {
      required: true,
      minlength: 5,
    },
    email: {
      required: true,
      email: true,
      remote: '/system/check_user',
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
    username: {
      required: true,
      remote: '/system/check_user',
    },
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
      remote: 'Username already exists!',
    },
    email: {
      required: 'Email is required field',
      email: 'It is invalid email',
      remote: 'Email already exists!',
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

$('#login').validate({
  rules: {
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
      minlength: 5,
    },
  },
  //For custom messages
  messages: {
    email: {
      required: 'Email is required field',
      email: 'Please provide valid email',
    },
    password: {
      required: 'Password is required',
      minlength: 'Enter at least 5 characters',
    },
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

$('#forget').validate({
  rules: {
    email: {
      required: true,
      minlength: 5,
      email: true,
    },
  },
  //For custom messages
  messages: {
    email: {
      required: 'Email is required',
      minlength: 'Enter at least 5 characters',
      email: 'Enter a valid email',
    },
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

$('#reset').validate({
  rules: {
    encrypted_password: {
      required: true,
      minlength: 5,
    },
    password_confirm: {
      equalTo: '#encrypted_password',
    },
  },
  //For custom messages
  messages: {
    encrypted_password: {
      minlength: 'Password must be more than 5 characters',
      required: 'Password is required field',
    },
    password_confirm: {
      equalTo: 'Password dont match',
    },
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
