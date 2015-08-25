var express		=		require('express'),
	app			=		express(),
	bodyParser	=		require('body-parser'),
	morgan		=		require('morgan'),
	mongoose	=		require('mongoose'),
	port		=		process.env.PORT || 8080;

var Offer		=		require('./app/models/offer');

mongoose.connect('mongodb://localhost:27017/offersdb');

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
	res.send('Welcome to the offers home page!');
});

var apiRouter = express.Router();

apiRouter.use(function(req, res, next) {

	console.log('Somebody just came to our app');
	next();
});

apiRouter.get('/', function(req, res) {
	res.json({message: 'hooray! welcome to our api!' });
});

apiRouter.route('/offers').post(function(req, res) {

							var offer = Offer();

							offer.buttonActions 	= req.body.buttonActions;
							offer.buttonTitles 		= req.body.buttonTitles;
							offer.country 			= req.body.country;
							offer.description 		= req.body.description;
							offer.detailsBody 		= req.body.detailsBody;
							offer.detailsTitle 		= req.body.detailsTitle;
							offer.footer 			= req.body.footer;
							offer.offerCode 		= req.body.offerCode;
							offer.phoneImageUrl 	= req.body.phoneImageUrl;
							offer.tabletImageUrl 	= req.body.tabletImageUrl;
							offer.thumbnailUrl 		= req.body.thumbnailUrl;
							offer.title 			= req.body.title;
							offer.validFrom 		= req.body.validFrom;
							offer.validTo 			= req.body.validTo;

							//ADD VALIDATIONS
							//=================================================

							if(!offer.offerCode) {
								res.statusCode = 400;
								return res.json( {message: 'Offer Code cannot be empty!'} );
							}

							if(!offer.country) {
								res.statusCode = 400;
								return res.json( {message: 'Country cannot be empty!'} );
							}

							offer.save(function(err) {

								if(err) {
									if(err.code == 11000)
										return res.json({success: false, message: 'Offer already exists. '});
									else
										return res.send(err);
								}
								res.json(offer);
							});
						}).get(function(req, res) {

							Offer.find(function(err, offers) {
								if(err) res.send(err);

								res.json(offers);
							});
						});

apiRouter.route('/offers/:offer_id').get(function(req, res) {

									Offer.findById(req.params.offer_id, function(err, offer) {

										if(err) res.send(err);

										res.json(offer);
									});
								}).put(function(req, res) {

									Offer.findById(req.params.offer_id, function(err, offer) {

										if(err) res.send(err);

										if(req.body.offerCode) offer.offerCode = req.body.offerCode;

										offer.save(function(err) {

											if(err) res.send(err);

											res.json({message: 'Offer updated!' });
										});

									});
								}).delete(function(req, res) {

									Offer.remove({
										_id: req.params.offer_id
									}, function(err, offer) {

										if(err) return res.send(err);

										res.json({message: 'Successfully deleted'});
									})
								});

app.use('/api', apiRouter);


// START THE SERVER
// =========================================

app.listen(port);
console.log('Magic happens on port ' + port);