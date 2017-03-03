let Project = require('../models/Project');
let Portfolio = require('../models/Portfolio')
var multer = require('multer');
var upload = multer({ dest: 'public/Uploads' });


let projectController = {

    getAllProjects: function (req, res) {
        Portfolio.update({ _id: req.session.portfolio._id }, { $set: { 'name': req.body.name?req.body.name:req.session.portfolio.name, 'profilePicture': req.files.length!=0?req.files[0].filename:req.session.portfolio.profilePicture } }).exec(function(){
            Project.find(function (err, projects) {

                if (err)
                    res.send(err.message);
                else
                    res.render('myPortfolio', { projects });
            })
        })
    },

    getAllProjects2: function (req, res) {
        //Portfolio.update({ _id: req.session.portfolio._id }, { $set: { 'name': req.body.name, 'profilePicture': req.files?req.files[0].filename:"test_image" } }).exec(function(){
            Project.find(function (err, projects) {

                if (err)
                    res.send(err.message);
                else
                    res.render('myPortfolio', { projects });
            })
        //})
    },
    viewscreenshots:function(req,res){
        //console.log(req.body);
        Project.findOne({_id:req.body.thiswork },function(err,thiswork){
            if (err)
                    res.send(err.message);
                else
                    res.render('projectView', {thiswork: thiswork });
        })
        //res.render('projectView',{thiswork:req.body.thiswork});
    },

    createProject: function (req, res) {
         var screenshots = [];

         for(var i=0;i<req.files.length;i++){
             screenshots.push(req.files[i].filename);
         }
        let project = new Project(req.body);

         project.screenshots=screenshots;
        project.save(function (err, project) {
            if (err) {
                res.send(err.message)
                console.log(err);
            }
            else {

                console.log(project);
                Portfolio.update({ _id: req.session.portfolio._id }, { $push: { 'works': project } }).exec(function(){

                res.redirect('/createProjectPage2');
                });
            }
        })
    }
}

module.exports = projectController;