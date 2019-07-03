var express = require('express');
var bodyParser = require('body-parser');
var kb = require('./qna');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.get('/', function (req, res) {
    var data = '';

    res.render('index.ejs', {data: data});
});

let pretty_print = function (s) {
    return JSON.stringify(JSON.parse(s), null, 4);
};

app.post('/', urlencodedParser, function (req, res) {
    var data = req.body;
    console.log("question: "+ data.txt_are);
    var que = {'question': data.txt_are,'top': 3};
    var ans;

    kb.qna(que)
        .then(function (ex) {
            ans = ex;
            console.log("-------------------------------------------------");
            console.log(ans);
            console.log("-------------------------------------------------");
            res.render('index.ejs', {data: ans});
        });


});

app.listen(3000);
console.log("Server is listening 3000!");