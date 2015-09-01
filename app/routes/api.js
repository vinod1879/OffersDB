var jwt				=		require('jsonwebtoken'),
	Offer			=		require('../models/offer'),
	User			=		require('../models/user'),
	Banner 			= 		require('../models/banner'),
	Config			=		require('../../config');

var superSecret		=		Config.secret;

module.exports = function(app, express) {

	var apiRouter = express.Router();

	//AUTHENTICATION OF USERS
	//=========================================

	apiRouter.post('/authenticate', function(req, res) {

		User.findOne({

			username: req.body.username
		}).select('name username password').exec(function(err, user) {

			if(err) throw err;

			if(!user) {
				res.json({success: false, message: 'Authentication failed. User not found' });
			} else {

				var validPassword = user.comparePassword(req.body.password);

				if(!validPassword) {
					res.json( {success: false, message: 'Authentication failed. Wrong password.' } );
				} else {
					var token = jwt.sign( {name: user.name, username: user.username}, superSecret, {expiresInMinutes: 60} );

					res.json( {success: true, message: 'Login success!', token: token} );
				}
			}
		});
	});

	//MIDDLEWARE
	//=========================================

	apiRouter.use(function(req, res, next) {

		console.log('Somebody just came to our api');

		var token = req.body.token || req.param('token') || req.headers['x-access-token'];

		if(token) {

			jwt.verify(token, superSecret, function(err, decoded) {

				if(err) {
					return res.status(403).send( {success: false, message: 'Failed to authenticate token.' } );
				} else {

					req.decoded = decoded;

					next();
				}
			})
		} else {

			return res.status(403).send( {success: false, message: 'No token provided.'} );
		}
	});

	apiRouter.get('/', function(req, res) {
		res.json({message: 'hooray! welcome to our app!' });
	});

	//ROUTING FOR OFFERS
	//==========================================

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
									
									return res.json( {message: 'Offer Code cannot be empty!'} );
								}

								if(!offer.country) {
									
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

	// ROUTES FOR USER
	//==========================================


	apiRouter.route('/users').post(function(req, res) {

								var user = User();

								user.username 			= req.body.username;
								user.password 			= req.body.password;
								user.name				= req.body.name;
								

								//ADD VALIDATIONS
								//=================================================

								if(!user.username) {
									
									return res.json( {message: 'User name cannot be empty!'} );
								}

								if(!user.password) {
									
									return res.json( {message: 'Password cannot be empty!'} );
								}

								user.save(function(err) {

									if(err) {
										if(err.code == 11000)
											return res.json({success: false, message: 'User already exists. '});
										else
											return res.send(err);
									}
									res.json( {success: true, message: 'User created!' } );
								});
							}).get(function(req, res) {

								User.find(function(err, users) {
									if(err) res.send(err);

									res.json(users);
								});
							});

	apiRouter.route('/users/:user_id').get(function(req, res) {

										User.findById(req.params.user_id, function(err, user) {

											if(err) res.send(err);

											res.json(user);
										});
									}).put(function(req, res) {

										User.findById(req.params.user_id, function(err, user) {

											if(err) res.send(err);

											var hasChanges = false;

											if(req.body.username) 	{ user.username = req.body.username; hasChanges = true; }
											if(req.body.password) 	{ user.password = req.body.password; hasChanges = true; }
											if(req.body.googleId) 	{ user.googleId = req.body.googleId; hasChanges = true; }
											if(req.body.name) 		{ user.name 	= req.body.name; hasChanges = true; }

											if(hasChanges) {

												user.save(function(err) {

													if(err) res.send(err);

													res.json({message: 'User updated!' });
												});
											} else {

												res.json({message: 'Nothing to update'});
											}

										});
									}).delete(function(req, res) {

										User.remove({
											_id: req.params.user_id
										}, function(err, user) {

											if(err) return res.send(err);

											res.json({message: 'User Successfully deleted'});
										});
									});

	//ROUTING FOR BANNERS
	//==========================================

	apiRouter.route('/banners').post(function(req, res) {

								var banner = Banner();

								banner.bannerId 		= req.body.bannerId;
								banner.bannerText 		= req.body.bannerText;
								banner.country 			= req.body.country;
								banner.displayMode 		= req.body.displayMode;
								banner.onTapAction 		= req.body.onTapAction;
								banner.relatedOfferId 	= req.body.relatedOfferId;
								banner.screenIds 		= req.body.screenIds;
								banner.thumbnailUrl 	= req.body.thumbnailUrl;
								banner.validFrom 		= req.body.validFrom;
								banner.validTo 			= req.body.validTo;

								//ADD VALIDATIONS
								//=================================================

								if(!banner.bannerText) {
									
									return res.json( {message: 'Banner cannot be empty!'} );
								}

								if(!banner.country) {
									
									return res.json( {message: 'Country cannot be empty!'} );
								}

								banner.save(function(err) {

									if(err) {
										if(err.code == 11000)
											return res.json({success: false, message: 'Banner already exists. '});
										else
											return res.send(err);
									}
									res.json(offer);
								});
							}).get(function(req, res) {

								Banner.find(function(err, banners) {
									if(err) res.send(err);

									res.json(banners);
								});
							});

	apiRouter.route('/banners/:banner_id').get(function(req, res) {

										Banner.findById(req.params.banner_id, function(err, banner) {

											if(err) res.send(err);

											res.json(banner);
										});
									}).delete(function(req, res) {

										Banner.remove({
											_id: req.params.banner_id
										}, function(err, banner) {

											if(err) return res.send(err);

											res.json({message: 'Successfully deleted'});
										})
									});
	return apiRouter;
};
