var 	mongoose	=	require('mongoose'),
		Schema		=	mongoose.Schema,
		bcrypt		=	require('bcrypt-nodejs');

var OfferSchema		=	new Schema({buttonActions: 	{type: Array, require: false},
									buttonTitles: 	{type: Array, require: false},
									country: 		{type: String, require: true},
									description: 	{type: String, require: true},
									detailsBody: 	{type: String, require: true},
									detailsTitle: 	{type: String, require: true},
									footer: 		{type: String, require: false},
									offerCode: 		{type: String, require: true, index: {unique: true}},
									offerId: 		{type: String, require: true},
									phoneImageUrl: 	{type: String, require: true},
									tabletImageUrl: {type: String, require: true},
									thumbnailUrl: 	{type: String, require: true},
									title: 			{type: String, require: true},
									validFrom: 		{type: String, require: true},
									validTo: 		{type: String, require: true},
									modified: 		{type: Date, require: true, select: false}
								}, {versionKey: false});

OfferSchema.pre('save', function(next)
{
	var user = this;

	user.modified = Date();
	next();
});

// OfferSchema.methods.findValidOffers = function(callback) {

// 	var currentDate = Date();

// 	var Offer = mongoose.model('Offer', OfferSchema);


// 	Offer.find({validFrom: {
//         $lt: currentDate
//     }, validTo: {
//         $gt: currentDate
//     }}, callback);
// }

module.exports = mongoose.model('Offer', OfferSchema);