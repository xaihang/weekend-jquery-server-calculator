$(document).ready(onReady);

//  state
let usersInput = [];
let userMathInput = '';
let historyLogs = [];
let calculatedResult = '';

function onReady() {
  console.log('in onReady... JQUERY is kicking');

  // equal btn
  $('#resultBtn').on('click', postUsersInput);

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

  getHistoryLogs();
}

function setMath(input) {
  userMathInput = input;
}

// clear input
function clearInput(event) {
  // empty out the input field for the next entry
  event.preventDefault();
  $('#firstNumberInput').val('');
  $('#secondNumberInput').val('');
  $('#resultDisplay').empty();
}

function postUsersInput(event) {
  event.preventDefault();

  // bundled up newInput in an object to send to server
  let newInputs = {
    firstNumberInput: $('#firstNumberInput').val(),
    secondNumberInput: $('#secondNumberInput').val(),
    mathInput: userMathInput,
  };
  console.log('in postUsersInput - bundle it up in an object ', newInputs);

  // POST to the server side for new create inputs
  $.ajax({
    type: 'POST',
    url: '/calculated-result',
    data: newInputs,
  }).then(function (response) {
    console.log('ajax POST from client-side is successful');

    // after POST ---  created a GET to retrieve calculated result
    getResult();
  });
}

// GET to retrieve calculated result
function getResult() {
  $.ajax({
    method: 'GET',
    url: '/calculated-result',
  }).then(function (response) {
    console.log(
      'ajax GET in getResult() on client-side - got a response?',
      response
    );

    //  variable created to parse the object data into number
    calculatedResult = response.result;
    console.log(
      'ajax GET in getResult() on client-side - got a result?',
      calculatedResult
    );

    getHistoryLogs();
  });
}

function render() {
  $('#historyLogs').empty();
  $('#resultDisplay').empty();

  //display calculated result on DOM
  $('#resultDisplay').append(`
    <h2>${calculatedResult}</h2>`);

  // display history logs on DOM:
  for (let i = 0; i < historyLogs.length; i++) {
    let log = historyLogs[i];
    console.log('render log: ', log);

    $('#historyLogs').append(`
    <li>${log.firstNumberInput} ${log.mathInput} ${log.secondNumberInput} = ${log.calculatedResult}</li>
    `);
  }
}

// ----------------- HISTORY--------------//

function getHistoryLogs() {
  $.ajax({
    method: 'GET',
    url: '/history-logs',
  }).then(function (response) {
    console.log(
      'ajax GET in getHistory() on client-side - got a response?',
      response
    );

    historyLogs = response;
    console.log(
      'ajax GET in getHistory() on client-side - got a historylog?',
      historyLogs
    );

    // then call the render() to display the result on DOM
    render();
  });
}
