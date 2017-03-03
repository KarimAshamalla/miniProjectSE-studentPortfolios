let Portfolio = require('../models/Portfolio');

let portfolioController = {
    
    getAllPortfolios:function(req, res){
        //console.log(req.session.pageID)
        if(!req.session.pageID){
            req.session.pageID=1;
        }
        if(req.body.page)
            req.session.pageID=req.body.page;

         Portfolio.find({ works:{ $exists:true, $not:{$size:0}} }).skip(10*(req.session.pageID-1))
        .limit(11)
        .populate({path:'works',options:{sort:{created_at:1}}})
        .exec(function(err, portfolios){
            for(var i;i<portfolios;i++)
                portfolios.works[i]=portfolios.works.slice(0,2);   
            if(err)
                res.send(err.message);
            else{
                //alert("test");
                //window.alert("sometext");
                res.render('login', {portfolios,session:req.session});
            }
                
        })
    },

    getTenPortfolios:function(req, res){
        
        Portfolio.find().skip(10*(req.session.pageID-1))
        .limit(10)
        .populate({path:'works',options:{sort:{created_at:1}}})
        .exec(function(err, portfolios){
            for(var i;i<portfolios;i++)
                portfolios.works[i]=portfolios.works.slice(0,2);
            res.send(portfolios);
            if(err)
                res.send(err.message);
            else
                res.render('login', {portfolios});
        })
    },

    viewPortfolios:function(req,res){if(!req.session.pageID){
            req.session.pageID=1;
        }
        if(req.body.page)
            req.session.pageID=req.body.page;

         Portfolio.find({ works:{ $exists:true, $not:{$size:0}} }).skip(10*(req.session.pageID-1))
        .limit(11)
        .populate({path:'works',options:{sort:{created_at:1}}})
        .exec(function(err, portfolios){
            for(var i;i<portfolios;i++)
                portfolios.works[i]=portfolios.works.slice(0,2);   
            if(err)
                res.send(err.message);
            else{
                //alert("test");
                
                res.render('portfolioView', {portfolios,session:req.session});
            }
        })
    },

    createPortfolio:function(req, res){
        let portfolio = new Portfolio(req.body);

        portfolio.save(function(err, portfolio){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
                req.flash('success',"registered succesfully");
                console.log(portfolio);
                res.redirect('/');
            }
        })
    },
    login:function(req,res){
        console.log(req.body);
        Portfolio.findOne({'email':req.body.email},function(err,portfolio){
            if(portfolio){
                if(portfolio.password==req.body.password){
                    req.session.portfolio=portfolio;
                    req.flash('success','login succesfull');
                    res.redirect('/loggedin');
                }
                else
                    res.send('Wrong password');    
            }
            else{

                res.send("not found");
            }
        });
    }
}


module.exports = portfolioController;