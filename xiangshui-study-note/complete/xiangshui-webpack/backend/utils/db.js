var mongoose = require('mongoose');
// terminal will show err if there is not a obj {useNewUrlParser:true}
mongoose.connect('mongodb://localhost/lagou-admin', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//build 'users' model
var usersSchema = mongoose.Schema({
    username: String,
    password: String
})

var positionSchema = mongoose.Schema({
    companyLogo: String,
    companyName: String,
    positionName: String,
    city: String,
    createTime: String,
    salary: String
})

var Users = mongoose.model('users', usersSchema)
var Positions = mongoose.model('positions', positionSchema)

exports.Users = Users
exports.Positions = Positions