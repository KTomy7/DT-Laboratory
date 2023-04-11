const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const hamming = require('./hamming');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.put('/message', (request, response) => {
    const bits = request.body.bits;
    const decoded = hamming.decode(bits);

    if (decoded.errorCorrected) {
        response.json({
            errors: decoded.errorCorrected ? decoded.errorPosition : 'none',
            input: bits,
            result: decoded.bits,
        })
    } else {
        response.status = 500;
        response.send();
    }
});

app.listen(3000, () => {
    console.log('Listening on localhost:3000');
});
