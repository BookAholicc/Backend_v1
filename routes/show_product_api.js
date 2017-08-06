
/* Queries Books  childern by Pid*/


'use strict';



var express = require('express');
const router = express.Router();

var admin = require("firebase-admin");



// Get a database reference to our blog
var db = admin.database();
var matchedProducts = {
	"products":[]
};



exports.viewProduct = function(req, res){
  var pidtoShow = res.body.pid;

   var ref = db.ref("books");
	ref.once("child_added", function(snapshot) {

  		if (pidtoShow == snapshot.val().pid) {
  			res.send(snapshot.val());
  		}


	});
};
