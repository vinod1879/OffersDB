var 	mongoose	=	require('mongoose'),
		Schema		=	mongoose.Schema,
		bcrypt		=	require('bcrypt-nodejs');

var BannerSchema		=	new Schema({bannerId: 	{type: String, require: false},
									bannerText: 	{type: String, require: false},
									country: 		{type: String, require: true},
									displayMode: 	{type: String, require: true},
									onTapAction: 	{type: String, require: true},
									relatedOfferId: {type: String, require: true},
									screenIds: 		{type: Array, require: false},
									thumbnailUrl: 	{type: String, require: true},
									validityFrom: 	{type: String, require: true},
									validityTo: 	{type: String, require: true}
								}, {versionKey: false});

BannerSchema.pre('save', function(next)
{
	var user = this;

	user.displayMode = "";
	user.onTapAction = "1";
	//user.modified = Date();
	next();
});

module.exports = mongoose.model('Banner', BannerSchema, 'Banners');