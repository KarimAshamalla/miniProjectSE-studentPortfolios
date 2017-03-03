// require dependincies 
var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'public/Uploads'});
var projectController = require('./controllers/projectController');
var portfolioController = require('./controllers/portfolioController')
var session = require('express-session');
// add routes
//router.get('/', projectController.getAllProjects);
router.get('/', portfolioController.getAllPortfolios);
router.post('/', portfolioController.getAllPortfolios);


router.post('/login',portfolioController.login);
router.post('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
})

router.get('/ten/:pageId',portfolioController.getTenPortfolios);
router.post('/projectScreen',projectController.viewscreenshots);
router.get('/loggedin',portfolioController.viewPortfolios);
router.post('/loggedin',portfolioController.viewPortfolios);
router.post('/project',upload.any(),projectController.createProject);
router.get('/createProjectPage2', projectController.getAllProjects2);
router.post('/createProjectPage', upload.any(),projectController.getAllProjects);
router.post('/createPortfolio',portfolioController.createPortfolio);
//router.post('/createProjectPAGE', function(req,res){res.render('myPortfolio')});
// export router

module.exports = router;