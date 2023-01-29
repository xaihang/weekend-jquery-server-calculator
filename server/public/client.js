$(document).ready(onReady);

let currentNumberInputs = '';
let mathInput = '';
let firstNumberInput = '';
let secondNumberInput = '';
let historyLogs = [];

async function onReady() {
  await getHistoryLogs();
  $('.btn').on('click', selectedInputs);
  $('#deleteBtn').on('click', onDeleteBtn);
}

function selectedInputs() {
  //getting number being click on
  const inputClicked = $(this)[0].innerText;
  if (mathInput === '') {
    firstNumberInput = currentNumberInputs;
  }

  //checking if user selected an mathInput
  if (
    inputClicked === '+' ||
    inputClicked === '-' ||
    inputClicked === '*' ||
    inputClicked === '/'
  ) {
    if (mathInput !== '') {
      return;
    }

    //when user selected an mathInput assign the mathInput to mathInput variable
    mathInput = inputClicked;
  }

  //add selected input to currentNumberInputs to get display
  currentNumberInputs = currentNumberInputs.concat(inputClicked);

  if (inputClicked === '=') {
    postUsersInput();
    $('.calculator-screen').val('');
    currentNumberInputs = '';
    mathInput = '';
    firstNumberInput = '';
    secondNumberInput = '';
  } else {
    $('.calculator-screen').val(currentNumberInputs);
  }

  // when 'clear btn' clicked, reset to initial state
  if (inputClicked === 'Clear') {
    $('.calculator-screen').val('');
    currentNumberInputs = '';
    mathInput = '';
    firstNumberInput = '';
    secondNumberInput = '';
    $('#resultDisplay').empty();
  }

  if (mathInput !== '') {
    secondNumberInput = secondNumberInput.concat(inputClicked);
  }
}

function postUsersInput() {
  // bundled up newInput in an object to send to server
  let newInputs = {
    firstNumberInput,
    secondNumberInput: secondNumberInput.substring(1),
    mathInput,
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
    calculatedResult = response.result;
    getHistoryLogs();
  });
}

function render() {
  console.log('historyLogs', historyLogs);
  // create li element that have the history log
  let liElHistory = '';
  for (let i = 0; i < historyLogs.length; i++) {
    let log = historyLogs[i];
    console.log('render log: ', log);
    liElHistory += `
    <li>${log.firstNumberInput} ${log.mathInput} ${log.secondNumberInput} = ${log.calculatedResult}</li>
    `;
  }

  // empty history log and display each time before new append
  $('#historyLogs').empty();
  $('#resultDisplay').empty();

  //display history log on DOM
  $('#historyLogs').append(liElHistory);

  //updated code - display calculated result on the calculator screen
  $('.calculator-screen').val(calculatedResult);

  // og code - display the calculated result below cal UI
  // $('#resultDisplay').append(`
  //     <h2>${calculatedResult}</h2>`);
}

function getHistoryLogs() {
  $.ajax({
    method: 'GET',
    url: '/history-logs',
  }).then(function (response) {
    console.log('getHistoryLogs response', response);
    historyLogs = response;

    // then call the render() to display the result on DOM
    render();
  });
}

function onDeleteBtn() {
  historyLogs = [];
  $('#historyLogs').empty();
}
