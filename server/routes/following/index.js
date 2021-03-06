var express = require("express");
var auth = require('../../auth/index')
var router = express.Router();
var {db} = require('../../firebase')
var {addFollowingUser, removeFollowingUser} = require('../../db/index')
var {authenticated, isAdmin} = require('../auth/index');
const { check, validationResult } = require('express-validator');

// post method to add following user to db
router.post('/addFollowing', 

    authenticated,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.addFollowingUser(company_name, req.body.post_id, user_id)
                res.jsonp({success : true});
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
        });
    }
);

// post method to remove following user from db
router.post('/removeFollowing',

    authenticated,

    function (req, res) {
        db.getCurrentUserID(req.cookies.auth).then((decodedToken) => {
            var user_id = decodedToken;
            db.getCompanyName(decodedToken).then(function(snapshot) {
                var company_name = snapshot;
                db.removeFollowingUser(company_name, req.body.post_id, user_id)
                res.jsonp({success : true});
            }).catch( function(error) {
                console.log(error);
                res.jsonp({success: false});
            })  
        }).catch((error) => {
            console.log(error);
        });
    }
);

module.exports = router;