const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');
const async = require('async');
const expressHbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');



const app = express();

//mongodb://sunrhythms:nodetst@ds157723.mlab.com:57723/testnode
app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public' ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: false }));
app.use(morgan('dev'));
/*app.use(session({
	resave: true,
	saveUinitialiazed: true,
	secret: "soleil",
	store: new MongoStore({ url: ;'mongodb://sunrhythms:nodetst@ds157723.mlab.com:57723/testnode'})

}));
app.use(flash());*/

app.use(session({
  resave: true,
	saveUninitialized: true,
  secret: "soleil",
  store: new MongoStore({ url: 'mongodb://sunrhythms:nodetst@ds157723.mlab.com:57723/testnode'})
}));
app.use(flash());

app.route('/')
  .get((req, res, next) => {
    res.render('main/home', { message: req.flash('success') });
  })

//b2a5fffd7b7f002460dec03b41a8917a-us16
// https://us16.api.mailchimp.com/3.0/lists/f1e5459401/members


		/*.post((req, res, next) => {
			request({
				url: 'https://us16.api.mailchimp.com/3.0/lists/f1e5459401/members',
				method: 'POST',
				headers: {
					'Authorization': 'randomUser b2a5fffd7b7f002460dec03b41a8917a-us16 '
					'Content-Type': 'application/json'
				},
				json: {
					'email_address': req.body.email,
					'status':'subscribed'
				}
			}, function(err, response, body) {
				if (err){
					console.log(err);
				} else {
					console.log("Successfully sent");
					res.redirect('/');
				}
			});
		});
*/

.post((req, res, next) => {
	request({
		url: 'https://us16.api.mailchimp.com/3.0/lists/f1e5459401/members',
		method: 'POST',
		headers: {
			'Authorization': 'randomUser b2a5fffd7b7f002460dec03b41a8917a-us16',
			'content-type': 'application/json'
		},
		json: {
			'email_address': req.body.email,
			'status': 'subscribed'
		}
	}, function(err, response, body) {
		if (err) {
			console.log(err);
		} else {
			console.log("Successfully sent");
			req.flash('success', 'You have submitted your email');
			res.redirect('/');
		}
	});
});


app.listen(8080, (err) => {
	if (err) {
	  console.log(err);
	} else {
	  console.log("Running server.js on Port 8080");
	}
});
