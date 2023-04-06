const { text } = require('body-parser');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please add a name'],
    },

    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide your email']
    },

    password: {
        type: String,
        require: [true, 'Please add a password'],
        minlength: [5, 'Your password cannot be less than 8 characters'],
        select: false

    },

    passwordConfirm: {
        type: String,
        require: [true, 'Please confirm your password'],
        validate: {
            validator: function(el) {
                return el === this.password
            }
        }
    },

    photo: {
        type: String,
    },

    phone: {
        type: String,
        require: true,
        unique: true,
        minlength: 11,
        maxlength:11
    },

    passwordChangedAt: Date,

    PasswordResetToken: String,

    ResetTokenExpires: Date
});


userSchema.pre('save', function(next){
    if(!this.isModified('password' || this.isNew)) return exit();

    this.passwordChangedAt = Date.now() - 1000;
    next();
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next()
})


userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}


userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.PasswordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.ResetTokenExpires = Date.now() + 10*60*1000;

    return resetToken;

}

const User = mongoose.model('User', userSchema)

module.exports = User;