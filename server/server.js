const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

let usersInput = []

app.post('/inputs', (req, res) => {
    console.log(req)
    console.log('/inputs of the POST request', req.body);
    console.log('firstNumberInput:', req.body.firstNumberInput);
    console.log('secondNumberInput:', req.body.secondNumberInput);

    // capture the variables from req.body
    const firstNumberInput = req.body.firstNumberInput;
    // console.log(req.body.firstNumberInput);

    const secondNumberInput = req.body.secondNumberInput;

    // push new input to the userInput []
    usersInput.push({firstNumberInput, secondNumberInput});
    console.log('..ajax POST new input objects:', usersInput);

    // send back a status code of 201
    res.sendStatus(201);
})


app.listen(PORT, () => {
    console.log('Server is ALIVE at port', PORT);
  });