const { Router } = require('express');
const router = Router();

const { signupForm, signinForm, signin, signup, logout } = require('../controller/userController')

router.route('/signup')
    .get(signupForm)
    .post(signup)

router.route('/signin')
    .get(signinForm)
    .post(signin)

router.get('/logout', logout)

/* router.route('/:id')
    .delete(deleteUser) */

module.exports = router;