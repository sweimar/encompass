function errorHandler(error) {
  console.error('an error occured: ' + JSON.stringify(error) );
  Ember.$.post('/api/errors', {
    error: error,
    stack: error.stack,
    message: error.message,
    arguments: arguments
  });

  // var errorMsg = 'There was an error.  We recommend reloading the page to ensure your data has been saved and to prevent further errors';

  var errorMsg = JSON.parse(error);
  var errors = error.errors;
  var is404;


  if (Array.isArray(errors) && errors[0]) {
    is404 = errors[0].status === '404';
  }

  if (is404) {
    return;
  }

  if (Array.isArray(errorMsg)) {
    errorMsg.forEach((err) => {
      window.alert(JSON.stringify(err));
    });
  } else {
    window.alert(JSON.stringify(errorMsg));
  }
};

if(Ember) {
  Ember.onerror = errorHandler;
}

window.onerror = errorHandler;
