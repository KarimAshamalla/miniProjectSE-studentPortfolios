var mongoose = require('mongoose');

var portfolioSchema = mongoose.Schema({
    email:{
        type:String,
        required:true, 
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        default : "no name"
    },
    //URL:String
    works:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'project'
    }],

    profilePicture:{
        type :String,
        default : "test_image"
    } 

})

var portfolio = mongoose.model("portofolio", portfolioSchema);

module.exports = portfolio;