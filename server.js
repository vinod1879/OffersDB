var express		=		require('express'),
	app			=		express(),
	bodyParser	=		require('body-parser'),
	morgan		=		require('morgan'),
	mongoose	=		require('mongoose');

var Config		=		require('./config'),
	apiRouter	=		require('./app/routes/api')(app, express);


mongoose.connect(Config.database);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

app.use(morgan('dev'));

//ROUTES FOR THE API
//=========================================

app.get('/', function(req, res) {
	res.send('Welcome to the home page!');
});


apiRouter.get('/me', function(req, res) {

	res.send(req.decoded);
});


app.use('/api', apiRouter);



// START THE SERVER
// =========================================

app.listen(Config.port);
console.log('Magic happens on port ' + Config.port);