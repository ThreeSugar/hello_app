var express = require('express');
var router = express.Router();

var fs = require('fs');
var mime = require('mime');
var Items = require('../models/items');
var User = require('../models/users');
var IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

var multer = require('multer');
var upload = multer({dest: './public/uploads/'});

var WebSocket = require('ws')

const url = require('url'); 

var Messages = require('../models/messages');
var ChatItems = require('../models/chatitems');
var Users = require('../models/users');
var cu = require('../models/chatitems_user')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.isAuthenticated()){
    Items.findAll().then(items => {
      res.render('items', {items:items, user: req.user});
    })
  } else {
    res.redirect('/login');
  }
});

router.get('/upload', function(req, res, next) {
  if(req.isAuthenticated()){
    res.render('items_upload');
  } else {
    res.redirect('/login');
  }
});

router.post('/upload', upload.single('image'), function(req, res, next){
  var src;
  var dest;
  var targetPath;
  var targetName;
  var tempPath = req.file.path;
  console.log(req.file);
  // get mime type of file
  var type = mime.lookup(req.file.mimetype);
  var extension = req.file.path.split(/[.]+/).pop();
  if (IMAGE_TYPES.indexOf(type) == -1) {
      return res.status(415).send('Supported img formats: jpeg, jpg, jpe, png.');
  } 

  targetPath = './public/images/' + req.file.originalname;
  src = fs.createReadStream(tempPath);
  dest = fs.createWriteStream(targetPath);
  src.pipe(dest);

  src.on('error', function(err){
      if(err) {
          return res.status(500).send({
              message: error
          });
      }
  });

  src.on('end', function(){
      var item_data = {
          title: req.body.title,
          item_name: req.file.originalname,
          item_desc: req.body.desc,
          user_id: req.user.id,
          username: req.user.username
      }

      Items.create(item_data).then((newItem) => {
          res.redirect('/items');
      })

  });
})

router.get('/delete/:id', function(req, res, next){
  var item_id = req.params.id;
  var targetPath;
  console.log(req.params.id);
  Items.findById(item_id).then((item) => {
     targetPath = './public/images/' + item.item_name;
     item.destroy();
  }).then(()=>{
    fs.unlink(targetPath, (err) => {
        if (err) throw err;
        console.log('path/file was deleted');
      });
      res.redirect('/items');
  })
})

router.get('/chat/:id', function(req, res, next){
  var item_id = req.params.id;
  Items.findById(item_id).then((item)=>{
    var keys = {
      user_id: req.user.id, //buyer user_id
      item_id: item.item_id,
      seller_id: item.user_id
    }

  ChatItems.findOne({where: {user_id: req.user.id, item_id: item.item_id, seller_id: item.user_id}})
    .then((chatitem)=>{
      if(!chatitem){
        ChatItems.create(keys).then((newchatitem)=>{
          var ws = new WebSocket('ws://localhost:5000')
          ws.on('open', function open() {
          ws.send(JSON.stringify({
            type: 'UPDATE_SELLING_LIST',
            payload: newchatitem,
            username : req.user.username
          }))
        });
          res.redirect("http://localhost:3000/buying/" + item.item_id);
        })
      } 
      else {
        res.redirect("http://localhost:3000/buying/" + item.item_id);
      }
    })
  })
});

router.get('/buying', function(req,res,next){
   ChatItems.findAll({include: [{model:Items, required:true}], order:[['updatedAt', 'DESC']], where: {user_id: req.user.id}})
   .then(group=>{
    res.json(group);
   })
})

router.get('/selling', function(req,res,next){
  ChatItems.findAll({include: [{model:Items, required:true, where: {user_id: req.user.id}}],
    where: {seller_id: req.user.id}
  })
  .then(group=>{
   res.json(group);
  })
})

router.get('/getsell', function(req, res, next){
  var item_id = req.params.id;
  Items.findAll({include: [{model:ChatItems, required:true, where: {seller_id: req.user.id}, include: [cu.Users]}],
  })
  .then(group => {
    res.json(group);
  })
})

router.get('/getbuyers/:id', function(req, res, next){
  var item_id = req.params.id;
  Items.findAll({include: [{model:ChatItems, required:true, where: {seller_id: req.user.id}, include: [cu.Users]}],
    where: {item_id: item_id}, order:[[{model: ChatItems}, 'updatedAt', 'DESC']]
  })
  .then(group => {
    res.json(group);
  })

})

module.exports = router;