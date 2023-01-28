$(document).ready(onReady);

//  state
let usersInput = []; 

function onReady() {
    console.log('in onReady... JQUERY is kicking');
 
  $('#resultBtn').on('click', getUsersInput)
}

function getUsersInput() {

    console.log('INSIDE usersInput ...');

    let newInputs = {
        firstNumberInput: $('#firstNumberInput').val(),
        secondNumberInput: $('#secondNumberInput').val(),
    } 

    // empty out the input field for the next entry
    $('#firstNumberInput').val('');
    $('#secondNumberInput').val('');

    console.log('newInputs = ', newInputs);

    $.ajax({
        type: "POST",
        url: '/inputs',
        data: newInputs,

      }).then(function(response) {
          console.log("SUCCESS!!! for newInputs");

          // render new data to dom
          usersInput.push(newInputs);
            // render();
        }
      );

    // render(); 

}
