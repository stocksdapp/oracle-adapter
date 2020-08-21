let request = require('request');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 6699

//your apiKey here
const KEY = ""

app.use(bodyParser.json())

const tickerHandler = (req, res) => {
    let options = {
        url: "https://rt.masw.info/stock/simple/" + req.body.data.ticker,
        qs: { apiKey: KEY },
        json: true
    };
    request(options, (error, response, body) => {
        if (error || response.statusCode >= 400) {
            let errorData = {
                jobRunID: req.body.id,
                status: "errored",
                error: body
            };
            res.status(response.statusCode).send(errorData);
        } else {
            let returnData = {
                jobRunID: req.body.id,
                data: body
            };
            res.status(response.statusCode).send(returnData);
        }
    });
};

app.get('/', tickerHandler)
app.post('/', tickerHandler)
app.listen(port, () => console.log(`Masw.info External Adapter listening @ http://localhost:${port}`))
