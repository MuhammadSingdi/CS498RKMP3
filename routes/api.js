var express = require('express'),
	router = express.Router(),
	userSchema = require('../models/user'),
	taskSchema = require('../models/task');

router.post('/users', function(req, res) {
	var userData = {
		name: req.body.name,
		email: req.body.email,
		pendingTasks: req.body.pendingTasks || []
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

router.put('/users/:id', function(req, res) {
	var userData = {
		name: req.body.name,
		email: req.body.email,
		pendingTasks: req.body.pendingTasks || []
	}
	userSchema.findByIdAndUpdate(req.params.id, userData, {new: true}, function(err, Users){
		if(err) {
			res.status(404).send({
				messages: err,
				data: []
			});
		} else {
			if(!Users){
        		res.status(404).send({
          		message: 'Id was not found',
          		data: Users
        		});
      		}
      		else{
			res.status(200).send({
				message: 'OK',
				data: Users
			});
		}
		}
	});
});

router.delete('/users/:id', function(req, res){
	userSchema.findByIdAndRemove(req.params.id, function(err, Users){
		if(err) {
			res.status(404).send({
				message: err,
				data: []
			});
		} else {
			if(!Users){
        		res.status(404).send({
          		message: 'Id was not found',
          		data: Users
        		});
      		}
			else {res.status(200).send({
				message: "resource deleted",
				data: Users
			});
		}
		}
	});
});

router.get('/users', function(req, res) {
	var whereQ = req.query.where != null ? JSON.parse(req.query.where) : '';
	var sortQ = req.query.sort != null ? JSON.parse(req.query.sort) : '';
	var selectQ = req.query.select != null ? JSON.parse(req.query.select) : '';
	var skipQ = req.query.skip != null ? JSON.parse(req.query.skip) : '';
	var limitQ = req.query.limit != null ? JSON.parse(req.query.limit) : '';
	var countQ = req.query.count != null ? JSON.parse(req.query.count) : '';
	userSchema.find(whereQ, function(err, users) {
		if(err) {
			res.status(500).send({
				message: err,
				data: []
			});
		} else {
			dataToSend = countQ == true ? users.length : users
			res.status(200).send({
				message: 'OK',
				data: dataToSend
			});
		}
	}).sort(sortQ).skip(skipQ).select(selectQ).skip(skipQ).limit(limitQ);
});

  router.get('/users/:id', function(req, res){
    userSchema.findById(req.params.id, function(err, User){
      if(err) {
			res.status(404).send({
				messages: err,
				data: []
			});
		} else {
			if(!User){
        		res.status(404).send({
          		message: 'Id was not found',
          		data: User
        		});
      		}
      		else {
			res.status(200).send({
				message: "OK",
				data: User
			});
		}
		}
    });
  });

  router.get('/tasks', function(req, res) {
  	var whereQ = req.query.where != null ? JSON.parse(req.query.where) : '';
	var sortQ = req.query.sort != null ? JSON.parse(req.query.sort) : '';
	var selectQ = req.query.select != null ? JSON.parse(req.query.select) : '';
	var skipQ = req.query.skip != null ? JSON.parse(req.query.skip) : '';
	var limitQ = req.query.limit != null ? JSON.parse(req.query.limit) : '';
	var countQ = req.query.count != null ? JSON.parse(req.query.count) : '';
	taskSchema.find(whereQ, function(err, tasks) {
		if(err) {
			res.status(500).send({
				message: err,
				data: []
			});
		} else {
			dataToSend = countQ == true ? tasks.length : tasks;
			res.status(200).send({
				message: 'OK',
				data: dataToSend
			});
		}
	}).sort(sortQ).skip(skipQ).select(selectQ).skip(skipQ).limit(limitQ);;
});

router.get('/tasks/:id', function(req, res){
    taskSchema.findById(req.params.id, function(err, Task){
      if(err) {
			res.status(404).send({
				messages: err,
				data: []
			});
		} else {
			if(!Task){
        		res.status(404).send({
          		message: 'Task was not found',
          		data: Task
        		});
      		}
      		else {
			res.status(200).send({
				message: "OK",
				data: Task
			});
		}
		}
    });
  });

router.post('/tasks', function(req, res) {
let taskData = {
	 name: req.body.name, 
	 description: req.body.description, 
	 deadline: req.body.deadline,
	 completed: req.body.completed,
	 assignedUser: req.body.assignedUser,
	 assignedUserName: req.body.assignedUserName
	}

	taskSchema.create(taskData, function(err, tasks){
		if(err) {
			res.status(500).send({
				messages: err,
				data: []
			});
		} else {
			res.status(201).send({
				message: 'OK',
				data: tasks
			});
		}
	});
});

router.put('/tasks/:id', function(req, res) {
var taskData = {
	 name: req.body.name, 
	 description: req.body.description, 
	 deadline: req.body.deadline,
	 completed: req.body.completed,
	 assignedUser: req.body.assignedUser,
	 assignedUserName: req.body.assignedUserName
	}

	taskSchema.findByIdAndUpdate(req.params.id, taskData, function(err, tasks){
		if(err) {
			res.status(404).send({
				messages: err,
				data: []
			});
		} else {
			res.status(200).send({
				message: 'OK',
				data: tasks
			});
		}
	});
});

router.delete('/tasks/:id', function(req, res){
	taskSchema.findByIdAndRemove(req.params.id, function(err, tasks){
		if(err) {
			res.status(404).send({
				messages: err,
				data: []
			});
		} else {
			if(!tasks){
        		res.status(404).send({
          		message: 'Task was not found',
          		data: tasks
        		});
      		}
      		else {
			res.status(200).send({
				message: "resource deleted",
				data: tasks
			});
		}
		}
	});
});


module.exports = router;
