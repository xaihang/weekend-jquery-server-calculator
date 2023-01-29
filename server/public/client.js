$(document).ready(onReady);

let currentNumberInputs = '';
let mathInput = '';
let firstNumberInput = '';
let secondNumberInput = '';

function onReady() {
    getHistoryLogs();
  $('.btn').on('click', selectedInputs);
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
    //when user slected an mathInput assign the mathInput to mathInput variable
    mathInput = inputClicked;
  }

  //add selected input to currentNumberInputs to get display
  currentNumberInputs = currentNumberInputs.concat(inputClicked);

  if (inputClicked === '=') {
    postUsersInput();
    // console.log('firstNumberInput', firstNumberInput);
    // console.log('mathInput', mathInput);
    // console.log('secondNumberInput', secondNumberInput.substring(1));
  } else {
    $('.calculator-screen').val(currentNumberInputs);
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
    // getResult();
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