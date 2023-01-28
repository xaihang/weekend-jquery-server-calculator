const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// {
//     input1: number,
//     input2: number,
//     mathInput: 'string',
//     output: number,
// }
let historyLogs = []

// POST to get inputs of firstNumber and secondNumber
app.post('/inputs', (req, res) => {
    console.log('/inputs of the POST request', req.body);
    // console.log('firstNumberInput:', req.body.firstNumberInput);
    // console.log('secondNumberInput:', req.body.secondNumberInput);
    // console.log('mathInput', req.body.mathInput)
    
    // capture the variables from req.body
    const firstNumberInput = Number(req.body.firstNumberInput);
    const secondNumberInput = Number(req.body.secondNumberInput);
    const mathInput = req.body.mathInput; 
    let result = 0;

    // push new input to the userInput []
    historyLogs.push({firstNumberInput, secondNumberInput, mathInput});
    console.log('..ajax POST new input objects:', historyLogs);

    // logic for mathInputs 
    switch (mathInput) {
        case "-":
            result = firstNumberInput - secondNumberInput 
            break;
        case "*":
            result = firstNumberInput * secondNumberInput
            break;
        case "/":
            result = firstNumberInput / secondNumberInput
            break;
        default:
            result = firstNumberInput + secondNumberInput
            break;
    }

    console.log('the RESULTS =', result);

    // send back a status code of 201
    res.sendStatus(201);
})

//  GET req setup
app.get('/inputs', (req, res) => {
    console.log('historyLogs: ', historyLogs);
    res.send(historyLogs);
});


app.listen(PORT, () => {
    console.log('Server is ALIVE at port', PORT);
  });