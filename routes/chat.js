var express = require('express');
var router = express.Router();
var ChatItems = require('../models/chatitems');
var Items = require('../models/items');
var Messages = require('../models/messages');
var Offers = require('../models/offers');

var t = require('../models/chatitem_msg'); //t represents an assoc with chatitem + messages
var c = require('../models/chatitem_item'); //c represents an assoc with chatitem+ items
var co = require('../models/chatitems_offers');
//both are used inside the include option below to show that the two tables are related

router.get('/', function(req, res, next) {
    if(req.isAuthenticated()){
        res.render('chat');
    }
    else {
        res.redirect('/login');
    }
});

router.get('/buying/:id', function(req, res, next){
    var item_id = req.params.id;
    Items.findById(item_id).then((item)=>{
        ChatItems.findAll(
            {include: [{
                model: t.Messages,
                required: true,
                where: {user_id: req.user.id, item_id:item.item_id, seller_id: item.user_id} 
                //controls the type of messages being retrieved based on BOTH user_id && item_id
            }, 
            {   model: c.Items,
                required: true, 
                where: {item_id: item.item_id}
                //controls the items being retrieved
            }],
            where: {user_id: req.user.id, item_id:item.item_id, seller_id: item.user_id}
            //controls the parent ChatItems
            // all 'where' must have the same value to be functional
           })
          .then((chatitem)=>{
            if(chatitem.length == 0){
                ChatItems.findAll(
                    {include: [
                    {   model: c.Items,
                        required: true, 
                        where: {item_id: item.item_id}
                        //controls the items being retrieved
                    }],
                    where: {user_id: req.user.id, item_id:item.item_id, seller_id: item.user_id}
                    //controls the parent ChatItems
                    // all 'where' must have the same value to be functional
                })
                .then((chatitems) =>{
                    res.json(chatitems)
                })
            } 
            else {
                res.json(chatitem);
            }
        })
    })
})

router.post('/updatebuyer', function(req, res, next){
    var item_id = req.body.item_id;
    Items.findById(item_id).then((item)=>{
        ChatItems.findOne(
            {where: {user_id: req.user.id, item_id:item.item_id, seller_id: item.user_id}
        }).then((chatitem)=>{
            res.json(chatitem)
            })
        })
    });

router.post('/updatebuying', function(req, res, next){
    var item_id = req.body.item_id;
    var time = req.body.time;
    Items.findById(item_id).then((item)=>{
        ChatItems.update({updatedAt: time},
            {where: {user_id: req.user.id, item_id:item.item_id, seller_id: item.user_id}
        }).then((chatitem)=>{
            res.json(chatitem)
            })
        })
    });

router.get('/selling/:id/:buyerid', function(req, res, next){
    var item_id = req.params.id;
    var buyer_id = req.params.buyerid;
    Items.findById(item_id).then((item)=>{
        ChatItems.findAll(
            {include: [{
                model: t.Messages,
                required: true,
                where: {item_id:item.item_id, seller_id: item.user_id, user_id: buyer_id} 
                //controls the type of messages being retrieved based on BOTH user_id && item_id
            }, 
            {   model: c.Items,
                required: true, 
                //where: {item_id: item.item_id}
                //controls the items being retrieved
            }],
            where: {user_id: buyer_id ,item_id:item.item_id, seller_id: req.user.id}
            //controls the parent ChatItems
            // all 'where' must have the same value to be functional
           })
          .then((chatitem)=>{
            if(chatitem.length == 0) {
                ChatItems.findAll(
                    { include: [
                    {   model: c.Items,
                        required: true, 
                        //where: {item_id: item.item_id}
                        //controls the items being retrieved
                    }],
                    where: {user_id: buyer_id ,item_id:item.item_id, seller_id: req.user.id}
                    //controls the parent ChatItems
                    // all 'where' must have the same value to be functional
                })
                .then((chatitems)=>{
                    res.json(chatitems);
                })
            }
            else{
                res.json(chatitem);
            }
          })
    })
})

router.post('/updateselling', function(req, res, next){
    var item_id = req.body.item_id;
    var user_id = req.body.user_id; //buyer
    var time = req.body.time;
    Items.findById(item_id).then((item)=>{
        ChatItems.update({updatedAt: time},
            {where: {user_id: user_id, item_id:item.item_id, seller_id: req.user.id}
        }).then((chatitem)=>{
            res.json(chatitem)
            })
        })
});

router.post('/updateseller', function(req, res, next){
    var item_id = req.body.item_id;
    var user_id = req.body.user_id; //buyer
    Items.findById(item_id).then((item)=>{
        ChatItems.findOne(
            {where: {user_id: user_id, item_id:item.item_id, seller_id: req.user.id}
        }).then((chatitem)=>{
            res.json(chatitem)
            })
        })
});

router.get('/getoffers/:id/:userid', function(req, res, next){
    var item_id = req.params.id;
    var user_id = req.params.userid;
    Items.findById(item_id).then((item)=>{
        ChatItems.findAll(
            {include: [{
                model: co.Offers,
                required: true,
                where: {user_id: user_id, item_id:item.item_id, seller_id: item.user_id}
            }],
            where: {user_id: user_id, item_id:item.item_id, seller_id: item.user_id}
        })
        .then((item)=>{res.json(item)});
    })
})

router.post('/makeoffer', function(req, res, next){
    var keys = {
        user_id: req.body.user_id,
        username: req.body.username, 
        item_id: req.body.item_id,
        seller_id: req.body.seller_id,
        offer: req.body.offer
    }
    Offers.create(keys)
    .then((offer)=>{
        res.json(offer);
    })
})

router.post('/createchat', function(req, res, next){
    Messages.create({
        message: req.body.message,
        from: req.body.sender,
        to: req.body.receiver,
        item_id: req.body.item_id,
        user_id: req.body.user_id,
        seller_id: req.body.seller_id
    })
    .then((messages) => {
        res.json([messages])
    })
})

router.get('/finditem/:id', function(req, res, next){
    var item_id = req.params.id;
    Items.findById(item_id).then((item)=>{
        res.json([item]);
    })
})

router.post('/delete', function(req, res, next){
    var user_id = req.body.user_id;
    var seller_id = req.body.seller_id;
    var item_id = req.body.item_id;
    ChatItems.findOne({where: {user_id: user_id, seller_id: seller_id, item_id: item_id}})
    .then((item)=>{
        item.destroy();
        return res.json({});
    })
})

module.exports = router;