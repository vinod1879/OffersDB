var express		=		require('express'),
	app			=		express(),
	bodyParser	=		require('body-parser'),
	morgan		=		require('morgan'),
	mongoose	=		require('mongoose');
	path		=		require('path');

var Config		=		require('./config');



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {

	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

// MONGOOSE DATABASE CONNECTION
// =========================================
mongoose.connect(Config.database);


// ROUTES FOR THE API
// =========================================

var apiRouter	=		require('./app/routes/api')(app, express);

apiRouter.get('/me', function(req, res) {

	res.send(req.decoded);
});

app.use('/api', apiRouter);


// MAIN CATCHALL ROUTE
// =========================================

app.get('*', function(req, res) {

	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});


// START THE SERVER
// =========================================

app.listen(Config.port);
console.log('Magic happens on port ' + Config.port);