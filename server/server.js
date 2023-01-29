const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

let historyLogs = [];
let calculatedResult = undefined;

// POST from client to server side responding to new created inputs
app.post('/calculated-result', (req, res) => {
  console.log('/calculated-result of the POST request', req.body);

  // capture the variables from req.body
  let firstNumberInput = Number(req.body.firstNumberInput);
  let secondNumberInput = Number(req.body.secondNumberInput);
  let mathInput = req.body.mathInput;

  // calculation logics for mathInputs
  switch (mathInput) {
    case '-':
      calculatedResult = firstNumberInput - secondNumberInput;
      break;
    case '*':
      calculatedResult = firstNumberInput * secondNumberInput;
      break;
    case '/':
      calculatedResult = firstNumberInput / secondNumberInput;
      break;
    default:
      calculatedResult = firstNumberInput + secondNumberInput;
      break;
  }

  console.log('the calculatedResult =', calculatedResult);

  // store the data
  historyLogs.push({
    firstNumberInput,
    secondNumberInput,
    mathInput,
    calculatedResult,
  });
  console.log('..ajax POST from server-side new input objects:', historyLogs);

  // send back a status code of 201, OK confirmation
  res.sendStatus(201);
});

//  GET req for calculated result
app.get('/calculated-result', (req, res) => {
  console.log('calculatedResult: ', calculatedResult);

  // calculatedResult is a number, number cannot go through UNLESS it is in an object format
  // put the calculatedResult in curly bracket, send in JSON and standardize with 'what' = result
  res.send({ result: calculatedResult });
});

//  GET req for history logs
app.get('/history-logs', (req, res) => {
  console.log('historyLogs: ', historyLogs);
  res.send(historyLogs);
});

// listen PORT
app.listen(PORT, () => {
  console.log('Server is ALIVE at port', PORT);
});
