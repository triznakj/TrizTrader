var mongoose = require('mongoose'),
    assert = require('assert');

var Users = require('./models/users-1');

// Connection URL
var url = 'mongodb://localhost:27017/triztrader';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    /*
    db.collection('users').drop(function() {
        console.log("Dropped that bitch");
        db.close();
    });
    */
    // create a new user
    var newUser = Users({
        name: 'Kevin Trizna',
        goals: 'Financial Independence'
    });

    // save the user
    newUser.save(function (err) {
        if (err) throw err;
        console.log('User created!');

        // get all the users
        Users.find({}, function (err, users) {
            if (err) throw err;

            // object of all the users
            console.log(users);
                        db.collection('users').drop(function () {
                db.close();
            });
        });
    });
    
    
});