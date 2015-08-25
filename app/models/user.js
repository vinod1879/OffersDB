var 	mongoose	=	require('mongoose'),
		Schema		=	mongoose.Schema,
		bcrypt		=	require('bcrypt-nodejs');

var UserSchema		=	new Schema({
									name		: {type: String, require: true},
									username	: {type: String, require: true, index: {unique: true} },
									googleId	: {type: String, require: true, index: {unique: true} },
									password 	: {type: String, require: true, select: false}
								});

UserSchema.pre('save', function(next)
{
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function(err, hash) {

		if(err) return next(err);

		user.password = hash;
		next();
	});
});

UserSchema.methods.comparePassword = function(password) {

	if(!password)
		return false;

	var user = this;

	return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);