var express = require('express'),
	router = express.Router(),
	userSchema = require('../models/user'),
	taskSchema = require('../models/task');

router.get('/', function(req, res) {
	userSchema.find({}, function(err, users) {
		if(err) {
			res.status(500).send({
				message: err,
				data: []
			});
		} else {
			res.status(200).send({
				message: 'OK',
				data: users
			});
		}
	});
});

router.post('/', function(req, res) {
	var userData = {
		name: req.body.name,
		email: req.body.email
	}
	userSchema.create(userData, function(err, Users){
		if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			res.status(201).send({
				message: 'OK',
				data: Users
			});
		}
	});
});
// all have unique IDs
router.put('/:id', function(req, res) {
	var userData = {
		name: req.body.name,
		email: req.body.email
	}
	userSchema.findByIdAndUpdate(req.params.id, userData, function(err, Users){
		if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			res.status(201).send({
				message: 'OK',
				data: Users
			});
		}
	});
});

router.delete('/:id', function(req, res){
	userSchema.remove(req.params.id, function(err, Users){
		if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			res.status(201).send({
				message: "resource deleted",
				data: []
			});
		}
	});
});

router.post('/:id/task', function(req, res){
	var taskData = {
	 name: req.body.name, 
	 description: req.body.description
	 deadline: req.body.deadline,
	 completed: req.body.completed,
	 assignedUser: req.body.assignedUser,
	 assignedUserName: req.body.assignedUserName
	};


	userSchema.findById(req.params.id, function(err, userSchema){
		if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			taskSchema.create(taskData, function(err, task) {
			if(err) {
				res.status(500).send({
					messages: err,
					data: []
				});
			} else {
				userSchema.pendingTasks.push(task._id);
				userSchema.save();
				res.status(201).send({
					message: 'OK',
					data: task
				});
			}
		});
		}
	});
});


// every function you attach to touter object will be available to everything htat includes this file
module.exports = router;