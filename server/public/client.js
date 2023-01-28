$(document).ready(onReady);

//  state
let usersInput = [];
let userMathInput = '';

function onReady() {
  console.log('in onReady... JQUERY is kicking');

  // equal btn
  $('#resultBtn').on('click', getUsersInput);

  // add btn
  $('#additionBtn').on('click', (event) => {
    event.preventDefault();
    setMath('+');
  });

  // subtraction btn
  $('#subtractionBtn').on('click', (event) => {
    event.preventDefault();
    setMath('-');
  });

  // multiply btn
  $('#multiplicationBtn').on('click', (event) => {
    event.preventDefault();
    setMath('*');
  });

  // divide btn
  $('#divisionBtn').on('click', (event) => {
    event.preventDefault();
    setMath('/');
  });

  // clear Btn
  $('#clearBtn').on('click', clearInput);
}

function setMath(input) {
  userMathInput = input;
}

// clear

function clearInput(event) {
  // empty out the input field for the next entry
  event.preventDefault();
  $('#firstNumberInput').val('');
  $('#secondNumberInput').val('');
}

function getUsersInput(event) {
  event.preventDefault();

  console.log('INSIDE usersInput ...');

  let newInputs = {
    firstNumberInput: $('#firstNumberInput').val(),
    secondNumberInput: $('#secondNumberInput').val(),
    mathInput: userMathInput,
  };

  console.log('newInputs = ', newInputs);

  $.ajax({
    type: 'POST',
    url: '/inputs',
    data: newInputs,
  }).then(function (response) {
    console.log('SUCCESS!!! for newInputs');

    // render new data to dom
    usersInput.push(newInputs);
    // render();
  });

  // render();
}
