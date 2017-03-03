var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true, 
        unique:true
    },

    category:String,
    description:String, 
    screenshots:[String],
    URL:String
})

var Project = mongoose.model("project", projectSchema);

module.exports = Project;