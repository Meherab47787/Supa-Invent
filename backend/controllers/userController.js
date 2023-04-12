const User = require('./../models/userModel');
const { promisify } = require('util');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');
const sendEmail = require('../util/email');
const crypto = require('crypto')

const jwt = require('jsonwebtoken');
const SignToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES});
}

const cookieOptions = {
    path: '/',
    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: 'lax',
    secure: false
}

if(process.env.NODE_ENV === 'production') cookieOptions.secure = true


const CreateSendToken = (user, statusCode, res) => {
    const token = SignToken(user._id);

    res.cookie('jwt', token, cookieOptions);

    res
       .status(statusCode)
       .json({
        status: 'Success',
        token,
        data: {
            user
        }
       }) 
}

exports.registerUser = catchAsync(async (req, res, next) => {
    const newUser = await User.create(req.body);
    const token = SignToken(newUser._id);
    
    CreateSendToken(newUser, 201, res);
})


exports.login = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;

    //Check if user exists
    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400));
    }

    //Check if user Exists
    const user = await User.findOne({ email }).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Invalid e-mail or password', 401))
    }
        
    

    CreateSendToken(user, 200, res);
});


exports.protect = catchAsync(async (req, res, next) => {

    let token;

    //1. getting the token and check if it is there
    if(req.cookies.jwt){
        token = req.cookies.jwt;
    }


    if(!token){
        return next(new AppError('You are not logged in, please log in to continue',401))
    }
    //2. Verification Token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    //3. Check if the user still exists
    const freshUser = await User.findById(decoded.id);
    if(!freshUser){
        return next(new AppError('User no longer exists', 401))
    }

    //4. Check if the user changed password after the token was issued



    next();
})


exports.forgotPassword = catchAsync(async (req, res, next) => {
    //1. Get user based on posted Email

        const user = await User.findOne({email: req.body.email})

        if(!user){
            next(new AppError('User with this email address does not exist', 400))
        }
    //2. Generate the random reset token
        const resetToken = user.createPasswordResetToken();

        await user.save({validateBeforeSave: false});

    //3. Send the token to the user's email
    const restURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;


    const message = `Forgot your password? Send a patch request with your new password and passwordConfirm to: ${restURL}`;

    try{
        await sendEmail({
            email: user.email,
            sybject: `the token is valid for 10 minutes`,
            message
        });
        
        res
           .status(200)
           .json({
            status: 'Success',
            message: 'Token sent to email'
           })
    }
    catch(err){
        user.PasswordResetToken = undefined
        user.ResetTokenExpires = undefined
        await user.save({ validateBeforeSave: false })
        return next(new AppError('There was a problem with the email, try it out later', 500))
    }
    

});


exports.resetPassword = catchAsync(async (req, res, next) => {
    //1. Get user, based on the token

    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({PasswordResetToken: hashedToken, ResetTokenExpires: { $gt: Date.now() }})

    //2. If token has not expired and the user exists set new password
    if(!user){
        return next(new AppError('Token is invalid or expired', 400))
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.PasswordResetToken = undefined;
    user.ResetTokenExpires = undefined;

    await user.save();

    //3. Update passwordChangedAt property for the user




    //4. Log the user in with JWT

    CreateSendToken(user, 200, res)
});


exports.logout = catchAsync(async (req, res, next) => {
    res.cookie('jwt', '', {
        expires: new Date(0),
        httpOnly: true
    });
    return res
              .status(200)
              .json({
                message: 'Successfully logged out'
              })
})


exports.loggedStatus = (req, res) => {
    const token = req.cookies.jwt;
    if(!token){
        return res.json(false)
    }

    const verifed = jwt.verify(token, process.env.JWT_SECRET)
    if(verifed){
        return res.json(true)
    }

    return res.json(false)

}