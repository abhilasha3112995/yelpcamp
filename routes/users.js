const express = require('express');
const { register } = require('../models/user');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const {checkReturnTo} = require('../middleware');


router.route('/register')
      .get(users.renderRegister)
      .post( catchAsync (users.register));

 router.route('/login')      
     .get(users.renderLogin)
     .post(checkReturnTo, passport.authenticate('local',{ failureFlash: true, failureRedirect: '/login'}),users.login);


// router.get('/logout', (req, res) => {
//     req.logout();
//     req.flash('success', 'GoodBye!!');
//     res.redirect('/campgrounds');

// })


router.get('/logout', users.logout);
  

module.exports= router;
