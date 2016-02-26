var express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    nodemailer = require('nodemailer'),
    config = require('./config'),
    app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 1772));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.get('/', function(request, response) {
    response.render('pages/index');
});

app.post('/send', function(req, res) {

    var transporter = nodemailer.createTransport({
        service: config.mail.service,
        auth: {
            user: config.mail.name,
            pass: config.mail.password
        }
    }),

    mailOptions = {
        from: config.mail.from,
        to: config.mail.to,
        subject: config.mail.subject,
        text: req.body.message,
        html: '<b>Wiadomość:</b> ' + req.body.message + '<br>' + '<b>Imię:</b> ' + req.body.name + '<br>' + '<b>Email:</b> ' + req.body.email
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('OK');
        }
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});