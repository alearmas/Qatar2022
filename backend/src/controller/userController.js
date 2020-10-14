const userCtrl = { };

const passport = require('passport')

const User = require('../models/User');

userCtrl.signupForm = (req, res) => {
    res.render('/signup');
}; 

userCtrl.signup = async (req, res) => {
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password) {
        errors.push({text: 'Password do not match'})
    }
    if(password.length < 4) {
        errors.push({text: 'Password must be at least 4 characters.'})
    }
    if(errors.length > 0) {
        res.render('/signup', {
            errors,
            name,
            email
        })
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser) {
            req.flash('error_msg', "The email is already in use");
            res.redirect('/signup');
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encrypt(password);
            await newUser.save();
            req.flash('success_msg', 'Registered!')
            res.redirect('/signin')
        }
    }
};

userCtrl.signinForm = (req, res) => {
    res.render('user/signin');
}

userCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/signin',
    successRedirect: '/notes',
    failureFlash: true
});

userCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Logout');
    res.redirect('/signin');
}

module.exports = userCtrl;