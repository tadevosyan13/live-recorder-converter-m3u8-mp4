const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var m3u8ToMp4 = require("m3u8-to-mp4");
var converter = new m3u8ToMp4();

app.use(bodyParser.json());

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.post('/blob', function (req, res) {
    console.log(req.body.url);

    (async function() {
        await converter
            .setInputFile(req.body.url)
            .setOutputFile("Video.mp4")
            .start();
        console.log('Converted');
        res.send(true);
    })();

});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});